import { useState, useCallback, useEffect } from 'react'

const storageName = 'roomData'

export const useCreateRoom = () => {
  const [roomName, setRoomName] = useState(null)
  const [roomID, setRoomID] = useState(null)

  const createRoom = useCallback((_roomID, _roomName) => {
    setRoomName(_roomName)
    setRoomID(_roomID)

    localStorage.setItem(
      storageName,
      JSON.stringify({
        id: _roomID,
        roomName: _roomName,
      })
    )
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.id) {
      createRoom(data.id, data.roomName)
    }
  })

  return { roomName, roomID, createRoom }
}
