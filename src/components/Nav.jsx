import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="bg-gray-900 px-6 py-4 shadow-md">
      <div className="flex justify-center gap-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-lg font-medium transition ${
              isActive
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-300 hover:text-white"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `text-lg font-medium transition ${
              isActive
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-300 hover:text-white"
            }`
          }
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  );
}

export default Nav;
