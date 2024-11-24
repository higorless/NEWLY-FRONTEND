import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import { useUserSession } from "../hooks/user-service.js";

export const useListenFriendAdded = () => {
  const { socket } = useSocketContext();
  const { friends, setFriends, getFriendlist } = useUserSession();

  useEffect(() => {
    socket?.on("friendAdded", (newFriend) => {
      console.log(newFriend);
      setFriends([...friends, newFriend]);
      getFriendlist();
    });

    return () => socket?.off("friendAdded");
  }, [socket, setFriends]);
};
