import React, { useState, useContext } from 'react'
import ButtonCall from './ButtonCall'
import { UserName } from '../context/UserName'
import {
  UserMediaError,
  useUserMediaFromContext,
} from '@vardius/react-user-media'

//TODO: add class="collection-item active" on li active click or CSS

export const NumList = props => {
  const user = useContext(UserName)
  const list = props.list.data
  const [key, setKey] = useState()
  const [isActive, setActive] = useState(false)
  // const {stream, error} = useUserMediaFromContext()

  const listItem = list.map(item => (
    <li
      onClick={e => {
        setKey(item)
        user.username = item
        user.call = true
        setActive(true)
        console.log(user.username)
        console.log(user.call)
      }}
      className="collection-item"
      data-id={item}
    >
      {item}
    </li>
  ))
  return (
    <div>
      <ul className="collection">{listItem}</ul>
      <div>
        <ButtonCall />
      </div>
    </div>
  )
}
