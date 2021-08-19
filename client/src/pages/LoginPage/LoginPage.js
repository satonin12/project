import React, { useState, useEffect, useContext, useRef } from 'react'
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
  const [switchToLogin, setSwitchToLogin] = useState(true)
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const input_firstName = useRef(null)
  const input_lastName = useRef(null)
  const input_email = useRef(null)
  const input_password = useRef(null)

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  /**
   * Ранее state менялся при событии onChange на все input формы
   * теперь же используются ф-я inputsToObject и неконтроллируемые input
   */
  const changeHandler = event => {
    event.persist()
    const { name, value } = event.target

    // было
    // setForm({ ...form, [event.target.name]: event.target.value })

    // стало
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }))

    console.log(form)
  }

  const registerHandler = async () => {
    try {
      const inputsForm = inputsToObject([
        input_firstName.current,
        input_lastName.current,
        input_email.current,
        input_password.current,
      ])

      const data = await request('/api/auth/register', 'POST', inputsForm)
      console.log(data)
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const inputsForm = inputsToObject([
        input_firstName.current,
        input_lastName.current,
        input_email.current,
        input_password.current,
      ])

      console.log(inputsForm)

      const data = await request('/api/auth/login', 'POST', inputsForm)
      console.log(data)
      auth.login(data.token, data.userId, data.firstName, data.lastName)
    } catch (e) {}
  }

  const switchToLoginHandler = event => {
    setSwitchToLogin(prevState => (prevState = !prevState))
  }

  const inputsToObject = inputs => {
    let obj = {}

    inputs.map(ele => {
      if(!!ele) {
        obj[ele.name] = ele.value
      }
    })

    return obj
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
    input.focus()
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

              {switchToLogin && (
                <>
                  <div className="row">
                    <div className="input-field s6">
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        className="form_input validate"
                        ref={input_firstName}
                        // defaultValue={form.firstName}
                        // onChange={changeHandler}
                      />
                      <label htmlFor="firstName">First Name</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field s6">
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        className="form_input validate"
                        ref={input_lastName}
                        // onChange={changeHandler}
                      />
                      <label htmlFor="lastName">Last Name</label>
                    </div>
                  </div>
                </>
              )}

              <div className="row">
                <div className="input-field s12">
                  <input
                    // onChange={changeHandler}
                    id="email"
                    type="email"
                    name="email"
                    className="form_input validate"
                    ref={input_email}
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
                    ref={input_password}
                    // onChange={changeHandler}
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
                {!switchToLogin ? (
                  <>
                    <div className="bottom_btn sign">
                      <a
                        onClick={loginHandler}
                        className="sign_btn waves-effect waves-light btn-large"
                      >
                        Войти
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bottom_btn registr">
                      <a
                        onClick={registerHandler}
                        className="sign_btn waves-effect waves-light btn-large"
                      >
                        Регистрация
                      </a>
                    </div>
                  </>
                )}
              </div>

              <div className="switch_login">
                <span>
                  {switchToLogin ? (
                    <>
                      Already have an account ?{' '}
                      <a onClick={switchToLoginHandler}>Log in</a>
                    </>
                  ) : (
                    <>
                      Don't have an account ?{' '}
                      <a onClick={switchToLoginHandler}>Register</a>
                    </>
                  )}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
