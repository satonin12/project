import { createContext } from 'react'

function noop() {}

export const CreateRoom = createContext({
  roomName: null,
  roomID: null,
  createRoomName: noop,
})
