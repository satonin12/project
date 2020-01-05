import React from 'react'
import { PeerDataProvider } from 'react-peer-data'
import { UserMediaProvider } from '@vardius/react-user-media'
import { useUserMediaFromContext } from '@vardius/react-user-media'
import Call from '../components/Call'

export const CreatePage = () => {
  // const iceServers = [{
  //     // url: "stun:stun.1.google.com:19302"
  //     url: "stun:74.125.142.127:19302"
  // },
  // {
  //     urls: "turn:turn.bistri.com:80",
  //     credential: "homeo",
  //     username: "homeo"
  // }
  // ];

  return (
    // <PeerDataProvider
    //     servers={{ iceServers }}
    //     constraints={{ ordered: true }}
    //     signaling={{ url: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : null }}
    // >
    <UserMediaProvider constraints={{ audio: true, video: true }}>
      <div className="row justify-content-center mt-2">
        <Call />
      </div>
    </UserMediaProvider>
    // </PeerDataProvider>
  )
}
