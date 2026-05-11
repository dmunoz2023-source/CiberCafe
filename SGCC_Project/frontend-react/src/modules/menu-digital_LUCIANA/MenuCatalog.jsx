// Catálogo de menú
import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import styles from "./MenuCatalog.module.css";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function MenuCatalog({ onAdd }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/menu/products`)
      .then((r) => {
        if (!r.ok) throw new Error("Error al cargar el menú.");
        return r.json();
      })
      .then((data) => setProducts(data.products ?? []))
      .catch((e) => {
        setProducts([
          {
            id: 1,
            name: "Café",
            price: 6500,
            description: "Café caliente"
          },
          {
            id: 2,
            name: "Té",
            price: 5000,
            description: "Té caliente"
          },
          {
            id: 3,
            name: "Sándwich",
            price: 8000,
            description: "Sándwich"
          },
          {
            id: 4,
            name: "Galleta",
            price: 9000,
            description: "Galleta dulce"
          }
        ]);
       /*  setError(e.message); */

      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={styles.estado}>
        <p>Cargando menú…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.estado} ${styles.error}`}>
        <p>{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.estado}>
        <p>No hay productos disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <section className={styles.catalogo}>
      <h2 className={styles.titulo}>Menú de cafetería</h2>
      <div className={styles.grilla}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAdd}
          />
        ))}
      </div>
    </section>
  );
}