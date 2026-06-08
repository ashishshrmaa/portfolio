"use client"
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioGrid from "@/components/PortfolioGrid";

const PORTFOLIO_API_URL =
  "https://reactapp.kgkrealty.com/ashportfolio/wp-json/custom/v1/portfolio-page";

export default function PortfolioPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="port-hero">
        <div className="container">
          <div className="port-hero-inner">
            <span className="port-hero-eyebrow">Visit my portfolio and keep your feedback</span>
            <h1 className="port-hero-title">My Portfolio</h1>
            <nav className="port-hero-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep" />
              <span className="current">Portfolio</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="port-main">
        <div className="container">
          <div className="port-section-label">
            <p className="port-eyebrow">All Projects</p>
            <h2 className="port-heading">Recent Work</h2>
          </div>

          <PortfolioGrid
            apiUrl={PORTFOLIO_API_URL}
            perPage={6}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
