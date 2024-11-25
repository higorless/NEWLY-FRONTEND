import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import { useConversation } from "../hooks/useConversation.js";
import { format } from "date-fns";

export const useListenMessages = (friendSelectedId) => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  const clientDate = format(Date.now(), "HH:mm");

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const messageWithDate = {
        ...newMessage,
        clientSendTime: clientDate,
      };

      setMessages([...messages, messageWithDate]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
