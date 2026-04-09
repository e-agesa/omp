"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full px-6 py-20 text-center">
      <h1 className="text-6xl font-bold text-omp-red mb-4">500</h1>
      <h2 className="text-xl font-semibold text-omp-dark mb-2">Something went wrong</h2>
      <p className="text-sm text-omp-gray mb-8 max-w-md mx-auto">
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={reset}
        className="bg-omp-blue text-white font-semibold px-6 py-3 rounded-medical hover:bg-omp-blue-light transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
