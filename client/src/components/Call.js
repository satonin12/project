import React, { useRef, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import { UserMediaError, useUserMedia } from '@vardius/react-user-media'
function Call() {
  const video = React.createRef()
  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    if (video.current) {
      video.current.srcObject = stream
      video.current.play()
    }
  })
  return <div class="panel container-creat-2"><div class="panel video"><video autoPlay id="video" width="400vh" height="300vh" ref={video} /></div></div>
}
export default Call
