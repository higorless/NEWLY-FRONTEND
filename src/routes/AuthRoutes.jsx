import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AuthRoutes;
