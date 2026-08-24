import { useState } from "react";
import { X, CheckCircle, Send } from "lucide-react";

export default function ContactModal({ property, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  if (!property) return null;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    // In a real app, POST to /api/enquiries here
    setSubmitted(true);
  };

  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="modal-overlay" onClick={onClose} id="contact-modal-overlay">
      <div
        className="contact-modal-panel"
        onClick={(e) => e.stopPropagation()}
        id="contact-modal-panel"
      >
        <button className="modal-close" onClick={onClose} id="contact-modal-close" style={{ position: "absolute", top: 20, right: 20 }}>
          <X size={16} />
        </button>

        {submitted ? (
          <div className="form-success" id="contact-success-msg">
            <div className="form-success-icon">
              <CheckCircle size={32} />
            </div>
            <h3>Enquiry Sent!</h3>
            <p>
              Thanks, <strong>{form.name}</strong>! {property.posted_by} will reach you
              on <strong>{form.phone}</strong> or <strong>{form.email}</strong> shortly.
            </p>
          </div>
        ) : (
          <>
            <h2 className="contact-modal-title">Send Enquiry</h2>
            <p className="contact-modal-subtitle">
              Contacting about: <strong style={{ color: "var(--text-primary)" }}>{property.title}</strong>
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Full Name *</label>
                <input
                  id="contact-name"
                  className="form-input"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={set("name")}
                  style={errors.name ? { borderColor: "var(--primary)" } : {}}
                />
                {errors.name && <p style={{ color: "var(--primary)", fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-phone">Phone Number *</label>
                <input
                  id="contact-phone"
                  className="form-input"
                  type="tel"
                  placeholder="+91 98XXX XXXXX"
                  value={form.phone}
                  onChange={set("phone")}
                  style={errors.phone ? { borderColor: "var(--primary)" } : {}}
                />
                {errors.phone && <p style={{ color: "var(--primary)", fontSize: 12, marginTop: 4 }}>{errors.phone}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address *</label>
                <input
                  id="contact-email"
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  style={errors.email ? { borderColor: "var(--primary)" } : {}}
                />
                {errors.email && <p style={{ color: "var(--primary)", fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  placeholder="I'm interested in this property and would like to schedule a visit..."
                  value={form.message}
                  onChange={set("message")}
                />
              </div>

              <button type="submit" className="form-submit" id="contact-submit-btn">
                <Send size={16} />
                Send Enquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
