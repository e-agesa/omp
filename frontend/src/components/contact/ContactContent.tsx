"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const CONTACT_METHODS = [
  {
    title: "Call Us",
    detail: "+254 700 000 000",
    description: "Mon - Sat, 8am - 8pm",
    href: "tel:+254700000000",
    color: "bg-omp-blue",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    title: "WhatsApp",
    detail: "Chat with a Pharmacist",
    description: "Instant responses",
    href: "https://wa.me/254700000000?text=Hi%2C%20I%20need%20help.",
    color: "bg-whatsapp",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    title: "Email Us",
    detail: "support@omp.co.ke",
    description: "We reply within 2 hours",
    href: "mailto:support@omp.co.ke",
    color: "bg-omp-red",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Visit Us",
    detail: "Nairobi, Kenya",
    description: "By appointment only",
    href: "#map",
    color: "bg-amber-500",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
      </svg>
    ),
  },
];

export function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // In production, POST to WordPress REST endpoint
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-omp-dark to-omp-blue-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-96 h-96 bg-omp-green rounded-full blur-3xl animate-float" />
        </div>
        <div className="relative px-6 py-20 lg:py-28">
          <AnimateOnScroll animation="fade-in-up">
            <span className="inline-block bg-omp-white/10 text-omp-green-light text-xs font-semibold px-4 py-1.5 rounded-pill mb-4 uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              We&apos;re Here to Help
            </h1>
            <p className="text-lg text-white/60 max-w-xl">
              Have a question about your order, need pharmacist advice, or want to partner with us?
              Reach out — we respond fast.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_METHODS.map((method, i) => (
            <AnimateOnScroll key={method.title} animation="fade-in-up" delay={i * 100}>
              <a
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block bg-omp-white rounded-medical shadow-card-hover p-6 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-medical ${method.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
                  {method.icon}
                </div>
                <h3 className="font-bold text-omp-dark">{method.title}</h3>
                <p className="text-sm font-medium text-omp-blue mt-1">{method.detail}</p>
                <p className="text-xs text-omp-gray mt-0.5">{method.description}</p>
              </a>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="px-6 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact Form */}
          <AnimateOnScroll animation="fade-in-left" className="lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-omp-dark mb-2">Send us a Message</h2>
            <p className="text-sm text-omp-gray mb-6">Fill in the form and we&apos;ll get back to you within 2 hours.</p>

            {submitted ? (
              <div className="bg-omp-green/5 border border-omp-green/20 rounded-medical p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-omp-green/10 mb-4">
                  <svg className="w-8 h-8 text-omp-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-omp-dark">Message Sent!</h3>
                <p className="text-sm text-omp-gray mt-2">Thank you for reaching out. Our team will respond shortly.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="mt-4 text-sm text-omp-blue font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-omp-dark mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-omp-blue"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-omp-dark mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-omp-blue"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-omp-dark mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-omp-blue"
                      placeholder="0712 345 678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-omp-dark mb-1">Subject *</label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-omp-blue bg-white"
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="prescription">Prescription Help</option>
                      <option value="product">Product Question</option>
                      <option value="delivery">Delivery Issue</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-omp-dark mb-1">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-medical border border-omp-gray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-omp-blue resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-omp-blue text-white font-semibold py-3.5 rounded-medical hover:bg-omp-blue-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </AnimateOnScroll>

          {/* Map + Info */}
          <AnimateOnScroll animation="fade-in-right" className="lg:w-1/2">
            <div id="map" className="w-full aspect-4/3 rounded-medical overflow-hidden mb-6 relative">
              <Image
                src="/images/customer-support.jpg"
                alt="Our Mall Pharmacy customer support team ready to help"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-omp-dark/60 to-transparent flex items-end p-6">
                <div>
                  <p className="text-white font-bold text-lg">24/7 Pharmacist Support</p>
                  <p className="text-white/70 text-sm">Our team is always ready to help via WhatsApp, phone, or email.</p>
                </div>
              </div>
            </div>

            {/* Business hours */}
            <div className="bg-omp-white rounded-medical shadow-card p-6">
              <h3 className="font-bold text-omp-dark mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Monday - Friday", time: "8:00 AM - 8:00 PM" },
                  { day: "Saturday", time: "9:00 AM - 6:00 PM" },
                  { day: "Sunday", time: "10:00 AM - 4:00 PM" },
                  { day: "Public Holidays", time: "10:00 AM - 2:00 PM" },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between py-1.5 border-b border-omp-gray-light last:border-0">
                    <span className="text-omp-gray">{item.day}</span>
                    <span className="font-medium text-omp-dark">{item.time}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-omp-gray">
                Online orders and deliveries run during business hours. Emergency pharmacist consultation available 24/7 via WhatsApp.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FAQ Quick Section */}
      <section className="bg-omp-white px-6 py-16">
        <AnimateOnScroll animation="fade-in-up" className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-omp-dark">Frequently Asked Questions</h2>
        </AnimateOnScroll>

        <div className="max-w-3xl mx-auto space-y-3">
          {[
            { q: "How fast is delivery in Nairobi?", a: "We deliver within 30-60 minutes to most Nairobi estates including Westlands, Kilimani, Karen, CBD, and Eastlands." },
            { q: "Do I need a prescription for all medicines?", a: "Only prescription medicines (marked with Rx) require a valid prescription. OTC products can be ordered directly." },
            { q: "Which payment methods do you accept?", a: "M-Pesa (Lipa na M-Pesa), Visa, Mastercard, and cash on delivery for select areas." },
            { q: "Can I return a product?", a: "Yes, unused and sealed products can be returned within 7 days. See our Return Policy for full details." },
          ].map((faq, i) => (
            <AnimateOnScroll key={i} animation="fade-in-up" delay={i * 50}>
              <details className="group bg-omp-slate rounded-medical overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-sm font-semibold text-omp-dark hover:bg-omp-gray-light/50 transition-colors">
                  {faq.q}
                  <svg className="w-4 h-4 text-omp-gray shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-sm text-omp-gray leading-relaxed">{faq.a}</div>
              </details>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
    </div>
  );
}
