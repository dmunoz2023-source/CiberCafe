// Pantalla cocina
import { useState, useEffect, useCallback } from "react";
import OrderCard from "./OrderCard";
import styles from "./KitchenBoard.module.css";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const FILTROS = [
  { valor: "all",       label: "Todos" },
  { valor: "pending",   label: "Pendientes" },
  { valor: "ready",     label: "Listos" },
  { valor: "delivered", label: "Entregados" },
];

export default function KitchenBoard() {
  const [orders, setOrders]   = useState([]);
  const [filtro, setFiltro]   = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      const res  = await fetch(`${API_BASE}/api/menu/orders`);
      const data = await res.json();
      setOrders(data.orders ?? []);
      setError(null);
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Polling cada 8 segundos para recibir pedidos en tiempo real (FR-11)
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 8000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const markReady = async (orderId) => {
    await fetch(`${API_BASE}/api/menu/order/${orderId}/ready`, {
      method: "PATCH",
    });
    fetchOrders();
  };

  const markDelivered = async (orderId) => {
    await fetch(`${API_BASE}/api/menu/order/${orderId}/delivered`, {
      method: "PATCH",
    });
    fetchOrders();
  };

  const ordenesVisibles =
    filtro === "all"
      ? orders
      : orders.filter((o) => o.status === filtro);

  const conteo = {
    pending:   orders.filter((o) => o.status === "pending").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    ready:     orders.filter((o) => o.status === "ready").length,
  };

  return (
    <div className={styles.board}>
      <header className={styles.header}>
        <div className={styles.headerIzq}>
          <h1 className={styles.titulo}>Pantalla de cocina</h1>
          <span className={styles.subtitulo}>
            Actualización automática cada 8 segundos
          </span>
        </div>

        <div className={styles.contadores}>
          <div className={`${styles.contador} ${styles.cPendiente}`}>
            <span className={styles.contNum}>{conteo.pending}</span>
            <span className={styles.contLabel}>Pendientes</span>
          </div>
          <div className={`${styles.contador} ${styles.cPreparando}`}>
            <span className={styles.contNum}>{conteo.preparing}</span>
            <span className={styles.contLabel}>Preparando</span>
          </div>
          <div className={`${styles.contador} ${styles.cListo}`}>
            <span className={styles.contNum}>{conteo.ready}</span>
            <span className={styles.contLabel}>Listos</span>
          </div>
        </div>
      </header>

      <div className={styles.filtros}>
        {FILTROS.map((f) => (
          <button
            key={f.valor}
            className={`${styles.btnFiltro} ${
              filtro === f.valor ? styles.activo : ""
            }`}
            onClick={() => setFiltro(f.valor)}
          >
            {f.label}
          </button>
        ))}

        <button
          className={styles.btnRefresh}
          onClick={fetchOrders}
          aria-label="Actualizar pedidos"
        >
          Actualizar
        </button>
      </div>

      {loading && (
        <p className={styles.estado}>Cargando pedidos…</p>
      )}

      {error && (
        <p className={`${styles.estado} ${styles.estadoError}`}>{error}</p>
      )}

      {!loading && !error && ordenesVisibles.length === 0 && (
        <p className={styles.estado}>
          No hay pedidos {filtro !== "all" ? `"${FILTROS.find(f=>f.valor===filtro)?.label.toLowerCase()}"` : ""} en este momento.
        </p>
      )}

      {!loading && (
        <div className={styles.grilla}>
          {ordenesVisibles.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onMarkReady={markReady}
              onMarkDelivered={markDelivered}
            />
          ))}
        </div>
      )}
    </div>
  );
}