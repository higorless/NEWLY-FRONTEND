import { create } from "zustand";
import { api } from "../services/api.js";
import { format } from "date-fns";

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

      const dateFormatedMessages = response.data.data.map((message) => {
        const messageDateFormated = format(
          new Date(message.createdAt),
          "HH:mm"
        );

        return {
          _id: message._id,
          messageSender: message.messageSender,
          messageReceiver: message.messageReceiver,
          message: message.message,
          sentTime: messageDateFormated,
        };
      });

      set({
        chatId: response.data.chatId,
        messages: dateFormatedMessages,
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

      const clientDate = format(Date.now(), "HH:mm");

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

      const clientSideMessage = {
        ...newMessage,
        clientSendTime: clientDate,
      };

      if (!response) {
        throw new Error("Something went wrong sending a message");
      }

      set((state) => ({
        messages: [...state.messages, clientSideMessage],
      }));
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  },
  resetApplication: () => {
    set({
      selectedFriend: null,
      chatId: null,
      messages: [],
    });
  },
}));
