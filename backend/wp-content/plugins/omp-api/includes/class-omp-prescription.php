<?php
/**
 * OMP Prescription Upload & Tracking Endpoints
 */

defined('ABSPATH') || exit;

class OMP_Prescription {

    private string $namespace = 'omp/v1';

    public function register_routes(): void {
        register_rest_route($this->namespace, '/prescription', [
            'methods'             => 'POST',
            'callback'            => [$this, 'upload'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route($this->namespace, '/prescription/(?P<id>\d+)', [
            'methods'             => 'GET',
            'callback'            => [$this, 'get_status'],
            'permission_callback' => '__return_true',
        ]);
    }

    /**
     * Handle prescription upload.
     */
    public function upload(WP_REST_Request $request): WP_REST_Response {
        $files = $request->get_file_params();

        if (empty($files['prescription'])) {
            return new WP_REST_Response(['error' => 'No prescription file provided'], 400);
        }

        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';

        // Upload to private directory (not publicly accessible)
        add_filter('upload_dir', [$this, 'set_prescription_upload_dir']);
        $attachment_id = media_handle_sideload([
            'name'     => sanitize_file_name($files['prescription']['name']),
            'tmp_name' => $files['prescription']['tmp_name'],
            'type'     => $files['prescription']['type'],
            'size'     => $files['prescription']['size'],
        ], 0);
        remove_filter('upload_dir', [$this, 'set_prescription_upload_dir']);

        if (is_wp_error($attachment_id)) {
            return new WP_REST_Response(['error' => 'Upload failed: ' . $attachment_id->get_error_message()], 500);
        }

        $insurance = sanitize_text_field($request->get_param('insurance_provider') ?? 'Out-of-pocket');
        $callback  = filter_var($request->get_param('wants_callback'), FILTER_VALIDATE_BOOLEAN);
        $notes     = sanitize_textarea_field($request->get_param('notes') ?? '');

        // Create a custom post to track the prescription
        $post_id = wp_insert_post([
            'post_type'   => 'omp_prescription',
            'post_status' => 'publish',
            'post_title'  => 'Prescription #' . time(),
            'meta_input'  => [
                '_omp_attachment_id'    => $attachment_id,
                '_omp_insurance'        => $insurance,
                '_omp_wants_callback'   => $callback,
                '_omp_notes'            => $notes,
                '_omp_status'           => 'pending',
                '_omp_submitted_at'     => current_time('mysql'),
            ],
        ]);

        if (is_wp_error($post_id)) {
            return new WP_REST_Response(['error' => 'Failed to create prescription record'], 500);
        }

        return new WP_REST_Response([
            'id'     => $post_id,
            'status' => 'pending',
        ], 201);
    }

    /**
     * Get prescription status.
     */
    public function get_status(WP_REST_Request $request): WP_REST_Response {
        $id   = (int) $request->get_param('id');
        $post = get_post($id);

        if (!$post || $post->post_type !== 'omp_prescription') {
            return new WP_REST_Response(['error' => 'Prescription not found'], 404);
        }

        return new WP_REST_Response([
            'id'                        => $id,
            'status'                    => get_post_meta($id, '_omp_status', true) ?: 'pending',
            'insurance_provider'        => get_post_meta($id, '_omp_insurance', true),
            'wants_pharmacist_callback' => (bool) get_post_meta($id, '_omp_wants_callback', true),
            'notes'                     => get_post_meta($id, '_omp_notes', true),
            'submitted_at'              => get_post_meta($id, '_omp_submitted_at', true),
        ]);
    }

    /**
     * Store prescriptions in a private subdirectory.
     */
    public function set_prescription_upload_dir(array $dirs): array {
        $dirs['subdir'] = '/omp-prescriptions';
        $dirs['path']   = $dirs['basedir'] . '/omp-prescriptions';
        $dirs['url']    = $dirs['baseurl'] . '/omp-prescriptions';
        return $dirs;
    }
}
