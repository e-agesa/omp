import type {
  MpesaSTKRequest,
  MpesaSTKResponse,
  MpesaStatusResponse,
  SearchResult,
  Prescription,
} from "@/types";

const OMP_API = process.env.NEXT_PUBLIC_OMP_API_URL!;

async function ompFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${OMP_API}/${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`OMP API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ── M-Pesa ──
export async function initiateMpesaSTK(data: MpesaSTKRequest): Promise<MpesaSTKResponse> {
  return ompFetch<MpesaSTKResponse>("mpesa/stk-push", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function checkMpesaStatus(checkoutRequestId: string): Promise<MpesaStatusResponse> {
  return ompFetch<MpesaStatusResponse>(`mpesa/status/${checkoutRequestId}`);
}

// ── Prescription ──
export async function uploadPrescription(formData: FormData): Promise<{ id: number; status: string }> {
  const res = await fetch(`${OMP_API}/prescription`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload prescription");
  return res.json();
}

export async function getPrescriptionStatus(id: number): Promise<Prescription> {
  return ompFetch<Prescription>(`prescription/${id}`);
}

// ── Search ──
export async function globalSearch(query: string): Promise<SearchResult[]> {
  return ompFetch<SearchResult[]>(`search?q=${encodeURIComponent(query)}`);
}

// ── Delivery ──
export async function getDeliveryEstimate(
  lat: number,
  lng: number
): Promise<{ zone: string; eta_minutes: number; cost: number; badge?: string }> {
  return ompFetch(`delivery/estimate?lat=${lat}&lng=${lng}`);
}
