import { React, useEffect, useState } from "react";
import './list_product.css';
import { deleteProduct, updateProduct } from '../../service/ProductService';
import { getAllProducts } from '../../service/ProductService';
import { Button } from '@mui/material';
import { auth } from '../../config';
import { Navigate } from 'react-router-dom';
import { getUserByUserId } from '../../service/UserService';
import DataGrid from "../data-grid/dataGrid";

export default function BasicExampleDataGrid() {
  const [products, setProducts] = useState([]);
  const [groupId, setGroupId] = useState('');

  useEffect(() => {
    const updateGroupId = auth.onAuthStateChanged(async (user) => {
      if (user !== null) {
        const response = await getUserByUserId(user.uid);
        setGroupId(response[0].groupId);
      }
      else {
        <Navigate to={'/'} />;
      }
    });
    updateGroupId();
    getProducts(groupId);
    // console.log("old use Effect")
  }, [groupId])

  const getProducts = async (groupId) => {
    const response = await getAllProducts(groupId);
    setProducts(response);

  }

  const handleProcessRowUpdate = async (newRow) => {
    await updateProduct(newRow);
  }

  const renderDeleteCell = (params) => {
    return (
      <Button
        onClick={(e) => onButtonClick(e, params.row)}
        variant="contained"
      >
        Delete
      </Button>
    );
  }

  const onButtonClick = (e, row) => {
    e.stopPropagation();
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      deleteProduct(row.id)
        .then(() => {
          window.location.reload(true);
        })
    }
  };

  const columns = [
    { field: 'id', headerName: 'Product Id', width: 300, editable: true },
    { field: 'prodName', headerName: 'Product Name', width: 300, editable: true },
    { field: 'prodDescription', headerName: 'Description', width: 500, editable: true },
    { field: 'price', headerName: 'Price', width: 300, editable: true },
    { field: "delete", headerName: "Delete", width: 100, renderCell: renderDeleteCell, sortable: false, filterable: false }
  ]

  return (
    <>
      <h2 className='product-list-heading'>List Product</h2>
      <div style={{ height: 400, width: '100%' }}>

        <DataGrid processRowUpdate={handleProcessRowUpdate} searchFields={["prodName"]} columns={columns} rows={products} />
      </div>
    </>
  );
}

