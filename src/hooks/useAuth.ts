import { useAppSelector } from "./reduxHooks";

export const useAuth = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);

  return { isLoggedIn, token };
};
