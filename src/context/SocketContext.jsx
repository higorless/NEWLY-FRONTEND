import { createContext, useState, useEffect, useContext } from "react";
import { useAutenticate } from "../hooks/auth.js";
import io from "socket.io-client";

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAutenticate();

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:3000", {
        query: {
          userId: user._id,
        },
      });

      setSocket(socket);

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
