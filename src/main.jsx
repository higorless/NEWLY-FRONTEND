import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes } from "./routes/index.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketContextProvider>
      <Routes />
    </SocketContextProvider>
  </StrictMode>
);
