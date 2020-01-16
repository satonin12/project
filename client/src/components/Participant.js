import React from 'react'
import PropTypes from 'prop-types'
// import Video from "components/Video";
// import Call from './Call'

function Participant() {
  const video = React.createRef()
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then(stream => {
      if (video.current) {
        video.current.srcObject = stream
        video.current.play()
      }
    })
  return <video autoPlay id="video" width="120" height="120" ref={video} />
}

// Participant.propTypes = {
//   stream: PropTypes.object
// };

export default Participant
