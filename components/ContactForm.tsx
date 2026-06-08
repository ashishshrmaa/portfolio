"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="rn-contact-area rn-section-gap section-separator" id="contacts">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="subtitle">Contact</span>
              <h2 className="title">Contact With Me</h2>
            </div>
          </div>
        </div>

        <div className="row mt--50 mt_md--40 mt_sm--40 mt-contact-sm">
          <div className="col-lg-5">
            <div className="contact-about-area">
              <div className="thumbnail">
                <img src="/assets/images/contact1.png" alt="contact-img" />
              </div>
              <div className="title-area">
                <h4 className="title">Ashish Sharma</h4>
              </div>
              <div className="description">
                <p>I am available for freelance work. Connect with me via and call in to my account.</p>
                <span className="phone">Phone: <a href="https://wa.me/+919928686337">+919928686337</a></span>
                <span className="mail">Email: <a href="mailto:ashishshrmaa@outlook.com">ashishshrmaa@outlook.com</a></span>
              </div>
              <div className="social-area">
                <div className="name">FIND WITH ME</div>
                <div className="social-icone">
                  <a href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                  <a href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                  <a href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7 contact-input">
            <div className="contact-form-wrapper">
              <div className="introduce">
                {status === "success" && (
                  <div className="alert alert-success mb-4" role="alert">
                    ✅ Your message has been sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="alert alert-danger mb-4" role="alert">
                    ❌ {errorMsg}
                  </div>
                )}
                <form className="rnt-contact-form rwt-dynamic-form row" onSubmit={handleSubmit}>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="contact-name">Your Name</label>
                      <input className="form-control form-control-lg" name="name" id="contact-name" type="text"
                        value={formData.name} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="contact-phone">Phone Number</label>
                      <input className="form-control" name="phone" id="contact-phone" type="text"
                        value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="contact-email">Email</label>
                      <input className="form-control form-control-sm" id="contact-email" name="email" type="email"
                        value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input className="form-control form-control-sm" id="subject" name="subject" type="text"
                        value={formData.subject} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="contact-message">Your Message</label>
                      <textarea name="message" id="contact-message" cols={30} rows={10}
                        value={formData.message} onChange={handleChange} required></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button name="submit" type="submit" className="rn-btn" disabled={status === "loading"}>
                      <span>{status === "loading" ? "SENDING..." : "SEND MESSAGE"}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
