import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import { useUserSession } from "../hooks/useUserSession.js";

export const useListenFriendAdded = () => {
  const { socket } = useSocketContext();
  const { friends, setFriends, getFriendlist } = useUserSession();

  useEffect(() => {
    socket?.on("friendAdded", (newFriend) => {
      setFriends([...friends, newFriend]);
      getFriendlist();
    });

    return () => socket?.off("friendAdded");
  }, [socket, setFriends]);
};
