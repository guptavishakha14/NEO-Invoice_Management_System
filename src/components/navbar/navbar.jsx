import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/neo-logo.png';
import userprofile from '../../assets/userprofile.png';
import './navbar.css';
import { useNavigate } from "react-router-dom";
import { getUserByUserId } from '../../service/UserService';
import { auth } from '../../config';
import { Navigate } from 'react-router-dom';



function Navbar(props) {

  const [user1, setUser] = useState(props.user);

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [userType, setUserType] = useState("");

  const handleLogout = () => {
    // Remove the user's credentials from local storage
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // Navigate back to the login page on logout
    console.log("Logout success");
    window.location.reload(true);
  };

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
  // console.log("usertype", userType)

 

  return (
    
    <div className='navbar'>

      <Link to="/"><img className='nav-logo' src={logo} alt='Logo' /></Link>
      <div className={isMobile ? "nav-links-mobile" : 'list ms-auto'}
        onClick={() => setIsMobile(true)}>
        <ul className='nav-list'>
          <li>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Product
              </button>
              <ul className='dropdown-menu'>
                <li>
                  <Link
                    className='dropdown-item bg-dropdown'
                    to='/addproduct'
                    
                  >
                    Add Product
                  </Link>
                </li> 
                <li>
                  <Link
                    className='dropdown-item bg-dropdown'
                    to='/listproduct'
                    
                  >
                    List Product
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className='dropdown'>
              <button
                className='btn btn-secondary dropdown-toggle'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Vendor
              </button>
              <ul className='dropdown-menu'>
                <li>
                  <Link
                    className='dropdown-item bg-dropdown'
                    to='/addvendor'
                    
                  >
                    Add Vendor
                  </Link>
                </li>
                <li>
                  <Link
                    className='dropdown-item bg-dropdown'
                    to='/listvendor'
                    
                  >
                    List Vendor
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li><div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Client
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item bg-dropdown" to="/addclient">Add Client</Link></li>
              <li><Link className="dropdown-item bg-dropdown" to="/listclient">List Client</Link></li>
            </ul>
          </div></li>
          <li><div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Invoice
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/addinvoice">Add Invoice</Link></li>
              <li><Link className="dropdown-item" to="/listinvoice">List Invoice</Link></li>
            </ul>
          </div></li>

          <div className='dropdown u-profile'>
            <img className='profile-pic dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false" src={props.user.photoURL} alt='User Profile' />
            <ul className="dropdown-menu">
              <li>{props.user.displayName}</li>
              {/* <li>{props.user.email}</li> */}
              {/* {console.log("usr")}
              {console.log(props.user)} */}
              <li>
                <Link to="/myprofile">
                  <button className="nav-myprofile-btn">
                    My Profile
                  </button>
                </Link>
              </li>

              {userType === "admin" ? (
                <li>
                  <Link to="/listuser">
                    <button className="nav-userlist-btn">
                      User List
                    </button>
                  </Link>
                </li>
              ) : <></>}

              

              <li>
                <button className="nav-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>

            </ul>
          </div>
          {/* <p>Hello {props.user.displayName}</p>{console.log( props.user.email)} */}
        </ul>

      </div>

      <button className='mobile-menu-icon ' onClick={() => setIsMobile(!isMobile)
      }>
        {isMobile ? (
          <i className='fas fa-items'></i>
        ) : (
          <i className='fas fa-bars'></i>
        )}
      </button>
    </div>
  )
}
export default Navbar;
