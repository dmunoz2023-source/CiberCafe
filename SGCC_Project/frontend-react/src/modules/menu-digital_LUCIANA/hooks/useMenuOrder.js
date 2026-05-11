import { useState, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const formatCLP = (amount) =>
  amount.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

export function useMenuOrder(userId, stationId, userBalance) {
  const [cart, setCart]       = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [success, setSuccess] = useState(false);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const balanceOk = cartTotal > 0 && userBalance >= cartTotal;

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.product_id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.product_id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          name:       product.name,
          price:      product.price,
          qty:        1,
        },
      ];
    });
    setError(null);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((i) => i.product_id !== productId));
  }, []);

  const updateQty = useCallback((productId, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.product_id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.product_id === productId ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setError(null);
    setSuccess(false);
  }, []);

  // BR-02: verifica saldo antes de enviar
  const placeOrder = useCallback(async () => {
    setError(null);

    if (cart.length === 0) {
      setError("Agrega al menos un producto al carrito.");
      return false;
    }

    if (userBalance < cartTotal) {
      setError(
        `Saldo insuficiente. Tu saldo: ${formatCLP(userBalance)}. Total del pedido: ${formatCLP(cartTotal)}.`
      );
      return false;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/menu/order`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          user_id:    userId,
          station_id: stationId,
          items:      cart.map(({ product_id, qty }) => ({ product_id, qty })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Error al procesar el pedido.");
        return false;
      }

      setSuccess(true);
      setCart([]);
      return true;
    } catch {
      setError("No se pudo conectar con el servidor. Intenta nuevamente.");
      return false;
    } finally {
      setLoading(false);
    }
  }, [cart, cartTotal, userId, stationId, userBalance]);

  return {
    cart,
    cartTotal,
    balanceOk,
    loading,
    error,
    success,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    placeOrder,
  };
}