"use client";

import Link from "next/link";
import { MotionSection, StaggerGroup, StaggerItem, motion } from "@/components/motion";

const HUBS = [
  {
    title: "Mother & Baby",
    description: "Prenatal vitamins, diapers, pediatric care & more",
    href: "/health/mother-baby",
    gradient: "from-pink-500 to-rose-400",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Chronic Care",
    description: "Managing hypertension, diabetes & lifestyle supplements",
    href: "/health/chronic-care",
    gradient: "from-omp-blue to-blue-400",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    title: "The Beauty Lab",
    description: "Vichy, La Roche-Posay & CeraVe — shop by skin concern",
    href: "/health/beauty-lab",
    gradient: "from-purple-500 to-indigo-400",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
];

export function HealthHubs() {
  return (
    <section>
      <MotionSection>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-omp-dark">Health Hubs</h2>
          <Link href="/health" className="text-sm text-omp-blue font-medium hover:underline">
            View all
          </Link>
        </div>
      </MotionSection>
      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {HUBS.map((hub) => (
          <StaggerItem key={hub.href}>
            <Link href={hub.href} className="block">
              <motion.div
                className={`group relative overflow-hidden rounded-medical bg-gradient-to-br ${hub.gradient} p-6 text-white h-full`}
                whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                  {hub.icon}
                </div>
                <h3 className="text-lg font-bold">{hub.title}</h3>
                <p className="text-sm text-white/80 mt-1">{hub.description}</p>
                <svg
                  className="absolute bottom-4 right-4 w-5 h-5 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
