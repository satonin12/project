import React, { useState, useRef, useEffect, useContext } from 'react'
import io from 'socket.io-client'
import Peer from 'simple-peer'
import styled from 'styled-components'
import { useMessage } from '../../hooks/message.hook'
import { AuthContext } from '../../context/AuthContext'

import './index.css'
import { CreateRoom } from '../../context/CreateRoom'

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
  border: 1px solid red;
  background-color: #28282836;

  // при наведении
  &:hover {
    border: 1px solid black;
  }
`

const Video = props => {
  const ref = useRef()

  useEffect(() => {
    props.peer.on('stream', stream => {
      ref.current.srcObject = stream
    })
  }, [props.peer])

  return <StyledVideo playsInline autoPlay ref={ref} />
}

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
}

export const CallRoom = props => {
  const [peers, setPeers] = useState([])
  const socketRef = useRef()
  const userVideo = useRef(null)
  const peersRef = useRef([])
  const roomID = props.match.params.roomID
  const message = useMessage()

  const contextRoom = useContext(CreateRoom)

  console.log(contextRoom)
  const User = useContext(AuthContext)

  useEffect(() => {
    console.log(socketRef)
    socketRef.current = io.connect('http://localhost:5000', {
      withCredentials: true,
    })

    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then(stream => {
        userVideo.current.srcObject = stream
        socketRef.current.emit('join room', roomID)
        socketRef.current.on('all users', users => {
          const peers = []
          users.forEach(userID => {
            const peer = createPeer(userID, socketRef.current.id, stream)
            peersRef.current.push({
              peerID: userID,
              peer,
            })
            peers.push(peer)
          })
          setPeers(peers)
        })

        socketRef.current.on('user joined', payload => {
          const peer = addPeer(payload.signal, payload.callerID, stream)
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          })

          setPeers(users => [...users, peer])
        })

        socketRef.current.on('receiving returned signal', payload => {
          const item = peersRef.current.find(p => p.peerID === payload.id)
          item.peer.signal(payload.signal)
        })
      })
      .catch(err => {
        // обработка ошибки
        const errMessage = err.message
        console.log(errMessage)

        if (errMessage === 'The object can not be found here.') {
          message(
            'Не найдены медиа-устройства! Пожалуйста подключите web-камеру и микрофон и попробуйте ещё раз'
          )
        }
      })
    console.log(peers)
    // ? FIXME useEffect прокидывает ошибку на неиспользование message и roomID
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    })

    peer.on('signal', signal => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      })
    })

    return peer
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on('signal', signal => {
      socketRef.current.emit('returning signal', { signal, callerID })
    })

    peer.signal(incomingSignal)

    return peer
  }

  return (
    <>
      <div className="title">{contextRoom.roomName}</div>
      <div className="wrapperRoom">
        <div className="Container">
          <StyledVideo muted ref={userVideo} autoPlay playsInline />
          {peers.map((peer, index) => {
            return (
              <div className="VideoContainer">
                <div className="StyledVideoTest">
                  <Video key={index} peer={peer} />
                </div>

                <div className="VideoContainer--title">
                  {User.firstName} {User.lastName}
                </div>
              </div>
            )
          })}
          {/* без (for tests) */}
          {/* <div className="VideoContainer">
            <div className="StyledVideoTest"></div>
            <div className="VideoContainer--title">
              {User.firstName} {User.lastName}
            </div>
          </div>
          <div className="VideoContainer">
            <div className="StyledVideoTest"></div>
            <div className="VideoContainer--title">
              {User.firstName} {User.lastName}
            </div>
          </div>
          <div className="VideoContainer">
            <div className="StyledVideoTest"></div>
            <div className="VideoContainer--title">
              {User.firstName} {User.lastName}
            </div>
          </div>
          <div className="VideoContainer">
            <div className="StyledVideoTest"></div>
            <div className="VideoContainer--title">
              {User.firstName} {User.lastName}
            </div>
          </div>
          <div className="VideoContainer">
            <div className="StyledVideoTest"></div>
            <div className="VideoContainer--title">
              {User.firstName} {User.lastName}
            </div>
          </div> */}
        </div>
        <div className="ChatContainer">
          В будущем здесь появится чат между участниками видеочата!
        </div>
      </div>
    </>
  )
}
