import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import '../index.css'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }
  return (
    <nav>
      <div className="nav-wrapper fgreen darken-1">
        <span className="brand-logo" style={{ padding: '0 2rem' }}>Видео - Конференция</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {/* <li><NavLink to="/create">Создать</NavLink></li> */}
          {/* <li><NavLink to="/links">Ссылки</NavLink></li> */}
          <li>
            <a href="/" onClick={logoutHandler} class="exit">
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
