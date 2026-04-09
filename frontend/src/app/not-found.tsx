import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full px-6 py-20 text-center">
      <h1 className="text-6xl font-bold text-omp-blue mb-4">404</h1>
      <h2 className="text-xl font-semibold text-omp-dark mb-2">Page Not Found</h2>
      <p className="text-sm text-omp-gray mb-8 max-w-md mx-auto">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="bg-omp-blue text-white font-semibold px-6 py-3 rounded-medical hover:bg-omp-blue-light transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/shop"
          className="border border-omp-blue text-omp-blue font-semibold px-6 py-3 rounded-medical hover:bg-omp-blue/5 transition-colors"
        >
          Browse Shop
        </Link>
      </div>
    </div>
  );
}
