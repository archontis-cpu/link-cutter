import { createContext } from "react";
import { clearUserData, setUserData } from "../hooks/useAuth";

const loginNoop: setUserData = (jwtToken, id) => {}
const logoutNoop: clearUserData = () => {};

export const AuthContext = createContext({
  token: "",
  userId: "",
  login: loginNoop,
  logout: logoutNoop,
  isAuthenticated: false,
});
