import { create } from "zustand";
import { api } from "../services/api.js";

export const useAutenticate = create((set) => ({
  user: JSON.parse(localStorage.getItem("@nemly:user")) || {},
  setUser: (user) => {
    localStorage.setItem("@nemly:user", JSON.stringify(user));
    set(user);
  },
  userAutentication: async (phonenumber, password) => {
    try {
      const response = await api({
        method: "post",
        url: "/login",
        data: {
          phonenumber: phonenumber,
          password: password,
        },
      });

      if (!response) {
        throw new Error("Something went wrong calling sign up API");
      }

      localStorage.setItem("@nemly:user", JSON.stringify(response.data.user));
      localStorage.setItem("@nemly:token", response.data.token);

      set({ user: { ...response.data.user } });

      return { success: true, message: "User autenticated" };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Something wen wrong trying to Loggin",
      };
    }
  },
  userCreateAccount: async (phonenumber, password, username, bio) => {
    try {
      const response = await api({
        method: "post",
        url: "/user/register",
        data: {
          username: username,
          phonenumber: phonenumber.toString(),
          password: password,
          bio: bio,
        },
      });

      if (response?.status) {
        return { success: true, message: "User registered" };
      } else {
        throw new Error("Unexpected API response");
      }
    } catch (err) {
      console.error("Error in userCreateAccount:", err);
      return {
        success: false,
        message:
          "Algo de errado ocorreu com a criação do seu usuário, tente novamente",
      };
    }
  },
  logout: () => {
    localStorage.removeItem("@nemly:user");
    localStorage.removeItem("@nemly:token");
    set({ user: {} });
  },
}));
