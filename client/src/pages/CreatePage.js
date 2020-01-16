import React from 'react'
import { UserMediaProvider } from '@vardius/react-user-media'
import { Aside } from '../components/Aside'
import Call from '../components/Call'
export const CreatePage = () => {
  return (
    <div class="container-create fon-create">
      <Aside />
      <UserMediaProvider constraints={{ audio: true, video: true }}>
        <Call />
      </UserMediaProvider>
    </div>
  )
}
