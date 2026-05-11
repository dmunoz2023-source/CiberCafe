// Servicio de menú
import api from "./apiConfig";

export const getMenu = () => api.get("/menu");
export const sendOrder = (order) => api.post("/orders", order);
