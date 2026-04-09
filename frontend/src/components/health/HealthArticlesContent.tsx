"use client";

import { useState } from "react";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  featured: boolean;
}

const CATEGORIES = [
  "All",
  "Wellness",
  "Chronic Care",
  "Mother & Baby",
  "Nutrition",
  "Skincare",
  "Mental Health",
];

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Managing Diabetes in Kenya: A Complete Guide",
    excerpt: "Learn practical steps to monitor blood sugar, understand your medication, and make lifestyle changes that work with a Kenyan diet.",
    category: "Chronic Care",
    readTime: "8 min read",
    date: "28 Mar 2026",
    author: "Dr. Sarah Kamau, PharmD",
    featured: true,
  },
  {
    id: 2,
    title: "Top 10 Immunity Boosters Available at Your Pharmacy",
    excerpt: "From Vitamin C to Zinc, here are the most effective supplements to strengthen your immune system this cold season.",
    category: "Wellness",
    readTime: "5 min read",
    date: "25 Mar 2026",
    author: "James Ochieng, Pharmacist",
    featured: true,
  },
  {
    id: 3,
    title: "Your Baby's First Year: Vaccination Schedule for Kenyan Parents",
    excerpt: "A comprehensive guide to the KEPI vaccination schedule, what to expect at each visit, and how to keep your baby comfortable.",
    category: "Mother & Baby",
    readTime: "6 min read",
    date: "22 Mar 2026",
    author: "Dr. Wanjiku Mwangi, Pediatric Pharmacist",
    featured: false,
  },
  {
    id: 4,
    title: "Understanding Hypertension: Silent Killer in East Africa",
    excerpt: "High blood pressure affects 1 in 4 Kenyans. Learn about symptoms, risk factors, and how to manage your BP effectively.",
    category: "Chronic Care",
    readTime: "7 min read",
    date: "18 Mar 2026",
    author: "Dr. Sarah Kamau, PharmD",
    featured: false,
  },
  {
    id: 5,
    title: "Building a Skincare Routine for the Kenyan Climate",
    excerpt: "The tropical sun, humidity, and urban pollution require a tailored approach. Here's your step-by-step guide to healthy skin.",
    category: "Skincare",
    readTime: "5 min read",
    date: "15 Mar 2026",
    author: "Angela Njeri, Beauty Pharmacist",
    featured: false,
  },
  {
    id: 6,
    title: "Healthy Eating on a Budget: Nairobi Edition",
    excerpt: "Nutritious meals don't have to break the bank. Discover affordable superfoods available in local markets across Nairobi.",
    category: "Nutrition",
    readTime: "6 min read",
    date: "12 Mar 2026",
    author: "James Ochieng, Pharmacist",
    featured: false,
  },
  {
    id: 7,
    title: "Stress and Anxiety: When to See a Professional",
    excerpt: "Mental health matters. Recognize the signs, understand treatment options, and know where to find help in Kenya.",
    category: "Mental Health",
    readTime: "7 min read",
    date: "8 Mar 2026",
    author: "Dr. Wanjiku Mwangi, Pediatric Pharmacist",
    featured: false,
  },
  {
    id: 8,
    title: "Breastfeeding Tips Every New Mum Should Know",
    excerpt: "Expert advice on establishing a good latch, maintaining milk supply, and common challenges with practical solutions.",
    category: "Mother & Baby",
    readTime: "6 min read",
    date: "5 Mar 2026",
    author: "Dr. Wanjiku Mwangi, Pediatric Pharmacist",
    featured: false,
  },
];

const categoryColor = (cat: string) => {
  switch (cat) {
    case "Wellness": return "bg-omp-green/10 text-omp-green";
    case "Chronic Care": return "bg-omp-blue/10 text-omp-blue";
    case "Mother & Baby": return "bg-pink-500/10 text-pink-600";
    case "Nutrition": return "bg-amber-500/10 text-amber-600";
    case "Skincare": return "bg-purple-500/10 text-purple-600";
    case "Mental Health": return "bg-teal-500/10 text-teal-600";
    default: return "bg-omp-gray-light text-omp-gray";
  }
};

export function HealthArticlesContent() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  const featuredArticles = ARTICLES.filter((a) => a.featured);

  return (
    <div className="w-full px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-omp-dark mb-2">Health & Wellness Hub</h1>
          <p className="text-sm text-omp-gray">
            Expert advice from our licensed pharmacists to help you live healthier.
          </p>
        </div>

        {/* Featured articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              className="group bg-gradient-to-br from-omp-blue to-omp-blue-light rounded-medical p-6 text-white hover:shadow-lg transition-shadow cursor-pointer"
            >
              <span className="text-[10px] font-semibold uppercase bg-white/20 px-2 py-1 rounded-pill">
                Featured
              </span>
              <h2 className="font-bold text-lg mt-3 mb-2 group-hover:underline decoration-white/50">
                {article.title}
              </h2>
              <p className="text-sm text-white/80 line-clamp-2">{article.excerpt}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-white/60">
                <span>{article.author}</span>
                <span>&middot;</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm px-4 py-2 rounded-pill font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-omp-blue text-white"
                  : "bg-omp-white text-omp-gray border border-omp-gray-light hover:border-omp-blue hover:text-omp-blue"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article, i) => (
            <article
              key={article.id}
              className="bg-omp-white rounded-medical shadow-card p-5 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Placeholder image */}
              <div className="w-full h-36 bg-gradient-to-br from-omp-slate to-omp-gray-light rounded-medical mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-omp-gray/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
              </div>

              <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-pill ${categoryColor(article.category)}`}>
                {article.category}
              </span>

              <h3 className="font-bold text-omp-dark mt-2 mb-1.5 text-sm leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-omp-gray line-clamp-2">{article.excerpt}</p>

              <div className="flex items-center justify-between mt-4 text-[10px] text-omp-gray">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-omp-gray">No articles in this category yet.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-2 text-sm text-omp-blue hover:underline"
            >
              View all articles
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-10 bg-omp-white rounded-medical shadow-card p-6 text-center">
          <h3 className="font-bold text-omp-dark text-lg mb-1">Stay Informed</h3>
          <p className="text-sm text-omp-gray mb-4">
            Get weekly health tips and exclusive offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-medical border border-omp-gray-light px-4 py-3 text-sm placeholder:text-omp-gray focus:outline-none focus:ring-2 focus:ring-omp-blue"
            />
            <button className="bg-omp-blue text-white font-semibold px-6 py-3 rounded-medical hover:bg-omp-blue-light transition-colors shrink-0">
              Subscribe
            </button>
          </div>
          <p className="text-[10px] text-omp-gray mt-2">
            We respect your privacy. Unsubscribe anytime.{" "}
            <Link href="/privacy" className="text-omp-blue hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
