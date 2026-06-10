import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioDetail, { type PortfolioDetailData } from "@/components/PortfolioDetail";

const API_BASE = "https://reactapp.kgkrealty.com/ashportfolio/wp-json/custom/v1";

async function getProject(slug: string): Promise<PortfolioDetailData | null> {
  try {
    const res = await fetch(`${API_BASE}/portfolio/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json?.success && json?.data) return json.data;
    if (json?.id) return json;
    return null;
  } catch (err) {
    console.error("Portfolio fetch error:", err);
    return null;
  }
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <PortfolioDetail project={project!} />
      <Footer />
    </>
  );
}
