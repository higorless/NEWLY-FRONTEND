import { Routes, Route } from "react-router-dom";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/Login";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default AuthRoutes;
