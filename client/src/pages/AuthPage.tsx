import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/Input";
import hooks from "../hooks";
import {
  httpMethod,
  requestHeaders,
  requestPayload,
  serverResponse,
} from "../hooks/useHTTP";

const AuthPage = () => {
  const { useHTTP, useMessage } = hooks;

  const auth = useContext(AuthContext);
  const message = useMessage();
  const [form, setForm] = useState({ email: "", password: "" });

  const { loading, error, request, clearError } = useHTTP();

  const changeHandler: React.ChangeEventHandler<any> = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  });

  const tryAuth = async (action: "register" | "login") => {
    const data = await request<
      string,
      httpMethod,
      requestPayload,
      requestHeaders,
      serverResponse
    >(`/api/auth/${action}`, "POST", JSON.stringify({ ...form }), {
      "Content-Type": "application/json",
    });

    return data;
  };

  const registerHandler = async () => {
    try {
      const data = await tryAuth("register");

      message(data.message);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await tryAuth("login");

      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Link Cutter</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authentication</span>
            <div>
              <Input
                label="Email"
                htmlFor="email"
                type="text"
                name="email"
                id="email"
                value={form.email}
                onChangeHandler={changeHandler}
              />
              <Input
                label="Password"
                htmlFor="password"
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChangeHandler={changeHandler}
              />
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn lime accent-4 black-text"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}
            >
              Sign in
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AuthPage);
