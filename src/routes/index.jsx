import { BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import { AppRoutes } from "./AppRoutes";
import { useAutenticate } from "../hooks/auth.js";
import { useEffect } from "react";
import "../styles/index.css";

export function Routes() {
  const { user } = useAutenticate();

  return (
    <BrowserRouter>
      {Object.keys(user).length !== 0 ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}
