import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import { useUserSession } from "../hooks/user-service.js";

export const useListenFriendAdded = () => {
  const { socket } = useSocketContext();
  const { friends, setFriends } = useUserSession();

  useEffect(() => {
    socket?.on("friendAdded", (newFriend) => {
      setFriends((prevFriends) => [...prevFriends, newFriend]);
    });

    return () => socket?.off("friendAdded");
  }, [socket, setFriends]);
};
