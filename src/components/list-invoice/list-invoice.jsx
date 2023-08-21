import { React, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getAllInvoices, deleteInvoice, updateInvoice } from '../../service/InvoiceService';
import DataGrid from "../data-grid/dataGrid";
import './list-invoice.css';
import { auth } from '../../config';
import { Navigate } from 'react-router-dom';
import { getUserByUserId } from '../../service/UserService';

export default function BasicExampleDataGrid() {
  const [invoices, setInvoices] = useState([]);
  const [groupId, setGroupId] = useState('')


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
    getInvoices(groupId);

  }, [groupId]);

  const getInvoices = async (groupId) => {
    if (groupId) {
      const response = await getAllInvoices(groupId);
      if (response) {
        setInvoices(response);
      }
    }
  }

  const handleProcessRowUpdate = async (newRow) => {
    await updateInvoice(newRow);
  }

  const renderDeleteCell = (params) => {
    return (
      <Button onClick={(e) => onButtonClick(e, params.row)}
        variant="contained">
        Delete
      </Button>
    );
  };

  const onButtonClick = (e, row) => {
    e.stopPropagation();
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      deleteInvoice(row.id)
        .then(() => {
          window.location.reload(true);
        })
    }
  };

  const columns = [
    { field: 'compName', headerName: 'Company Name', width: 200, editable: true },
    { field: 'usertype', headerName: 'Usertype', width: 150, editable: true },
    { field: 'invNo', headerName: 'Invoice No', width: 150, editable: true },
    { field: 'date', headerName: 'Date', width: '200', editable: true },
    { field: 'amount', headerName: 'Amount', width: 130, editable: true },
    { field: 'cgst', headerName: 'CGST', width: 150, editable: true },
    { field: 'sgst', headerName: 'SGST', width: 150, editable: true },
    { field: 'totalPrice', headerName: 'Total Price', width: 200, editable: true },
    { field: "delete", headerName: "Delete", width: 150, renderCell: renderDeleteCell, sortable: false, filterable: false }
  ];

  return (
    <>
      <h2 className="list-heading">List Invoice</h2>
      <div style={{ marginTop: "25px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        </div>
        <DataGrid columns={columns} rows={invoices} processRowUpdate={handleProcessRowUpdate} searchFields={["compName", "usertype", "invNo"]} selectFields={["compName", "usertype"]} />
      </div>
    </>
  );
}