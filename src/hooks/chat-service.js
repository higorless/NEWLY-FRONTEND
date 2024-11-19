import { create } from "zustand";
import { api } from "../services/api.js";

export const useChat = create((set) => ({
  chats: {},
  setChats: (chat) => set(chat),
  userChats: async () => {
    try {
      const token = localStorage.getItem("@nemly:token");

      const response = await api({
        method: "get",
        url: "/user/friends",
      });

      console.log(response);
    } catch (err) {
      console.log(err);
      return { success: false, message: "Error trying to fetch all chats" };
    }
  },
}));
