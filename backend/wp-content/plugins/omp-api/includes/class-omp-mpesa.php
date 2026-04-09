<?php
/**
 * OMP M-Pesa Daraja API Integration
 * Handles STK Push initiation and payment status polling.
 */

defined('ABSPATH') || exit;

class OMP_Mpesa {

    private string $namespace = 'omp/v1';

    public function register_routes(): void {
        register_rest_route($this->namespace, '/mpesa/stk-push', [
            'methods'             => 'POST',
            'callback'            => [$this, 'initiate_stk_push'],
            'permission_callback' => '__return_true',
            'args'                => [
                'phone'    => ['required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
                'amount'   => ['required' => true, 'type' => 'number'],
                'order_id' => ['required' => true, 'type' => 'integer'],
            ],
        ]);

        register_rest_route($this->namespace, '/mpesa/status/(?P<checkout_request_id>[a-zA-Z0-9_-]+)', [
            'methods'             => 'GET',
            'callback'            => [$this, 'check_status'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route($this->namespace, '/mpesa/callback', [
            'methods'             => 'POST',
            'callback'            => [$this, 'handle_callback'],
            'permission_callback' => '__return_true',
        ]);
    }

    /**
     * Get Daraja OAuth token.
     */
    private function get_access_token(): string {
        $consumer_key    = defined('MPESA_CONSUMER_KEY') ? MPESA_CONSUMER_KEY : '';
        $consumer_secret = defined('MPESA_CONSUMER_SECRET') ? MPESA_CONSUMER_SECRET : '';
        $env             = defined('MPESA_ENV') ? MPESA_ENV : 'sandbox';

        $url = $env === 'production'
            ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
            : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

        $response = wp_remote_get($url, [
            'headers' => [
                'Authorization' => 'Basic ' . base64_encode($consumer_key . ':' . $consumer_secret),
            ],
        ]);

        if (is_wp_error($response)) {
            return '';
        }

        $body = json_decode(wp_remote_retrieve_body($response), true);
        return $body['access_token'] ?? '';
    }

    /**
     * Initiate STK Push to customer phone.
     */
    public function initiate_stk_push(WP_REST_Request $request): WP_REST_Response {
        $phone    = $request->get_param('phone');
        $amount   = $request->get_param('amount');
        $order_id = $request->get_param('order_id');

        $access_token = $this->get_access_token();
        if (empty($access_token)) {
            return new WP_REST_Response(['error' => 'Failed to authenticate with M-Pesa'], 500);
        }

        $shortcode = defined('MPESA_SHORTCODE') ? MPESA_SHORTCODE : '174379';
        $passkey   = defined('MPESA_PASSKEY') ? MPESA_PASSKEY : '';
        $timestamp = date('YmdHis');
        $password  = base64_encode($shortcode . $passkey . $timestamp);
        $callback  = defined('MPESA_CALLBACK_URL') ? MPESA_CALLBACK_URL : rest_url('omp/v1/mpesa/callback');
        $env       = defined('MPESA_ENV') ? MPESA_ENV : 'sandbox';

        $url = $env === 'production'
            ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
            : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

        $payload = [
            'BusinessShortCode' => $shortcode,
            'Password'          => $password,
            'Timestamp'         => $timestamp,
            'TransactionType'   => 'CustomerPayBillOnline',
            'Amount'            => (int) $amount,
            'PartyA'            => $phone,
            'PartyB'            => $shortcode,
            'PhoneNumber'       => $phone,
            'CallBackURL'       => $callback,
            'AccountReference'  => 'OMP-' . $order_id,
            'TransactionDesc'   => 'Payment for OMP Order #' . $order_id,
        ];

        $response = wp_remote_post($url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $access_token,
                'Content-Type'  => 'application/json',
            ],
            'body' => wp_json_encode($payload),
        ]);

        if (is_wp_error($response)) {
            return new WP_REST_Response(['error' => 'STK Push request failed'], 500);
        }

        $body = json_decode(wp_remote_retrieve_body($response), true);

        // Store checkout request for polling
        if (!empty($body['CheckoutRequestID'])) {
            set_transient(
                'omp_mpesa_' . $body['CheckoutRequestID'],
                ['status' => 'pending', 'order_id' => $order_id],
                600 // 10 minute TTL
            );
        }

        return new WP_REST_Response([
            'checkout_request_id'  => $body['CheckoutRequestID'] ?? '',
            'merchant_request_id'  => $body['MerchantRequestID'] ?? '',
            'response_code'        => $body['ResponseCode'] ?? '1',
            'response_description' => $body['ResponseDescription'] ?? $body['errorMessage'] ?? 'Unknown error',
        ]);
    }

    /**
     * Check payment status (called by frontend polling).
     */
    public function check_status(WP_REST_Request $request): WP_REST_Response {
        $checkout_id = $request->get_param('checkout_request_id');
        $data        = get_transient('omp_mpesa_' . $checkout_id);

        if (!$data) {
            return new WP_REST_Response(['status' => 'pending', 'message' => 'Awaiting confirmation']);
        }

        return new WP_REST_Response([
            'status'         => $data['status'],
            'receipt_number' => $data['receipt_number'] ?? null,
            'message'        => $data['message'] ?? 'Awaiting confirmation',
        ]);
    }

    /**
     * Safaricom callback — receives payment result.
     */
    public function handle_callback(WP_REST_Request $request): WP_REST_Response {
        $body   = $request->get_json_params();
        $result = $body['Body']['stkCallback'] ?? [];

        $checkout_id = $result['CheckoutRequestID'] ?? '';
        $result_code = $result['ResultCode'] ?? -1;

        if (empty($checkout_id)) {
            return new WP_REST_Response(['ResultCode' => 0, 'ResultDesc' => 'Accepted']);
        }

        $stored = get_transient('omp_mpesa_' . $checkout_id) ?: [];

        if ($result_code == 0) {
            // Success — extract receipt number
            $metadata = $result['CallbackMetadata']['Item'] ?? [];
            $receipt  = '';
            foreach ($metadata as $item) {
                if ($item['Name'] === 'MpesaReceiptNumber') {
                    $receipt = $item['Value'];
                    break;
                }
            }

            $stored['status']         = 'completed';
            $stored['receipt_number'] = $receipt;
            $stored['message']        = 'Payment successful';

            // Update WooCommerce order status
            if (!empty($stored['order_id'])) {
                $order = wc_get_order($stored['order_id']);
                if ($order) {
                    $order->payment_complete($receipt);
                    $order->add_order_note('M-Pesa payment received. Receipt: ' . $receipt);
                }
            }
        } else {
            $stored['status']  = 'failed';
            $stored['message'] = $result['ResultDesc'] ?? 'Payment failed';
        }

        set_transient('omp_mpesa_' . $checkout_id, $stored, 600);

        return new WP_REST_Response(['ResultCode' => 0, 'ResultDesc' => 'Accepted']);
    }
}
