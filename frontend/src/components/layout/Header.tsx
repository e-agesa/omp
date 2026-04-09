"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { DeliveryBadge } from "@/components/ui/DeliveryBadge";

const NAV_CATEGORIES = [
  { name: "All Products", href: "/shop" },
  { name: "Pain Relief", href: "/category/pain-relief" },
  { name: "Supplements", href: "/category/supplements" },
  { name: "Beauty & Skincare", href: "/category/beauty" },
  { name: "Mother & Baby", href: "/category/mother-baby" },
  { name: "Chronic Care", href: "/category/chronic-care" },
  { name: "First Aid", href: "/category/first-aid" },
  { name: "Cold & Flu", href: "/category/cold-flu" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-omp-white shadow-header">
      {/* Top utility bar */}
      <div className="bg-omp-blue text-white text-xs">
        <div className="flex items-center justify-between px-6 py-1.5">
          <DeliveryBadge />
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/track-order" className="hover:underline">
              Track Order
            </Link>
            <Link href="/find-clinic" className="hover:underline">
              Find a Clinic
            </Link>
            <Link href="/contact" className="hover:underline">
              Help
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-6 py-3 border-b border-omp-gray-light/50">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo-white.jpeg"
              alt="Our Mall Pharmacy"
              width={200}
              height={64}
              className="h-14 sm:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <GlobalSearch />
          </div>

          {/* Utility Icons */}
          <nav className="hidden md:flex items-center gap-5">
            <Link
              href="/prescription"
              className="flex flex-col items-center text-omp-blue hover:text-omp-blue-light transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
              <span className="text-[10px] mt-0.5 font-medium">Prescription</span>
            </Link>

            <Link
              href="/account"
              className="flex flex-col items-center text-omp-blue hover:text-omp-blue-light transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span className="text-[10px] mt-0.5 font-medium">Account</span>
            </Link>

            <Link
              href="/cart"
              className="relative flex flex-col items-center text-omp-blue hover:text-omp-blue-light transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="text-[10px] mt-0.5 font-medium">Cart</span>
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-omp-blue"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Category navigation bar — desktop */}
      <nav className="hidden md:block bg-omp-white border-b border-omp-gray-light/50">
        <div className="px-6 flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {/* Categories button */}
          <Link
            href="/categories"
            className="flex items-center gap-1.5 bg-omp-blue text-white text-xs font-semibold px-4 py-2.5 rounded-t-none hover:bg-omp-blue-light transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            All Categories
          </Link>

          {/* Category links */}
          {NAV_CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="text-xs font-medium text-omp-gray hover:text-omp-blue px-3 py-2.5 whitespace-nowrap transition-colors hover:bg-omp-slate rounded-sm shrink-0"
            >
              {cat.name}
            </Link>
          ))}

          {/* Health articles */}
          <Link
            href="/health"
            className="text-xs font-medium text-omp-green hover:text-omp-green-light px-3 py-2.5 whitespace-nowrap transition-colors hover:bg-omp-green/5 rounded-sm shrink-0 ml-auto"
          >
            Health Articles
          </Link>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="md:hidden border-t border-omp-gray-light bg-omp-white px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
          {/* Main links */}
          <div className="space-y-1 pb-3 border-b border-omp-gray-light">
            <Link href="/shop" className="block text-sm font-semibold text-omp-blue py-2" onClick={() => setMenuOpen(false)}>
              Shop All Products
            </Link>
            <Link href="/prescription" className="block text-sm font-medium text-omp-dark py-2" onClick={() => setMenuOpen(false)}>
              Upload Prescription
            </Link>
            <Link href="/account" className="block text-sm font-medium text-omp-dark py-2" onClick={() => setMenuOpen(false)}>
              My Account
            </Link>
            <Link href="/cart" className="block text-sm font-medium text-omp-dark py-2" onClick={() => setMenuOpen(false)}>
              Cart
            </Link>
            <Link href="/track-order" className="block text-sm font-medium text-omp-dark py-2" onClick={() => setMenuOpen(false)}>
              Track Order
            </Link>
          </div>

          {/* Category links */}
          <p className="text-[10px] font-semibold text-omp-gray uppercase tracking-wider pt-2 pb-1">Categories</p>
          {NAV_CATEGORIES.slice(1).map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="block text-sm text-omp-gray hover:text-omp-blue py-1.5"
              onClick={() => setMenuOpen(false)}
            >
              {cat.name}
            </Link>
          ))}

          {/* Utility links */}
          <div className="pt-3 border-t border-omp-gray-light space-y-1">
            <Link href="/health" className="block text-sm text-omp-green font-medium py-2" onClick={() => setMenuOpen(false)}>
              Health Articles
            </Link>
            <Link href="/find-clinic" className="block text-sm text-omp-gray py-2" onClick={() => setMenuOpen(false)}>
              Find a Clinic
            </Link>
            <Link href="/contact" className="block text-sm text-omp-gray py-2" onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
