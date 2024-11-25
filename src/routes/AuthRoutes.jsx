import { Routes, Route } from "react-router-dom";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/Login";
import { Toaster } from "@/components/ui/toaster";

export const AuthRoutes = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
