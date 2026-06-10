"use client"
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: "Home",      href: "/#home" },
  { label: "Features",  href: "/#features" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Resume",    href: "/#resume" },
  { label: "Contact",   href: "/#contacts" },
];

export default function Footer() {
  return (
    <>


      <footer className="rn-footer-light">
        <div className="container">
          <div className="footer-l-grid">

            {/* Brand column */}
            <div>
              <div className="footer-l-logo-wrap">
                <Link href="/">
                  <Image
                    src="/assets/images/logo-dark.png"
                    alt="Ashish Sharma"
                    width={110}
                    height={36}
                  />
                </Link>
              </div>
              <p className="footer-l-tagline">
                Full Stack Developer specialising in React, Next.js, Node.js &amp; E-Commerce solutions.
              </p>

              <p className="footer-l-find-label">Find with me</p>
              <ul className="footer-l-social-list">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links column */}
            <div>
              <p className="footer-l-col-heading">Quick Links</p>
              <ul className="footer-l-nav-list">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <p className="footer-l-col-heading">Contact</p>
              <div className="footer-l-contact-block">
                <div className="footer-l-contact-item">
                  <div className="footer-l-contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="footer-l-contact-text">
                    <span>Phone</span>
                    +91 99286 86337
                  </div>
                </div>

                <div className="footer-l-contact-item">
                  <div className="footer-l-contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="footer-l-contact-text">
                    <span>Email</span>
                    ashishshrmaa@outlook.com
                  </div>
                </div>

                <div className="footer-l-contact-item">
                  <div className="footer-l-contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="footer-l-contact-text">
                    <span>Location</span>
                    Jaipur, Rajasthan, India
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom row */}
          <div className="footer-l-bottom-row">
            <p className="footer-l-copy">
              © {new Date().getFullYear()} <strong>Ashish Sharma</strong>. All rights reserved.
            </p>
            <div className="footer-l-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="footer-l-accent-bar" />
      </footer>
    </>
  );
}
