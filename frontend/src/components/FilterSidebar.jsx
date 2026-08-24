import { CheckCircle } from "lucide-react";
import { BUDGET_RANGES_BUY, BUDGET_RANGES_RENT, PROPERTY_TYPES, FURNISHED_OPTIONS } from "../utils";

const LOCALITIES = {
  Bangalore: ["Koramangala","Whitefield","Indiranagar","HSR Layout","Bellandur","Jayanagar","Electronic City","Sarjapur Road","Marathahalli","JP Nagar"],
  Mumbai: ["Bandra West","Powai","Andheri West","Juhu","Malad West","Thane West","Worli","Goregaon East","Navi Mumbai","Lower Parel"],
};

function CheckOption({ label, active, onClick, id }) {
  return (
    <div
      className={`filter-option${active ? " active" : ""}`}
      onClick={onClick}
      id={id}
    >
      <div className="filter-checkbox">
        {active && <CheckCircle size={11} color="#fff" strokeWidth={3} />}
      </div>
      {label}
    </div>
  );
}

export default function FilterSidebar({ filters, onChange, onClear }) {
  const { listingType, city, bedrooms, propertyType, locality, furnished } = filters;
  const budgetRanges = listingType === "buy" ? BUDGET_RANGES_BUY : BUDGET_RANGES_RENT;

  const toggle = (key, value) => {
    onChange({ [key]: filters[key] === value ? "" : value });
  };

  const toggleBedrooms = (val) => {
    onChange({ bedrooms: filters.bedrooms === val ? null : val });
  };

  const handleBudgetChange = (idx) => {
    const range = budgetRanges[idx];
    if (filters.budgetIdx === idx) {
      onChange({ budgetIdx: null, min_price: "", max_price: "" });
    } else {
      onChange({ budgetIdx: idx, min_price: range.min, max_price: range.max });
    }
  };

  return (
    <aside className="filter-sidebar" id="filter-sidebar">
      <div className="filter-title">
        Filters
        <button className="filter-clear-btn" onClick={onClear} id="filter-clear-btn">
          Clear All
        </button>
      </div>

      {/* Listing Type */}
      <div className="filter-section">
        <div className="filter-section-title">Listing Type</div>
        {["buy", "rent"].map((t) => (
          <CheckOption
            key={t}
            id={`filter-lt-${t}`}
            label={t === "buy" ? "Buy" : "Rent"}
            active={listingType === t}
            onClick={() => toggle("listingType", t)}
          />
        ))}
      </div>

      <div className="filter-divider" />

      {/* City */}
      <div className="filter-section">
        <div className="filter-section-title">City</div>
        {["Bangalore", "Mumbai"].map((c) => (
          <CheckOption
            key={c}
            id={`filter-city-${c.toLowerCase()}`}
            label={c}
            active={city === c}
            onClick={() => toggle("city", c)}
          />
        ))}
      </div>

      <div className="filter-divider" />

      {/* Locality */}
      {city && (
        <>
          <div className="filter-section">
            <div className="filter-section-title">Locality</div>
            <select
              id="filter-locality-select"
              className="filter-select"
              value={locality}
              onChange={(e) => onChange({ locality: e.target.value })}
            >
              <option value="">All Localities</option>
              {LOCALITIES[city]?.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div className="filter-divider" />
        </>
      )}

      {/* Budget */}
      <div className="filter-section">
        <div className="filter-section-title">Budget</div>
        {budgetRanges.map((r, i) => (
          <CheckOption
            key={i}
            id={`filter-budget-${i}`}
            label={r.label}
            active={filters.budgetIdx === i}
            onClick={() => handleBudgetChange(i)}
          />
        ))}
      </div>

      <div className="filter-divider" />

      {/* BHK */}
      <div className="filter-section">
        <div className="filter-section-title">Bedrooms (BHK)</div>
        {[1, 2, 3, 4, 5].map((b) => (
          <CheckOption
            key={b}
            id={`filter-bhk-${b}`}
            label={`${b} BHK`}
            active={bedrooms === b}
            onClick={() => toggleBedrooms(b)}
          />
        ))}
      </div>

      <div className="filter-divider" />

      {/* Property Type */}
      <div className="filter-section">
        <div className="filter-section-title">Property Type</div>
        {PROPERTY_TYPES.map((pt) => (
          <CheckOption
            key={pt}
            id={`filter-type-${pt.toLowerCase()}`}
            label={pt}
            active={propertyType === pt}
            onClick={() => toggle("propertyType", pt)}
          />
        ))}
      </div>

      <div className="filter-divider" />

      {/* Furnished */}
      <div className="filter-section">
        <div className="filter-section-title">Furnishing</div>
        {FURNISHED_OPTIONS.map((f) => (
          <CheckOption
            key={f}
            id={`filter-furnished-${f.toLowerCase().replace(" ", "-")}`}
            label={f}
            active={furnished === f}
            onClick={() => toggle("furnished", f)}
          />
        ))}
      </div>
    </aside>
  );
}
