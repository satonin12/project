import React from 'react'
// import { UserMediaProvider } from '@vardius/react-user-media'
// import { Aside } from '../components/Aside'
// import Call from '../components/Call'
// import { UserName } from '../context/UserName'
import { v1 as uuid } from 'uuid'

export const CreatePage = props => {
  console.log(props)
  console.log(props.history)

  const newRoomHandler = async () => {
    const id = uuid()
    console.log(id)
    props.history.push(`/room/${id}`)
  }

  return (
    <div className="container-create fon-create">
      <div className="container-creat-1">
        <aside className="">
          <div className="">
            <div className="">
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Введите название комнаты"
              />
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
    </div>
  )
}
