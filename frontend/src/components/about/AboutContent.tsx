"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const STATS = [
  { number: "50,000+", label: "Happy Customers" },
  { number: "10,000+", label: "Products Available" },
  { number: "98%", label: "Order Accuracy" },
  { number: "30 min", label: "Avg. Delivery Time" },
];

const VALUES = [
  {
    title: "Trust & Safety",
    description:
      "Every product on Our Mall Pharmacy is sourced directly from authorized distributors and verified by the Pharmacy & Poisons Board of Kenya. Your health is non-negotiable.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: "bg-omp-green",
  },
  {
    title: "Accessibility",
    description:
      "Healthcare should reach everyone. We accept M-Pesa, offer same-day delivery across Nairobi, and keep our prices competitive so quality medicine is never out of reach.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    color: "bg-omp-red",
  },
  {
    title: "Expert Guidance",
    description:
      "Our team of licensed pharmacists is available via WhatsApp and phone to answer your health questions, explain dosages, and ensure you get the right care.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    color: "bg-omp-blue",
  },
  {
    title: "Innovation",
    description:
      "From smart prescription portals to automatic refill reminders, we use technology to make your health journey seamless, proactive, and personal.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: "bg-amber-500",
  },
];

const TIMELINE = [
  { year: "2020", title: "The Idea", description: "Our Mall Pharmacy was born from a simple question: why is it so hard to get quality medicine delivered in Nairobi?" },
  { year: "2021", title: "First Delivery", description: "We partnered with our first pharmacy and made our first same-day delivery to Kilimani." },
  { year: "2022", title: "M-Pesa Integration", description: "One-tap M-Pesa checkout launched. No more cash on delivery friction." },
  { year: "2023", title: "10,000 Products", description: "Our catalogue grew to cover medicines, beauty, supplements, and chronic care." },
  { year: "2024", title: "Smart Prescriptions", description: "Launched the AI-assisted prescription portal with pharmacist support." },
  { year: "2025", title: "The Future", description: "Expanding to Mombasa, Kisumu, and Nakuru. Building Kenya's health infrastructure." },
];

const TEAM = [
  { name: "Dr. Sarah Mwangi", role: "Chief Pharmacist", color: "bg-omp-blue" },
  { name: "James Otieno", role: "CEO & Co-Founder", color: "bg-omp-green" },
  { name: "Faith Njeri", role: "Head of Operations", color: "bg-omp-red" },
  { name: "David Kipchoge", role: "CTO", color: "bg-amber-500" },
];

export function AboutContent() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-omp-blue via-omp-blue-dark to-omp-dark text-white min-h-[60vh] flex items-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-omp-green rounded-full blur-3xl animate-float delay-700" />
        </div>

        <div className="relative w-full px-6 py-20 lg:py-28">
          <div className="max-w-4xl">
            <AnimateOnScroll animation="fade-in-up">
              <span className="inline-block bg-omp-green/20 text-omp-green-light text-xs font-semibold px-4 py-1.5 rounded-pill mb-6 uppercase tracking-wider">
                About Our Mall Pharmacy
              </span>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-in-up" delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Redefining Healthcare
                <br />
                <span className="text-omp-green-light">for Kenya</span>
              </h1>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-in-up" delay={200}>
              <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                Our Mall Pharmacy is Kenya&apos;s digital-first pharmacy — bringing trusted medicines,
                expert pharmacist guidance, and lightning-fast delivery to every home in Nairobi and beyond.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-omp-white border-b border-omp-gray-light">
        <div className="px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <AnimateOnScroll key={stat.label} animation="fade-in-up" delay={i * 100}>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-omp-blue">{stat.number}</p>
                  <p className="text-sm text-omp-gray mt-1 font-medium">{stat.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <AnimateOnScroll animation="fade-in-left" className="lg:w-1/2">
            <div className="relative">
              <div className="w-full aspect-4/3 rounded-medical overflow-hidden">
                <Image
                  src="/images/pharmacist.jpg"
                  alt="Licensed pharmacist reviewing prescriptions at Our Mall Pharmacy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-4 -right-4 bg-omp-green text-white px-6 py-3 rounded-medical shadow-lg">
                <p className="text-sm font-bold">100% Genuine Products</p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-in-right" className="lg:w-1/2">
            <span className="text-omp-blue text-sm font-semibold uppercase tracking-wider">Our Mission</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-omp-dark mt-3 mb-6 leading-tight">
              Making quality healthcare accessible to every Kenyan
            </h2>
            <p className="text-omp-gray leading-relaxed mb-4">
              We believe that no one should have to choose between convenience and quality when it comes
              to their health. Our Mall Pharmacy bridges the gap between world-class pharmacy services and the everyday
              Kenyan — delivering genuine medicines with the care and speed you deserve.
            </p>
            <p className="text-omp-gray leading-relaxed mb-6">
              From the mother in Karen needing pediatric supplies at midnight, to the professional in
              Westlands managing a chronic condition — Our Mall Pharmacy is here for everyone, every time.
            </p>
            <Link
              href="/prescription"
              className="inline-flex items-center gap-2 bg-omp-blue text-white font-semibold px-6 py-3 rounded-medical hover:bg-omp-blue-light transition-all hover:shadow-lg"
            >
              Upload a Prescription
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-omp-white px-6 py-16 lg:py-24">
        <AnimateOnScroll animation="fade-in-up" className="text-center mb-12">
          <span className="text-omp-blue text-sm font-semibold uppercase tracking-wider">What Drives Us</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-omp-dark mt-3">Our Core Values</h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value, i) => (
            <AnimateOnScroll key={value.title} animation="fade-in-up" delay={i * 100}>
              <div className="group bg-omp-slate rounded-medical p-6 hover:bg-omp-white hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 h-full">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-medical ${value.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-omp-dark mb-2">{value.title}</h3>
                <p className="text-sm text-omp-gray leading-relaxed">{value.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-6 py-16 lg:py-24">
        <AnimateOnScroll animation="fade-in-up" className="text-center mb-12">
          <span className="text-omp-blue text-sm font-semibold uppercase tracking-wider">Our Journey</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-omp-dark mt-3">The Our Mall Pharmacy Story</h2>
        </AnimateOnScroll>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 bg-omp-gray-light" />

          {TIMELINE.map((item, i) => (
            <AnimateOnScroll
              key={item.year}
              animation={i % 2 === 0 ? "fade-in-left" : "fade-in-right"}
              delay={i * 100}
              className={`relative flex items-start gap-6 mb-10 ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-omp-blue border-4 border-omp-white shadow-sm z-10" />

              {/* Content */}
              <div className={`ml-14 lg:ml-0 lg:w-[calc(50%-2rem)] ${i % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8"}`}>
                <span className="inline-block text-omp-blue text-sm font-bold mb-1">{item.year}</span>
                <h3 className="text-lg font-bold text-omp-dark">{item.title}</h3>
                <p className="text-sm text-omp-gray mt-1 leading-relaxed">{item.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-omp-white px-6 py-16 lg:py-24">
        <AnimateOnScroll animation="fade-in-up" className="text-center mb-12">
          <span className="text-omp-blue text-sm font-semibold uppercase tracking-wider">The People Behind Our Mall Pharmacy</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-omp-dark mt-3">Our Leadership Team</h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {TEAM.map((member, i) => (
            <AnimateOnScroll key={member.name} animation="scale-in" delay={i * 100}>
              <div className="text-center group">
                <div className={`w-28 h-28 lg:w-36 lg:h-36 mx-auto rounded-full ${member.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-lg`}>
                  <span className="text-3xl lg:text-4xl font-bold text-white">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-bold text-omp-dark">{member.name}</h3>
                <p className="text-sm text-omp-gray">{member.role}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-omp-blue to-omp-blue-light text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-omp-green rounded-full blur-3xl" />
        </div>

        <div className="relative px-6 py-16 lg:py-24 text-center">
          <AnimateOnScroll animation="fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Ready to experience better healthcare?
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-in-up" delay={100}>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of Kenyans who trust Our Mall Pharmacy for their health needs. Start shopping or upload a prescription today.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-in-up" delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="bg-omp-white text-omp-blue font-semibold px-8 py-4 rounded-pill hover:shadow-lg hover:scale-105 transition-all"
              >
                Browse Products
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-pill hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
