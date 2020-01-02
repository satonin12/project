import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    // console.log('Error', error)
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log({ ...form });
  };

  const registerHandler = async () => {
    try {
      console.log({ ...form });
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log("Data", data);
      message(data.message);
    } catch (e) {}
  };

  return (
    <div id="login-page" className="row">
      <div className="col s12 m6 l4 z-depth-4 card-panel border-radius-6 login-card bg-opacity-8">
        <form className="login-form">
          <div className="row">
            <div className="input-field col s12">
              <h5 className="ml-4">Войти или зарегистрироваться</h5>
            </div>
          </div>
          <div className="row margin">
            <div className="input-field col s12">
              <input
                id="email"
                type="text"
                name="email"
                onChange={changeHandler}
              />
              <label htmlFor="username" className="center-align">
                email
              </label>
            </div>
          </div>
          <div className="row margin">
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                name="password"
                onChange={changeHandler}
              />
              <label htmlFor="password">Пароль</label>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn green accent-2"
              style={{ marginRight: 10 }}
              disabled={loading}>
              Войти
            </button>
            <button
              className="btn blue-grey lighten-2 black-text"
              onClick={registerHandler}
              disabled={loading}>
              Регистрация
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
