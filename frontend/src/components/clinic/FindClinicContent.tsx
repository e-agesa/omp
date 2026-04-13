"use client";

import { useState } from "react";
import Link from "next/link";

interface Clinic {
  id: number;
  name: string;
  type: "pharmacy" | "clinic" | "hospital";
  address: string;
  area: string;
  phone: string;
  hours: string;
  distance: string;
  services: string[];
  isOpen: boolean;
}

const CLINICS: Clinic[] = [
  {
    id: 1,
    name: "Our Mall Pharmacy — Westlands",
    type: "pharmacy",
    address: "Sarit Centre, Karuna Rd, Westlands",
    area: "Westlands",
    phone: "+254 700 100 001",
    hours: "Mon–Sat: 8AM–9PM, Sun: 9AM–6PM",
    distance: "1.2 km",
    services: ["Prescription Dispensing", "Health Screening", "Vaccinations"],
    isOpen: true,
  },
  {
    id: 2,
    name: "Our Mall Pharmacy — CBD",
    type: "pharmacy",
    address: "Kimathi Street, Nairobi CBD",
    area: "CBD",
    phone: "+254 700 100 002",
    hours: "Mon–Sat: 7:30AM–8PM",
    distance: "3.4 km",
    services: ["Prescription Dispensing", "Blood Pressure Check", "Diabetes Screening"],
    isOpen: true,
  },
  {
    id: 3,
    name: "Our Mall Pharmacy — Karen",
    type: "pharmacy",
    address: "Karen Hub Mall, Dagoretti Rd",
    area: "Karen",
    phone: "+254 700 100 003",
    hours: "Mon–Sat: 8AM–8PM, Sun: 10AM–5PM",
    distance: "8.7 km",
    services: ["Prescription Dispensing", "Cosmetic Consultation", "Baby Clinic"],
    isOpen: true,
  },
  {
    id: 4,
    name: "Nairobi Women's Hospital — Hurlingham",
    type: "hospital",
    address: "Argwings Kodhek Rd, Hurlingham",
    area: "Kilimani",
    phone: "+254 20 271 2700",
    hours: "24 Hours",
    distance: "4.1 km",
    services: ["Emergency", "Maternity", "Pharmacy", "Lab Tests"],
    isOpen: true,
  },
  {
    id: 5,
    name: "Aga Khan Health Centre — Parklands",
    type: "clinic",
    address: "3rd Parklands Ave",
    area: "Parklands",
    phone: "+254 20 366 2000",
    hours: "Mon–Fri: 7AM–7PM, Sat: 8AM–4PM",
    distance: "2.5 km",
    services: ["General Consultation", "Lab Tests", "Pharmacy", "Radiology"],
    isOpen: false,
  },
  {
    id: 6,
    name: "Our Mall Pharmacy — Kilimani",
    type: "pharmacy",
    address: "Yaya Centre, Argwings Kodhek Rd",
    area: "Kilimani",
    phone: "+254 700 100 004",
    hours: "Mon–Sat: 8AM–9PM, Sun: 9AM–6PM",
    distance: "5.0 km",
    services: ["Prescription Dispensing", "Wellness Consultation", "Skincare Advice"],
    isOpen: true,
  },
];

const AREAS = ["All Areas", "Westlands", "CBD", "Karen", "Kilimani", "Parklands"];
const TYPES = ["All Types", "Pharmacy", "Clinic", "Hospital"];

export function FindClinicContent() {
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("All Areas");
  const [type, setType] = useState("All Types");

  const filtered = CLINICS.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase());
    const matchArea = area === "All Areas" || c.area === area;
    const matchType = type === "All Types" || c.type === type.toLowerCase();
    return matchSearch && matchArea && matchType;
  });

  const typeColor = (t: string) => {
    switch (t) {
      case "pharmacy": return "bg-omp-green/10 text-omp-green";
      case "clinic": return "bg-omp-blue/10 text-omp-blue";
      case "hospital": return "bg-omp-red/10 text-omp-red";
      default: return "bg-omp-gray-light text-omp-gray";
    }
  };

  return (
    <div className="w-full px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-omp-dark mb-2">Find a Pharmacy or Clinic</h1>
        <p className="text-sm text-omp-gray mb-6">
          Locate Our Mall Pharmacy branches and partner health facilities across Nairobi.
        </p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or location..."
            className="flex-1 rounded-medical border border-omp-gray-light px-4 py-3 text-sm placeholder:text-omp-gray focus:outline-none focus:ring-2 focus:ring-omp-blue"
          />
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="rounded-medical border border-omp-gray-light px-4 py-3 text-sm bg-omp-white focus:outline-none focus:ring-2 focus:ring-omp-blue"
          >
            {AREAS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-medical border border-omp-gray-light px-4 py-3 text-sm bg-omp-white focus:outline-none focus:ring-2 focus:ring-omp-blue"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Map placeholder */}
        <div className="bg-omp-white rounded-medical shadow-card overflow-hidden mb-6">
          <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-omp-slate to-omp-gray-light flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 text-omp-gray mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <p className="text-sm text-omp-gray font-medium">Interactive Map</p>
              <p className="text-xs text-omp-gray/70">Google Maps integration coming soon</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-omp-gray mb-4">
          {filtered.length} {filtered.length === 1 ? "location" : "locations"} found
        </p>

        <div className="space-y-4">
          {filtered.map((clinic, i) => (
            <div
              key={clinic.id}
              className="bg-omp-white rounded-medical shadow-card p-5 hover:shadow-card-hover transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-omp-dark">{clinic.name}</h3>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-pill ${typeColor(clinic.type)}`}>
                      {clinic.type}
                    </span>
                    {clinic.isOpen ? (
                      <span className="text-[10px] font-semibold text-omp-green bg-omp-green/10 px-2 py-0.5 rounded-pill">Open</span>
                    ) : (
                      <span className="text-[10px] font-semibold text-omp-red bg-omp-red/10 px-2 py-0.5 rounded-pill">Closed</span>
                    )}
                  </div>
                  <p className="text-sm text-omp-gray">{clinic.address}</p>
                  <p className="text-xs text-omp-gray mt-1">{clinic.hours}</p>

                  {/* Services */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {clinic.services.map((s) => (
                      <span key={s} className="text-[10px] bg-omp-slate text-omp-gray px-2 py-1 rounded-pill">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side — distance + actions */}
                <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 shrink-0">
                  <span className="text-sm font-bold text-omp-blue">{clinic.distance}</span>
                  <a
                    href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                    className="text-xs bg-omp-blue text-white px-4 py-2 rounded-medical hover:bg-omp-blue-light transition-colors font-medium"
                  >
                    Call
                  </a>
                  <button className="text-xs border border-omp-blue text-omp-blue px-4 py-2 rounded-medical hover:bg-omp-blue/5 transition-colors font-medium">
                    Directions
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-omp-gray-light mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <p className="text-sm text-omp-gray">No locations match your search.</p>
              <button
                onClick={() => { setSearch(""); setArea("All Areas"); setType("All Types"); }}
                className="mt-2 text-sm text-omp-blue hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-r from-omp-blue to-omp-blue-light rounded-medical p-6 text-white text-center">
          <h3 className="font-bold text-lg mb-1">Can&apos;t visit in person?</h3>
          <p className="text-sm text-white/80 mb-4">
            Order online and get medicines delivered to your door within 30 minutes.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-omp-blue font-semibold px-6 py-3 rounded-medical hover:shadow-lg transition-all"
          >
            Shop Online
          </Link>
        </div>
      </div>
    </div>
  );
}
