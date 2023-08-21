import { React, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { auth } from '../../config';
import { Navigate } from 'react-router-dom';
import { deleteVendor, getAllVendors, updateVendor } from "../../service/VendorService";
import DataGrid from "../data-grid/dataGrid";
import "./listVendor.css";
import { getUserByUserId } from '../../service/UserService';

export default function Headers() {
  const [vendors, setVendors] = useState([]);
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
    getVendorsList(groupId);
  }, [groupId])


  const getVendorsList = async (id) => {
    const response = await getAllVendors(id);
    setVendors(response);
  };

  const handleProcessRowUpdate = async (newRow) => {
    await updateVendor(newRow);
  };

  const renderDeleteCell = (params) => {
    return (
      <Button onClick={(e) => onButtonClick(e, params.row)} variant="contained">
        Delete
      </Button>
    );
  };

  const onButtonClick = (e, row) => {
    e.stopPropagation();
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      deleteVendor(row.id)
        .then(() => {
          window.location.reload(true);
        })
    }
  };

  const columns = [
    { field: "id", headerName: "Vendor ID", width: 300, editable: false },
    { field: "name", headerName: "Vendor Name", width: 250, editable: true },
    { field: "mobile", headerName: "Mobile", width: 250, editable: true },
    { field: "email", headerName: "Email", width: 300, editable: true },
    { field: "materialType", headerName: "Material Type", width: 250, editable: true },
    { field: "delete", headerName: "Delete", width: 100, renderCell: renderDeleteCell, sortable: false, filterable: false }
  ];

  return (
    <>
      <h2 className="list-heading">List Vendor</h2>
      <div style={{ marginTop: "25px" }}>

        <DataGrid columns={columns} rows={vendors} searchFields = { ["name", "email"] } processRowUpdate={handleProcessRowUpdate} />
      </div>
    </>
  );
}