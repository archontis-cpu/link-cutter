import React from "react";
import { BrowserRouter } from "react-router-dom";
import "materialize-css";
import hooks from "./hooks";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

const { useAuth, useRoutes } = hooks;

function App() {
  const { login, logout, token, userId, ready } = useAuth();

  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  const provide = {
    token,
    userId,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={provide}>
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
