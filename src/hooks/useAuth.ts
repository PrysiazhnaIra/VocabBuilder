import { useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return {
    isLoggedIn,

    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  };
};
