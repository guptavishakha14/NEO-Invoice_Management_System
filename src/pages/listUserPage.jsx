import React from 'react'
import Listuser from '../components/list-user/list-user'

export default function listUserPage(props) {
  return (
    <div>
        <Listuser user={props.user}/>
    </div>
  )
}
