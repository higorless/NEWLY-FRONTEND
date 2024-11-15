import { BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import { AppRoutes } from "./AppRoutes";

const user = false;

export function Routes() {
  return <BrowserRouter>{user ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>;
}
