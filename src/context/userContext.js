import React, { useEffect, useState } from "react";
import { getUserDetails, getUsers } from "../utils/utils";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  const login = (username) => {
    return getUserDetails(username).then((user) => {
      if (user) setUser(user);
      else throw new Error("user not found");
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, users }}>
      {children}
    </UserContext.Provider>
  );
};
