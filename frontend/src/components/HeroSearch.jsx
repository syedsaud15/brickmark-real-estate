import { useState } from "react";
import { Search, MapPin, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BUDGET_RANGES_BUY, BUDGET_RANGES_RENT } from "../utils";

const CITIES = ["Bangalore", "Mumbai"];

const LOCALITIES = {
  Bangalore: [
    "Koramangala", "Whitefield", "Indiranagar", "HSR Layout",
    "Bellandur", "Jayanagar", "Electronic City", "Sarjapur Road",
    "Marathahalli", "JP Nagar",
  ],
  Mumbai: [
    "Bandra West", "Powai", "Andheri West", "Juhu", "Malad West",
    "Thane West", "Worli", "Goregaon East", "Navi Mumbai", "Lower Parel",
  ],
};

export default function HeroSearch() {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState("buy");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [budget, setBudget] = useState("");
  const [bhk, setBhk] = useState(null);

  const budgetRanges = listingType === "buy" ? BUDGET_RANGES_BUY : BUDGET_RANGES_RENT;

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("listing_type", listingType);
    if (city) params.set("city", city);
    if (locality) params.set("locality", locality);
    if (budget) {
      const range = budgetRanges[parseInt(budget)];
      if (range) {
        params.set("min_price", range.min);
        params.set("max_price", range.max);
      }
    }
    if (bhk) params.set("bedrooms", bhk);
    navigate(`/search?${params.toString()}`);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setLocality("");
  };

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="container hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          India's Trusted Property Search
        </div>

        <h1 className="hero-title">
          Find Your Dream<br />
          <span className="highlight">Property in India</span>
        </h1>
        <p className="hero-subtitle">
          Discover verified properties across Bangalore &amp; Mumbai.
          Buy or rent homes with complete transparency.
        </p>

        {/* Search Box */}
        <div className="search-box">
          <div className="search-tabs">
            {["buy", "rent"].map((t) => (
              <button
                key={t}
                className={`search-tab${listingType === t ? " active" : ""}`}
                onClick={() => { setListingType(t); setBudget(""); }}
              >
                {t === "buy" ? "Buy" : "Rent"}
              </button>
            ))}
          </div>

          <div className="search-row">
            <div className="search-field">
              <label>City</label>
              <select
                id="hero-city-select"
                className="search-select"
                value={city}
                onChange={handleCityChange}
              >
                <option value="">All Cities</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="search-field" style={{ flex: 2 }}>
              <label>Locality / Area</label>
              <select
                id="hero-locality-select"
                className="search-select"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                disabled={!city}
              >
                <option value="">
                  {city ? "Select Locality" : "Select city first"}
                </option>
                {city && LOCALITIES[city]?.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div className="search-field">
              <label>Budget</label>
              <select
                id="hero-budget-select"
                className="search-select"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="">Any Budget</option>
                {budgetRanges.map((r, i) => (
                  <option key={i} value={i}>{r.label}</option>
                ))}
              </select>
            </div>

            <button id="hero-search-btn" className="search-btn" onClick={handleSearch}>
              <Search size={16} />
              Search
            </button>
          </div>

          {/* BHK Quick Filter */}
          <div className="bhk-row">
            <span className="bhk-label">BHK:</span>
            {[1, 2, 3, 4, 5].map((b) => (
              <button
                key={b}
                id={`hero-bhk-${b}`}
                className={`bhk-btn${bhk === b ? " active" : ""}`}
                onClick={() => setBhk(bhk === b ? null : b)}
              >
                {b} BHK
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div>
            <div className="hero-stat-value">20+</div>
            <div className="hero-stat-label">Verified Properties</div>
          </div>
          <div>
            <div className="hero-stat-value">2</div>
            <div className="hero-stat-label">Prime Cities</div>
          </div>
          <div>
            <div className="hero-stat-value">100%</div>
            <div className="hero-stat-label">Transparent Listings</div>
          </div>
        </div>
      </div>
    </section>
  );
}
