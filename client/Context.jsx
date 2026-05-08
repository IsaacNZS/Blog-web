import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextprovider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [allpost, setAllpost] = useState([]);
  const [online, setOnline] = useState(false);

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, allpost, setAllpost, online, setOnline }}
    >
      {children}
    </UserContext.Provider>
  );
};
