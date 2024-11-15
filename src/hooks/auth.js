import { create } from "zustand";
import api from "../services/api.js";
import jwt from "jsonwebtoken";

export const useAutenticate = create((set) => ({
  user: {},
  setUser: (user) => set(user),
  userAutentication: async (phonenumber, password) => {
    try {
      const response = await api({
        method: post,
        url: "/login",
        data: {
          phonenumber: JSON.stringfy(phonenumber),
          password: JSON.stringfy(password),
        },
      });

      if (!response) {
        throw new Error("Something went wrong calling sign up API");
      }

      jwt.verify(response, "JWT_SECRET", (err, decoded) => {
        if (err) {
          console.log("Something Went Wrong with user autentication", err);
        }
        set({ user: { ...decoded } });
      });

      localStorage.setItem("@nemly:user", JSON.stringify(user));
      localStorage.setItem("@nemly:token", response);

      api.defaults.headers.common["authorization"] = `bearer ${token}`;

      return { success: true, message: "User autenticated" };
    } catch (err) {}
  },
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
