import { BrowserRouter } from "react-router-dom";

export function Routes() {
  return <BrowserRouter>{user ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>;
}
