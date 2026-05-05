"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import Link from "next/link";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    employees: "< 50",
    email: "",
    whatsapp: ""
  });

  const openModal = (plan: string) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Halo Tim GUGAN, saya tertarik dengan paket *${selectedPlan}*.

*Detail Konsultasi:*
Nama: ${formData.name}
Perusahaan: ${formData.company}
Jumlah Karyawan: ${formData.employees}
Email: ${formData.email}
WhatsApp: ${formData.whatsapp}

Mohon info lebih lanjut. Terima kasih.`;

    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    closeModal();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  interface FAQQuestion {
    q: string;
    a: string;
    keywords?: string[];
  }

  const faqData: { category: string, questions: FAQQuestion[] }[] = [
    {
      category: "KEAMANAN & DATA",
      questions: [
        { q: "Apakah data perusahaan aman di GUGAN?", a: "Data sepenuhnya milik perusahaan. GUGAN tidak menyimpan atau mengelola data Anda di server kami. Seluruh data berada di server perusahaan Anda (Private VPS) dengan kontrol penuh dan sertifikat Pentest tersedia untuk menjamin keamanan tingkat tinggi." }
      ]
    },
    {
      category: "PRICING & MODEL",
      questions: [
        { q: "Bagaimana model pembayaran GUGAN?", a: "GUGAN menggunakan model One-time payment (tanpa biaya langganan bulanan). Biaya hanya ditentukan berdasarkan kapasitas VPS dan skala karyawan. Tahun pertama VPS disediakan oleh GUGAN, tahun berikutnya dikelola secara mandiri oleh perusahaan untuk penghematan 60-80% dibanding HRIS tradisional." }
      ]
    },
    {
      category: "SISTEM & TEKNOLOGI",
      questions: [
        { q: "Teknologi apa yang digunakan GUGAN?", a: "Dibangun dengan Laravel (enterprise framework), sistem kami fully customizable dan dapat dikembangkan lebih lanjut. Mendukung import/export Excel, dashboard super admin yang intuitif, serta kompatibel dengan Chrome, Firefox, Android, dan iOS." }
      ]
    },
    {
      category: "AI & AUTOMATION",
      questions: [
        { q: "Apa peran AI dalam GUGAN?", a: "AI di GUGAN berfungsi untuk analisis data cerdas, memberikan rekomendasi strategis, membantu menyusun draft dokumen, dan mengotomatisasi alur kerja (workflow) untuk efisiensi maksimal. Penggunaannya bersifat opsional sesuai kebutuhan." }
      ]
    },
    {
      category: "PAYROLL & HR MANAGEMENT",
      questions: [
        { q: "Apakah GUGAN mendukung regulasi ketenagakerjaan di Indonesia?", a: "Ya, sistem kami sepenuhnya mendukung BPJS, PPh21, dan UU Ketenagakerjaan. Komponen gaji fleksibel, tersedia fitur koreksi payroll dengan catatan pajak, serta pengiriman slip gaji otomatis via email atau unduhan." }
      ]
    },
    {
      category: "ATTENDANCE & TRACKING",
      questions: [
        { q: "Bagaimana integrasi absensi dengan perangkat fisik?", a: "GUGAN mendukung integrasi langsung dengan perangkat Fingerprint berbasis IP. Selain itu, tersedia fitur Face Recognition, Geo-tagging, dan sistem pelacakan anti-fraud untuk sinkronisasi absensi real-time." }
      ]
    },
    {
      category: "CUTI & HR TOOLS",
      questions: [
        { q: "Bagaimana manajemen cuti dikelola?", a: "Tersedia manajemen saldo cuti otomatis, penjadwalan cuti transparan, serta pengaturan masa berlaku (expiration) cuti untuk memastikan ketertiban administrasi SDM." }
      ]
    },
    {
      category: "IMPLEMENTATION & SUPPORT",
      questions: [
        { q: "Bagaimana alur implementasi GUGAN?", a: "Alur dimulai dari konsultasi sales, demo produk, fase implementasi teknis, pelatihan (training), hingga Go-live. Kami menyediakan Lifetime Service Support dengan waktu respon cepat (±1 jam).", keywords: ["implementasi", "training", "dukungan", "support"] }
      ]
    }
  ];

  const [filteredFaq, setFilteredFaq] = useState(faqData);
  const [activeHeroFeature, setActiveHeroFeature] = useState(0);
  const heroFeatures = [
    { name: "ATTENDANCE SYSTEM", desc: "Face recognition, geofencing, and automated shift management." },
    { name: "PAYROLL ENGINE", desc: "Automated salary calculation, taxes, and instant payslip generation." },
    { name: "AI HR ASSISTANT", desc: "Intelligent analytics, draft generation, and scoring." },
    { name: "KPI & OKR", desc: "Performance tracking with real-time analytics and goal alignment." },
    { name: "ANALYTICS DASHBOARD", desc: "Workforce insights and prediction modeling." }
  ];

  const nextFeature = () => setActiveHeroFeature((prev) => (prev + 1) % heroFeatures.length);
  const prevFeature = () => setActiveHeroFeature((prev) => (prev - 1 + heroFeatures.length) % heroFeatures.length);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Halo! Saya asisten GUGAN. Ada yang bisa saya bantu terkait infrastruktur HR perusahaan Anda?' }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = userInput;
    setUserInput("");
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      let response = "";
      const lowerInput = userMessage.toLowerCase();

      // Search knowledge base
      let found = false;
      for (const cat of faqData) {
        for (const q of cat.questions) {
          if (lowerInput.includes(q.q.toLowerCase()) || 
              (q.keywords && q.keywords.some((k: string) => lowerInput.includes(k.toLowerCase())))) {
            response = q.a;
            found = true;
            break;
          }
        }
        if (found) break;
      }

      // Keyword matching if no direct question match
      if (!found) {
        if (lowerInput.includes("harga") || lowerInput.includes("biaya") || lowerInput.includes("paket")) {
          response = "GUGAN menggunakan model One-time payment (tanpa biaya langganan bulanan). Biaya ditentukan berdasarkan kapasitas VPS dan skala karyawan. Apakah Anda ingin melihat rincian paket harga kami?";
        } else if (lowerInput.includes("aman") || lowerInput.includes("data") || lowerInput.includes("server")) {
          response = "Keamanan adalah prioritas kami. Data sepenuhnya milik perusahaan Anda dan disimpan di Private VPS Anda sendiri. GUGAN tidak memiliki akses ke data tersebut.";
        } else if (lowerInput.includes("absen") || lowerInput.includes("fingerprint") || lowerInput.includes("wajah")) {
          response = "Sistem kami mendukung integrasi Fingerprint berbasis IP, Face Recognition, dan Geo-tagging secara real-time.";
        } else if (lowerInput.includes("payroll") || lowerInput.includes("gaji") || lowerInput.includes("pph21")) {
          response = "Modul Payroll GUGAN mendukung penuh perhitungan BPJS, PPh21, dan UU Ketenagakerjaan Indonesia secara otomatis.";
        } else if (lowerInput.includes("ai") || lowerInput.includes("pintar")) {
          response = "AI GUGAN membantu dalam analisis data, rekomendasi keputusan HR, dan otomatisasi workflow dokumen.";
        } else {
          response = "Maaf, saya tidak menemukan jawaban spesifik untuk itu. Namun saya bisa membantu Anda mengenai Harga, Keamanan Data, Fitur Payroll, atau Absensi. Apa yang ingin Anda ketahui lebih lanjut?";
        }
      }

      // Add sales nudge
      if (lowerInput.includes("demo") || lowerInput.includes("coba") || found) {
        response += "\n\nApakah Anda ingin kami bantu untuk sesi demo atau konsultasi kebutuhan perusahaan Anda?";
      }

      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000);
  };
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="hero" style={{ height: '400vh', position: 'relative' }}>
        <div className="canvas-container" style={{ position: 'sticky', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
          <HeroCanvas />
          <div className="vignette" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 50%, var(--bg-dark-1) 100%)' }}></div>
        </div>

        <div className="container" style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
          <div className="hero-content" style={{ maxWidth: '640px' }}>
            <div className="small" style={{ color: 'var(--gugan-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '4px', marginBottom: 'var(--space-md)' }}>Workforce Infrastructure</div>
            <h1 style={{ marginBottom: 'var(--space-lg)', fontSize: 'clamp(32px, 5vw, 56px)' }}>KELOLA SDM LEBIH <br/><span className="accent">MUDAH, CEPAT & AMAN</span></h1>
            <p style={{ fontSize: '18px', color: 'var(--text-dark-secondary)', marginBottom: 'var(--space-2xl)', maxWidth: '540px' }}>
              Platform HRIS modern dengan AI & kontrol penuh data perusahaan. Sistem terintegrasi tanpa batas dalam satu platform pintar.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', alignItems: 'center' }}>
              <button onClick={() => openModal("Hero")} className="btn btn-primary">Mulai Sekarang</button>
              <button className="btn btn-secondary">Lihat Demo</button>
            </div>
          </div>

          {/* Feature Navigation (Restored) */}
          <div className="glass" style={{ padding: 'var(--space-xl)', width: '320px', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', textAlign: 'right', pointerEvents: 'all' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="accent" style={{ fontSize: '24px', fontWeight: 800 }}>{(activeHeroFeature + 1).toString().padStart(2, '0')}</div>
              <div className="small" style={{ fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>{heroFeatures[activeHeroFeature].name}</div>
              <p className="small" style={{ color: 'var(--text-dark-secondary)', minHeight: '40px' }}>{heroFeatures[activeHeroFeature].desc}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-md)' }}>
              <button onClick={prevFeature} className="small hover-primary" style={{ background: 'none', border: 'none', color: 'var(--text-dark-secondary)', cursor: 'pointer', fontWeight: 700, letterSpacing: '1px' }}>PREV</button>
              <button onClick={nextFeature} className="small hover-primary" style={{ background: 'none', border: 'none', color: 'var(--gugan-green)', cursor: 'pointer', fontWeight: 700, letterSpacing: '1px' }}>NEXT</button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{ position: 'absolute', bottom: 'var(--space-xl)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
          <span className="small" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll to explore</span>
          <div style={{ width: '20px', height: '32px', border: '2px solid var(--text-dark-secondary)', borderRadius: '10px', position: 'relative' }}>
            <div style={{ width: '4px', height: '8px', background: 'var(--gugan-green)', borderRadius: '2px', position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)' }}></div>
          </div>
        </div>
      </section>

      <main>
        {/* High-Conversion Value Proposition Section */}
        <section id="value-proposition" className="section">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-4xl)', alignItems: 'center' }}>
            
            {/* Left Column: Sales Copy */}
            <div>
              <h2 style={{ marginBottom: 'var(--space-lg)' }}>
                Stop Paying Monthly <br/>
                <span className="accent">HRIS Fees</span>
              </h2>
              <h3 style={{ color: 'var(--text-dark-primary)', marginBottom: 'var(--space-lg)', opacity: 0.9 }}>
                Own Your HR System. Forever.
              </h3>
              <p style={{ color: 'var(--text-dark-secondary)', marginBottom: 'var(--space-xl)' }}>
                GUGAN is not just HR software. It is a full workforce infrastructure that eliminates recurring costs and gives companies full control.
              </p>
              
              <ul style={{ listStyle: 'none', marginBottom: 'var(--space-2xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {[
                  "One-time payment — no monthly subscription",
                  "No add-ons — all features unlocked",
                  "Unlimited employees — no scaling cost",
                  "Private company server — full data ownership",
                  "Reduce HR operational costs by 60–80%"
                ].map((point, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', color: 'var(--text-dark-primary)', fontSize: '16px' }}>
                    <div style={{ flexShrink: 0, width: '24px', height: '24px', background: 'var(--gugan-green-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="10" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4L4.5 7.5L11 1" stroke="var(--gugan-green)" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    {point}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                <button onClick={() => openModal("General Consultation")} className="btn btn-primary">Get Started</button>
                <button onClick={() => openModal("Demo Request")} className="btn btn-secondary">Request Demo</button>
              </div>
            </div>

            {/* Right Column: Comparison Table Card */}
            <div className="card" style={{ background: 'var(--bg-dark-3)' }}>
              <div style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '20px' }}>Traditional vs <span className="accent">GUGAN</span></h3>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-sm)' }}>
                {[
                  { label: "Cost Model", trad: "Monthly fees", gugan: "One-time payment" },
                  { label: "Data Control", trad: "Vendor cloud", gugan: "Private server" },
                  { label: "Scalability", trad: "Per employee", gugan: "Unlimited users" },
                  { label: "Ownership", trad: "Limited", gugan: "Full ownership" }
                ].map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: 'var(--space-md) 0', borderBottom: i === 3 ? 'none' : '1px solid var(--border-dark)' }}>
                    <div className="small" style={{ color: 'var(--text-dark-secondary)' }}>{row.label}</div>
                    <div className="small" style={{ color: '#ef4444' }}>✕ {row.trad}</div>
                    <div className="small" style={{ color: 'var(--gugan-green)', fontWeight: 600 }}>✓ {row.gugan}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Enterprise Modules Teaser */}
        <section id="features-teaser" className="section">
          <div className="container">
            <div className="card text-center" style={{ background: 'var(--bg-dark-2)', padding: 'var(--space-4xl)' }}>
              <h2 className="section-title">Enterprise <span className="accent">Modules</span></h2>
              <p className="section-subtitle">
                Explore our comprehensive suite of HR modules designed for high-end enterprise needs. From Attendance to AI-powered Analytics.
              </p>
              <Link href="/features" className="btn btn-primary" style={{ padding: 'var(--space-md) var(--space-3xl)' }}>
                Explore All Features
              </Link>
            </div>
          </div>
        </section>

        {/* Why GUGAN Section */}
        <section id="differentiation" className="section" style={{ background: 'var(--bg-dark-2)' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
              <h2 className="section-title">Why GUGAN is Different</h2>
              <p className="section-subtitle">
                GUGAN is built to replace expensive, limited HR systems with a fully-owned, scalable, and intelligent workforce platform.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-lg)' }}>
              {[
                { title: "Full Ownership", desc: "You own your system, your data, and your infrastructure forever." },
                { title: "No Subscription", desc: "Pay once. Use forever. No monthly fees or hidden costs." },
                { title: "No Add-ons", desc: "All features included. No hidden cost for premium modules." },
                { title: "Unlimited Scale", desc: "No employee limits. Grow your business without increasing costs." },
                { title: "AI Integration", desc: "Built-in AI intelligence to automate your HR workflows." },
                { title: "Customizable", desc: "Flexible architecture that can be tailored to your company needs." }
              ].map((item, i) => (
                <div key={i} className="card">
                  <h3 style={{ fontSize: '20px', marginBottom: 'var(--space-sm)' }}>{item.title}</h3>
                  <p className="small" style={{ color: 'var(--text-dark-secondary)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Comparison Section */}
        <section id="comparison" className="section">
          <div className="container">
            <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
              <h2 className="section-title">Stop Renting. <span className="accent">Start Owning.</span></h2>
              <p className="section-subtitle">
                Traditional HRIS keeps charging you every month. GUGAN is a one-time investment for full control and unlimited usage.
              </p>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'var(--bg-dark-3)', borderBottom: '1px solid var(--border-dark)' }}>
                <div style={{ padding: 'var(--space-lg)', fontWeight: 'bold', color: 'var(--text-dark-secondary)' }}>Feature</div>
                <div style={{ padding: 'var(--space-lg)', fontWeight: 'bold', textAlign: 'center', color: '#ef4444' }}>Traditional HRIS</div>
                <div style={{ padding: 'var(--space-lg)', fontWeight: 'bold', textAlign: 'center', color: 'var(--gugan-green)' }}>GUGAN</div>
              </div>

              {[
                { label: "Pricing Model", trad: "Monthly subscription", gugan: "One-time payment" },
                { label: "Feature Access", trad: "Limited plans", gugan: "All features included" },
                { label: "Scalability", trad: "Pay per employee", gugan: "Unlimited employees" },
                { label: "Data Ownership", trad: "Vendor cloud", gugan: "Full ownership" }
              ].map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i === 3 ? 'none' : '1px solid var(--border-dark)' }}>
                  <div style={{ padding: 'var(--space-md) var(--space-lg)', color: 'var(--text-dark-primary)', fontWeight: 500 }}>{row.label}</div>
                  <div style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'center', color: 'var(--text-dark-secondary)', fontSize: '14px' }}>✕ {row.trad}</div>
                  <div style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'center', color: 'var(--text-dark-primary)', fontWeight: 600 }}>✓ {row.gugan}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="section" style={{ borderTop: '1px solid var(--border-dark)' }}>
          <div className="container">
            <h2 className="section-title text-center" style={{ marginBottom: 'var(--space-3xl)' }}>Built for <span className="accent">Scalability & Control</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-lg)' }}>
              {[
                { title: "Backend: Laravel", desc: "Robust, secure, and globally proven enterprise-grade architecture." },
                { title: "Database: MySQL/PG", desc: "Reliable data structures optimized for high-concurrency HR tasks." },
                { title: "Modern Web Stack", desc: "React/Next.js ready frontend for ultra-smooth user experience." },
                { title: "API-First", desc: "Scalable REST APIs for seamless internal or third-party connectivity." },
                { title: "Flexible Deployment", desc: "On-premise or private cloud. You choose where your data lives." },
                { title: "Enterprise Security", desc: "Granular access control, E2EE, and full data sovereignty." }
              ].map((tech, i) => (
                <div key={i} className="card">
                  <h3 style={{ color: 'var(--gugan-green)', marginBottom: 'var(--space-sm)', fontSize: '20px' }}>{tech.title}</h3>
                  <p className="small" style={{ color: 'var(--text-dark-secondary)' }}>{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="section" style={{ background: 'var(--bg-dark-1)' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: 'var(--space-4xl)' }}>
              <h2 className="section-title">One System. All Features. <span className="accent">No Limits.</span></h2>
              <p className="section-subtitle">
                All plans include full features. Pricing only scales with company size to ensure optimal performance for your workforce infrastructure.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-lg)' }}>
              {[
                { tier: "STARTER", price: "39.000.000", limit: "< 50 Employees", label: "Optimized for team size" },
                { tier: "BUSINESS", price: "89.000.000", limit: "50-100 Employees", label: "Scalable performance", highlight: true },
                { tier: "ENTERPRISE", price: "168.000.000", limit: "101-500 Employees", label: "Large capacity" },
                { tier: "SUITE", price: "Custom", limit: "Up to 10.000 Employees", label: "Dedicated infrastructure" }
              ].map((item, i) => (
                <div key={i} className="card" style={{ 
                  display: 'flex', flexDirection: 'column', 
                  border: item.highlight ? '2px solid var(--gugan-green)' : '1px solid var(--border-dark)',
                  transform: item.highlight ? 'scale(1.05)' : 'none',
                  zIndex: item.highlight ? 2 : 1
                }}>
                  <div className="small" style={{ fontWeight: 700, color: 'var(--gugan-green)', marginBottom: 'var(--space-md)' }}>{item.tier}</div>
                  <div style={{ marginBottom: 'var(--space-lg)' }}>
                    <h2 style={{ fontSize: item.price === 'Custom' ? '32px' : '36px' }}>
                      {item.price !== 'Custom' && <span style={{ fontSize: '18px' }}>Rp </span>}
                      {item.price}
                    </h2>
                    <p className="small" style={{ color: 'var(--text-dark-secondary)' }}>One-time payment</p>
                  </div>
                  
                  <div style={{ flexGrow: 1, marginBottom: 'var(--space-2xl)' }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                      <li className="small" style={{ fontWeight: 600 }}>{item.limit}</li>
                      <li className="small" style={{ color: 'var(--text-dark-secondary)' }}>{item.label}</li>
                      <li className="small">All features included</li>
                    </ul>
                  </div>

                  <button onClick={() => openModal(item.tier)} className={`btn ${item.highlight ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
                    Hubungi Sales
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section" style={{ borderTop: '1px solid var(--border-dark)' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
              <h2 className="section-title">FAQ</h2>
              <p className="section-subtitle">
                Hal yang paling sering ditanyakan terkait infrastruktur HR GUGAN.
              </p>
            </div>

            {/* Smart Search Bar */}
            <div style={{ maxWidth: '800px', margin: '0 auto var(--space-3xl)', position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Cari pertanyaan… contoh: payroll, biaya, AI"
                onChange={(e) => {
                  const term = e.target.value.toLowerCase();
                  const filtered = faqData.map(cat => ({
                    ...cat,
                    questions: cat.questions.filter(q => 
                      q.q.toLowerCase().includes(term) || 
                      q.a.toLowerCase().includes(term)
                    )
                  })).filter(cat => cat.questions.length > 0);
                  setFilteredFaq(filtered);
                }}
                style={{ 
                  width: '100%', 
                  padding: '16px 24px', 
                  background: 'var(--bg-dark-2)', 
                  border: '1px solid var(--border-dark)', 
                  borderRadius: 'var(--radius-md)', 
                  color: 'var(--text-dark-primary)', 
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-xl)' }}>
              {filteredFaq.map((cat, catIdx) => (
                <div key={catIdx}>
                  <div className="small" style={{ color: 'var(--gugan-green)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 'var(--space-lg)' }}>{cat.category}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                    {cat.questions.map((item, qIdx) => (
                      <details key={qIdx} className="card" style={{ padding: '0', cursor: 'pointer' }}>
                        <summary style={{ padding: 'var(--space-lg)', color: 'var(--text-dark-primary)', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {item.q}
                          <span className="accent">+</span>
                        </summary>
                        <div style={{ padding: '0 var(--space-lg) var(--space-lg)', color: 'var(--text-dark-secondary)', fontSize: '15px' }}>
                          {item.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="final-cta" className="section" style={{ background: 'var(--bg-dark-1)', borderTop: '1px solid var(--border-dark)' }}>
          <div className="container text-center">
            <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>Mulai Transformasi <span className="accent">Sekarang.</span></h2>
            <p className="section-subtitle" style={{ marginBottom: 'var(--space-2xl)' }}>
              Berhenti menyewa sistem HR. Mulai miliki infrastruktur workforce Anda sendiri hari ini.
            </p>
            <button onClick={() => openModal("Final CTA")} className="btn btn-primary" style={{ padding: '16px 48px' }}>
              Hubungi Sales
            </button>
          </div>
        </section>
      </main>

      <footer className="footer" style={{ borderTop: '1px solid var(--border-dark)', background: '#020503', padding: 'var(--space-4xl) 0 var(--space-xl)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: 'var(--space-4xl)', marginBottom: 'var(--space-4xl)' }}>
            
            {/* Column 1: Brand & Apps */}
            <div>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: 'var(--space-lg)' }}>
                <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZkzh6pwpIven-XjJCLscRk1kqikxddK_l43Q0Le7KF3c-WKu6LnLGPprD1XbkyovxgHBOrAOeKeH1JRwBAL3TV3XndMqpVzkblUHWvW5AFlD_viCeJT9FNzGmjcFcXjdDNPRrRXFT1ks4yJcOzyjjqfGbTx5baBaMfSFNh5-6H1Qoili7Y2PXuoJSdJ4/s320/ChatGPT%20Image%2028%20Apr%202026,%2017.55.24.png" alt="GUGAN" style={{ width: '32px' }} />
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '1px' }}>GUGAN</span>
              </Link>
              <p className="small" style={{ color: 'var(--text-dark-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-lg)', maxWidth: '300px' }}>
                Membangun masa depan kerja dengan teknologi AI dan privasi data mutlak. Infrastruktur HR tanpa langganan.
              </p>
              
              {/* App Store Badges (Restored & Enlarged) */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: 'var(--space-lg)' }}>
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" style={{ height: '40px', transition: 'transform 0.2s' }} className="hover-scale" /></a>
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style={{ height: '40px', transition: 'transform 0.2s' }} className="hover-scale" /></a>
              </div>

              {/* Social Icons (Refined with circular containers) */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { title: "LinkedIn", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                  { title: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                  { title: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                  { title: "TikTok", path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-.88-.64-1.6-1.47-2.13-2.42v10.43c.02 1.1-.39 2.24-1.12 3.05-.77.85-1.84 1.39-2.94 1.58-1.13.19-2.34.04-3.39-.46-1.03-.48-1.93-1.27-2.51-2.26-.58-.99-.82-2.16-.69-3.3.13-1.14.67-2.24 1.52-3.02.78-.71 1.83-1.13 2.87-1.19.1 1.34.01 2.68.01 4.02-.63.02-1.28.24-1.74.67-.44.42-.68.99-.74 1.6-.06.6.11 1.25.48 1.72.36.46.91.75 1.48.83.59.08 1.2-.06 1.67-.43.48-.38.77-.95.82-1.57.06-2.51.01-5.02.01-7.53V0h-.02z" }
                ].map((social) => (
                  <Link 
                    key={social.title} href="#" title={social.title}
                    className="hover-scale"
                    style={{ 
                      width: '36px', height: '36px', borderRadius: '50%', 
                      background: 'rgba(255,255,255,0.05)', display: 'flex', 
                      alignItems: 'center', justifyContent: 'center', 
                      color: 'var(--text-dark-secondary)', textDecoration: 'none',
                      transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.05)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = 'var(--gugan-green)';
                      e.currentTarget.style.borderColor = 'rgba(0, 200, 83, 0.3)';
                      e.currentTarget.style.background = 'rgba(0, 200, 83, 0.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = 'var(--text-dark-secondary)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d={social.path}/></svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Product */}
            <div>
              <h4 className="small" style={{ color: '#fff', fontWeight: 700, marginBottom: 'var(--space-lg)' }}>PRODUCT</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {['Features', 'AI Engine', 'Security', 'Integrations'].map(item => (
                  <li key={item}><Link href="/" className="small" style={{ color: 'var(--text-dark-secondary)', textDecoration: 'none' }}>{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h4 className="small" style={{ color: '#fff', fontWeight: 700, marginBottom: 'var(--space-lg)' }}>COMPANY</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {['About Us', 'FAQ', 'Contact', 'Careers'].map(item => (
                  <li key={item}><Link href="/" className="small" style={{ color: 'var(--text-dark-secondary)', textDecoration: 'none' }}>{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Legal */}
            <div>
              <h4 className="small" style={{ color: '#fff', fontWeight: 700, marginBottom: 'var(--space-lg)' }}>CONTACT</h4>
              <div className="small" style={{ color: 'var(--text-dark-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ color: '#fff', fontWeight: 600 }}>PT Proskill Global Solution</p>
                <p>Kompleks Tunas Regancy Blok A2 No 7, Batam</p>
                <p>info@gugan.id</p>
                <p>0822 1555 0001</p>
                
                {/* Komdigi PSE (Restored) */}
                <div style={{ marginTop: 'var(--space-md)' }}>
                  <a href="https://pse.komdigi.go.id/pse" target="_blank" rel="noopener noreferrer">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMtan8PzTD4y0MoptB61jBhS_wejH4dqDqV_XmlIKN2Rko-LhR0C-UlH7iNN_nJ4qFkJZ-tWqSPaLEfluZtBiT3utSUWfF9w7Azq-WAzZalIizxGuHdGD0fhDvw8AYozuVF-nTIyv9D3wAMgxdcJPpUDk_x0dqk_McjLtZ2Uy0JCs7GIOfV7OOQ7O4FRg/s320/logo-komdigi-pse.png" alt="PSE Komdigi" style={{ height: '36px' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 'var(--space-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="small" style={{ color: 'var(--text-dark-secondary)' }}>&copy; 2026 GUGAN Workforce Infrastructure. All rights reserved.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gugan-green)' }}></div>
              <span className="small" style={{ color: 'var(--text-dark-secondary)' }}>Sistem Aman & Terenkripsi</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Lead Capture Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            width: '100%', maxWidth: '480px', padding: 'var(--space-xl)',
            background: 'var(--bg-light-1)', borderRadius: 'var(--radius-lg)',
            boxShadow: '0 24px 48px rgba(0,0,0,0.1)', position: 'relative',
            animation: 'slideUp 0.4s ease'
          }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--text-light-secondary)', fontSize: '20px', cursor: 'pointer' }}>✕</button>

            <div style={{ marginBottom: 'var(--space-xl)' }}>
              <h3 style={{ color: 'var(--text-light-primary)', marginBottom: 'var(--space-sm)' }}>Mulai Konsultasi</h3>
              <p className="small" style={{ color: 'var(--text-light-secondary)' }}>Solusi HR terbaik sesuai kebutuhan perusahaan Anda.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <input type="hidden" name="selectedPlan" value={selectedPlan} />
              
              {[
                { label: "Nama Lengkap", name: "name", type: "text", placeholder: "Budi Santoso" },
                { label: "Nama Perusahaan", name: "company", type: "text", placeholder: "PT Maju Bersama" },
                { label: "Email Perusahaan", name: "email", type: "email", placeholder: "budi@perusahaan.com" },
                { label: "Nomor WhatsApp", name: "whatsapp", type: "tel", placeholder: "0812..." }
              ].map((field) => (
                <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label className="small" style={{ color: 'var(--text-light-secondary)', fontWeight: 600 }}>{field.label}</label>
                  <input 
                    type={field.type} name={field.name} required placeholder={field.placeholder}
                    value={(formData as any)[field.name]} onChange={handleInputChange}
                    style={{ 
                      padding: '12px 16px', background: 'var(--bg-light-2)', 
                      border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)',
                      fontSize: '14px', color: 'var(--text-light-primary)', outline: 'none'
                    }}
                  />
                </div>
              ))}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label className="small" style={{ color: 'var(--text-light-secondary)', fontWeight: 600 }}>Jumlah Karyawan</label>
                <select 
                  name="employees" value={formData.employees} onChange={handleInputChange}
                  style={{ 
                    padding: '12px 16px', background: 'var(--bg-light-2)', 
                    border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)',
                    fontSize: '14px', color: 'var(--text-light-primary)', outline: 'none'
                  }}
                >
                  <option value="< 50">&lt; 50 Karyawan</option>
                  <option value="50-100">50 - 100 Karyawan</option>
                  <option value="101-500">101 - 500 Karyawan</option>
                  <option value="500+">&gt; 500 Karyawan</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--space-md)', width: '100%', borderRadius: 'var(--radius-sm)' }}>
                Kirim & Hubungi via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
      {/* AI Chat Assistant */}
      <div style={{ position: 'fixed', bottom: 'var(--space-xl)', right: 'var(--space-xl)', zIndex: 1000 }}>
        {!isChatOpen ? (
          <button onClick={() => setIsChatOpen(true)} className="btn btn-primary hover-scale" style={{ width: '64px', height: '64px', borderRadius: '50%', boxShadow: '0 8px 32px var(--gugan-green-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#000">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5-1.338C8.47 21.513 10.179 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.477 0-2.855-.384-4.047-1.062l-.387-.222-2.507.671.671-2.507-.222-.387A7.953 7.953 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm-3-9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
            </svg>
          </button>
        ) : (
          <div className="card" style={{ width: '360px', height: '520px', display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: 'var(--space-md)', borderBottom: '1px solid var(--border-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gugan-green)' }}></div>
                <span className="small" style={{ fontWeight: 700 }}>GUGAN AI</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dark-secondary)', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ 
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%', padding: '10px 14px', borderRadius: '12px',
                  background: msg.role === 'user' ? 'var(--gugan-green)' : 'var(--bg-dark-3)',
                  color: msg.role === 'user' ? '#000' : 'var(--text-dark-primary)',
                  fontSize: '14px', lineHeight: '1.5'
                }}>{msg.content}</div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={{ padding: 'var(--space-md)', borderTop: '1px solid var(--border-dark)', display: 'flex', gap: 'var(--space-sm)' }}>
              <input 
                type="text" placeholder="Ketik pesan..." value={userInput} onChange={(e) => setUserInput(e.target.value)}
                style={{ flex: 1, background: 'var(--bg-dark-3)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none' }}
              />
              <button type="submit" className="btn btn-primary" style={{ width: '40px', height: '40px', padding: '0', borderRadius: 'var(--radius-sm)' }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="#000"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
