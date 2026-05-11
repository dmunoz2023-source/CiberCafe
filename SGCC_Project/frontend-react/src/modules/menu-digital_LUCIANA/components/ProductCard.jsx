import styles from "./ProductCard.module.css";
import { formatCLP } from "../hooks/useMenuOrder";

export default function ProductCard({ product, onAdd }) {
  const sinStock = product.stock === 0;

  return (
    <article className={`${styles.card} ${sinStock ? styles.agotado : ""}`}>
      <div className={styles.info}>
        <h3 className={styles.nombre}>{product.name}</h3>
        <p className={styles.descripcion}>{product.description}</p>
        <span className={styles.precio}>
          {formatCLP(product.price)}
        </span>
      </div>

      <button
        className={styles.btnAgregar}
        onClick={() => onAdd(product)}
        disabled={sinStock}
        aria-label={`Agregar ${product.name} al carrito`}
      >
        {sinStock ? "Sin stock" : "+ Agregar"}
      </button>
    </article>
  );
}