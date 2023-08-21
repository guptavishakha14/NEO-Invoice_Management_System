import React from 'react'
import Myprofile from '../components/my-profile/Myprofile'

export default function myProfilePage(props) {
  return (
    <div>
        <Myprofile user={props.user}/>
    </div>
  )
}
