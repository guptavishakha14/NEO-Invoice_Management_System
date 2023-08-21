import React from 'react'
import './AddClient.css';
import { useState, useEffect } from 'react';
import deleteIcon from '../../assets/deleteicon.png'
import { addClient } from '../../service/ClientService';
import { getAllProducts, getProduct } from '../../service/ProductService';
import { Link } from 'react-router-dom';
import { auth } from '../../config';
import { Navigate } from 'react-router-dom';
import { getUserByUserId } from '../../service/UserService';

function AddClient() {

  const[clientName,setName] = useState('')
  const[clientMobile,setMobile] = useState('')
  const[clientEmail,setEmail] = useState('')
  const[products,setProducts] = useState([])
  const[productId,setProdId] = useState('')
  const[productPrice,setProdPrice] = useState('')
  const [val, setVal] = useState([]);
  const[groupId,setGroupId] = useState('');
  let productArray = [];

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
    getProducts(groupId);
},[groupId])

  const addProduct = async () => {
    const docSnap = await getProduct(productId);
    console.log(docSnap);
    if (docSnap.exists()) {
      const document = docSnap.data();
      const prodcut = {
          "id":productId,
          "productName":document.prodName,
          "prodDescription":document.prodDescription,
          "price":document.price,
          productPrice,
        }
      productArray.push(prodcut);
    }
  }

  const handleAdd = () => {
    const abc = [...val, []]
    setVal(abc)
    if (productId === "" || productPrice === "")
      return;
    else {
      addProduct();
    }
  }

  const handleDelete = (i) => {
    const deletVal = [...val]
    deletVal.splice(i, 1)
    setVal(deletVal)
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("prodArray",productArray);
    addProduct();
    addClient(client);
    setName('');
    setMobile('');
    setEmail('');
    setVal([]);
  }

  const client = {
    clientName,
    clientMobile,
    clientEmail,
    groupId,
    "products":productArray
  }

  const getProducts = async(groupId) => {
    const response = await getAllProducts(groupId);
    setProducts(response);
  }

  return (
    <>
      <div className='add-client-container-1'>
        <div className='client-header'>
          <h2>Add Client Information</h2>
          <div className='div-btn1'><Link to="/listclient"><button className='view-btn1'>View Details</button></Link></div>
        </div>
        <div className='add-client-container-2'>
          <form className='add-client-form' onSubmit={handleSubmit}>
            <div className='add-client-container-3'>
              <div className='add-client-div-1 basic-details'>
                <label>Client Name</label>
                <input type="text" className='client-name' placeholder='Name' value={clientName} onChange={e => setName(e.target.value)} required />

              </div>

              <div className='add-client-div-1 div-client-email'>
                <label>Client Mobile</label>
                <input type="tel" className='client-mobile' placeholder='Mobile Number' value={clientMobile} pattern="[0-9]{10}" onChange={e => setMobile(e.target.value)} required />
              </div>

              <div className='add-client-div-1 div-client-email'>
                <label>Client Email</label>
                <input className="client-email" type="email" placeholder='Email id' value={clientEmail} onChange={e => setEmail(e.target.value)} required />

              </div>
            </div>

            <hr className='add-client-hr' />

            <div className='add-client-scrollable'>

             

              {val.map((data, i) => {
                return (
                  <div>
                    <div className='add-client-div-1 add-client-last-div'>
                      <div className='div-prod-name'>
                        <label>Product Name</label>

                        <select value={productId} onChange={e => { setProdId(e.target.value); }}>
                          {products.map((prodcut) => {
                            return (
                              <option value={prodcut.id}>{prodcut.prodName}</option>
                            )
                          })}
                        </select>
                      </div>

                      <div className='div-prod-price'>
                        <label>Product price</label>
                        <input type="number" className='product-price' placeholder='price' onChange={e => setProdPrice(e.target.value)} required />
                      </div>
                      <button className='btn-delete' onClick={() => handleDelete(i)}><img src={deleteIcon} alt="delete" /></button>
                    </div>
                  </div>
                )
              })}

            </div>
            <button className='btn-add-more' onClick={() => handleAdd()}>Add more products</button>
            <button className='btn-submit'>Submit</button>

          </form>

        </div>

      </div>

    </>
  )
}

export default AddClient