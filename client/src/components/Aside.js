import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { NumList } from './NumList'

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
    <div className="justify-content-left" style={{ marginLeft: 0 }}>
      <aside className="sidenav-main nav-expanded nav-lock nav-collapsible sidenav-light sidenav-active-square">
        <div className="brand-sidebar">
          <div className="input-field col s14">
            <input
              id="email"
              type="text"
              name="email"
              onChange={changeHandler}
            />
            <label htmlFor="email">Введите имя/email</label>
            <button
              className="btn white accent-2 black-text"
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
