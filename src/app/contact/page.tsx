"use client";
import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, Building2, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const contactInfo = [
    { icon: Phone, label: "Phone", value: "+91 98765 43210", sub: "Mon–Sat, 9am–6pm" },
    { icon: Mail, label: "Email", value: "info@kleanja.com", sub: "Response within 24 hours" },
    { icon: MapPin, label: "Address", value: "India", sub: "Pan India Operations" },
    { icon: Building2, label: "B2B Inquiries", value: "b2b@kleanja.com", sub: "Dedicated B2B support" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-blob" style={{ width: "400px", height: "400px", top: "-100px", right: "-100px", background: "var(--blue-light)" }} />
        <div className="hero-blob" style={{ width: "300px", height: "300px", bottom: "-80px", left: "5%", background: "var(--green-dark)" }} />
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <span className="section-label" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}>
            Get In Touch
          </span>
          <h1 className="heading-xl" style={{ color: "white", marginBottom: "16px" }}>
            Contact Kleanja
          </h1>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "520px", margin: "0 auto" }}>
            Whether you need product info, a bulk quote, or a B2B partnership — we're here to help.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: -2, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--warm-white)" /></svg>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="container">
          <div
            style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "60px", alignItems: "start" }}
            className="contact-grid"
          >
            {/* Left — Contact Info */}
            <div>
              <h2 className="heading-md reveal-left" style={{ marginBottom: "8px" }}>Let's Talk</h2>
              <div className="divider" />
              <p className="body-md reveal-left" style={{ marginBottom: "32px" }}>
                Reach out to us for product inquiries, bulk orders, or partnership opportunities. Our team typically responds within 24 hours.
              </p>

              {contactInfo.map((info, i) => (
                <div
                  key={info.label}
                  className={`reveal-left reveal-delay-${i + 1}`}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "20px",
                    background: "white",
                    borderRadius: "16px",
                    marginBottom: "12px",
                    border: "1px solid rgba(26,107,160,0.08)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "var(--gradient-brand)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <info.icon size={18} color="white" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                      {info.label}
                    </p>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.95rem", color: "var(--gray-800)", marginBottom: "2px" }}>
                      {info.value}
                    </p>
                    <p style={{ fontSize: "0.82rem", color: "var(--gray-400)" }}>{info.sub}</p>
                  </div>
                </div>
              ))}

              {/* Hours */}
              <div
                style={{
                  marginTop: "20px",
                  padding: "20px",
                  background: "var(--blue-pale)",
                  borderRadius: "16px",
                  border: "1px solid rgba(26,107,160,0.12)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Clock size={16} color="var(--blue-primary)" />
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--blue-primary)" }}>
                    Business Hours
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>Monday – Saturday: 9:00 AM – 6:00 PM</p>
                <p style={{ fontSize: "0.85rem", color: "var(--gray-600)" }}>Sunday: Closed</p>
              </div>
            </div>

            {/* Right — Form */}
            <div className="card reveal" style={{ padding: "48px" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background: "var(--green-pale)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                    }}
                  >
                    <CheckCircle size={40} color="var(--green-primary)" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.5rem", color: "var(--gray-800)", marginBottom: "12px" }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: "var(--gray-600)", marginBottom: "24px" }}>
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "", inquiryType: "general" }); }}
                    className="btn-blue"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.3rem", color: "var(--gray-800)", marginBottom: "8px" }}>
                    Send Us a Message
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--gray-600)", marginBottom: "28px" }}>
                    Fill in the details below and we'll get back to you shortly.
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {/* Inquiry Type */}
                    <div>
                      <label className="form-label">Inquiry Type</label>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
                        {["general", "b2b", "bulk", "partnership"].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, inquiryType: type })}
                            style={{
                              padding: "8px 18px",
                              borderRadius: "50px",
                              border: `2px solid ${formData.inquiryType === type ? "var(--blue-primary)" : "var(--gray-200)"}`,
                              background: formData.inquiryType === type ? "var(--blue-pale)" : "white",
                              color: formData.inquiryType === type ? "var(--blue-primary)" : "var(--gray-600)",
                              fontFamily: "var(--font-heading)",
                              fontWeight: 600,
                              fontSize: "0.82rem",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              textTransform: "capitalize",
                            }}
                          >
                            {type === "b2b" ? "B2B" : type.charAt(0).toUpperCase() + type.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name + Company */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
                      <div>
                        <label className="form-label">Full Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Company</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company name" className="form-input" />
                      </div>
                    </div>

                    {/* Email + Phone */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
                      <div>
                        <label className="form-label">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@example.com" className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="form-input" />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="form-label">Subject *</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="What's this about?" className="form-input" />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="form-label">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your requirements, order quantities, or any questions..."
                        className="form-input"
                        style={{ resize: "vertical", minHeight: "120px" }}
                      />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: "center" }}>
                      {loading ? "Sending..." : <><Send size={16} /> Send Message</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .form-label {
          display: block;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.82rem;
          color: var(--gray-600);
          margin-bottom: 6px;
          letter-spacing: 0.03em;
        }
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid var(--gray-200);
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--gray-800);
          background: var(--gray-50);
          transition: all 0.2s ease;
          outline: none;
        }
        .form-input:focus {
          border-color: var(--blue-primary);
          background: white;
          box-shadow: 0 0 0 4px rgba(26,107,160,0.08);
        }
        .form-input::placeholder {
          color: var(--gray-400);
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
