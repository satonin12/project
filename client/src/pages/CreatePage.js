import React, { useState, useContext } from 'react'
import { UserMediaProvider } from '@vardius/react-user-media'
import { Aside } from '../components/Aside'
import Call from '../components/Call'
import { UserName } from '../context/UserName'

export const CreatePage = () => {
  const un = useContext(UserName)

  return (
    <div>
      <Aside />
      {/* { un.call && */}
      <UserMediaProvider constraints={{ audio: true, video: true }}>
        <Call />
      </UserMediaProvider>
      {/* } */}
    </div>
  )
}
