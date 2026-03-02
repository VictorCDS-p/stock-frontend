import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkStyle =
    "pb-3 text-sm font-medium transition-colors";

  return (
    <nav className="bg-white border-b border-gray-200 px-8">
      <div className="flex gap-8 h-14 items-end">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkStyle} ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/materials"
          className={({ isActive }) =>
            `${linkStyle} ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`
          }
        >
          Raw Materials
        </NavLink>

        <NavLink
          to="/simulation"
          className={({ isActive }) =>
            `${linkStyle} ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`
          }
        >
          Simulation
        </NavLink>

      </div>
    </nav>
  );
}