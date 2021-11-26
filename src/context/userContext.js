import React, { useState } from "react";
import { getUserDetails } from "../utils/utils";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "weegembump",
    name: "Gemma Bump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553",
  });
  console.log(user);
  const login = (username) => {
    return getUserDetails(username).then((user) => {
      if (user) setUser(user);
      else throw new Error("user not found");
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, login }}>
      {children}
    </UserContext.Provider>
  );
};
