import React from 'react'
import { UserMediaProvider } from '@vardius/react-user-media'
import { Aside } from '../components/Aside'
import Call from '../components/Call'
export const CreatePage = () => {
  return (
    <div className="row justify-content-center mt-2">
      <Aside />
      <UserMediaProvider constraints={{ audio: true, video: true }}>
        <Call />
      </UserMediaProvider>
    </div>
  )
}
