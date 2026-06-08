"use client";
import { useState } from "react";

export default function QuoteModal() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", projectType: "", budget: "", message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", projectType: "", budget: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        .quote-modal-overlay {
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
        }
        .quote-modal-content {
          background: #13131d;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }
        .quote-modal-left {
          background: linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          padding: 48px 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .quote-modal-left::before {
          content: '';
          position: absolute;
          top: -60px;
          right: -60px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(249,0,77,0.15) 0%, transparent 70%);
          border-radius: 50%;
        }
        .quote-modal-left::after {
          content: '';
          position: absolute;
          bottom: -40px;
          left: -40px;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(57,73,171,0.2) 0%, transparent 70%);
          border-radius: 50%;
        }
        .quote-accent-line {
          width: 48px;
          height: 3px;
          background: #f9004d;
          border-radius: 2px;
          margin-bottom: 20px;
        }
        .quote-modal-left h2 {
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .quote-modal-left p {
          color: rgba(255,255,255,0.55);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .quote-feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .quote-feature-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.7);
          font-size: 0.875rem;
          margin-bottom: 14px;
        }
        .quote-feature-list li span.check {
          width: 22px;
          height: 22px;
          background: rgba(249,0,77,0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f9004d;
          font-size: 12px;
          flex-shrink: 0;
        }
        .quote-modal-right {
          padding: 40px 36px;
          overflow-y: auto;
          max-height: 90vh;
        }
        .quote-modal-right h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }
        .quote-modal-right .subtitle-text {
          color: rgba(255,255,255,0.4);
          font-size: 0.875rem;
          margin-bottom: 28px;
        }
        .qform-group {
          margin-bottom: 18px;
        }
        .qform-group label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 7px;
        }
        .qform-group input,
        .qform-group select,
        .qform-group textarea {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 16px;
          color: #fff;
          font-size: 0.9rem;
          transition: all 0.2s;
          outline: none;
          font-family: inherit;
        }
        .qform-group input:focus,
        .qform-group select:focus,
        .qform-group textarea:focus {
          border-color: #f9004d;
          background: rgba(249,0,77,0.04);
        }
        .qform-group select option {
          background: #1a1a2e;
          color: #fff;
        }
        .qform-group textarea {
          resize: vertical;
          min-height: 100px;
        }
        .qform-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .quote-submit-btn {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #f9004d, #cf1e6d);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 4px;
        }
        .quote-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(249,0,77,0.35);
        }
        .quote-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .quote-success {
          text-align: center;
          padding: 40px 20px;
        }
        .quote-success .success-icon {
          width: 70px;
          height: 70px;
          background: rgba(39,174,96,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin: 0 auto 20px;
        }
        .quote-success h4 {
          color: #fff;
          font-size: 1.3rem;
          margin-bottom: 10px;
        }
        .quote-success p {
          color: rgba(255,255,255,0.5);
          font-size: 0.9rem;
        }
        .quote-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          color: rgba(255,255,255,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          z-index: 10;
          transition: all 0.2s;
          line-height: 1;
        }
        .quote-close-btn:hover {
          background: rgba(249,0,77,0.15);
          border-color: #f9004d;
          color: #fff;
        }
        @media (max-width: 767px) {
          .quote-modal-left { display: none; }
          .qform-row { grid-template-columns: 1fr; }
          .quote-modal-right { padding: 28px 20px; }
        }
      `}</style>

      <div className="modal fade" id="quoteModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content quote-modal-content" style={{ background: "transparent", border: "none" }}>
            <button
              type="button"
              className="quote-close-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              ×
            </button>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr" }}>
              {/* Left Panel */}
              <div className="quote-modal-left">
                <div className="quote-accent-line"></div>
                <h2>Let&apos;s Build Something Great</h2>
                <p>Tell me about your project and I&apos;ll get back to you within 24 hours with a detailed proposal.</p>
                <ul className="quote-feature-list">
                  <li><span className="check">✓</span> Free initial consultation</li>
                  <li><span className="check">✓</span> Detailed project estimate</li>
                  <li><span className="check">✓</span> No hidden charges</li>
                  <li><span className="check">✓</span> Response within 24 hours</li>
                  <li><span className="check">✓</span> Flexible engagement models</li>
                </ul>
              </div>

              {/* Right Panel - Form */}
              <div className="quote-modal-right">
                {status === "success" ? (
                  <div className="quote-success">
                    <div className="success-icon">✅</div>
                    <h4>Quote Request Sent!</h4>
                    <p>Thank you for reaching out. I&apos;ll review your project details and get back to you shortly.</p>
                  </div>
                ) : (
                  <>
                    <h3>Get a Quote</h3>
                    <p className="subtitle-text">Fill out the form below and I&apos;ll get back to you</p>

                    {status === "error" && (
                      <div style={{ background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.3)", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", color: "#e74c3c", fontSize: "0.875rem" }}>
                        Something went wrong. Please try again.
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="qform-row">
                        <div className="qform-group">
                          <label>Your Name *</label>
                          <input type="text" name="name" placeholder="John Doe"
                            value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="qform-group">
                          <label>Email *</label>
                          <input type="email" name="email" placeholder="john@example.com"
                            value={formData.email} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className="qform-row">
                        <div className="qform-group">
                          <label>Phone</label>
                          <input type="text" name="phone" placeholder="+91 XXXXX XXXXX"
                            value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="qform-group">
                          <label>Project Type</label>
                          <select name="projectType" value={formData.projectType} onChange={handleChange}>
                            <option value="">Select type</option>
                            <option value="Frontend Development">Frontend Development</option>
                            <option value="Backend Development">Backend Development</option>
                            <option value="E-Commerce">E-Commerce</option>
                            <option value="Full Stack">Full Stack</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="qform-group">
                        <label>Budget Range</label>
                        <select name="budget" value={formData.budget} onChange={handleChange}>
                          <option value="">Select budget</option>
                          <option value="Under $500">Under $500</option>
                          <option value="$500 - $1000">$500 – $1,000</option>
                          <option value="$1000 - $5000">$1,000 – $5,000</option>
                          <option value="$5000+">$5,000+</option>
                        </select>
                      </div>

                      <div className="qform-group">
                        <label>Message</label>
                        <textarea name="message" placeholder="Describe your project, goals, and timeline..."
                          value={formData.message} onChange={handleChange}></textarea>
                      </div>

                      <button type="submit" className="quote-submit-btn" disabled={status === "loading"}>
                        {status === "loading" ? "Sending..." : "Send Quote Request →"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
