import React from 'react'

export const ButtonCall = props => {
  const key = props.key
  console.log(key)
  return (
    <div>
      <button class="btn accent-2 black-item hoverable">Вызвать</button>
    </div>
  )
}