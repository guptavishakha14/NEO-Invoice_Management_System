import { React, useState,useEffect} from 'react'
import './addProduct.css'
import defaultImg from '../../assets/default-img.png'
import { addProduct } from '../../service/ProductService';
import { auth } from '../../config';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getUserByUserId } from '../../service/UserService';

export default function AddProduct() {

    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [price, setPrice] = useState('');
    const[groupId,setGroupId] = useState('');

    useEffect(() => {
        const updateGroupId = auth.onAuthStateChanged((user) => {
            if (user !== null) {
                setTimeout(async() => {
                    const response= await getUserByUserId(user.uid);
                    setGroupId(response[0].groupId);
                    console.log("groop",groupId)
                }, 1000);
            }
            else {
                <Navigate to={'/'} />;
            }
        });
        updateGroupId();
    },[groupId])

    const handleSubmit = (event) => {
        event.preventDefault();
        addProduct(product);
        setProdName("");
        setProdDescription("");
        setPrice("");
    };

    const product = {
        prodName,
        prodDescription,
        price,
        groupId
    };

    return (
        <>
            <div className="add-prod-main-container">
                <div className="product-header">
                    <h1>ADD PRODUCT</h1>
                    
                    <div className="header-btn">
                        <Link to="/addproduct"><button>+ New Product</button></Link>
                        <Link to="/listproduct"><button>View Details</button></Link>
                    </div>
                </div>
                <hr className='product-hr' />

                <div className="product-container">
                    <div className="content-container">
                        <form onSubmit={handleSubmit} className='product-form'>
                            <div className="product-inner">
                                <div className="prod-name">
                                    <label htmlFor="Product-name">Product-Name</label>
                                    <input type="text" className='input-product' value={prodName} onChange={e => setProdName(e.target.value)} />
                                </div>


                                <div className="prod-price">
                                    <label htmlFor="Product-price">Product-Price</label>
                                    <input type="number" className='input-product' min="1" value={price} onChange={e => setPrice(e.target.value)} />
                                </div>

                                <div className="prod-descp">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className='input-product' value={prodDescription} onChange={e => setProdDescription(e.target.value)} />
                                </div>

                                <div className="save-btn">
                                    <button type="submit">SAVE</button>
                                </div>
                            </div>
                        </form>


                        <div className="image-product">
                            <label htmlFor="prodcut-img">Reference Image</label>
                            <img src={defaultImg} alt="product" className='product-img' />
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
