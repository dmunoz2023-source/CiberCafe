// Servicio de estaciones
import api from "./apiConfig";

export const getStations = () => api.get("/stations");
export const startSession = (stationId) =>
  api.post(`/stations/${stationId}/start`);
export const endSession = (stationId) => api.post(`/stations/${stationId}/end`);
