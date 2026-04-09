import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-omp-dark text-white px-6 py-14">
        <AnimateOnScroll animation="fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
          <p className="text-sm text-white/50 mt-2">Last updated: {lastUpdated}</p>
        </AnimateOnScroll>
      </section>

      {/* Content */}
      <section className="px-6 py-10">
        <AnimateOnScroll animation="fade-in-up">
          <div className="max-w-4xl mx-auto bg-omp-white rounded-medical shadow-card p-6 sm:p-10 prose prose-sm max-w-none prose-headings:text-omp-dark prose-headings:font-bold prose-p:text-omp-gray prose-li:text-omp-gray prose-strong:text-omp-dark prose-a:text-omp-blue">
            {children}
          </div>
        </AnimateOnScroll>
      </section>
    </div>
  );
}
