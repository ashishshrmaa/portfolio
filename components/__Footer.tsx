"use client"
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="rn-footer-area footer-style-1 ptb--80 section-separator">
      <div className="container">
        <div className="row align-items-center">

          {/* Logo + tagline + social */}
          <div className="col-lg-6 col-md-6 col-12">
            <div className="footer-left">
              <div className="logo mb--20">
                <Link href="/">
                  <Image
                    src="/assets/images/logo-dark.png"
                    alt="Ashish Sharma"
                    width={120}
                    height={40}
                  />
                </Link>
              </div>
              <p>
                Full Stack Developer specialising in React, Next.js, Node.js &amp; E-Commerce solutions.
              </p>
            </div>

            <div className="footer-right text-lg-end" style={{ marginTop: "24px" }}>
              <h6
                style={{
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  fontSize: "13px",
                  opacity: 0.5,
                }}
              >
                Find With Me
              </h6>
              <ul className="social-share d-flex liststyle" style={{ gap: "10px" }}>
                <li className="facebook">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </li>
                <li className="instagram">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                </li>
                <li className="linkedin">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-6 col-md-6 col-12 mt_sm--30 mt_md--30">
            <div className="footer-center text-lg-center">
              <h6>Quick Links</h6>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "8px 24px",
                }}
              >
                {[
                  { label: "Home",      href: "/#home" },
                  { label: "Features",  href: "/#features" },
                  { label: "Portfolio", href: "/#portfolio" },
                  { label: "Resume",    href: "/#resume" },
                  { label: "Contact",   href: "/#contacts" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{ opacity: 0.7, transition: "opacity 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Divider + copyright */}
        <div className="row mt--40">
          <div className="col-12">
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "24px",
                textAlign: "center",
                opacity: 0.5,
                fontSize: "13px",
              }}
            >
              © {new Date().getFullYear()} Ashish Sharma. All rights reserved.
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
