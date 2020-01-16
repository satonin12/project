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
  // return <div class="panel container-creat-2"><div class="panel-1"><div class="panel-1-1"><video autoPlay id="video" width="1000vh" height="280" ref={video} /></div><div class="panel-1-2"></div>g</div><div class="panel-2"></div></div>
  return <div class="panel container-creat-2"><div class="panel video"><video autoPlay id="video" width="400vh" height="300vh" ref={video} /></div></div>

}

export default Call
