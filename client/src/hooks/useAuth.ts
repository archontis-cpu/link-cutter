import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export type setUserData = (jwtToken: string, id: string) => void;
export type clearUserData = () => void;

export function useAuth() {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const loginHandler: setUserData = (jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    const data = JSON.stringify({ token: jwtToken, userId: id });

    localStorage.setItem(storageName, data);
  };

  const logoutHandler: clearUserData = () => {
    setToken("");
    setUserId("");
    localStorage.removeItem(storageName);
  };

  const login = useCallback(loginHandler, [loginHandler]);
  const logout = useCallback(logoutHandler, [logoutHandler]);

  useEffect(() => {
    const userData = localStorage.getItem(storageName);

    if (userData) {
      const data = JSON.parse(userData);

      if (data && data.token) {
        login(data.token, data.userId);
      }
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
}
