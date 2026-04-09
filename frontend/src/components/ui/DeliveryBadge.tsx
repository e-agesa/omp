"use client";

import { useGeolocation } from "@/hooks/useGeolocation";

export function DeliveryBadge() {
  const { zone, eta, badge, loading, error, locate } = useGeolocation();

  if (zone && eta) {
    return (
      <div className="flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
        </svg>
        <span>
          Deliver to <strong>{zone}</strong>
        </span>
        {badge && (
          <span className="ml-1 bg-omp-green text-white text-[9px] font-bold px-1.5 py-0.5 rounded-pill">
            {badge}
          </span>
        )}
        {eta && (
          <span className="text-omp-green-light font-medium">
            &middot; {eta} mins
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={locate}
      disabled={loading}
      className="flex items-center gap-1.5 hover:underline disabled:opacity-50"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
      </svg>
      {loading ? "Locating..." : error ? "Set delivery location" : "Set delivery location"}
    </button>
  );
}
