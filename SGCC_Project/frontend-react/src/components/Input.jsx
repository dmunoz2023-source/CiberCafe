// Input reutilizable con manejo de errores
import React from "react";

const Input = ({ label, error, ...props }) => (
  <div style={{ marginBottom: "1rem" }}>
    {label && <label>{label}</label>}
    <input {...props} />
    {error && <span style={{ color: "red", fontSize: 12 }}>{error}</span>}
  </div>
);

export default Input;
