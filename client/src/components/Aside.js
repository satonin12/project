import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom';
// import { useHttp } from '../hooks/http.hook'
// import { NumList } from './NumList'
import {v4 as uuidv4} from 'uuid'

import '../index.css'

export const Aside = (props) => {
  // const [form, setForm] = useState({ email: '' })
  // const [data, setData] = useState([])
  // const [isLoad, setLoad] = useState(false)
  // const { loading, request } = useHttp()

  // const changeHandler = event => {
  //   setForm({ ...form, [event.target.name]: event.target.value })
  //   setLoad(false)
  // }
  // const listHandler = async () => {
  //   try {
  //     const res_data = await request('/api/auth/create', 'POST', { ...form })
  //     const data = res_data.map(obj => obj.email)
  //     setData({ data })
  //     setLoad(true)
  //   } catch (error) {}
  // }

  const newRoomHandler = async () => {
    const roomId = uuidv4()
    console.log(roomId)

    console.log(props)

    // customHistory.push('/room/${roomId}')

  }

  return (
    <div class="container-creat-1">
      <aside class="">
        <div class="">
          <div class="">
            <input type="text" id="fname" name="fname" placeholder="Введите название комнаты" />
            <button
              className="btn white black-text hoverable"
              style={{ marginRight: 10 }}
              onClick={newRoomHandler}
              // disabled={loading}
            >
              Начать звонок
            </button>

            {/* <div>{isLoad && <NumList list={data} />}</div> */}
          </div>
        </div>
      </aside>
    </div>
  )
}
