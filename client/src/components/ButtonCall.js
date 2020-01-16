import React, { useContext, useEffect, useRef } from 'react'
import { UserName } from '../context/UserName'
import PropTypes from 'prop-types'
import {
  UserMediaError,
  useUserMediaFromContext,
} from '@vardius/react-user-media'
import { UserMediaProvider } from '@vardius/react-user-media'
import { usePeerData } from 'react-peer-data'
import Participant from './Participant'
import Call from './Call'

function ButtonCall() {
  // const un = useContext(UserName)
  // const {stream, error} = UserMediaProvider()
  // const peerData = usePeerData()
  // const room = useRef()
  // useEffect(() => {
  //   room = peerData.connect(un.username, stream)
  //   // .on("participant", participant => {
  //   //   participant.on('connect', event =>{
  //   //     console.log('stream', participant.id, event.streams[0]);
  //   //   })

  //   // })
  // },[room])

  return (
    <div>
      <button className="btn green accent-2 black-item">Вызвать</button>
    </div>
  )
}

// ButtonCall.propTypes = {
//   username: PropTypes.string.isRequired,
//   stream: PropTypes.object
// };

export default ButtonCall
