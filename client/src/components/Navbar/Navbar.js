import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './index.css'

import Profile from '../../img/profile.svg'
import Logo from '../../img/vsatonin_logo.svg'
import Arrow from '../../img/arrow.svg'
import Human from '../../img/human.svg'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const contextUser = useContext(AuthContext)
  // console.log(contextUser)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  /**
   * Функция открывает/закрывает модальное окно профиля
   * откуда можно перейти в профиль ( TODO: в будущем )
   * и выйти из аккаунта
   */
  const handlerShowModalProfile = event => {
    event.preventDefault()

    const element = document.getElementById('top_profile_menu')
    const styleElement = window.getComputedStyle(element)
    const elementOpacity = styleElement.getPropertyValue('opacity')
    const elementVisibility = styleElement.getPropertyValue('visibility')

    if (elementVisibility === 'hidden' && elementOpacity === '0') {
      element.style.visibility = 'visible'
      element.style.opacity = '1'
    } else {
      element.style.visibility = 'hidden'
      element.style.opacity = '0'
    }
  }

  return (
    <header>
      <ul className="HeaderNav">
        <li className="HeaderNavBar headerNavBar_item HeaderNavBar--logo">
          <img width={126} height={30} alt="Logo" src={Logo} />
        </li>
        <li className="HeaderNavBar headerNavBar_item HeaderNavBar--title">
          <span>Видео - Конференция</span>
        </li>
        <li className="HeaderNavBar headerNavBar_item HeaderNavBar--profile">
          <a
            onClick={handlerShowModalProfile}
            className="TopNabBtn TopNabBtn__profileLink"
            href="/profile"
          >
            <span className="TopNabBtn__profileName">
              {contextUser.firstName}
            </span>
            <img
              className="TopNabBtn__profileImage"
              src={Profile}
              alt="Profile"
              width={32}
              height={32}
            />
            <div className="TopNavBtn__ArrowDown">
              {/* TODO: переписать картинку из img -> svg для смены цвета и не только  */}
              {/* <svg fill="none" height={8} width={12} viewBox="0 0 12 8" xmlns={Arrow}></svg> */}
              <img src={Arrow} alt="Arrow" width={18} height={18} />
            </div>
          </a>
          <div id="top_profile_menu" className="top_profile_menu shown">
            <a className="top_profile_menu_row">
              <img
                className="top_profile_menu_img"
                width={34}
                height={34}
                src={Human}
                alt="Human"
              />
              <div className="top_profile_menu_right">
                <div className="top_profile_menu_name">
                  {contextUser.firstName} {contextUser.lastName}
                </div>
                <div className="top_profile_menu_descr">Перейти к профилю</div>
              </div>
            </a>
            <hr />
            <a className="top_profile_mrow">Настройки профиля</a>
            <a className="top_profile_mrow">Помощь</a>
            <hr />
            <a onClick={logoutHandler} className="top_profile_mrow">Выйти</a>
          </div>
        </li>
      </ul>
    </header>
  )
}
