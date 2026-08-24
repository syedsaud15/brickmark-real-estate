import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <div className="navbar-logo-icon">
            <Building2 size={20} color="#fff" />
          </div>
          <span>Brick<span>Mark</span></span>
        </div>
        <div className="navbar-links">
          <span className="nav-link" onClick={() => navigate("/search?listing_type=buy")}>Buy</span>
          <span className="nav-link" onClick={() => navigate("/search?listing_type=rent")}>Rent</span>
          <span className="nav-link" onClick={() => navigate("/search?city=Bangalore")}>Bangalore</span>
          <span className="nav-link" onClick={() => navigate("/search?city=Mumbai")}>Mumbai</span>
          <button className="nav-btn" onClick={() => navigate("/search")}>Browse All</button>
        </div>
      </div>
    </nav>
  );
}
