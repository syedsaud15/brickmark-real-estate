// Utility: format price in Indian style (₹ Cr / L / /mo)
export function formatPrice(price, listingType) {
  if (listingType === "rent") {
    return `₹${price.toLocaleString("en-IN")}/mo`;
  }
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(0)} L`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
}

export const BUDGET_RANGES_BUY = [
  { label: "Under ₹50 L", min: 0, max: 5000000 },
  { label: "₹50 L – ₹1 Cr", min: 5000000, max: 10000000 },
  { label: "₹1 Cr – ₹2 Cr", min: 10000000, max: 20000000 },
  { label: "₹2 Cr – ₹5 Cr", min: 20000000, max: 50000000 },
  { label: "Above ₹5 Cr", min: 50000000, max: 999999999 },
];

export const BUDGET_RANGES_RENT = [
  { label: "Under ₹20K/mo", min: 0, max: 20000 },
  { label: "₹20K – ₹50K/mo", min: 20000, max: 50000 },
  { label: "₹50K – ₹1L/mo", min: 50000, max: 100000 },
  { label: "Above ₹1L/mo", min: 100000, max: 9999999 },
];

export const PROPERTY_TYPES = ["Apartment", "Villa", "Studio"];
export const FURNISHED_OPTIONS = ["Furnished", "Semi-Furnished", "Bare"];
