import { getServices } from "@/lib/api";

// Icon map for common service types
function ServiceIcon({ title }: { title: string }) {
  const t = title?.toLowerCase() ?? "";
  if (t.includes("frontend") || t.includes("react") || t.includes("ui"))
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    );
  if (t.includes("backend") || t.includes("server") || t.includes("api") || t.includes("node"))
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    );
  if (t.includes("ecommerce") || t.includes("e-commerce") || t.includes("shop") || t.includes("woo"))
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    );
  if (t.includes("performance") || t.includes("speed") || t.includes("seo") || t.includes("optim"))
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    );
  if (t.includes("maintenance") || t.includes("support") || t.includes("bug"))
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-3 3-3-3 3-3z"></path>
      </svg>
    );
  // Default icon
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
    </svg>
  );
}

const fallbackServices = [
  { id: 1, title: "Frontend Development", description: "React, Next.js, JavaScript, HTML, CSS, Tailwind CSS." },
  { id: 2, title: "Backend Development", description: "Node.js, Express.js, PHP, MVC, SQL, CMS, NoSQL, API." },
  { id: 3, title: "E-Commerce Development", description: "WooCommerce, Shopify, custom online stores." },
  { id: 4, title: "Performance Optimization", description: "Speed, SEO, Core Web Vitals improvements." },
  { id: 5, title: "Website Maintenance", description: "Updates, security, bug fixes." },
  { id: 6, title: "Server Management", description: "Hosting, SSL, Deployment, Backups." },
];

const delays = [100, 300, 500, 100, 300, 500];

export default async function Services() {
  let services: any[] = [];
  try {
    services = await getServices();
  } catch {
    services = [];
  }

  const items = Array.isArray(services) && services.length > 0 ? services : fallbackServices;

  return (
    <div className="rn-service-area rn-section-gap section-separator" id="features">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-left" data-aos="fade-up" data-aos-duration="500" data-aos-delay="100" data-aos-once="true">
              <span className="subtitle">Features</span>
              <h2 className="title">What I Do</h2>
            </div>
          </div>
        </div>
        <div className="row row--25 mt_md--10 mt_sm--10">
          {items.map((service: any, index: number) => (
            <div key={service.id ?? index} data-aos="fade-up" data-aos-duration="500" data-aos-delay={delays[index % delays.length]} data-aos-once="true"
              className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30">
              <div className="rn-service">
                <div className="inner">
                  <div className="icon">
                    {service.icon_url ? (
                      <img src={service.icon_url} alt={service.title} width={24} height={24} />
                    ) : (
                      <ServiceIcon title={service.title} />
                    )}
                  </div>
                  <div className="content">
                    <h4 className="title"><a href="javascript:void(0)">{service.title}</a></h4>
                    <p className="description">{service.content}</p>
                    {/* <a className="read-more-button" href="javascript:void(0)"><i className="feather-arrow-right"></i></a> */}
                  </div>
                </div>
                <a className="over-link" href="javascript:void(0)"></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
