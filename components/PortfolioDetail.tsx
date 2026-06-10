import Image from "next/image";
import Link from "next/link";

// ── Type matches exact API response shape
export interface PortfolioDetailData {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;          // raw HTML
  thumbnail_image: string;
  poster_image: string;
  url: string;
  category: string;
  tech: string;             // "HTML, CSS, JS, Wordpress, PHP, REST API"
  date: string;             // "2026-06-04 08:07:09"
}

export default function PortfolioDetail({ project }: { project: PortfolioDetailData }) {
  const techList = project.tech
    ? project.tech.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const year = project.date ? new Date(project.date).getFullYear() : null;

  const heroImg = project.poster_image || project.thumbnail_image || null;

  return (
    <>


      {/* ── Hero ── */}
      <div className="pd-hero">
        {heroImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImg} alt={project.title} className="pd-hero-img" />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "#ddd8ce" }} />
        )}
        <div className="pd-hero-overlay" />
        <div className="pd-hero-caption">
          <div>
            <span className="pd-hero-eyebrow">{project.category}</span>
            <h1 className="pd-hero-title">{project.title}</h1>
          </div>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-hero-live"
            >
              Live Preview
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="pd-breadcrumb-bar">
        <nav aria-label="Breadcrumb">
          <ol className="pd-breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li><span className="pd-breadcrumb-sep">›</span></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><span className="pd-breadcrumb-sep">›</span></li>
            <li>{project.title}</li>
          </ol>
        </nav>
      </div>

      {/* ── Body ── */}
      <section className="pd-body">
        <div className="pd-inner">

          {/* Left */}
          <div>
            <div className="pd-a1">
              <hr className="pd-rule" />
              <span className="pd-section-label">Project Overview</span>

              {/* Excerpt as pull-quote */}
              {project.excerpt && (
                <p className="pd-excerpt">{project.excerpt}</p>
              )}

              {/* Full HTML content */}
              {project.content && (
                <div
                  className="pd-content"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              )}
            </div>

            {/* Thumbnail image below content */}
            {project.thumbnail_image && (
              <div className="pd-thumb-wrap pd-a2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.thumbnail_image} alt={project.title} />
              </div>
            )}

            {/* Tech Stack */}
            {techList.length > 0 && (
              <div className="pd-tech-wrap pd-a3">
                <span className="pd-section-label">Tech Stack</span>
                <div className="pd-tech-pills">
                  {techList.map((t) => (
                    <span key={t} className="pd-tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="pd-sidebar pd-a2">
            <div className="pd-meta-card">
              <div className="pd-meta-head">
                <span className="pd-meta-head-sub">Project Details</span>
                <div className="pd-meta-head-title">{project.title}</div>
              </div>
              <ul className="pd-meta-list">
                {project.category && (
                  <li className="pd-meta-row">
                    <span className="pd-meta-key">Category</span>
                    <span className="pd-meta-val">{project.category}</span>
                  </li>
                )}
                {year && (
                  <li className="pd-meta-row">
                    <span className="pd-meta-key">Year</span>
                    <span className="pd-meta-val">{year}</span>
                  </li>
                )}
                {techList.length > 0 && (
                  <li className="pd-meta-row">
                    <span className="pd-meta-key">Tech</span>
                    <span className="pd-meta-val">{project.tech}</span>
                  </li>
                )}
                {project.url && (
                  <li className="pd-meta-row">
                    <span className="pd-meta-key">Live URL</span>
                    <span className="pd-meta-val">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: "#b08d50" }}>
                        View site ↗
                      </a>
                    </span>
                  </li>
                )}
              </ul>
            </div>

            <Link href="/portfolio" className="pd-back">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Portfolio
            </Link>
          </aside>

        </div>
      </section>
    </>
  );
}
