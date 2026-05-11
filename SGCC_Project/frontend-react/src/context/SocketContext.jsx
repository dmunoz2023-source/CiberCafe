// Contexto para WebSocket
import React, { createContext, useContext, useRef } from "react";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useRef(null); // Aquí puedes inicializar tu conexión
  // ... lógica de conexión
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
