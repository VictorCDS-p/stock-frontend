import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: 20, marginBottom: 20 }}>
      <Link to="/">Products</Link>
      <Link to="/materials">Raw Materials</Link>
      <Link to="/simulation">Simulation</Link>
    </nav>
  );
}