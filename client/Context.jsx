import { createContext, useState } from "react";
import { useEffect } from "react";
import { socket } from "./src/socket";

export const UserContext = createContext(null);

export const UserContextprovider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [allpost, setAllpost] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("online-users");
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        allpost,
        setAllpost,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
