import React, { useState, useEffect } from "react";
import { auth } from "../../config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./signinpage.css";
import Main from "../main/Main";
import { useNavigate } from "react-router-dom";

import { addUser, getUserByUserId } from "../../service/UserService";
import logo from "../../assets/neo-logo.png";
// import Swal from "sweetalert2";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SignInPage() {
  const [user, setUser] = useState('');

  const navigate = useNavigate();
  const [htmlCode, setHtmlCode] = useState('');

  useEffect(() => {
    // Check if the user is already logged in from a previous session
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    // Add a class to the body element when the user is not logged in
    if (!user) {
      document.body.classList.add("signin-page");
    }
    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("signin-page");
    };
  }, [user]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        // console.log(user);

        // Store the user's credentials in local storage

        const userId = user.uid;
        checkUser(userId, user);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const checkUser = async (userId, user) => {
    console.log("userId", userId);
    console.log("user", user);
    let response = await getUserByUserId(userId);
    console.log("response", response);
    if (response.length === 0) {
      const userObj = {
        name: user.displayName,
        email: user.email,
        userId: user.uid,
        groupId: user.uid,
        active: false,
        userType: "user",
        isDeleted: false
      }
      console.log("userObj", userObj);
      addUser(userObj);
      response = await getUserByUserId(userId);
    }
    console.log("response2", response);
    if (response[0].active === true) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/");
    }
    else {
      navigate("/");
      toast.error('You are not authorized for login. Contact Admin for permission.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }


  const handleLogout = () => {
    // Remove the user's credentials from local storage
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // Navigate back to the login page on logout
  };

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
      <div className="signin-container">
        <div className="wrapper">
          <ToastContainer />
          {user ? (
            <>

              <Main user={user} />
            </>
          ) : (
            <>
              <div className="logo-neo">
                <img src={logo} alt="logo of neo" />
              </div>
              <div>
                <button onClick={signInWithGoogle} className="google-signin">
                  Google SignIn
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
