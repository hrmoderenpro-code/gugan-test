'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

const featuresData: Record<string, any> = {
  attendance: {
    title: "Attendance Management",
    desc: "Enterprise-grade tracking system with AI-powered security and real-time biometric synchronization.",
    items: [
      {
        title: "Fingerprint Integration (Real-time)",
        desc: "Direct connectivity with biometric hardware. Attendance data flows into the system instantly without manual sync.",
        highlight: true,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3c1.72 0 3.347.433 4.774 1.2a10 10 0 014.532 12.358m-4.532-12.358a10.003 10.003 0 013.44 2.04l.054.09m-4.208 11.774a10.003 10.003 0 01-3.44-2.04l-.054-.09m-4.208-11.774a10 10 0 014.208 11.774m0-11.774V9m0 11.774V21" /></svg>
      },
      {
        title: "AI Face & Smile Recognition",
        desc: "Fraud-proof attendance using geolocation and facial sentiment analysis.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg>
      },
      {
        title: "Mobile GPS Attendance",
        desc: "Secure clock-in via mobile devices with radius-based geofencing.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
      },
      {
        title: "Shifting Management",
        desc: "Automated shift rotations and complex schedule handling.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      }
    ]
  },
  employee: {
    title: "Employee Management",
    desc: "Centralize your workforce intelligence with secure data structures and smart organizational mapping.",
    items: [
      {
        title: "Employee & Org Structure",
        desc: "Dynamic organizational mapping with detailed profiles and employment history.",
        highlight: true,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
      },
      {
        title: "Smart Approval Flow",
        desc: "Multi-level, logic-based approval routing for enterprise operations.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21a3.745 3.745 0 01-3.068-.953 3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
      },
      {
        title: "Multi Branch Support",
        desc: "Consolidated management of multiple subsidiaries and branch locations.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M9 15.75h1.5m-1.5 3h1.5m3-3h1.5m-1.5 3h1.5" /></svg>
      }
    ]
  },
  ess: {
    title: "Employee Self-Service",
    desc: "Decentralize administrative tasks by giving employees secure mobile tools to manage their own requests.",
    items: [
      {
        title: "Mobile Requests",
        desc: "Submit leave, overtime, and reimbursement claims via mobile app.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
      },
      {
        title: "Payslip Downloads",
        desc: "Instant access and download of historical monthly payslips.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
      }
    ]
  },
  payroll: {
    title: "Payroll Engine",
    desc: "Robust calculation engine designed for complex Indonesian tax laws and enterprise compensation structures.",
    items: [
      {
        title: "Salary Adjustment System",
        desc: "Automated salary increments based on performance reviews, KPI achievement, or periodic company policy updates.",
        highlight: true,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 1.5v.75m0 1.5v.75m0 1.5V15m-1.5-1.5h1.5m-1.5-1.5h1.5m-1.5-1.5h1.5m-1.5-1.5h1.5M9 9h.008v.008H9V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM14.25 9h.008v.008h-.008V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 12.75h.008v.008H12v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 15.75h.008v.008H12v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM9.75 15.75h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM2.25 16.05c0-3.15 2.1-6.15 5.25-6.15 1.65 0 3.15.9 4.2 2.1 1.2 1.35 1.5 3 1.5 4.05v.3H2.25v-.3z" /></svg>
      },
      {
        title: "Tax & TER Calculation",
        desc: "Precise PPh 21 calculations following latest TER (Tarif Efektif Rata-rata) compliance.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-3-3V18m-3-3V18M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      }
    ]
  },
  performance: {
    title: "Performance Management",
    desc: "Align individual execution with company vision through structured reviews and task tracking.",
    items: [
      {
        title: "Performance Appraisal",
        desc: "Automated review cycles with customized scoring and feedback loops.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      },
      {
        title: "Task Tracking",
        desc: "Manage operational deliverables and align daily tasks with strategic goals.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0c0 .634-.44 1.243-1.092 1.33a6.026 6.026 0 01-3.142 0c-.652-.087-1.092-.696-1.092-1.33v0c0-.212.029-.418.084-.612m7.332 0c.346.102.637.326.83.622.133.204.214.457.214.728V20.25a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25V5.25c0-.271.08-.524.214-.728.193-.296.484-.52.83-.622" /></svg>
      }
    ]
  },
  recruitment: {
    title: "Recruitment System",
    desc: "End-to-end talent acquisition infrastructure for the modern enterprise.",
    items: [
      {
        title: "Dedicated Recruitment Portal",
        desc: "Custom white-label career portal to strengthen employer branding and attract top-tier talent.",
        highlight: true,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" /></svg>
      },
      {
        title: "Applicant Tracking (ATS)",
        desc: "Pipeline management from sourcing and screening to automated interview scheduling.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375m1.875-10.333c2.624 0 4.862 1.685 5.715 4.053.813 2.255.405 4.713-1.022 6.508a5.262 5.262 0 01-5.453 1.154 5.25 5.25 0 01-3.14 3.064c-.447.165-.933.254-1.44.254H7.5V17.25h-.375c-1.449 0-2.625-1.176-2.625-2.625V8.25c0-1.449 1.176-2.625 2.625-2.625h6.75z" /></svg>
      }
    ]
  },
  automation: {
    title: "Automation & Integration",
    desc: "Streamline workflows with seamless external connectivity and AI-driven insights.",
    items: [
      {
        title: "WhatsApp Business Integration",
        desc: "Automated transactional notifications for payroll, leave approvals, and daily attendance logs.",
        highlight: true,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
      },
      {
        title: "AI Intelligence Core",
        desc: "Membantu analisa data tenaga kerja, pembuatan kebijakan otomatis, dan prediksi churn karyawan.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.456-2.455l.258-1.036.259 1.036a3.375 3.375 0 002.455 2.456l1.036.258-1.036.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
      }
    ]
  }
};

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState('attendance');

  const categories = [
    { id: 'attendance', label: 'Attendance' },
    { id: 'employee', label: 'Core Employee' },
    { id: 'ess', label: 'Self Service' },
    { id: 'payroll', label: 'Payroll Engine' },
    { id: 'performance', label: 'Performance' },
    { id: 'recruitment', label: 'Recruitment' },
    { id: 'automation', label: 'Integrations' }
  ];

  return (
    <div style={{ backgroundColor: '#0a0f0b', minHeight: '100vh', paddingTop: '120px' }}>
      <Navbar />
      
      <div className="features-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', display: 'flex', gap: '80px' }}>
        <aside style={{ flex: '0 0 300px', position: 'sticky', top: '120px', height: 'fit-content' }}>
          <span style={{ color: '#22c55e', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold', marginBottom: '32px', display: 'block' }}>
            Enterprise Modules
          </span>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {categories.map(cat => (
              <li 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{ 
                  padding: '14px 24px', 
                  cursor: 'pointer', 
                  fontWeight: 500, 
                  color: activeCategory === cat.id ? '#22c55e' : '#94a3b8',
                  background: activeCategory === cat.id ? 'rgba(34, 197, 94, 0.05)' : 'transparent',
                  borderLeft: `2px solid ${activeCategory === cat.id ? '#22c55e' : 'transparent'}`,
                  transition: 'all 0.3s ease'
                }}
              >
                {cat.label}
              </li>
            ))}
          </ul>
        </aside>

        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px', color: '#fff' }}>
              {featuresData[activeCategory].title}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.6' }}>
              {featuresData[activeCategory].desc}
            </p>
          </div>
          
          <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '100px' }}>
            {featuresData[activeCategory].items.map((item: any, idx: number) => (
              <div 
                key={idx} 
                className={`feature-card ${item.highlight ? 'highlight' : ''}`}
                style={{ 
                  gridColumn: item.highlight ? 'span 2' : 'span 1',
                  background: item.highlight ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(18, 24, 20, 0.6) 100%)' : 'rgba(18, 24, 20, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  padding: item.highlight ? '32px' : '28px',
                  display: 'flex',
                  gap: '24px',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ flexShrink: 0, width: '44px', height: '44px', color: '#22c55e' }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: item.highlight ? '1.25rem' : '1.1rem', fontWeight: 600, marginBottom: '8px', color: '#fff' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
