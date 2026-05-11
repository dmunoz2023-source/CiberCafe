// Carrito de compras
import { useState } from "react";
import OrderConfirmModal from "./components/OrderConfirmModal";
import MenuCatalog from "./MenuCatalog";
import styles from "./ShoppingCart.module.css";
import { useMenuOrder, formatCLP } from "./hooks/useMenuOrder";

/**
 * Componente raíz del módulo menu-digital_LUCIANA.
 * Recibe userId, stationId y userBalance desde el contexto o el padre.
 */
export default function ShoppingCart({ userId, stationId, userBalance = 0 }) {
  const [showModal, setShowModal] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  const {
    cart,
    cartTotal,
    balanceOk,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    placeOrder,
  } = useMenuOrder(userId, stationId, userBalance);

  const handleConfirm = async () => {
    const ok = await placeOrder();
    if (ok) {
      setShowModal(false);
      setOrderDone(true);
      setTimeout(() => setOrderDone(false), 4000);
    }
  };

  return (
    <div className={styles.contenedor}>
      {/* Panel izquierdo: catálogo */}
      <div className={styles.catalogo}>
        <MenuCatalog onAdd={addToCart} />
      </div>

      {/* Panel derecho: carrito */}
      <aside className={styles.carrito}>
        <div className={styles.carritoHeader}>
          <h2 className={styles.carritoTitulo}>Tu pedido</h2>
          <span className={styles.saldo}>
            Saldo: <strong>{formatCLP(userBalance)}</strong>
          </span>
        </div>

        {orderDone && (
          <div className={styles.exitoAlert}>
            Pedido enviado. Cocina notificada.
          </div>
        )}

        {cart.length === 0 ? (
          <p className={styles.vacio}>Agrega productos desde el menú.</p>
        ) : (
          <>
            <ul className={styles.lista}>
              {cart.map((item) => (
                <li key={item.product_id} className={styles.itemRow}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemNombre}>{item.name}</span>
                    <span className={styles.itemPrecio}>
                      {formatCLP(item.price * item.qty)}
                    </span>
                  </div>

                  <div className={styles.itemControles}>
                    <button
                      className={styles.btnQty}
                      onClick={() => updateQty(item.product_id, item.qty - 1)}
                      aria-label="Quitar uno"
                    >
                      −
                    </button>
                    <span className={styles.qty}>{item.qty}</span>
                    <button
                      className={styles.btnQty}
                      onClick={() => updateQty(item.product_id, item.qty + 1)}
                      aria-label="Agregar uno"
                    >
                      +
                    </button>
                    <button
                      className={styles.btnEliminar}
                      onClick={() => removeFromCart(item.product_id)}
                      aria-label={`Eliminar ${item.name}`}
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.total}>
              <span>Total</span>
              <strong
                className={!balanceOk ? styles.totalInsuficiente : ""}
              >
                {formatCLP(cartTotal)}
              </strong>
            </div>

            {/* BR-02: aviso visual si no alcanza el saldo */}
            {!balanceOk && cartTotal > 0 && (
              <p className={styles.alertaSaldo}>
                Saldo insuficiente para completar el pedido.
              </p>
            )}

            {error && <p className={styles.errorMsg}>{error}</p>}

            <div className={styles.acciones}>
              <button className={styles.btnLimpiar} onClick={clearCart}>
                Limpiar
              </button>
              <button
                className={styles.btnPedir}
                disabled={!balanceOk || loading}
                onClick={() => setShowModal(true)}
              >
                Pedir
              </button>
            </div>
          </>
        )}
      </aside>

      {showModal && (
        <OrderConfirmModal
          cart={cart}
          cartTotal={cartTotal}
          userBalance={userBalance}
          loading={loading}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}