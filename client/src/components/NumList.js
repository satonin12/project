import React, { useState } from 'react'
import { ButtonCall } from './ButtonCall'
import classnames from 'classnames';

//TODO: add class="collection-item active" on li active click or CSS

export const NumList = props => {
  const list = props.list.data
  const [key, setKey] = useState({key: ''})
  const [isActive, setActive] = useState(false)

  const clickHandler = item => {
    setKey({key: item.currentTarget.dataset.id})
    setActive(true)
    console.log(key.key)
  }
  var classes = classnames('collection-item', {'collection-item active': isActive})
  const listItem = list.map(item => (
    <li onClick={clickHandler.bind(item)}
        className={classes}
        data-id={item}>
      {item}
    </li>
  ))
  return (
    <div>
      <ul className="collection">{listItem}</ul>
      <button className="btn green accent-2 black-item">Вызвать</button>
    </div>
  )
}
