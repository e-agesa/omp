"use client";

import { useState } from "react";
import { useMpesa } from "@/hooks/useMpesa";

interface MpesaCheckoutProps {
  amount: number;
  orderId: number;
  onSuccess?: (receiptNumber: string) => void;
}

export function MpesaCheckout({ amount, orderId, onSuccess }: MpesaCheckoutProps) {
  const [phone, setPhone] = useState("");
  const { status, error, receiptNumber, pay, reset } = useMpesa();

  const formatPhone = (value: string) => {
    // Accept 07xx, +2547xx, or 2547xx formats
    const cleaned = value.replace(/\D/g, "");
    setPhone(cleaned);
  };

  const normalizePhone = (raw: string): string => {
    if (raw.startsWith("0")) return "254" + raw.slice(1);
    if (raw.startsWith("+")) return raw.slice(1);
    return raw;
  };

  const handlePay = () => {
    const normalized = normalizePhone(phone);
    if (normalized.length < 12) return;
    pay(normalized, amount, orderId);
  };

  // Success state
  if (status === "completed" && receiptNumber) {
    onSuccess?.(receiptNumber);
    return (
      <div className="bg-omp-green/5 border border-omp-green/20 rounded-medical p-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-omp-green/10 mb-3">
          <svg className="w-7 h-7 text-omp-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-omp-dark">Payment Successful!</h3>
        <p className="text-sm text-omp-gray mt-1">
          M-Pesa receipt: <strong className="text-omp-dark">{receiptNumber}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-omp-white rounded-medical shadow-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-medical bg-mpesa flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        <div>
          <h3 className="font-bold text-omp-dark">Pay with M-Pesa</h3>
          <p className="text-xs text-omp-gray">Lipa na M-Pesa — instant & secure</p>
        </div>
      </div>

      {/* Amount */}
      <div className="bg-omp-slate rounded-medical p-4 mb-4 text-center">
        <p className="text-xs text-omp-gray">Amount to pay</p>
        <p className="text-2xl font-bold text-omp-dark">
          KES {amount.toLocaleString()}
        </p>
      </div>

      {/* Phone Input */}
      {(status === "idle" || status === "failed") && (
        <>
          <label className="block text-sm font-medium text-omp-dark mb-1.5">
            M-Pesa Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => formatPhone(e.target.value)}
            placeholder="0712 345 678"
            className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm placeholder:text-omp-gray focus:outline-none focus:ring-2 focus:ring-mpesa"
          />

          {error && (
            <p className="mt-2 text-sm text-omp-red">{error}</p>
          )}

          <button
            onClick={handlePay}
            disabled={phone.length < 9}
            className="mt-4 w-full bg-mpesa text-white font-bold py-4 rounded-medical hover:bg-mpesa-dark transition-colors disabled:opacity-40 text-base"
          >
            Pay KES {amount.toLocaleString()}
          </button>

          {status === "failed" && (
            <button
              onClick={reset}
              className="mt-2 w-full text-sm text-omp-gray hover:text-omp-dark transition-colors"
            >
              Try again
            </button>
          )}
        </>
      )}

      {/* Prompting state — STK push sent */}
      {status === "prompting" && (
        <div className="text-center py-4">
          <div className="w-12 h-12 border-4 border-mpesa border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="font-semibold text-omp-dark">Check your phone...</p>
          <p className="text-sm text-omp-gray mt-1">
            An M-Pesa prompt has been sent to your phone. Enter your PIN to complete payment.
          </p>
        </div>
      )}

      {/* Polling state — waiting for confirmation */}
      {status === "polling" && (
        <div className="text-center py-4">
          <div className="w-12 h-12 border-4 border-omp-blue border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="font-semibold text-omp-dark">Confirming payment...</p>
          <p className="text-sm text-omp-gray mt-1">
            Please wait while we verify your M-Pesa payment.
          </p>
        </div>
      )}

      {/* Security note */}
      <p className="mt-4 text-[10px] text-omp-gray text-center">
        Secured by Safaricom Daraja API. We never store your M-Pesa PIN.
      </p>
    </div>
  );
}
