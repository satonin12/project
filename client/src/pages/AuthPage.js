import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import '../index.css'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
    console.log(form)
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      console.log(data)
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div id="login-page" className="auth" class="container-auth fon-auth">
      <div className="card-panel hoverable">
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
              className="btn green accent-2 hoverable black-text"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </button>
            <button
              className="btn blue lighten-2 hoverable black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
