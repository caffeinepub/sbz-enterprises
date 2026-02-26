import { useState, useRef } from "react";
import { useActor } from "./hooks/useActor";

// ─── Types ───────────────────────────────────────────────────────────────────

interface InquiryForm {
  companyName: string;
  contactPerson: string;
  country: string;
  email: string;
  phoneNumber: string;
  quantityMT: string;
  destinationPort: string;
  paymentTerms: string;
  message: string;
}

const INITIAL_FORM: InquiryForm = {
  companyName: "",
  contactPerson: "",
  country: "",
  email: "",
  phoneNumber: "",
  quantityMT: "",
  destinationPort: "",
  paymentTerms: "LC at Sight",
  message: "",
};

// ─── Spec Data ────────────────────────────────────────────────────────────────

const PRODUCT_SPECS = [
  { label: "Product", value: "Raw Cashew Nuts (RCN)" },
  { label: "Origin", value: "Ivory Coast (Côte d'Ivoire)" },
  { label: "Crop Year", value: "2026" },
  { label: "Quality", value: "Commercial Grade" },
  { label: "Approx. KOR", value: "KOR 48 lbs" },
  { label: "Packing", value: "Standard export bags" },
  { label: "Shipment", value: "Containerized bulk" },
];

const HERO_HIGHLIGHTS = [
  { label: "Crop Year", value: "2026" },
  { label: "Origin", value: "Ivory Coast (Côte d'Ivoire)" },
  { label: "Quality", value: "Commercial Grade (KOR 48 lbs)" },
  { label: "Payment", value: "Irrevocable LC at Sight" },
  { label: "Inspection", value: "Third-Party Available (SGS)" },
  { label: "Shipment", value: "Bulk Containers Only" },
];

const WHAT_WE_DO = [
  {
    num: "01",
    title: "Buyer-Supplier Introductions",
    desc: "Facilitate introductions between serious bulk buyers and verified origin suppliers across producing regions in Africa.",
  },
  {
    num: "02",
    title: "LC-Based Transaction Support",
    desc: "Support secure, irrevocable Letter of Credit transactions aligned with international trade banking standards.",
  },
  {
    num: "03",
    title: "Documentation & Shipment Coordination",
    desc: "Coordinate trade documentation, shipping communication, and logistics alignment between contracting parties.",
  },
  {
    num: "04",
    title: "Inspection Arrangement",
    desc: "Assist with third-party inspection arrangements (e.g., SGS) upon mutual agreement of buyer and seller.",
  },
];

const TRUST_POINTS = [
  {
    icon: "◈",
    title: "Origin-Based Sourcing",
    desc: "Direct relationships with Ivory Coast origin suppliers for verified crop-year availability.",
  },
  {
    icon: "◈",
    title: "Real Shipment Documentation",
    desc: "Full export documentation including bills of lading, phytosanitary certificates, and origin certificates.",
  },
  {
    icon: "◈",
    title: "Third-Party Inspection",
    desc: "Inspection by internationally recognized firms (e.g., SGS) available upon mutual agreement.",
  },
  {
    icon: "◈",
    title: "Transparent Communication",
    desc: "Clear, professional correspondence throughout the inquiry, negotiation, and shipment process.",
  },
  {
    icon: "◈",
    title: "Professional B2B Process Only",
    desc: "We engage exclusively with registered companies and verified international buyers. No retail.",
  },
];

const GALLERY_PRIMARY = [
  "/assets/uploads/WhatsApp-Image-2026-02-26-at-4.53.54-PM-5.jpeg",
  "/assets/uploads/WhatsApp-Image-2026-02-26-at-4.53.54-PM-1--1.jpeg",
  "/assets/uploads/WhatsApp-Image-2026-02-26-at-4.53.56-PM-8.jpeg",
  "/assets/uploads/WhatsApp-Image-2026-02-26-at-4.53.57-PM-1--6.jpeg",
];

const GALLERY_SECONDARY = [
  "/assets/uploads/WhatsApp-Image-2026-02-26-at-4.53.55-PM-7.jpeg",
  "/assets/uploads/WhatsApp-Image-2026-02-26-at-4.53.55-PM-1--3.jpeg",
  "/assets/uploads/WhatsApp-Image-2026-02-26-at-4.53.56-PM-1--2.jpeg",
  "/assets/uploads/WhatsApp-Image-2026-02-26-at-4.53.57-PM-4.jpeg",
];

// ─── Mascot ───────────────────────────────────────────────────────────────────

const MASCOT_SRC = "/assets/generated/mascot-transparent.png";

// ─── Sub-components ───────────────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
      className="inline-block shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-body uppercase tracking-[0.15em] text-muted-foreground mb-3 font-medium">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-2xl md:text-3xl text-foreground font-normal leading-snug">
      {children}
    </h2>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Navigation({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Product", id: "product" },
    { label: "Quality", id: "quality" },
    { label: "Inquiry", id: "inquiry" },
    { label: "Contact", id: "contact" },
  ];

  function handleNav(id: string) {
    onScrollTo(id);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <img
              src="/assets/uploads/WhatsApp-Image-2026-02-25-at-2.49.12-PM-1.jpeg"
              alt="SBZ Enterprises"
              className="h-10 w-auto object-contain"
            />
            <span className="hidden sm:inline-block text-xs font-body text-muted-foreground border-l border-border pl-2 ml-0.5">
              International Trade Facilitation
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              {menuOpen ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors text-left px-2 py-2 rounded hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection({ onInquiry }: { onInquiry: () => void }) {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center"
      style={{
        backgroundImage: "url('/assets/uploads/WhatsApp-Image-2026-02-26-at-4.53.54-PM-5.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(10, 20, 12, 0.72)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Pre-heading */}
        <p className="font-body text-xs uppercase tracking-[0.2em] text-green-200 mb-5 font-medium opacity-90">
          Crop Year 2026 — Origin Availability
        </p>

        {/* Main Headline */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight mb-4 max-w-3xl">
          Raw Cashew Nuts (RCN)
          <br />
          <span className="text-green-200">Ivory Coast Origin</span>
        </h1>

        {/* Subheadline */}
        <p className="font-body text-lg md:text-xl text-white/80 mb-10 max-w-xl">
          Secure LC-Backed Supply for Bulk Buyers
        </p>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-10 max-w-3xl">
          {HERO_HIGHLIGHTS.map((h) => (
            <div
              key={h.label}
              className="border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3"
              style={{ borderRadius: "2px" }}
            >
              <p className="font-body text-[10px] uppercase tracking-[0.12em] text-white/60 mb-0.5">
                {h.label}
              </p>
              <p className="font-body text-sm text-white font-medium leading-snug">
                {h.value}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onInquiry}
          className="inline-flex items-center gap-2 font-body text-sm font-medium px-7 py-3.5 bg-primary text-primary-foreground hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          style={{ borderRadius: "2px" }}
        >
          Request Availability / Book Shipment
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Bulk-only note */}
        <p className="font-body text-xs text-white/50 mt-4">
          Bulk shipments only · Minimum commercial quantities · No retail supply
        </p>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background section-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: About text */}
          <div>
            <SectionLabel>About the Company</SectionLabel>
            <SectionTitle>About SBZ Enterprises</SectionTitle>
            <p className="font-body text-base text-muted-foreground mt-5 leading-relaxed">
              SBZ Enterprises is an India-based commodity facilitation firm
              connecting verified international buyers with origin suppliers
              across Africa and other producing regions.
            </p>
            <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed italic border-l-2 border-border pl-4">
              We operate strictly in bulk trade and do not supply retail
              quantities.
            </p>
          </div>

          {/* Right: Specializations + Mascot */}
          <div>
            <SectionLabel>Specializations</SectionLabel>
            <ul className="space-y-0 border border-border" style={{ borderRadius: "2px" }}>
              {[
                "Raw Cashew Nuts (RCN)",
                "Agro commodities",
                "LC-backed international trade",
                "Secure transaction coordination",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 px-5 py-4 font-body text-sm text-foreground border-b border-border last:border-b-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            {/* Mascot accent — subtle brand character */}
            <div className="mt-6 flex items-center gap-4 p-4 border border-border bg-secondary" style={{ borderRadius: "2px" }}>
              <img
                src={MASCOT_SRC}
                alt="SBZ Cashew Mascot"
                className="w-16 h-16 object-contain shrink-0 drop-shadow"
                loading="lazy"
              />
              <p className="font-body text-xs text-muted-foreground leading-relaxed italic">
                "Your trusted partner for premium Ivory Coast Raw Cashew Nuts — crop year 2026."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── What We Do Section ───────────────────────────────────────────────────────

function WhatWeDoSection() {
  return (
    <section className="py-20 bg-secondary section-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end gap-4">
          <div className="flex-1">
            <SectionLabel>Our Role</SectionLabel>
            <SectionTitle>What We Do</SectionTitle>
          </div>
          <img
            src={MASCOT_SRC}
            alt="SBZ Cashew Mascot"
            className="hidden sm:block w-14 h-14 object-contain shrink-0 opacity-85 drop-shadow"
            loading="lazy"
            aria-hidden="true"
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {WHAT_WE_DO.map((item) => (
            <div
              key={item.num}
              className="bg-card px-6 py-8"
            >
              <p className="font-body text-xs font-medium tracking-[0.1em] text-muted-foreground mb-4">
                {item.num}
              </p>
              <h3 className="font-heading text-base text-foreground font-normal mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Product Section ──────────────────────────────────────────────────────────

function ProductSection() {
  return (
    <section id="product" className="py-20 bg-background section-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionLabel>Current Availability</SectionLabel>
          <SectionTitle>Raw Cashew Nuts (RCN)</SectionTitle>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Spec Table */}
          <div>
            <div className="border border-border" style={{ borderRadius: "2px" }}>
              {PRODUCT_SPECS.map((spec, idx) => (
                <div
                  key={spec.label}
                  className={`grid grid-cols-2 border-b border-border last:border-b-0 ${
                    idx % 2 === 0 ? "bg-muted/30" : "bg-card"
                  }`}
                >
                  <div className="px-5 py-3.5 border-r border-border">
                    <p className="font-body text-xs uppercase tracking-[0.1em] text-muted-foreground font-medium">
                      {spec.label}
                    </p>
                  </div>
                  <div className="px-5 py-3.5">
                    <p className="font-body text-sm text-foreground">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-muted-foreground mt-3 italic">
              * Detailed specifications available upon formal inquiry.
            </p>
          </div>

          {/* Primary Photo Grid */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.12em] text-muted-foreground mb-3">
              Product Images
            </p>
            <div className="grid grid-cols-2 gap-1">
              {GALLERY_PRIMARY.map((src, idx) => (
                <div
                  key={src}
                  className="aspect-square overflow-hidden bg-muted"
                  style={{ borderRadius: "1px" }}
                >
                  <img
                    src={src}
                    alt={`Raw Cashew Nuts from Ivory Coast — lot ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Gallery Row */}
        <div className="mt-12">
          <p className="font-body text-xs uppercase tracking-[0.12em] text-muted-foreground mb-3">
            Additional Images
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
            {GALLERY_SECONDARY.map((src, idx) => (
              <div
                key={src}
                className="aspect-[4/3] overflow-hidden bg-muted"
                style={{ borderRadius: "1px" }}
              >
                <img
                  src={src}
                  alt={`Raw Cashew Nuts — additional view ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mascot brand accent */}
        <div className="mt-10 flex items-center gap-4">
          <img
            src={MASCOT_SRC}
            alt="SBZ Cashew Mascot"
            className="hidden sm:block w-12 h-12 object-contain shrink-0 drop-shadow opacity-80"
            loading="lazy"
            aria-hidden="true"
          />
          <p className="font-body text-xs text-muted-foreground italic border-l-2 border-border pl-4 max-w-2xl">
            All images show actual Ivory Coast RCN stock. Specifications available upon formal inquiry.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Quality Report Section ───────────────────────────────────────────────────

function QualitySection() {
  return (
    <section id="quality" className="py-20 bg-secondary section-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end gap-4">
          <div className="flex-1">
            <SectionLabel>Cutting Test Results</SectionLabel>
            <SectionTitle>Quality Report</SectionTitle>
          </div>
          <img
            src={MASCOT_SRC}
            alt="SBZ Cashew Mascot"
            className="hidden sm:block w-14 h-14 object-contain shrink-0 opacity-85 drop-shadow"
            loading="lazy"
            aria-hidden="true"
          />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-3xl border border-border overflow-hidden bg-card" style={{ borderRadius: "2px" }}>
            <img
              src="/assets/uploads/ChatGPT-Image-Feb-26-2026-06_51_51-PM-2.png"
              alt="Cutting test results for Raw Cashew Nuts, Crop Year 2026, Ivory Coast Origin"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works Section ─────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Submit Inquiry",
    desc: "Buyer submits a formal booking inquiry with company details, required quantity, and destination port.",
  },
  {
    step: "02",
    title: "Review & Response",
    desc: "We review the inquiry and respond with availability confirmation, pricing indications, and draft terms.",
  },
  {
    step: "03",
    title: "Contract & LC",
    desc: "Buyer and seller agree on commercial terms. Buyer's bank issues an irrevocable LC at Sight.",
  },
  {
    step: "04",
    title: "Inspection & Shipment",
    desc: "Third-party inspection (e.g. SGS) is conducted at origin. Shipment proceeds after LC confirmation.",
  },
  {
    step: "05",
    title: "Documentation",
    desc: "Full export documentation (BL, phytosanitary certificate, certificate of origin, SGS report) is provided.",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-20 bg-background section-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionLabel>Process</SectionLabel>
          <SectionTitle>How It Works</SectionTitle>
        </div>

        <div className="relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-border"
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="relative flex flex-col">
                {/* Step number circle */}
                <div className="flex items-center gap-3 mb-4 lg:flex-col lg:items-start lg:gap-0">
                  <div
                    className="relative z-10 w-14 h-14 shrink-0 flex items-center justify-center border border-border bg-card lg:mb-4"
                    style={{ borderRadius: "2px" }}
                  >
                    <span className="font-body text-sm font-medium text-muted-foreground">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-heading text-sm font-normal text-foreground leading-snug lg:hidden">
                    {item.title}
                  </h3>
                </div>
                <h3 className="hidden lg:block font-heading text-sm font-normal text-foreground mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <img
            src={MASCOT_SRC}
            alt="SBZ Cashew Mascot"
            className="hidden sm:block w-12 h-12 object-contain shrink-0 drop-shadow opacity-80"
            loading="lazy"
            aria-hidden="true"
          />
          <p className="font-body text-xs text-muted-foreground italic border-l-2 border-border pl-4 max-w-2xl">
            All steps are subject to mutual agreement between buyer and seller. SBZ Enterprises facilitates communication and coordination throughout.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Authenticity & Compliance Section ───────────────────────────────────────

function AuthenticitySection() {
  return (
    <section className="py-20 bg-background section-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionLabel>Trade Standards</SectionLabel>
          <SectionTitle>Authenticity & Compliance</SectionTitle>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_POINTS.map((point) => (
            <div
              key={point.title}
              className="flex gap-4 p-6 border border-border bg-card"
              style={{ borderRadius: "2px" }}
            >
              <span className="text-primary text-lg shrink-0 mt-0.5 leading-none">
                {point.icon}
              </span>
              <div>
                <h3 className="font-heading text-sm font-normal text-foreground mb-2">
                  {point.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mascot brand note */}
        <div className="mt-10 flex items-center gap-4">
          <img
            src={MASCOT_SRC}
            alt="SBZ Cashew Mascot"
            className="hidden sm:block w-12 h-12 object-contain shrink-0 drop-shadow opacity-80"
            loading="lazy"
            aria-hidden="true"
          />
          <p className="font-body text-xs text-muted-foreground italic border-l-2 border-border pl-4 max-w-2xl">
            We engage exclusively with registered businesses. Retail inquiries are not entertained.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Inquiry Form Section ─────────────────────────────────────────────────────

function InquirySection() {
  const { actor } = useActor();
  const [form, setForm] = useState<InquiryForm>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) {
      setErrorMsg("Service is loading. Please try again in a moment.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");

    try {
      const qty = BigInt(Math.round(parseFloat(form.quantityMT) || 0));
      const paymentTerms = form.paymentTerms.trim() || null;

      await actor.submitInquiry(
        form.companyName.trim(),
        form.contactPerson.trim(),
        form.country.trim(),
        form.email.trim(),
        form.phoneNumber.trim(),
        qty,
        form.destinationPort.trim(),
        paymentTerms,
        form.message.trim()
      );

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "Submission failed. Please check your connection and try again."
      );
      setStatus("error");
    }
  }

  const inputBase =
    "w-full font-body text-sm text-foreground bg-card border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground transition-shadow";
  const labelBase = "font-body text-xs uppercase tracking-[0.1em] text-muted-foreground font-medium mb-1.5 block";

  return (
    <section id="inquiry" className="py-20 bg-secondary section-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end gap-6">
          <div className="flex-1">
            <SectionLabel>Bulk Buyers Only</SectionLabel>
            <SectionTitle>Submit Booking Inquiry</SectionTitle>
            <p className="font-body text-sm text-muted-foreground mt-3">
              For serious bulk buyers only. Please provide accurate company
              details for timely review.
            </p>
          </div>
          {/* Mascot — desktop only, elegant accent */}
          <div className="hidden md:flex flex-col items-center gap-2 shrink-0">
            <div className="relative">
              <div
                className="bg-card border border-border px-3 py-2 text-xs font-body text-muted-foreground text-center max-w-[140px] leading-snug"
                style={{ borderRadius: "6px" }}
              >
                Quality you can trust, backed by real documentation.
                <span
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "8px solid var(--border)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
            <img
              src={MASCOT_SRC}
              alt="SBZ Cashew Mascot"
              className="w-28 h-28 object-contain drop-shadow-md"
              loading="lazy"
            />
          </div>
        </div>

        {status === "success" ? (
          <div
            className="max-w-2xl border-2 bg-card px-8 py-10 text-center"
            style={{
              borderColor: "oklch(var(--success))",
              borderRadius: "2px",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "oklch(var(--success) / 0.12)" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="oklch(var(--success))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-heading text-xl text-foreground font-normal mb-2">
              Inquiry Submitted
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Your inquiry has been submitted. We will review and respond to
              verified buyers promptly.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 font-body text-xs uppercase tracking-[0.12em] text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl bg-card border border-border p-6 sm:p-8"
            style={{ borderRadius: "2px" }}
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Company Name */}
              <div className="sm:col-span-1">
                <label htmlFor="companyName" className={labelBase}>
                  Company Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                  className={inputBase}
                  style={{ borderRadius: "2px" }}
                  placeholder="Your registered company name"
                />
              </div>

              {/* Contact Person */}
              <div className="sm:col-span-1">
                <label htmlFor="contactPerson" className={labelBase}>
                  Contact Person <span className="text-destructive">*</span>
                </label>
                <input
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  value={form.contactPerson}
                  onChange={handleChange}
                  required
                  className={inputBase}
                  style={{ borderRadius: "2px" }}
                  placeholder="Full name"
                />
              </div>

              {/* Country */}
              <div className="sm:col-span-1">
                <label htmlFor="country" className={labelBase}>
                  Country <span className="text-destructive">*</span>
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={form.country}
                  onChange={handleChange}
                  required
                  className={inputBase}
                  style={{ borderRadius: "2px" }}
                  placeholder="Country of incorporation"
                />
              </div>

              {/* Email */}
              <div className="sm:col-span-1">
                <label htmlFor="email" className={labelBase}>
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputBase}
                  style={{ borderRadius: "2px" }}
                  placeholder="business@company.com"
                />
              </div>

              {/* Phone */}
              <div className="sm:col-span-1">
                <label htmlFor="phoneNumber" className={labelBase}>
                  Phone / WhatsApp <span className="text-destructive">*</span>
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                  className={inputBase}
                  style={{ borderRadius: "2px" }}
                  placeholder="+1 234 567 8900"
                />
              </div>

              {/* Quantity */}
              <div className="sm:col-span-1">
                <label htmlFor="quantityMT" className={labelBase}>
                  Required Quantity (MT) <span className="text-destructive">*</span>
                </label>
                <input
                  id="quantityMT"
                  name="quantityMT"
                  type="number"
                  min="1"
                  value={form.quantityMT}
                  onChange={handleChange}
                  required
                  className={inputBase}
                  style={{ borderRadius: "2px" }}
                  placeholder="e.g. 500"
                />
              </div>

              {/* Destination Port */}
              <div className="sm:col-span-1">
                <label htmlFor="destinationPort" className={labelBase}>
                  Destination Port <span className="text-destructive">*</span>
                </label>
                <input
                  id="destinationPort"
                  name="destinationPort"
                  type="text"
                  value={form.destinationPort}
                  onChange={handleChange}
                  required
                  className={inputBase}
                  style={{ borderRadius: "2px" }}
                  placeholder="e.g. Port of Hamburg"
                />
              </div>

              {/* Payment Terms */}
              <div className="sm:col-span-1">
                <label htmlFor="paymentTerms" className={labelBase}>
                  Preferred Payment Terms
                </label>
                <input
                  id="paymentTerms"
                  name="paymentTerms"
                  type="text"
                  value={form.paymentTerms}
                  onChange={handleChange}
                  className={inputBase}
                  style={{ borderRadius: "2px" }}
                  placeholder="LC at Sight"
                />
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelBase}>
                  Message / Specific Requirements
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputBase} resize-none`}
                  style={{ borderRadius: "2px" }}
                  placeholder="Please include any specific requirements, target price, or scheduling preferences..."
                />
              </div>
            </div>

            {/* Error Message */}
            {status === "error" && (
              <div
                className="mt-4 px-4 py-3 bg-destructive/10 border border-destructive/30 font-body text-sm text-destructive"
                style={{ borderRadius: "2px" }}
              >
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <div className="mt-6 flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 font-body text-sm font-medium px-7 py-3.5 bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                style={{ borderRadius: "2px" }}
              >
                {status === "submitting" ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" />
                      <path d="M21 12a9 9 0 00-9-9" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Booking Inquiry"
                )}
              </button>
              <p className="font-body text-xs text-muted-foreground">
                * Required fields
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-background section-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionLabel>Get in Touch</SectionLabel>
          <SectionTitle>Contact Us</SectionTitle>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl">
          {/* Address */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.1em] text-muted-foreground font-medium mb-3">
              Address
            </p>
            <address className="not-italic font-body text-sm text-foreground leading-relaxed">
              SBZ Enterprises
              <br />
              Pirayiri, Palakkad
              <br />
              Kerala – 678004
              <br />
              India
            </address>
          </div>

          {/* Phone / WhatsApp */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.1em] text-muted-foreground font-medium mb-3">
              Phone / WhatsApp
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/919400051880"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                <span className="text-green-600">
                  <WhatsAppIcon />
                </span>
                +91 94000 51880
              </a>
              <a
                href="https://wa.me/919188520881"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                <span className="text-green-600">
                  <WhatsAppIcon />
                </span>
                +91 91885 20881
              </a>
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.1em] text-muted-foreground font-medium mb-3">
              Email
            </p>
            <a
              href="mailto:sbzintl@gmail.com"
              className="font-body text-sm text-foreground hover:text-primary transition-colors underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              sbzintl@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Disclaimer Section ───────────────────────────────────────────────────────

function DisclaimerSection() {
  return (
    <section className="py-12 bg-accent/40 section-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="border border-border bg-card px-6 sm:px-8 py-7 max-w-4xl"
          style={{ borderRadius: "2px" }}
        >
          <p className="font-body text-xs uppercase tracking-[0.12em] text-muted-foreground font-medium mb-3">
            Important Disclaimer
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            SBZ Enterprises acts as a facilitator and does not take ownership
            of goods. Final commercial terms, quality, quantity, performance,
            and delivery obligations remain the responsibility of the
            contracting buyer and seller. All transactions are subject to
            mutually agreed contracts and international trade practices.
            Information on this website does not constitute a binding offer.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-12 section-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mascot brand ambassador strip */}
        <div className="flex items-center gap-5 mb-10 pb-8 border-b border-white/10">
          <img
            src={MASCOT_SRC}
            alt="SBZ Enterprises Cashew Mascot"
            className="w-20 h-20 object-contain shrink-0 drop-shadow-lg"
            loading="lazy"
          />
          <div>
            <p className="font-heading text-sm text-white/90 mb-1">
              SBZ Enterprises — Your Trusted RCN Trade Partner
            </p>
            <p className="font-body text-xs text-white/50 leading-relaxed max-w-lg">
              Connecting verified bulk buyers with Ivory Coast origin suppliers. Crop Year 2026 availability. LC-backed. SGS-inspectable.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Company */}
          <div>
            <p className="font-heading text-base text-white mb-3">
              SBZ Enterprises
            </p>
            <address className="not-italic font-body text-sm text-white/60 leading-relaxed">
              Pirayiri, Palakkad
              <br />
              Kerala – 678004, India
            </address>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.1em] text-white/40 font-medium mb-3">
              Contact
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/919400051880"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-white/70 hover:text-white transition-colors"
              >
                <span className="text-green-400">
                  <WhatsAppIcon />
                </span>
                +91 94000 51880
              </a>
              <a
                href="https://wa.me/919188520881"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-white/70 hover:text-white transition-colors"
              >
                <span className="text-green-400">
                  <WhatsAppIcon />
                </span>
                +91 91885 20881
              </a>
              <a
                href="mailto:sbzintl@gmail.com"
                className="font-body text-sm text-white/70 hover:text-white transition-colors"
              >
                sbzintl@gmail.com
              </a>
            </div>
          </div>

          {/* Disclaimer brief */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.1em] text-white/40 font-medium mb-3">
              Notice
            </p>
            <p className="font-body text-xs text-white/50 leading-relaxed">
              SBZ Enterprises acts as a facilitator and does not take ownership
              of goods. All transactions are subject to mutually agreed
              contracts and international trade practices.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-body text-xs text-white/40">
            © 2026 SBZ Enterprises. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/30">
            Built with{" "}
            <span aria-label="love" role="img">♥</span>{" "}
            using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white/60 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const inquiryRef = useRef<HTMLElement | null>(null);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function scrollToInquiry() {
    scrollTo("inquiry");
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onScrollTo={scrollTo} />
      <main ref={inquiryRef}>
        <HeroSection onInquiry={scrollToInquiry} />
        <AboutSection />
        <WhatWeDoSection />
        <ProductSection />
        <QualitySection />
        <HowItWorksSection />
        <AuthenticitySection />
        <InquirySection />
        <ContactSection />
        <DisclaimerSection />
      </main>
      <Footer />
    </div>
  );
}
