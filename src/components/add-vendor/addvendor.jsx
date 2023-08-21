import { React, useEffect, useState } from 'react'
import './addvendor.css';
import { addVendor } from '../../service/VendorService';
import { auth } from '../../config';
import { Link, Navigate } from 'react-router-dom';
import { getUserByUserId } from '../../service/UserService';

function AddClient() {
  const[name,setName] = useState('')
  const[mobile,setMobile] = useState('')
  const[email,setEmail] = useState('')
  const[materialType,setMaterial] = useState('')
  const[groupId,setGroupId] = useState('')

  useEffect(() => {
    const updateGroupId = auth.onAuthStateChanged(async(user) => {
        if (user !== null) {
            const response= await getUserByUserId(user.uid);
            setGroupId(response[0].groupId);
            console.log("groop",groupId)
        }
        else {
            <Navigate to={'/'} />;
        }
    });
    updateGroupId();
},[groupId])

function handleSubmit(e){
  e.preventDefault()
  if(name==='' || mobile===''|| materialType==='' ||email===''){
    alert("Fill all details correctly");
  }
  else{
    addVendor(vendor);
    setName("");
    setMobile("");
    setEmail("");
    setMaterial("");
  }
  }


function getMaterialType(e){
  if(e.target.value==="----select Material type----"){
    alert('select material type first');
  }
  else
  setMaterial(e.target.value);
}

const vendor = {
  name,
  mobile,
  email,
  materialType,

  groupId
}

  return (
    <>
      <div className='container-1'>
        {/* <h2>Add Vendor Information</h2> */}
        <div className='client-header'>
          <h2>Add Vendor Information</h2>
          <div className='div-btn1'><Link to="/listvendor"><button className='view-btn1'>View Details</button></Link></div>
        </div>
        <div className='container-2_addvendor'>
          <form onSubmit={handleSubmit} className="vendor-form">
            <div className='div-1'>
              <div className="vendor-name in1">
                <label>Vendor Name</label>
                <input type="text" className='client-name' placeholder='Name' value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className='vendor-mob in2'>
                <label>Vendor Mobile</label>
                <input type="tel" className='client-mobile' placeholder='Mobile Number' pattern="[0-9]{10}" value={mobile} onChange={e => setMobile(e.target.value)} required />
              </div>
            </div>

            <div className='div-1 vendor-div'>
              <div className='vendor-mail in1'>
                <label>Vendor Email</label>
                <input type="email" className='client-email' placeholder='Email id' value={email} onChange={e => setEmail(e.target.value)} required />
              </div>

              <div className='in1'>
              {/* className='add-vendor-div-1 add-vendor-last-div  default-add-vendor' */}
              <label>Material Type</label>
                <select className='select_addvendor' value={materialType} onChange={getMaterialType}>
                        <option selected value="blank">----select Material type----</option>
                        <option value="Material-1">Material-1</option>
                        <option value="Material-2">Material-2</option>
                        <option value="Material-3">Material-3</option>
                        <option value="Material-4">Material-4</option>
                      </select>
        </div>

            </div>

            <button className='btn_add_vendor' type='submit'>Add</button>
          </form>

        </div>


      </div>

    </>
  )
}

export default AddClient