import { create } from "zustand";
import { api } from "../services/api.js";

export const useConversation = create((set) => ({
  selectedFriend: null,
  chatId: null,
  messages: [],
  setSelectedFriend: (friend) => set({ selectedFriend: friend }),
  setChatId: (id) => set({ chatId: id }),
  setMessages: (messages) => set({ messages }),

  fetchMessages: async (receiverId) => {
    try {
      const token = localStorage.getItem("@nemly:token");

      const response = await api({
        method: "get",
        headers: {
          authorization: `bearer ${token}`,
        },
        url: `/getmessages/${receiverId}`,
      });

      set({
        chatId: response.data.chatId,
        messages: response.data.data,
      });
    } catch (error) {
      console.error("Erro ao buscar mensagens do chat:", error);
      set({
        chatId: null,
        messages: [],
      });
    }
  },

  sendMessage: async (receiverId, messageText) => {
    try {
      const token = localStorage.getItem("@nemly:token");
      const user = localStorage.getItem("@nemly:user");

      const newMessage = {
        messageSender: JSON.parse(user)._id,
        messageReceiver: receiverId,
        message: messageText,
      };

      const response = await api({
        method: "post",
        headers: {
          authorization: `bearer ${token}`,
        },
        url: `/sendmessage/send/${receiverId}`,
        data: newMessage,
      });

      if (!response) {
        throw new Error("Something went wrong sending a message");
      }

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  },
}));
