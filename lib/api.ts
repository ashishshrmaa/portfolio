const BASE = process.env.NEXT_PUBLIC_WP_API;

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

// ── GET endpoints
export const getPortfolioList    = () => get<any[]>("/portfolio-list");
export const getPortfolioPage    = () => get<any>("/portfolio-page");
export const getPortfolioBySlug  = (slug: string) => get<any>(`/portfolio/${slug}`);
// alias kept for backward compat
export const getPortfolioDetail  = (slug: string) => getPortfolioBySlug(slug);
export const getServices         = () => get<any[]>("/services");
export const getWorkExperience   = () => get<any[]>("/workexperience");
export const getEducation        = () => get<any[]>("/education");
export const getTestimonials     = () => get<any[]>("/testimonials");

// ── POST endpoints
export async function submitContact(data: {
  name: string; email: string; message: string;
}) {
  const res = await fetch(`${BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Contact form failed");
  return res.json();
}

export async function submitQuote(data: {
  name: string; email: string; project: string;
}) {
  const res = await fetch(`${BASE}/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Quote form failed");
  return res.json();
}
