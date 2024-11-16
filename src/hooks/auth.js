import { create } from "zustand";
import { api } from "../services/api.js";

export const useAutenticate = create((set) => ({
  user: {},
  setUser: (user) => set(user),
  userAutentication: async (phonenumber, password) => {
    try {
      const response = await api({
        method: post,
        url: "/login",
        data: {
          phonenumber: phonenumber,
          password: password,
        },
      });

      if (!response) {
        throw new Error("Something went wrong calling sign up API");
      }

      localStorage.setItem("@nemly:user", JSON.stringify(user));
      localStorage.setItem("@nemly:token", response.token);

      api.defaults.headers.common["authorization"] = `bearer ${token}`;

      return { success: true, message: "User autenticated" };
    } catch (err) {
      console.log(err.message);
      return { success: false, message: "" };
    }
  },
  userCreateAccount: async (phonenumber, password, username) => {
    console.log(phonenumber, password, username);
    try {
      const response = await api({
        method: "post",
        url: "/user/register",
        data: {
          username: username,
          phonenumber: phonenumber.toString(),
          password: password,
        },
      });

      if (!response) {
        throw new Error("Somehting wentwrong calling the API");
      }

      return { sucess: true, message: "User registered" };
    } catch (err) {
      console.log(err);
      return {
        success: true,
        message: "Something went wrong trying to create the user",
      };
    }
  },
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
