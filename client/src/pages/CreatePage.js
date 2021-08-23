import React, { useContext } from 'react'
// import { UserMediaProvider } from '@vardius/react-user-media'
// import { Aside } from '../components/Aside'
// import Call from '../components/Call'
// import { UserName } from '../context/UserName'
import { v1 as uuid } from 'uuid'
import { AuthContext } from '../context/AuthContext'
// import { useAuth } from '../hooks/auth.hook'
import { CreateRoom } from '../context/CreateRoom'

export const CreatePage = props => {
  // const contextUser = useContext(AuthContext)
  // console.log(contextUser)
  const create = useContext(CreateRoom)

  const newRoomHandler = async () => {
    const id = uuid()

    const roomName = document.getElementById('fname')
    const room = roomName.value

    create.createRoom(id, room)
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
