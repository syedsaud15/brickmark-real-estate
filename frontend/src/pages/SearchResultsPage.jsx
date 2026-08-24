import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Home, SlidersHorizontal } from "lucide-react";
import Navbar from "../components/Navbar";
import FilterSidebar from "../components/FilterSidebar";
import PropertyCard, { SkeletonGrid } from "../components/PropertyCard";
import PropertyDetail from "../components/PropertyDetail";
import ContactModal from "../components/ContactModal";
import Footer from "../components/Footer";

const API = "http://localhost:8000";

function buildApiParams(filters, sortBy) {
  const p = {};
  if (filters.city) p.city = filters.city;
  if (filters.listingType) p.listing_type = filters.listingType;
  if (filters.bedrooms) p.bedrooms = filters.bedrooms;
  if (filters.propertyType) p.property_type = filters.propertyType;
  if (filters.locality) p.locality = filters.locality;
  if (filters.furnished) p.furnished = filters.furnished;
  if (filters.min_price !== "") p.min_price = filters.min_price;
  if (filters.max_price !== "") p.max_price = filters.max_price;
  p.sort_by = sortBy;
  return p;
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Initialise filters from URL query params
  const [filters, setFilters] = useState(() => ({
    city: searchParams.get("city") || "",
    listingType: searchParams.get("listing_type") || "",
    bedrooms: searchParams.get("bedrooms") ? parseInt(searchParams.get("bedrooms")) : null,
    propertyType: searchParams.get("property_type") || "",
    locality: searchParams.get("locality") || "",
    furnished: searchParams.get("furnished") || "",
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
    budgetIdx: null,
  }));
  const [sortBy, setSortBy] = useState("newest");
  const [properties, setProperties] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedProp, setSelectedProp] = useState(null);
  const [contactProp, setContactProp] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const fetchProperties = useCallback(() => {
    setLoading(true);
    const params = buildApiParams(filters, sortBy);
    axios
      .get(`${API}/api/properties`, { params })
      .then((res) => {
        setProperties(res.data.properties || []);
        setTotal(res.data.total || 0);
      })
      .finally(() => setLoading(false));
  }, [filters, sortBy]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleFilterChange = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const handleClear = () => {
    setFilters({
      city: "", listingType: "", bedrooms: null,
      propertyType: "", locality: "", furnished: "",
      min_price: "", max_price: "", budgetIdx: null,
    });
  };

  const handleContact = (prop) => {
    setSelectedProp(null);
    setContactProp(prop);
  };

  return (
    <>
      <Navbar />

      <div className="results-page">
        {/* Sub-navbar breadcrumb */}
        <div
          style={{
            background: "var(--bg-card)",
            borderBottom: "1px solid var(--border)",
            padding: "12px 0",
          }}
        >
          <div
            className="container"
            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--text-muted)" }}
          >
            <Home size={14} />
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Home</span>
            <span>›</span>
            <span style={{ color: "var(--text-secondary)" }}>
              {filters.city || "All Cities"} Properties
              {filters.listingType && ` for ${filters.listingType === "buy" ? "Sale" : "Rent"}`}
            </span>
            {/* Mobile filter toggle */}
            <button
              id="mobile-filter-btn"
              onClick={() => setShowMobileFilters((v) => !v)}
              style={{
                marginLeft: "auto",
                display: "none",
                alignItems: "center",
                gap: 6,
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "6px 12px",
                color: "var(--text-primary)",
                fontSize: 13,
                cursor: "pointer",
              }}
              className="mobile-filter-toggle"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>
        </div>

        <div className="container">
          <div className="results-layout">
            {/* Sidebar */}
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onClear={handleClear}
            />

            {/* Results */}
            <div className="results-main">
              <div className="results-topbar">
                <div className="results-count">
                  <strong>{total}</strong>{" "}
                  {total === 1 ? "property" : "properties"} found
                  {filters.city && ` in ${filters.city}`}
                </div>
                <select
                  id="sort-select"
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="price_asc">Sort: Price ↑ Low to High</option>
                  <option value="price_desc">Sort: Price ↓ High to Low</option>
                </select>
              </div>

              {loading ? (
                <SkeletonGrid count={6} />
              ) : properties.length === 0 ? (
                <div className="no-results" id="no-results-msg">
                  <Home size={48} />
                  <h3>No properties found</h3>
                  <p>Try adjusting or clearing your filters to see more results.</p>
                  <button
                    onClick={handleClear}
                    style={{
                      marginTop: 20,
                      padding: "10px 28px",
                      background: "var(--primary)",
                      color: "#fff",
                      borderRadius: "var(--radius-md)",
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="property-grid">
                  {properties.map((p) => (
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
          </div>
        </div>
      </div>

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
