"""
Property Portal API Server
Pure Python stdlib — no native DLL dependencies.
Uses: http.server, sqlite3, json, urllib.parse
Port: 8000
"""

import json
import sqlite3
import urllib.parse
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

DB_PATH = str(Path(__file__).parent / "properties.db")

# ─── Mock Data ───────────────────────────────────────────────────────────────

MOCK_PROPERTIES = [
    # ── BANGALORE ──────────────────────────────────────────────────────────
    {
        "title": "Luxury 3 BHK in the Heart of Koramangala",
        "city": "Bangalore", "locality": "Koramangala",
        "property_type": "Apartment", "listing_type": "buy",
        "price": 18500000, "bedrooms": 3, "bathrooms": 3, "area_sqft": 1850,
        "floor": "7th of 14", "furnished": "Semi-Furnished", "parking": 2,
        "description": "Spacious 3 BHK apartment in Koramangala's prime sector. Features modular kitchen, large balcony with city views, and 24/7 security. Walking distance to restaurants, cafes, and tech parks.",
        "image_url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
        "is_verified": 1, "posted_by": "Rajesh Kumar", "contact": "+91 98451 12345",
        "amenities": json.dumps(["Swimming Pool","Gym","Clubhouse","Power Backup","CCTV","Lift","Children's Play Area"]),
        "created_at": "2024-06-01T10:00:00",
    },
    {
        "title": "Premium 4 BHK Villa in Whitefield",
        "city": "Bangalore", "locality": "Whitefield",
        "property_type": "Villa", "listing_type": "buy",
        "price": 32000000, "bedrooms": 4, "bathrooms": 4, "area_sqft": 3200,
        "floor": "Ground + 1", "furnished": "Furnished", "parking": 3,
        "description": "Independent villa in a gated community near ITPL. Private garden, home theatre, and smart home automation. Ideal for IT professionals seeking premium living near tech corridors.",
        "image_url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
        "is_verified": 1, "posted_by": "Priya Sharma", "contact": "+91 98452 23456",
        "amenities": json.dumps(["Private Garden","Home Theatre","Smart Home","Swimming Pool","Gym","Security","Power Backup"]),
        "created_at": "2024-06-02T10:00:00",
    },
    {
        "title": "Cozy 2 BHK Flat for Rent in Indiranagar",
        "city": "Bangalore", "locality": "Indiranagar",
        "property_type": "Apartment", "listing_type": "rent",
        "price": 45000, "bedrooms": 2, "bathrooms": 2, "area_sqft": 1100,
        "floor": "4th of 8", "furnished": "Furnished", "parking": 1,
        "description": "Fully furnished 2 BHK in Indiranagar's 12th Main. Minutes from 100 Feet Road, Metro station, and CMH Road. Perfect for working professionals.",
        "image_url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        "is_verified": 1, "posted_by": "Anil Menon", "contact": "+91 98453 34567",
        "amenities": json.dumps(["Lift","Power Backup","Security","CCTV","Piped Gas"]),
        "created_at": "2024-06-03T10:00:00",
    },
    {
        "title": "Affordable 2 BHK in HSR Layout",
        "city": "Bangalore", "locality": "HSR Layout",
        "property_type": "Apartment", "listing_type": "buy",
        "price": 9500000, "bedrooms": 2, "bathrooms": 2, "area_sqft": 1050,
        "floor": "2nd of 6", "furnished": "Semi-Furnished", "parking": 1,
        "description": "Value-for-money 2 BHK apartment in HSR Layout Sector 2. Close to Agara Lake, shopping malls, and excellent connectivity to Electronic City and Koramangala.",
        "image_url": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
        "is_verified": 0, "posted_by": "Suresh Babu", "contact": "+91 98454 45678",
        "amenities": json.dumps(["Lift","Security","Power Backup","CCTV"]),
        "created_at": "2024-06-04T10:00:00",
    },
    {
        "title": "Spacious 3 BHK Apartment for Rent in Bellandur",
        "city": "Bangalore", "locality": "Bellandur",
        "property_type": "Apartment", "listing_type": "rent",
        "price": 65000, "bedrooms": 3, "bathrooms": 3, "area_sqft": 1600,
        "floor": "10th of 20", "furnished": "Semi-Furnished", "parking": 2,
        "description": "High-floor 3 BHK with panoramic views in Bellandur. Premium society with world-class amenities. Walking distance to RMZ Ecospace and Manyata Tech Park.",
        "image_url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
        "is_verified": 1, "posted_by": "Kavitha Reddy", "contact": "+91 98455 56789",
        "amenities": json.dumps(["Swimming Pool","Gym","Clubhouse","Tennis Court","Power Backup","CCTV","Lift"]),
        "created_at": "2024-06-05T10:00:00",
    },
    {
        "title": "Classic 3 BHK in Jayanagar's Tree-Lined Streets",
        "city": "Bangalore", "locality": "Jayanagar",
        "property_type": "Apartment", "listing_type": "buy",
        "price": 14000000, "bedrooms": 3, "bathrooms": 2, "area_sqft": 1400,
        "floor": "3rd of 5", "furnished": "Bare", "parking": 1,
        "description": "Well-ventilated 3 BHK in old-Bangalore charm of Jayanagar. Proximity to South End Circle Metro, Big Bazaar, and top schools. An ideal family home in a peaceful neighbourhood.",
        "image_url": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
        "is_verified": 0, "posted_by": "Vijay Nair", "contact": "+91 98456 67890",
        "amenities": json.dumps(["Parking","Security","Power Backup","Water 24x7"]),
        "created_at": "2024-06-06T10:00:00",
    },
    {
        "title": "Compact Studio for Rent near Electronic City",
        "city": "Bangalore", "locality": "Electronic City",
        "property_type": "Studio", "listing_type": "rent",
        "price": 18000, "bedrooms": 1, "bathrooms": 1, "area_sqft": 450,
        "floor": "5th of 10", "furnished": "Furnished", "parking": 0,
        "description": "Modern studio apartment perfect for IT professionals working in Electronic City. All utilities included, high-speed internet, and just 500m from Infosys & Wipro campus gates.",
        "image_url": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        "is_verified": 1, "posted_by": "Deepa Srinivas", "contact": "+91 98457 78901",
        "amenities": json.dumps(["WiFi","Lift","CCTV","Power Backup","Laundry"]),
        "created_at": "2024-06-07T10:00:00",
    },
    {
        "title": "Ultra-Luxury 5 BHK Villa in Sarjapur Road",
        "city": "Bangalore", "locality": "Sarjapur Road",
        "property_type": "Villa", "listing_type": "buy",
        "price": 55000000, "bedrooms": 5, "bathrooms": 5, "area_sqft": 5500,
        "floor": "Ground + 2", "furnished": "Furnished", "parking": 4,
        "description": "Opulent 5 BHK standalone villa with private pool, home gym, and cinema room. Located in an exclusive gated enclave on Sarjapur Road with 24/7 concierge service.",
        "image_url": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
        "is_verified": 1, "posted_by": "Shobha Developments", "contact": "+91 98458 89012",
        "amenities": json.dumps(["Private Pool","Home Gym","Cinema Room","Smart Home","Solar Panels","EV Charging","Concierge"]),
        "created_at": "2024-06-08T10:00:00",
    },
    {
        "title": "2 BHK Apartment for Rent in Marathahalli",
        "city": "Bangalore", "locality": "Marathahalli",
        "property_type": "Apartment", "listing_type": "rent",
        "price": 32000, "bedrooms": 2, "bathrooms": 2, "area_sqft": 980,
        "floor": "6th of 12", "furnished": "Semi-Furnished", "parking": 1,
        "description": "Clean and well-maintained 2 BHK near Marathahalli Bridge. Excellent connectivity to Outer Ring Road, Bellandur, and Whitefield. Immediate move-in available.",
        "image_url": "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
        "is_verified": 0, "posted_by": "Harish Gowda", "contact": "+91 98459 90123",
        "amenities": json.dumps(["Lift","Power Backup","CCTV","Parking"]),
        "created_at": "2024-06-09T10:00:00",
    },
    {
        "title": "Serene 3 BHK Apartment in JP Nagar",
        "city": "Bangalore", "locality": "JP Nagar",
        "property_type": "Apartment", "listing_type": "buy",
        "price": 11500000, "bedrooms": 3, "bathrooms": 2, "area_sqft": 1320,
        "floor": "4th of 8", "furnished": "Bare", "parking": 1,
        "description": "Well-planned 3 BHK in JP Nagar Phase 6. Close to Bannerghatta Road, excellent schools, and hospitals. Quiet residential colony with lush greenery.",
        "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        "is_verified": 1, "posted_by": "Lakshmi Properties", "contact": "+91 98451 01234",
        "amenities": json.dumps(["Security","Power Backup","Rainwater Harvesting","Parking"]),
        "created_at": "2024-06-10T10:00:00",
    },
    # ── MUMBAI ─────────────────────────────────────────────────────────────
    {
        "title": "Sea-Facing 3 BHK in Bandra West",
        "city": "Mumbai", "locality": "Bandra West",
        "property_type": "Apartment", "listing_type": "buy",
        "price": 45000000, "bedrooms": 3, "bathrooms": 3, "area_sqft": 1650,
        "floor": "12th of 18", "furnished": "Furnished", "parking": 2,
        "description": "Stunning sea-facing apartment in the heart of Bandra West. Steps from Bandstand Promenade, Carter Road, and Linking Road. Premium fittings, imported flooring, and panoramic Arabian Sea views.",
        "image_url": "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&q=80",
        "is_verified": 1, "posted_by": "Mumbai Realty Co.", "contact": "+91 98221 12345",
        "amenities": json.dumps(["Sea View","Swimming Pool","Gym","Concierge","Power Backup","CCTV","Lift"]),
        "created_at": "2024-06-11T10:00:00",
    },
    {
        "title": "Modern 2 BHK in Powai Lakeside",
        "city": "Mumbai", "locality": "Powai",
        "property_type": "Apartment", "listing_type": "buy",
        "price": 18000000, "bedrooms": 2, "bathrooms": 2, "area_sqft": 1050,
        "floor": "8th of 15", "furnished": "Semi-Furnished", "parking": 1,
        "description": "Beautiful 2 BHK with lake views in Powai. Located in a premium society near Hiranandani Gardens, IIT Bombay, and major tech companies. Perfect for young professionals.",
        "image_url": "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&q=80",
        "is_verified": 1, "posted_by": "Hiranandani Real Estate", "contact": "+91 98222 23456",
        "amenities": json.dumps(["Lake View","Swimming Pool","Gym","Clubhouse","Power Backup","CCTV"]),
        "created_at": "2024-06-12T10:00:00",
    },
    {
        "title": "2 BHK Apartment for Rent in Andheri West",
        "city": "Mumbai", "locality": "Andheri West",
        "property_type": "Apartment", "listing_type": "rent",
        "price": 70000, "bedrooms": 2, "bathrooms": 2, "area_sqft": 900,
        "floor": "6th of 10", "furnished": "Furnished", "parking": 1,
        "description": "Stylishly furnished 2 BHK near Versova Metro station and D.N. Nagar. Short commute to BKC, Goregaon business hub, and film studios. Fully equipped kitchen, wardrobes, and ACs.",
        "image_url": "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
        "is_verified": 1, "posted_by": "Ravi Joshi", "contact": "+91 98223 34567",
        "amenities": json.dumps(["Lift","Security","Power Backup","CCTV","Intercom"]),
        "created_at": "2024-06-13T10:00:00",
    },
    {
        "title": "Ultra-Luxury 5 BHK Villa in Juhu",
        "city": "Mumbai", "locality": "Juhu",
        "property_type": "Villa", "listing_type": "buy",
        "price": 120000000, "bedrooms": 5, "bathrooms": 6, "area_sqft": 6500,
        "floor": "Ground + 2", "furnished": "Furnished", "parking": 5,
        "description": "Iconic bungalow in Juhu's coveted Gulshan Colony, a stone's throw from Juhu Beach. Infinity pool, private staff quarters, home automation, and architectural design by award-winning firm.",
        "image_url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        "is_verified": 1, "posted_by": "Luxury Homes Mumbai", "contact": "+91 98224 45678",
        "amenities": json.dumps(["Infinity Pool","Staff Quarters","Smart Home","Home Theatre","Gym","Beach Access","Helipad"]),
        "created_at": "2024-06-14T10:00:00",
    },
    {
        "title": "Compact 1 BHK for Rent in Malad West",
        "city": "Mumbai", "locality": "Malad West",
        "property_type": "Apartment", "listing_type": "rent",
        "price": 28000, "bedrooms": 1, "bathrooms": 1, "area_sqft": 550,
        "floor": "3rd of 7", "furnished": "Furnished", "parking": 0,
        "description": "Cozy 1 BHK in Malad West near Infiniti Mall and Malad Metro station. Ideal for solo professionals. Includes all furnishings, WiFi, and easy access to SV Road and Link Road.",
        "image_url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "is_verified": 0, "posted_by": "Sneha Patil", "contact": "+91 98225 56789",
        "amenities": json.dumps(["WiFi","Lift","CCTV","Power Backup"]),
        "created_at": "2024-06-15T10:00:00",
    },
    {
        "title": "Spacious 3 BHK in Thane West",
        "city": "Mumbai", "locality": "Thane West",
        "property_type": "Apartment", "listing_type": "buy",
        "price": 12500000, "bedrooms": 3, "bathrooms": 2, "area_sqft": 1350,
        "floor": "9th of 22", "furnished": "Semi-Furnished", "parking": 2,
        "description": "Large 3 BHK apartment in Thane West with lake views. Located in a premium township near Viviana Mall, Thane station, and Eastern Express Highway.",
        "image_url": "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80",
        "is_verified": 1, "posted_by": "Lodha Group", "contact": "+91 98226 67890",
        "amenities": json.dumps(["Lake View","Swimming Pool","Gym","Clubhouse","Kids Play Area","Power Backup","Security"]),
        "created_at": "2024-06-16T10:00:00",
    },
    {
        "title": "Premium 3 BHK Skyhome in Worli",
        "city": "Mumbai", "locality": "Worli",
        "property_type": "Apartment", "listing_type": "buy",
        "price": 78000000, "bedrooms": 3, "bathrooms": 3, "area_sqft": 2100,
        "floor": "28th of 40", "furnished": "Furnished", "parking": 2,
        "description": "Jaw-dropping views of the Bandra-Worli Sea Link from this ultra-premium sky home. Imported marble flooring, island kitchen, and private butler. Walking distance to Worli Sea Face.",
        "image_url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        "is_verified": 1, "posted_by": "Oberoi Realty", "contact": "+91 98227 78901",
        "amenities": json.dumps(["Sea Link View","Infinity Pool","Concierge","Private Butler","Gym","Spa","Helipad"]),
        "created_at": "2024-06-17T10:00:00",
    },
    {
        "title": "2 BHK Apartment for Rent in Goregaon East",
        "city": "Mumbai", "locality": "Goregaon East",
        "property_type": "Apartment", "listing_type": "rent",
        "price": 55000, "bedrooms": 2, "bathrooms": 2, "area_sqft": 950,
        "floor": "11th of 16", "furnished": "Semi-Furnished", "parking": 1,
        "description": "Well-maintained 2 BHK in Goregaon East near Film City, NESCO exhibition centre, and Goregaon Metro. Clean society with professional management.",
        "image_url": "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
        "is_verified": 0, "posted_by": "Amit Desai", "contact": "+91 98228 89012",
        "amenities": json.dumps(["Gym","Lift","Security","Power Backup","CCTV"]),
        "created_at": "2024-06-18T10:00:00",
    },
    {
        "title": "Affordable 2 BHK in Navi Mumbai (Vashi)",
        "city": "Mumbai", "locality": "Navi Mumbai",
        "property_type": "Apartment", "listing_type": "buy",
        "price": 8500000, "bedrooms": 2, "bathrooms": 2, "area_sqft": 960,
        "floor": "5th of 10", "furnished": "Bare", "parking": 1,
        "description": "Budget-friendly 2 BHK in Vashi, Navi Mumbai. Near Vashi railway station, City Centre Mall, and DY Patil Hospital. Excellent value and upcoming infrastructure growth.",
        "image_url": "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
        "is_verified": 1, "posted_by": "Cidco Approved Builder", "contact": "+91 98229 90123",
        "amenities": json.dumps(["Lift","Security","Power Backup","Parking","Water 24x7"]),
        "created_at": "2024-06-19T10:00:00",
    },
    {
        "title": "Chic 3 BHK Penthouse for Rent in Lower Parel",
        "city": "Mumbai", "locality": "Lower Parel",
        "property_type": "Apartment", "listing_type": "rent",
        "price": 110000, "bedrooms": 3, "bathrooms": 3, "area_sqft": 1900,
        "floor": "22nd of 22 (Penthouse)", "furnished": "Furnished", "parking": 2,
        "description": "Spectacular penthouse in Lower Parel's iconic tower. Wraparound terrace with skyline views, private jacuzzi, and premium appliances. Adjacent to Phoenix Palladium mall and BKC.",
        "image_url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
        "is_verified": 1, "posted_by": "Peninsula Land", "contact": "+91 98221 01234",
        "amenities": json.dumps(["Private Terrace","Jacuzzi","Gym","Concierge","Valet Parking","Smart Home","Rooftop Pool"]),
        "created_at": "2024-06-20T10:00:00",
    },
]

CITIES = ["Bangalore", "Mumbai"]
LOCALITIES = {
    "Bangalore": ["Koramangala","Whitefield","Indiranagar","HSR Layout","Bellandur","Jayanagar","Electronic City","Sarjapur Road","Marathahalli","JP Nagar"],
    "Mumbai": ["Bandra West","Powai","Andheri West","Juhu","Malad West","Thane West","Worli","Goregaon East","Navi Mumbai","Lower Parel"],
}


# ─── Database Setup ───────────────────────────────────────────────────────────

def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_conn()
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS properties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT, city TEXT, locality TEXT,
            property_type TEXT, listing_type TEXT,
            price INTEGER, bedrooms INTEGER, bathrooms INTEGER, area_sqft INTEGER,
            floor TEXT, furnished TEXT, parking INTEGER DEFAULT 0,
            description TEXT, image_url TEXT, is_verified INTEGER DEFAULT 0,
            posted_by TEXT, contact TEXT, amenities TEXT, created_at TEXT
        )
    """)
    count = c.execute("SELECT COUNT(*) FROM properties").fetchone()[0]
    if count == 0:
        for p in MOCK_PROPERTIES:
            cols = ",".join(p.keys())
            placeholders = ",".join(["?"] * len(p))
            c.execute(f"INSERT INTO properties ({cols}) VALUES ({placeholders})", list(p.values()))
        print(f"Seeded {len(MOCK_PROPERTIES)} properties.")
    conn.commit()
    conn.close()


def row_to_dict(row):
    return dict(row)


def query_properties(params):
    conn = get_conn()
    c = conn.cursor()
    sql = "SELECT * FROM properties WHERE 1=1"
    args = []
    if params.get("city"):
        sql += " AND city=?"; args.append(params["city"])
    if params.get("listing_type"):
        sql += " AND listing_type=?"; args.append(params["listing_type"])
    if params.get("min_price"):
        sql += " AND price>=?"; args.append(int(params["min_price"]))
    if params.get("max_price"):
        sql += " AND price<=?"; args.append(int(params["max_price"]))
    if params.get("bedrooms"):
        sql += " AND bedrooms=?"; args.append(int(params["bedrooms"]))
    if params.get("property_type"):
        sql += " AND property_type=?"; args.append(params["property_type"])
    if params.get("locality"):
        sql += " AND locality=?"; args.append(params["locality"])
    if params.get("furnished"):
        sql += " AND furnished=?"; args.append(params["furnished"])
    sort = params.get("sort_by", "newest")
    if sort == "price_asc":
        sql += " ORDER BY price ASC"
    elif sort == "price_desc":
        sql += " ORDER BY price DESC"
    else:
        sql += " ORDER BY created_at DESC"
    rows = c.execute(sql, args).fetchall()
    conn.close()
    return [row_to_dict(r) for r in rows]


def get_property_by_id(pid):
    conn = get_conn()
    row = conn.execute("SELECT * FROM properties WHERE id=?", [pid]).fetchone()
    conn.close()
    return row_to_dict(row) if row else None


# ─── HTTP Handler ─────────────────────────────────────────────────────────────

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
}


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        print(f"[{self.date_time_string()}] {fmt % args}")

    def send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        for k, v in CORS_HEADERS.items():
            self.send_header(k, v)
        self.send_header("Content-Length", len(body))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        for k, v in CORS_HEADERS.items():
            self.send_header(k, v)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")
        qs = urllib.parse.parse_qs(parsed.query, keep_blank_values=False)
        # Flatten single-value lists
        params = {k: v[0] for k, v in qs.items()}

        if path == "/" or path == "":
            self.send_json({"message": "Property Portal API is running", "docs": "No Swagger (stdlib mode)"})
        elif path == "/api/cities":
            self.send_json(CITIES)
        elif path == "/api/localities":
            city = params.get("city", "")
            locs = LOCALITIES.get(city, [])
            self.send_json({"city": city, "localities": locs})
        elif path == "/api/properties":
            props = query_properties(params)
            self.send_json({"total": len(props), "properties": props})
        elif path.startswith("/api/properties/"):
            try:
                pid = int(path.split("/")[-1])
                prop = get_property_by_id(pid)
                if prop:
                    self.send_json(prop)
                else:
                    self.send_json({"detail": "Not found"}, 404)
            except ValueError:
                self.send_json({"detail": "Invalid ID"}, 400)
        else:
            self.send_json({"detail": "Not found"}, 404)


if __name__ == "__main__":
    init_db()
    server = HTTPServer(("0.0.0.0", 8000), Handler)
    print("Property Portal API running at http://localhost:8000")
    print("Press Ctrl+C to stop.")
    server.serve_forever()
