// Barra de navegación superior
import React from "react";

const Navbar = ({ children }) => (
  <nav
    style={{
      width: "100%",
      background: "#222",
      color: "#fff",
      padding: "1rem",
    }}
  >
    {children}
  </nav>
);

export default Navbar;
