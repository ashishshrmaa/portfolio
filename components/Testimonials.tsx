"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { getTestimonials } from "@/lib/api";

type Testimonial = {
  id: number;
  title: string;
  designation: string;
  company?: string;
  review_title?: string;
  review_detail?: string;
  date?: string;
  review: string;
  photo?: string;
  rating?: number;
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getTestimonials()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          // Fallback data if API returns empty
          setTestimonials([
            {
              id: 1,
              title: "Nevine Acotanza",
              designation: "Chief Operating Officer",
              company: "Rainbow-Themes",
              review_title: "Android App Development",
              date: "via Upwork - Mar 4, 2015 - Aug 30, 2021",
              review: "Maecenas finibus nec sem ut imperdiet. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris.",
              rating: 5,
            },
            {
              id: 2,
              title: "Jone Duone Joe",
              designation: "Operating Officer",
              company: "Bound - Trolola",
              review_title: "Web App Development",
              date: "Upwork - Mar 4, 2016 - Aug 30, 2021",
              review: "Important fact to nec sem ut imperdiet. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit.",
              rating: 5,
            },
          ]);
        }
      })
      .catch(() => {
        setTestimonials([
          {
            id: 1,
            title: "Nevine Acotanza",
            designation: "Chief Operating Officer",
            company: "Rainbow-Themes",
            review_title: "Android App Development",
            date: "via Upwork",
            review: "Maecenas finibus nec sem ut imperdiet. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris.",
            rating: 5,
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (testimonials.length < 2) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [testimonials]);

  const goTo = (index: number) => {
    setCurrent(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4500);
  };

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  if (loading) {
    return (
      <section className="rn-testimonial-area rn-section-gap section-separator" id="testimonial">
        <div className="container">
          <div className="section-title text-center mb-5">
            <span className="subtitle">What Clients Say</span>
            <h2 className="title">Testimonial</h2>
          </div>
          <div className="text-center" style={{ padding: "60px 0", opacity: 0.4 }}>
            <p>Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const t = testimonials[current];
  console.log(t);

  return (
    <section className="rn-testimonial-area rn-section-gap section-separator" id="testimonial">
      <div className="container">
        <div className="section-title text-center mb-5">
          <span className="subtitle">What Clients Say</span>
          <h2 className="title">Testimonial</h2>
        </div>

        <div className="testimonial-slider-wrapper" style={{ position: "relative" }}>
          <div className="item">
            <div className="testimonial-card">
              <div className="card-info">
                <div className="card-thumbnail">
                  {t.photo ? (
                    <img src={t.photo}
                      alt={t.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "48px",
                        fontWeight: "bold",
                        color: "#fff",
                        borderRadius: "8px",
                      }}
                    >
                      {t.title?.charAt(0) ?? "?"}
                    </div>
                  )}
                </div>
                {t.company && <span className="subtitle">{t.company}</span>}
                <h3>{t.title}</h3>
                <p>{t.designation}</p>
              </div>

              <div className="card-description">
                <div className="title-area">
                  <div>
                    {t.review_title && <h3>{t.review_title}</h3>}
                    {t.review_detail && <span>{t.review_detail}</span>}
                    {/* {t.date && <span>{t.date}</span>} */}
                  </div>
                  <div className="rating">
                    {"⭐".repeat(t.rating ?? 5)}
                  </div>
                </div>
                <div className="separator"></div>
                <p>{t.review}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                marginTop: "32px",
              }}
            >
              <button
                onClick={prev}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s",
                }}
                aria-label="Previous"
              >
                ‹
              </button>

              <div style={{ display: "flex", gap: "8px" }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    style={{
                      width: i === current ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background: i === current ? "var(--color-primary, #f9004d)" : "rgba(255,255,255,0.3)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      padding: 0,
                    }}
                    aria-label={`Go to ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s",
                }}
                aria-label="Next"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
