// Hook para WebSocket
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export default function useWebSocket() {
  return useContext(SocketContext);
}
