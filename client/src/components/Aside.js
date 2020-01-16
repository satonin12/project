import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { NumList } from './NumList'
import '../index.css'

export const Aside = () => {
  const [form, setForm] = useState({ email: '' })
  const [data, setData] = useState([])
  const [isLoad, setLoad] = useState(false)
  const { loading, request } = useHttp()

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
    setLoad(false)
  }
  const listHandler = async () => {
    try {
      const res_data = await request('/api/auth/create', 'POST', { ...form })
      const data = res_data.map(obj => obj.email)
      setData({ data })
      setLoad(true)
    } catch (error) {}
  }
  return (
    <div class="container-creat-1">
      <aside class="">
        <div class="">
          <div class="">
            {/* <label for="email" class="">Введите имя/email</label> */}
            {/* <input 
              class="input"
              id="email"
              type="text"
              name="email"
              value="Введите имя/email"
              onChange={changeHandler}
            /> */}
            <input type="text" id="fname" name="fname" placeholder="John" />
            <button
              className="btn white black-text hoverable"
              style={{ marginRight: 10 }}
              onClick={listHandler}
              disabled={loading}
            >
              Найти
            </button>

            <div>{isLoad && <NumList list={data} />}</div>
          </div>
        </div>
      </aside>
    </div>
  )
}
