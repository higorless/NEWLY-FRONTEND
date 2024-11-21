import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Toaster } from "@/components/ui/toaster";

export const AppRoutes = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path={"/"} element={<Home />} />
      </Routes>
    </>
  );
};
