import { MapPin, Bed, Bath, Square, CheckCircle } from "lucide-react";
import { formatPrice } from "../utils";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton skeleton-line medium" />
        <div className="skeleton skeleton-line short" />
        <div style={{ display: "flex", gap: 12 }}>
          <div className="skeleton skeleton-line" style={{ width: "30%" }} />
          <div className="skeleton skeleton-line" style={{ width: "30%" }} />
          <div className="skeleton skeleton-line" style={{ width: "25%" }} />
        </div>
        <div className="skeleton skeleton-line" style={{ width: "50%" }} />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="property-grid">
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}

export default function PropertyCard({ property, onSelect, onContact }) {
  const initials = property.posted_by
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AG";

  return (
    <div
      className="property-card"
      id={`prop-card-${property.id}`}
      onClick={() => onSelect(property)}
    >
      <div className="card-img-wrap">
        <img
          src={property.image_url}
          alt={property.title}
          loading="lazy"
          onError={(e) => {
            e.target.src =
              `https://placehold.co/800x500/1A1A24/E53935?text=${encodeURIComponent(property.locality)}`;
          }}
        />
        <span className="card-badge-price">
          {formatPrice(property.price, property.listing_type)}
        </span>
        <span className="card-badge-type">{property.property_type}</span>
        {property.is_verified === 1 && (
          <span className="card-verified">
            <CheckCircle size={10} />
            Verified
          </span>
        )}
      </div>

      <div className="card-body">
        <div className="card-title">{property.title}</div>
        <div className="card-locality">
          <MapPin size={13} color="var(--primary)" />
          {property.locality}, {property.city}
        </div>

        <div className="card-specs">
          <span className="card-spec">
            <Bed size={14} />
            {property.bedrooms} BHK
          </span>
          <span className="card-spec">
            <Bath size={14} />
            {property.bathrooms} Bath
          </span>
          <span className="card-spec">
            <Square size={14} />
            {property.area_sqft.toLocaleString()} sqft
          </span>
        </div>

        <div className="card-footer">
          <div className="card-agent">
            <div className="card-agent-dot">{initials}</div>
            <span>{property.posted_by || "Agent"}</span>
          </div>
          <button
            className="card-contact-btn"
            id={`contact-btn-${property.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onContact(property);
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
