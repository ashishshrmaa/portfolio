"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const PER_PAGE = 6;

// Pagination sub-component
function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const delta = 1; // pages around current

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        pages.push(i);
      } else if (
        i === page - delta - 1 ||
        i === page + delta + 1
      ) {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <nav className="port-pagination" aria-label="Pagination">
      <button
        className="port-page-btn port-page-nav"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="port-page-ellipsis">…</span>
        ) : (
          <button
            key={p}
            className={`port-page-btn${page === p ? " active" : ""}`}
            onClick={() => onPageChange(p)}
            aria-label={`Page ${p}`}
            aria-current={page === p ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        className="port-page-btn port-page-nav"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </nav>
  );
}

// Main PortfolioGrid component
// Props:
//   apiUrl  {string}  – full API endpoint URL (required)
//   perPage {number}  – posts per page (default: 6)
export default function PortfolioGrid({ apiUrl, perPage = PER_PAGE }) {
  const [allProjects, setAllProjects]   = useState([]);
  const [categories, setCategories]     = useState(["All"]);
  const [active, setActive]             = useState("All");
  const [liked, setLiked]               = useState({});
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [page, setPage]                 = useState(1);

  const fetchProjects = useCallback(async () => {
    if (!apiUrl) {
      setError("No API URL provided.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      // Fetch all projects once; paginate client-side for instant filter + pagination
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`Server error (${res.status})`);
      const json = await res.json();
      if (!json.success) throw new Error("API returned success: false");

      const incoming = json.data ?? [];
      setAllProjects(incoming);

      const cats = ["All", ...new Set(incoming.map((p) => p.category).filter(Boolean))];
      setCategories(cats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Reset to page 1 when filter changes
  const handleFilterChange = (cat) => {
    setActive(cat);
    setPage(1);
  };

  const filtered = active === "All"
    ? allProjects
    : allProjects.filter((p) => p.category === active);

  const totalPages  = Math.ceil(filtered.length / perPage);
  const paginated   = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleLike  = (id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  const getYear     = (dateStr) => dateStr ? new Date(dateStr).getFullYear() : "";

  return (
    <div className="port-grid-root">

      {/* Filters */}
      {!loading && !error && categories.length > 1 && (
        <div className="port-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`port-filter-btn${active === cat ? " active" : ""}`}
              onClick={() => handleFilterChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Skeleton */}
      {loading && (
        <div className="port-skeleton-grid">
          {Array.from({ length: perPage }).map((_, i) => (
            <div key={i} className="port-skeleton-card">
              <div className="port-skeleton-thumb" />
              <div className="port-skeleton-body">
                <div className="port-skeleton-line" style={{ width: "38%", height: "10px" }} />
                <div className="port-skeleton-line" style={{ width: "72%", height: "16px" }} />
                <div className="port-skeleton-line" style={{ width: "55%", height: "10px", marginBottom: 0 }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="port-grid">
          <div className="port-state-box">
            <div className="port-state-icon error-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e83e6c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <p className="port-state-title">Failed to load projects</p>
            <p className="port-state-sub">{error}</p>
            <button className="port-retry-btn" onClick={fetchProjects}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div className="port-grid">
          <div className="port-state-box">
            <div className="port-state-icon empty-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <p className="port-state-title">No projects found</p>
            <p className="port-state-sub">Nothing in the "{active}" category yet.</p>
            <button className="port-retry-btn" onClick={() => handleFilterChange("All")}>View all projects</button>
          </div>
        </div>
      )}

      {/* Cards */}
      {!loading && !error && paginated.length > 0 && (
        <>
          <div className="port-grid">
            {paginated.map((project) => {
              const techList = project.tech
                ? project.tech.split(",").map((t) => t.trim()).filter(Boolean)
                : [];
              const viewHref = project.url || `/portfolio/${project.slug}`;

              return (
                <article key={project.id} className="port-card">
                  <div className="port-card-thumb">
                    <Image
                      src={project.thumbnail_image || "/assets/images/portfolio/placeholder.png"}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="port-card-overlay">
                      <a
                        href={viewHref}
                        className="port-card-view-btn"
                        target={project.url ? "_blank" : "_self"}
                        rel={project.url ? "noopener noreferrer" : undefined}
                      >
                        View Project
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M17 7H7M17 7v10"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="port-card-body">
                    <div className="port-card-meta" style={{ minWidth: 0, flex: 1 }}>
                      <span className={`port-card-tag${!project.category ? " no-cat" : ""}`}>
                        {project.category || "Project"}
                      </span>
                      <h3 className="port-card-title">{project.title}</h3>
                      {techList.length > 0 && (
                        <div className="port-card-tech-pills">
                          {techList.slice(0, 3).map((t) => (
                            <span key={t} className="tech-pill">{t}</span>
                          ))}
                          {techList.length > 3 && (
                            <span className="tech-pill">+{techList.length - 3}</span>
                          )}
                        </div>
                      )}
                      <span className="port-card-year">{getYear(project.date)}</span>
                    </div>

                    <button
                      className={`port-card-like${liked[project.id] ? " liked" : ""}`}
                      onClick={() => toggleLike(project.id)}
                      aria-label={liked[project.id] ? "Unlike" : "Like"}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          />

          {/* Page info */}
          {totalPages > 1 && (
            <p className="port-page-info">
              Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length} projects
            </p>
          )}
        </>
      )}

    </div>
  );
}
