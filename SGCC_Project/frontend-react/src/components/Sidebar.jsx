// Menú lateral
import React from "react";

const Sidebar = ({ children }) => (
  <aside
    style={{ width: 220, background: "#f4f4f4", height: "100vh", padding: 16 }}
  >
    {children}
  </aside>
);

export default Sidebar;
