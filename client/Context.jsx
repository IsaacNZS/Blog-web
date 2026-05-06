import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextprovider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [allpost, setAllpost] = useState([]);

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, allpost, setAllpost }}
    >
      {children}
    </UserContext.Provider>
  );
};
