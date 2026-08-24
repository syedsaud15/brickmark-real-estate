import { Building2, Shield, Search, MapPin, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="container">
        {/* Why Us */}
        <div className="why-grid" style={{ marginBottom: 80 }}>
          {[
            { icon: <Shield size={24} />, title: "100% Verified Listings", desc: "Every property is verified by our expert team for your peace of mind." },
            { icon: <MapPin size={24} />, title: "Prime Locations", desc: "Curated properties in Bangalore & Mumbai's best neighbourhoods." },
            { icon: <Users size={24} />, title: "Trusted Agents", desc: "Connect directly with experienced, background-checked property agents." },
            { icon: <Star size={24} />, title: "Premium Experience", desc: "Transparent pricing, detailed listings, and zero hidden charges." },
          ].map((w) => (
            <div className="why-card" key={w.title}>
              <div className="why-icon">{w.icon}</div>
              <div className="why-title">{w.title}</div>
              <p className="why-desc">{w.desc}</p>
            </div>
          ))}
        </div>

        <div className="divider" style={{ marginBottom: 48 }} />

        <div className="footer-grid">
          <div>
            <div className="navbar-logo" style={{ cursor: "default" }}>
              <div className="navbar-logo-icon">
                <Building2 size={20} color="#fff" />
              </div>
              <span style={{ fontFamily: "Outfit", fontSize: 20, fontWeight: 800 }}>
                Brick<span style={{ color: "var(--primary)" }}>Mark</span>
              </span>
            </div>
            <p className="footer-brand-desc">
              India's trusted property search platform. Discover, compare, and connect
              with verified properties across Bangalore and Mumbai.
            </p>
          </div>

          <div>
            <div className="footer-col-title">Explore</div>
            <div className="footer-links">
              <span className="footer-link" onClick={() => navigate("/search?listing_type=buy")}>Buy Property</span>
              <span className="footer-link" onClick={() => navigate("/search?listing_type=rent")}>Rent Property</span>
              <span className="footer-link" onClick={() => navigate("/search?city=Bangalore")}>Bangalore</span>
              <span className="footer-link" onClick={() => navigate("/search?city=Mumbai")}>Mumbai</span>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Property Types</div>
            <div className="footer-links">
              <span className="footer-link" onClick={() => navigate("/search?property_type=Apartment")}>Apartments</span>
              <span className="footer-link" onClick={() => navigate("/search?property_type=Villa")}>Villas</span>
              <span className="footer-link" onClick={() => navigate("/search?property_type=Studio")}>Studio Flats</span>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Company</div>
            <div className="footer-links">
              <span className="footer-link">About Us</span>
              <span className="footer-link">Contact</span>
              <span className="footer-link">Careers</span>
              <span className="footer-link">Blog</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2024 BrickMark. All rights reserved.</span>
          <div className="footer-bottom-links">
            <span className="footer-bottom-link">Privacy Policy</span>
            <span className="footer-bottom-link">Terms of Service</span>
            <span className="footer-bottom-link">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
