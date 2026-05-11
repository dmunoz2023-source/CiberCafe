import styles from "./OrderConfirmModal.module.css";
import { formatCLP } from "../hooks/useMenuOrder";

export default function OrderConfirmModal({
  cart,
  cartTotal,
  userBalance,
  loading,
  onConfirm,
  onCancel,
}) {
  const saldoRestante = userBalance - cartTotal;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <h2 className={styles.titulo}>Confirmar pedido</h2>

        <ul className={styles.lista}>
          {cart.map((item) => (
            <li key={item.product_id} className={styles.item}>
              <span>{item.name} × {item.qty}</span>
              <span>${formatCLP(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>

        <div className={styles.resumen}>
          <div className={styles.fila}>
            <span>Total</span>
            <strong>${formatCLP(cartTotal)}</strong>
          </div>
          <div className={styles.fila}>
            <span>Saldo actual</span>
            <span>${formatCLP(userBalance)}</span>
          </div>
          <div className={`${styles.fila} ${styles.restante}`}>
            <span>Saldo tras pago</span>
            <strong>${formatCLP(saldoRestante)}</strong>
          </div>
        </div>

        <p className={styles.aviso}>
          El pedido será enviado a cocina automáticamente.
        </p>

        <div className={styles.acciones}>
          <button
            className={styles.btnCancelar}
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className={styles.btnConfirmar}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Enviando…" : "Confirmar pedido"}
          </button>
        </div>
      </div>
    </div>
  );
}