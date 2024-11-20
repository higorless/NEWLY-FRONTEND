import { create } from "zustand";
import { api } from "../services/api.js";

export const useUserSession = create((set) => ({
  friends: [],
  getFriendlist: async () => {
    try {
      const token = localStorage.getItem("@nemly:token");

      if (!token) {
        throw new Error("Something went wrong with localstorage token");
      }

      const response = await api({
        method: "get",
        headers: {
          authorization: `baerer ${token}`,
        },
        url: "/user/friends",
      });

      set({
        friends: [...response.data],
      });

      return { success: true, message: "All friends added" };
    } catch (err) {
      console.log(err);
      return { success: false, message: "Error trying to fetch all chats" };
    }
  },
}));
