// Tarjeta de pedido
import { formatCLP } from "../menu-digital_LUCIANA/hooks/useMenuOrder";
import styles from "./OrderCard.module.css";

const ESTADO_LABEL = {
  pending:   "Pendiente",
  preparing: "Preparando",
  ready:     "Listo",
  delivered: "Entregado",
};

const ESTADO_CLASE = {
  pending:   "estadoPendiente",
  preparing: "estadoPreparando",
  ready:     "estadoListo",
  delivered: "estadoEntregado",
};

export default function OrderCard({ order, onMarkReady, onMarkDelivered }) {
  const claseEstado = ESTADO_CLASE[order.status] ?? "estadoPendiente";

  const minutosEspera = Math.floor(
    (Date.now() - new Date(order.createdAt).getTime()) / 60000
  );

  return (
    <article className={`${styles.card} ${styles[claseEstado]}`}>
      <header className={styles.header}>
        <div className={styles.headerIzq}>
          <span className={styles.estacion}>Estación #{order.stationId}</span>
          <span className={styles.tiempo}>
            {minutosEspera === 0 ? "Ahora" : `Hace ${minutosEspera} min`}
          </span>
        </div>
        <span className={`${styles.badge} ${styles[claseEstado]}`}>
          {ESTADO_LABEL[order.status]}
        </span>
      </header>

      <ul className={styles.items}>
        {order.items.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.itemNombre}>
              {item.name}
            </span>
            <span className={styles.itemQty}>×{item.qty}</span>
          </li>
        ))}
      </ul>

      <footer className={styles.footer}>
        <span className={styles.total}>{formatCLP(order.total)}</span>

        <div className={styles.acciones}>
          {order.status === "pending" && (
            <button
              className={styles.btnPreparar}
              onClick={() => onMarkReady(order.id)}
            >
              Marcar listo
            </button>
          )}
          {order.status === "ready" && (
            <button
              className={styles.btnEntregar}
              onClick={() => onMarkDelivered(order.id)}
            >
              Confirmar entrega
            </button>
          )}
        </div>
      </footer>
    </article>
  );
}