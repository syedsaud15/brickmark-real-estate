import {
  X, MapPin, Bed, Bath, Square, Layers, Car, Sofa,
  CheckCircle, Phone, MessageSquare,
} from "lucide-react";
import { formatPrice } from "../utils";

export default function PropertyDetail({ property, onClose, onContact }) {
  if (!property) return null;

  let amenities = [];
  try { amenities = JSON.parse(property.amenities || "[]"); } catch {}

  const initials = property.posted_by
    ?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "AG";

  return (
    <div className="modal-overlay" onClick={onClose} id="detail-modal-overlay">
      <div
        className="modal-panel"
        style={{ position: "relative" }}
        onClick={(e) => e.stopPropagation()}
        id="detail-modal-panel"
      >
        <button className="modal-close" onClick={onClose} id="detail-modal-close">
          <X size={16} />
        </button>

        <img
          className="detail-img"
          src={property.image_url}
          alt={property.title}
          onError={(e) => {
            e.target.src = `https://placehold.co/880x340/1A1A24/E53935?text=${encodeURIComponent(property.locality)}`;
          }}
        />

        <div className="detail-content">
          {/* Badges */}
          <div className="detail-badges">
            <span className="detail-badge type">{property.property_type}</span>
            <span className={`detail-badge listing`}>
              {property.listing_type === "buy" ? "For Sale" : "For Rent"}
            </span>
            {property.is_verified === 1 && (
              <span className="detail-badge verified">
                <CheckCircle size={11} style={{ marginRight: 4, display: "inline" }} />
                Verified
              </span>
            )}
          </div>

          <h2 className="detail-title">{property.title}</h2>
          <div className="detail-locality">
            <MapPin size={15} color="var(--primary)" />
            {property.locality}, {property.city}
          </div>

          {/* Price */}
          <div className="detail-price-row">
            <div className="detail-price">
              {formatPrice(property.price, property.listing_type)}
            </div>
            {property.listing_type === "rent" && (
              <span className="detail-price-label">per month</span>
            )}
          </div>

          {/* Spec Grid */}
          <div className="detail-specs-grid">
            <div className="detail-spec-card">
              <Bed size={20} className="detail-spec-icon" />
              <div>
                <div className="detail-spec-val">{property.bedrooms} BHK</div>
                <div className="detail-spec-key">Bedrooms</div>
              </div>
            </div>
            <div className="detail-spec-card">
              <Bath size={20} className="detail-spec-icon" />
              <div>
                <div className="detail-spec-val">{property.bathrooms}</div>
                <div className="detail-spec-key">Bathrooms</div>
              </div>
            </div>
            <div className="detail-spec-card">
              <Square size={20} className="detail-spec-icon" />
              <div>
                <div className="detail-spec-val">{property.area_sqft.toLocaleString()} sqft</div>
                <div className="detail-spec-key">Built-up Area</div>
              </div>
            </div>
            {property.floor && (
              <div className="detail-spec-card">
                <Layers size={20} className="detail-spec-icon" />
                <div>
                  <div className="detail-spec-val">{property.floor}</div>
                  <div className="detail-spec-key">Floor</div>
                </div>
              </div>
            )}
            {property.furnished && (
              <div className="detail-spec-card">
                <Sofa size={20} className="detail-spec-icon" />
                <div>
                  <div className="detail-spec-val">{property.furnished}</div>
                  <div className="detail-spec-key">Furnishing</div>
                </div>
              </div>
            )}
            <div className="detail-spec-card">
              <Car size={20} className="detail-spec-icon" />
              <div>
                <div className="detail-spec-val">{property.parking}</div>
                <div className="detail-spec-key">Parking</div>
              </div>
            </div>
          </div>

          {/* Description */}
          {property.description && (
            <>
              <div className="detail-section-title">About this Property</div>
              <p className="detail-desc">{property.description}</p>
            </>
          )}

          {/* Amenities */}
          {amenities.length > 0 && (
            <>
              <div className="detail-section-title">Amenities</div>
              <div className="amenities-wrap">
                {amenities.map((a) => (
                  <span className="amenity-tag" key={a}>{a}</span>
                ))}
              </div>
            </>
          )}

          {/* Agent + Contact */}
          <div className="detail-agent-card">
            <div className="detail-agent-info">
              <div className="detail-agent-avatar">{initials}</div>
              <div>
                <div className="detail-agent-name">{property.posted_by || "Agent"}</div>
                <div className="detail-agent-phone">{property.contact}</div>
              </div>
            </div>
            <button
              className="contact-agent-btn"
              id={`detail-contact-btn-${property.id}`}
              onClick={() => onContact(property)}
            >
              <MessageSquare size={16} />
              Send Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
