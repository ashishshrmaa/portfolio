import Image from "next/image";
import Link from "next/link";
import { getPortfolioList } from "@/lib/api";

const fallbackItems = [
  { slug: "#", img: "portfolio-01.jpg", category: "Development",  likes: 600, title: "The services provide for design" },
  { slug: "#", img: "portfolio-02.jpg", category: "Application",  likes: 750, title: "Mobile app landing design & app maintain" },
  { slug: "#", img: "portfolio-03.jpg", category: "Photoshop",    likes: 630, title: "Logo design creativity & Application" },
  { slug: "#", img: "portfolio-04.jpg", category: "Figma",        likes: 360, title: "Mobile app landing design & Services" },
  { slug: "#", img: "portfolio-05.jpg", category: "Web Design",   likes: 280, title: "Design for technology & services" },
  { slug: "#", img: "portfolio-06.jpg", category: "Design",       likes: 390, title: "Creative portfolio website design" },
];

export default async function Portfolio() {
  let apiItems: any[] = [];
  try {
    apiItems = await getPortfolioList();
  } catch {
    apiItems = [];
  }

  const items =
    apiItems.length > 0
      ? apiItems.slice(0, 6).map((item: any) => ({
          slug: item.slug,
          img: item.thumbnail_image || null,
          category: Array.isArray(item.category)
            ? item.category.join(", ")
            : item.category || "Project",
          likes: item.likes ?? 600,
          title: item.title,
        }))
      : fallbackItems;

  return (
    <>
      <style>{`
       
      `}</style>

      <section className="pf-section" id="portfolio">
        <div className="container">

          {/* Heading */}
          <div className="pf-head">
            <span className="pf-eyebrow">Visit my portfolio and keep your feedback</span>
            {/* <h2 className="pf-title">My <em>Portfolio</em></h2> */}
            <h2 className="title">My Resume</h2>
            <hr className="pf-rule" />
          </div>

          {/* Grid */}
          <div className="pf-grid">
            {items.map((item, i) => {
              const href =
                item.slug && item.slug !== "#"
                  ? `/portfolio/${item.slug}`
                  : "/portfolio";

              return (
                <Link key={i} href={href} className="pf-card">
                  {/* Index */}
                  <span className="pf-card-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Image */}
                  {item.img && item.img.startsWith("http") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.img}
                      alt={item.title}
                      className="pf-card-img"
                    />
                  ) : (
                    <Image
                      src={`/assets/images/${item.img || "portfolio-01.jpg"}`}
                      alt={item.title}
                      fill
                      className="pf-card-img"
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                  )}

                  {/* Body */}
                  <div className="pf-card-body">
                    <span className="pf-card-cat">{item.category}</span>
                    <h3 className="pf-card-title">{item.title}</h3>
                    <div className="pf-card-meta">
                      <span className="pf-card-likes">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        {item.likes}
                      </span>
                      <span className="pf-card-arrow">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M17 7H7M17 7v10"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View All */}
          <div className="pf-cta">
            <Link href="/portfolio" className="pf-btn">
              <span>View All Projects</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
