// import React from 'react'
import './myprofile.css'
import { auth } from '../../config';
import { Navigate } from 'react-router-dom';
import { getUserByUserId } from '../../service/UserService';
import React, { useState, useEffect } from 'react';



export default function Myprofile(props) {

  const [userType, setUserType] = useState("");

  useEffect(() => {
    const updateGroupId = auth.onAuthStateChanged(async (user) => {
      if (user !== null) {
        const response = await getUserByUserId(user.uid); // use
        // console.log("reonse",response)
        const usertype = (response[0].userType)
        setUserType(usertype)
      }
      else {
        <Navigate to={'/'} />;
      }
    });
    updateGroupId();
  }, [userType]);

  return (
    <>
    <h2 className="myprofile-heading">My Profile</h2>
    <div className='profile'>
      {/* {console.log("props.user")} */}
      {/* {console.log(props.user.displayName)} */}
      {/* {console.log(props.displayName)} */}
      <img className='profile-img' src={props.user.photoURL}></img>
      <div className='information'>
      <h5>Name<span className='name'>:</span><span className='n'>{props.user.displayName}</span></h5>
      <h5>Email<span className='email'>:</span><span className='n'>{props.user.email}</span></h5>
      <h5>User Type<span className='type'>:</span><span className='n'>{userType}</span></h5>
      </div>
        
    </div>
    </>
  )
}
