import { create } from "zustand";
import { api } from "../services/api.js";

export const useUserSession = create((set) => ({
  friends: {},
  getFriendlist: async () => {
    try {
      const response = await api({
        method: "get",
        url: "/user/friends",
      });

      set({
        friend: {
          ...response,
        },
      });
    } catch (err) {
      console.log(err);
      return { success: false, message: "Error trying to fetch all chats" };
    }
  },
}));
