"use client";

import type { PrescriptionStatus } from "@/types";

const STATUSES: { key: PrescriptionStatus; label: string }[] = [
  { key: "pending", label: "Submitted" },
  { key: "pharmacist-reviewing", label: "Pharmacist Reviewing" },
  { key: "dispensing", label: "Dispensing" },
  { key: "out-for-delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

interface PrescriptionTrackerProps {
  status: PrescriptionStatus;
}

export function PrescriptionTracker({ status }: PrescriptionTrackerProps) {
  const currentIndex = STATUSES.findIndex((s) => s.key === status);

  return (
    <div className="bg-omp-white rounded-medical shadow-card p-5">
      <h3 className="font-bold text-omp-dark mb-4">Prescription Status</h3>
      <div className="space-y-3">
        {STATUSES.map((s, i) => {
          const isCompleted = i <= currentIndex;
          const isCurrent = i === currentIndex;

          return (
            <div key={s.key} className="flex items-center gap-3">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isCompleted
                      ? "bg-omp-green text-white"
                      : "bg-omp-gray-light text-omp-gray"
                  } ${isCurrent ? "ring-4 ring-omp-green/20" : ""}`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                {i < STATUSES.length - 1 && (
                  <div
                    className={`w-0.5 h-4 ${
                      i < currentIndex ? "bg-omp-green" : "bg-omp-gray-light"
                    }`}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-sm ${
                  isCurrent
                    ? "font-semibold text-omp-green"
                    : isCompleted
                    ? "font-medium text-omp-dark"
                    : "text-omp-gray"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
