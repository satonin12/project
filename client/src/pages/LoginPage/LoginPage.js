import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { AuthContext } from '../../context/AuthContext'

import Lottie from 'lottie-react'
import HelloLottie1 from '../../img/21332_data.json'
import HelloLottie2 from '../../img/55043_data.json'
import HelloLottie3 from '../../img/55045_data.json'
import HelloLottie4 from '../../img/55046_data.json'
import HelloLottie5 from '../../img/55048_data.json'
import SpaceLottie from '../../img/space.json'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core'

import './index.css'
import Logo from '../../img/vsatonin_logo.svg'
import Peoples from '../../img/peoples2.svg'
// import Lottie from '../../img/animation.svg'
import GoogleIcon from '../../img/google_icon.svg'
import VKIcon from '../../img/vk_icon.svg'

export const LoginPage = () => {
  // install Swiper modules
  SwiperCore.use([Autoplay, Pagination, Navigation])

  const [showPassword, setShowPassword] = useState(0)
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

  const showPasswordHandler = event => {
    event.preventDefault()
    const element = event.target

    element.classList.toggle('toggle-password')
    if (!showPassword) {
      element.outerHTML = '<span class="material-icons">visibility_off</span>'
      setShowPassword(1)
    } else {
      element.outerHTML = '<span class="material-icons">visibility</span>'
      setShowPassword(0)
    }

    const input = document.getElementById('password')
    if (input.type === 'password') {
      input.type = 'text'
    } else {
      input.type = 'password'
    }
  }

  const AnimationLottie = () => {
    return (
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        navigation={false}
        className="mySwiper"
      >
        <SwiperSlide>
          <Lottie animationData={HelloLottie1} />
        </SwiperSlide>

        <SwiperSlide>
          <Lottie animationData={HelloLottie2} />
        </SwiperSlide>

        <SwiperSlide>
          <Lottie animationData={HelloLottie3} />
        </SwiperSlide>

        <SwiperSlide>
          <Lottie animationData={HelloLottie4} />
        </SwiperSlide>

        <SwiperSlide>
          <Lottie animationData={HelloLottie5} />
        </SwiperSlide>
      </Swiper>
    )
  }

  return (
    <div className="login-page">
      <div className="my_panel">
        <div className="panel_left">
          <div className="container_login">
            <div className="logo">
              <img width={126} height={30} alt="Logo" src={Logo} />
            </div>
            <div className="title">
              <span>В</span>
              <div className="inline-block">
                ойдите или зарегистрируйтесь, чтобы посмотреть всю информацию
                обо мне и моих проектах
              </div>
            </div>
            <div className="image">
              <img width={500} height={450} alt="Peoples" src={Peoples} />
            </div>
          </div>
        </div>
        <div className="panel_right">
          <div className="background_animation">
            <Lottie animationData={SpaceLottie} />
          </div>
          <div className="container_right_block">
            <div className="animation">
              {/* <img src={Lottie} alt="Lottie" width={260} height={170} /> */}
              <AnimationLottie />
            </div>

            <form>
              <h5>Создать аккаунт или войти</h5>
              <div className="auto_sign_block">
                <div className="sign_google">
                  <a className="sign_btn waves-effect waves-light btn-large">
                    <img
                      className="material-icons prefix"
                      src={GoogleIcon}
                      alt="Google Icon"
                      width={18}
                      height={18}
                    />
                    Sign up with Google
                  </a>
                </div>

                <div className="sign_vk">
                  <a className="sign_btn waves-effect waves-light btn-large">
                    <img
                      className="material-icons prefix"
                      src={VKIcon}
                      alt="VK Icon"
                      width={18}
                      height={18}
                    />
                    Sign up with VK
                  </a>
                </div>
              </div>
              <p className="text-separator">- OR -</p>

              <div className="row">
                <div className="input-field s6">
                  <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    className="form_input validate"
                  />
                  <label htmlFor="first_name">First Name</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field s12">
                  <input
                    onChange={changeHandler}
                    id="email"
                    type="email"
                    name="email"
                    className="form_input validate"
                  />
                  <label htmlFor="email">Email address</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field s12">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form_input validate"
                    onChange={changeHandler}
                  />
                  <label htmlFor="password">Password</label>
                  <span
                    onClick={showPasswordHandler}
                    toggle="#password"
                    className="field-icon toggle-password"
                  >
                    <span className="material-icons">visibility</span>
                  </span>
                </div>
              </div>

              <div className="bottom_block">
                <div className="bottom_btn sign">
                  <a
                    onClick={loginHandler}
                    className="sign_btn waves-effect waves-light btn-large"
                  >
                    Войти
                  </a>
                </div>

                <div className="bottom_btn registr">
                  <a
                    onClick={registerHandler}
                    className="sign_btn waves-effect waves-light btn-large"
                  >
                    Регистрация
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
