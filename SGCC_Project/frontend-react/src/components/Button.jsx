// Botón reutilizable con variantes
import React from "react";
import styles from "../styles/button.module.css";

const Button = ({ variant = "primary", children, ...props }) => (
  <button className={styles[variant] || styles.primary} {...props}>
    {children}
  </button>
);

export default Button;
