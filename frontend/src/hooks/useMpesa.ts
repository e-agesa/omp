"use client";

import { useState, useCallback, useRef } from "react";
import { initiateMpesaSTK, checkMpesaStatus } from "@/lib/omp-api";
import type { MpesaPaymentStatus } from "@/types";

interface MpesaState {
  status: "idle" | "prompting" | "polling" | "completed" | "failed";
  paymentStatus: MpesaPaymentStatus | null;
  receiptNumber: string | null;
  error: string | null;
}

export function useMpesa() {
  const [state, setState] = useState<MpesaState>({
    status: "idle",
    paymentStatus: null,
    receiptNumber: null,
    error: null,
  });

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const pay = useCallback(
    async (phone: string, amount: number, orderId: number) => {
      stopPolling();
      setState({ status: "prompting", paymentStatus: null, receiptNumber: null, error: null });

      try {
        const response = await initiateMpesaSTK({ phone, amount, order_id: orderId });

        if (response.response_code !== "0") {
          setState((s) => ({ ...s, status: "failed", error: response.response_description }));
          return;
        }

        // Poll for payment status every 3 seconds
        setState((s) => ({ ...s, status: "polling" }));
        let attempts = 0;
        const maxAttempts = 40; // ~2 minutes

        pollingRef.current = setInterval(async () => {
          attempts++;

          try {
            const result = await checkMpesaStatus(response.checkout_request_id);

            if (result.status === "completed") {
              stopPolling();
              setState({
                status: "completed",
                paymentStatus: "completed",
                receiptNumber: result.receipt_number ?? null,
                error: null,
              });
            } else if (result.status === "failed" || result.status === "cancelled") {
              stopPolling();
              setState({
                status: "failed",
                paymentStatus: result.status,
                receiptNumber: null,
                error: result.message,
              });
            }
          } catch {
            // Silently retry — network blip
          }

          if (attempts >= maxAttempts) {
            stopPolling();
            setState((s) => ({
              ...s,
              status: "failed",
              error: "Payment confirmation timed out. Check your M-Pesa messages.",
            }));
          }
        }, 3000);
      } catch (err) {
        setState({
          status: "failed",
          paymentStatus: null,
          receiptNumber: null,
          error: err instanceof Error ? err.message : "Payment initiation failed",
        });
      }
    },
    [stopPolling]
  );

  const reset = useCallback(() => {
    stopPolling();
    setState({ status: "idle", paymentStatus: null, receiptNumber: null, error: null });
  }, [stopPolling]);

  return { ...state, pay, reset, stopPolling };
}
