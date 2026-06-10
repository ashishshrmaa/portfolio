import Image from "next/image";
import Link from "next/link";
import { getPortfolioList } from "@/lib/api";

const fallbackItems = [
  { slug: "#", img: "portfolio-01.jpg", category: "Development", likes: 600, title: "The services provide for design" },
  { slug: "#", img: "portfolio-02.jpg", category: "Application", likes: 750, title: "Mobile app landing design & app maintain" },
  { slug: "#", img: "portfolio-03.jpg", category: "Photoshop", likes: 630, title: "Logo design creativity & Application" },
  { slug: "#", img: "portfolio-04.jpg", category: "Figma", likes: 360, title: "Mobile app landing design & Services" },
  { slug: "#", img: "portfolio-05.jpg", category: "Web Design", likes: 280, title: "Design for technology & services" },
  { slug: "#", img: "portfolio-06.jpg", category: "Design", likes: 390, title: "Creative portfolio website design" },
];

const delays = [100, 300, 500, 100, 300, 500];

export default async function Portfolio() {
  let apiItems: any[] = [];
  try {
    apiItems = await getPortfolioList();
  } catch {
    apiItems = [];
  }

  const items = apiItems.length > 0
    ? apiItems.slice(0, 6).map((item: any) => ({
        slug: item.slug,
        img: item.thumbnail_image || null,
        category: Array.isArray(item.category) ? item.category.join(", ") : item.category || "Project",
        likes: item.likes ?? 600,
        title: item.title,
      }))
    : fallbackItems;

   // console.log(items);

  return (
    <div className="rn-portfolio-area rn-section-gap section-separator" id="portfolio">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="subtitle">Visit my portfolio and keep your feedback</span>
              <h2 className="title">My Portfolio</h2>
            </div>
          </div>
        </div>
        <div className="row row--25 mt--10 mt_md--10 mt_sm--10">
          {items.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={delays[index % delays.length]}
              data-aos-once="true"
              className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30"
            >
              <div className="rn-portfolio">
                <div className="inner">
                  <div className="thumbnail">
                    <Link href={item.slug && item.slug !== "#" ? `/portfolio/${item.slug}` : "/portfolio"}>
                      {item.img && item.img.startsWith("http") ? (
                        <img
                          src={item.img}
                          alt={item.title}
                          style={{ width: "100%", height: "240px", objectFit: "cover" }}
                        />
                      ) : (
                        <Image
                          src={`/assets/images/${item.img || "portfolio-01.jpg"}`}
                          alt={item.title}
                          width={400}
                          height={300}
                        />
                      )}
                    </Link>
                  </div>
                  <div className="content">
                    <div className="category-info">
                      <div className="category-list">
                        <Link href={item.slug && item.slug !== "#" ? `/portfolio/${item.slug}` : "/portfolio"}>
                          {item.category}
                        </Link>
                      </div>
                      <div className="meta">
                        <span><a href="javascript:void(0)"><i className="feather-heart"></i></a> {item.likes}</span>
                      </div>
                    </div>
                    <h4 className="title">
                      <Link href={item.slug && item.slug !== "#" ? `/portfolio/${item.slug}` : "/portfolio"}>
                        {item.title} <i className="feather-arrow-up-right"></i>
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="row mt--60">
          <div className="col-12 text-center">
            <Link href="/portfolio" className="rn-btn">
              <span>View All Projects</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
