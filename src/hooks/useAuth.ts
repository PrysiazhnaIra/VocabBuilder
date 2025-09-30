import { useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return {
    isLoggedIn,

    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  };
};
