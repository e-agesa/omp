"use client";

import { useState, useCallback } from "react";
import { getDeliveryEstimate } from "@/lib/omp-api";

interface GeoState {
  loading: boolean;
  latitude: number | null;
  longitude: number | null;
  zone: string | null;
  eta: number | null;
  cost: number | null;
  badge: string | null;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({
    loading: false,
    latitude: null,
    longitude: null,
    zone: null,
    eta: null,
    cost: null,
    badge: null,
    error: null,
  });

  const locate = useCallback(async () => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: "Geolocation not supported" }));
      return;
    }

    setState((s) => ({ ...s, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const estimate = await getDeliveryEstimate(latitude, longitude);
          setState({
            loading: false,
            latitude,
            longitude,
            zone: estimate.zone,
            eta: estimate.eta_minutes,
            cost: estimate.cost,
            badge: estimate.badge ?? null,
            error: null,
          });
        } catch {
          setState((s) => ({
            ...s,
            loading: false,
            latitude,
            longitude,
            error: "Could not get delivery estimate",
          }));
        }
      },
      (err) => {
        setState((s) => ({ ...s, loading: false, error: err.message }));
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  return { ...state, locate };
}
