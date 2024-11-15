import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes } from "./routes/index.jsx";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
