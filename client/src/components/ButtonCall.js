import React from 'react'

export const ButtonCall = props => {
  const key = props.key
  console.log(key)
  return (
    <div>
      <button className="btn green accent-2 black-item">Вызвать</button>
    </div>
  )
}
