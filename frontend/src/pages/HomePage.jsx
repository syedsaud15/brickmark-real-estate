import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import HeroSearch from "../components/HeroSearch";
import PropertyCard, { SkeletonGrid } from "../components/PropertyCard";
import PropertyDetail from "../components/PropertyDetail";
import ContactModal from "../components/ContactModal";
import Footer from "../components/Footer";

const API = "http://localhost:8000";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProp, setSelectedProp] = useState(null);
  const [contactProp, setContactProp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/api/properties`, { params: { sort_by: "newest" } })
      .then((res) => {
        // Show 6 featured properties (mix of cities)
        const props = res.data.properties || [];
        setFeatured(props.slice(0, 6));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleContact = (prop) => {
    setSelectedProp(null);
    setContactProp(prop);
  };

  return (
    <>
      <Navbar />

      <HeroSearch />

      {/* Featured Properties */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                Featured <span>Properties</span>
              </h2>
              <p className="section-subtitle">
                Handpicked premium listings across Bangalore &amp; Mumbai
              </p>
            </div>
            <span className="section-link" onClick={() => navigate("/search")}>
              View All →
            </span>
          </div>

          {loading ? (
            <SkeletonGrid count={6} />
          ) : (
            <div className="property-grid">
              {featured.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  onSelect={setSelectedProp}
                  onContact={handleContact}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)",
          padding: "60px 0",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "Outfit",
              fontSize: "clamp(24px,4vw,40px)",
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            Ready to Find Your Perfect Home?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 28 }}>
            Browse 20 verified properties in Bangalore &amp; Mumbai right now.
          </p>
          <button
            id="cta-browse-btn"
            onClick={() => navigate("/search")}
            style={{
              background: "#fff",
              color: "var(--primary)",
              padding: "14px 36px",
              borderRadius: "var(--radius-md)",
              fontFamily: "Outfit",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
              border: "none",
              transition: "var(--transition)",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            Browse All Properties
          </button>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      {selectedProp && (
        <PropertyDetail
          property={selectedProp}
          onClose={() => setSelectedProp(null)}
          onContact={handleContact}
        />
      )}
      {contactProp && (
        <ContactModal
          property={contactProp}
          onClose={() => setContactProp(null)}
        />
      )}
    </>
  );
}
