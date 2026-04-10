"use client";

import { useState, useCallback } from "react";
import { uploadPrescription } from "@/lib/omp-api";

type PrescriptionStep = "upload" | "callback" | "review";

const STEPS: { key: PrescriptionStep; label: string }[] = [
  { key: "upload", label: "Upload" },
  { key: "callback", label: "Preferences" },
  { key: "review", label: "Submit" },
];

interface PrescriptionData {
  file: File | null;
  preview: string | null;
  wants_pharmacist_callback: boolean;
  notes: string;
}

export function PrescriptionUpload() {
  const [step, setStep] = useState<PrescriptionStep>("upload");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [prescription, setPrescription] = useState<PrescriptionData>({
    file: null,
    preview: null,
    wants_pharmacist_callback: false,
    notes: "",
  });

  const currentIndex = STEPS.findIndex((s) => s.key === step);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("File must be under 10MB");
      return;
    }

    const preview = URL.createObjectURL(file);
    setPrescription((prev) => ({ ...prev, file, preview }));
    setError(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      setError("Please upload an image or PDF");
      return;
    }

    const preview = URL.createObjectURL(file);
    setPrescription((prev) => ({ ...prev, file, preview }));
    setError(null);
  }, []);

  const handleSubmit = async () => {
    if (!prescription.file) return;
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("prescription", prescription.file);
      formData.append("wants_callback", String(prescription.wants_pharmacist_callback));
      formData.append("notes", prescription.notes);

      await uploadPrescription(formData);
      setSubmitted(true);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-omp-white rounded-medical p-8 text-center shadow-card">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-omp-green/10 mb-4">
          <svg className="w-8 h-8 text-omp-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-omp-dark">Prescription Submitted!</h3>
        <p className="text-sm text-omp-gray mt-2">
          Your prescription is pending pharmacist review. We&apos;ll notify you once it&apos;s ready.
        </p>
        <button
          onClick={() => { setSubmitted(false); setStep("upload"); setPrescription({ file: null, preview: null, wants_pharmacist_callback: false, notes: "" }); }}
          className="mt-4 text-sm text-omp-blue font-medium hover:underline"
        >
          Upload another prescription
        </button>
      </div>
    );
  }

  return (
    <div className="bg-omp-white rounded-medical shadow-card overflow-hidden">
      {/* Progress bar */}
      <div className="flex border-b border-omp-gray-light">
        {STEPS.map((s, i) => (
          <div
            key={s.key}
            className={`flex-1 py-3 text-center text-xs font-medium transition-colors ${
              i <= currentIndex
                ? "bg-omp-blue text-white"
                : "bg-omp-slate text-omp-gray"
            }`}
          >
            <span className="hidden sm:inline">{s.label}</span>
            <span className="sm:hidden">{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 bg-omp-red/10 text-omp-red text-sm px-4 py-2 rounded-medical">
            {error}
          </div>
        )}

        {/* Step 1: Upload */}
        {step === "upload" && (
          <div>
            <h3 className="text-lg font-bold text-omp-dark mb-1">Upload Your Prescription</h3>
            <p className="text-sm text-omp-gray mb-4">
              Take a photo or upload an image/PDF of your prescription.
            </p>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-omp-blue/20 rounded-medical p-8 text-center hover:border-omp-blue/50 transition-colors cursor-pointer"
            >
              {prescription.preview ? (
                <div className="space-y-3">
                  {prescription.file?.type.startsWith("image/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={prescription.preview}
                      alt="Prescription preview"
                      className="max-h-48 mx-auto rounded-medical"
                    />
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-omp-blue">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="font-medium">{prescription.file?.name}</span>
                    </div>
                  )}
                  <button
                    onClick={() => setPrescription((p) => ({ ...p, file: null, preview: null }))}
                    className="text-sm text-omp-red hover:underline"
                  >
                    Remove & re-upload
                  </button>
                </div>
              ) : (
                <div>
                  <svg className="w-12 h-12 mx-auto text-omp-blue/30 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                  <p className="text-sm text-omp-gray">
                    Drag & drop your prescription here, or{" "}
                    <label className="text-omp-blue font-medium cursor-pointer hover:underline">
                      browse
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-xs text-omp-gray mt-1">JPG, PNG, or PDF — Max 10MB</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setStep("callback")}
              disabled={!prescription.file}
              className="mt-4 w-full bg-omp-blue text-white font-semibold py-3 rounded-medical disabled:opacity-40 hover:bg-omp-blue-light transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Callback preference */}
        {step === "callback" && (
          <div>
            <h3 className="text-lg font-bold text-omp-dark mb-1">Preferences</h3>
            <p className="text-sm text-omp-gray mb-4">Customize how you receive your order.</p>

            <label className="flex items-center gap-3 p-4 rounded-medical border border-omp-gray-light hover:border-omp-blue/30 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={prescription.wants_pharmacist_callback}
                onChange={(e) => setPrescription((p) => ({ ...p, wants_pharmacist_callback: e.target.checked }))}
                className="w-5 h-5 rounded border-omp-gray accent-omp-blue"
              />
              <div>
                <p className="text-sm font-medium text-omp-dark">
                  I want a pharmacist to call me
                </p>
                <p className="text-xs text-omp-gray">
                  A pharmacist will explain your dosage and answer questions.
                </p>
              </div>
            </label>

            <textarea
              value={prescription.notes}
              onChange={(e) => setPrescription((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Any additional notes for the pharmacist? (optional)"
              rows={3}
              className="mt-3 w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm placeholder:text-omp-gray focus:outline-none focus:ring-2 focus:ring-omp-blue resize-none"
            />

            <div className="flex gap-3 mt-4">
              <button onClick={() => setStep("upload")} className="flex-1 py-3 rounded-medical border border-omp-gray-light text-sm font-medium text-omp-dark hover:bg-omp-slate transition-colors">
                Back
              </button>
              <button onClick={() => setStep("review")} className="flex-1 bg-omp-blue text-white font-semibold py-3 rounded-medical hover:bg-omp-blue-light transition-colors">
                Review
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === "review" && (
          <div>
            <h3 className="text-lg font-bold text-omp-dark mb-4">Review & Submit</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-omp-gray-light">
                <span className="text-sm text-omp-gray">File</span>
                <span className="text-sm font-medium text-omp-dark">{prescription.file?.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-omp-gray-light">
                <span className="text-sm text-omp-gray">Pharmacist callback</span>
                <span className="text-sm font-medium text-omp-dark">
                  {prescription.wants_pharmacist_callback ? "Yes" : "No"}
                </span>
              </div>
              {prescription.notes && (
                <div className="flex justify-between py-2 border-b border-omp-gray-light">
                  <span className="text-sm text-omp-gray">Notes</span>
                  <span className="text-sm font-medium text-omp-dark max-w-[60%] text-right">
                    {prescription.notes}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep("callback")} className="flex-1 py-3 rounded-medical border border-omp-gray-light text-sm font-medium text-omp-dark hover:bg-omp-slate transition-colors">
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-omp-green text-white font-semibold py-3 rounded-medical hover:bg-omp-green-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Prescription"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
