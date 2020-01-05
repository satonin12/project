import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UserMediaError, useUserMedia } from '@vardius/react-user-media'

function Call() {
  const video = React.createRef()
  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    if (video.current) {
      video.current.srcObject = stream
      video.current.play()
    }
  })
  return <video autoPlay id="video" width="640" height="480" ref={video} />
}

export default Call
