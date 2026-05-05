'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar glass ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link href="/" className="nav-brand">
          <img 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZkzh6pwpIven-XjJCLscRk1kqikxddK_l43Q0Le7KF3c-WKu6LnLGPprD1XbkyovxgHBOrAOeKeH1JRwBAL3TV3XndMqpVzkblUHWvW5AFlD_viCeJT9FNzGmjcFcXjdDNPRrRXFT1ks4yJcOzyjjqfGbTx5baBaMfSFNh5-6H1Qoili7Y2PXuoJSdJ4/s320/ChatGPT%20Image%2028%20Apr%202026,%2017.55.24.png" 
            alt="GUGAN Logo" 
            className="nav-logo" 
          />
          <span className="brand-name">GUGAN</span>
        </Link>
        <ul className="nav-links">
          <li><Link href="/#product">Product</Link></li>
          <li><Link href="/features">Features</Link></li>
          <li><Link href="/#ai">AI Assistant</Link></li>
          <li><Link href="/#pricing">Pricing</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
