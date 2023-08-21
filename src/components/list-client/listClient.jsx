import { React, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { deleteClient, getAllClients, updateClient } from "../../service/ClientService";
import DataGrid from "../data-grid/dataGrid";
import "./list_client.css";
import { auth } from '../../config';
import { Navigate } from 'react-router-dom';
import { getUserByUserId } from '../../service/UserService';

export default function ListClient() {
  const [clients, setClients] = useState([]);
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
    getClients(groupId);
  }, [groupId])

  const getClients = async (groupId) => {
    const response = await getAllClients(groupId);
    setClients(response);
  }

  const handleProcessRowUpdate = async (newRow) => {
    await updateClient(newRow);
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
      deleteClient(row.id)
        .then(() => {
          window.location.reload(true);
        })
    }
  };

  const columns = [
    { field: "clientName", headerName: "Client Name", width: 400, editable: true },
    { field: "clientEmail", headerName: "Client Email", width: 400, editable: true },
    { field: "clientMobile", headerName: "Client Mobile", width: 400, editable: true },
    { field: "delete", headerName: "Delete", width: 200, renderCell: renderDeleteCell, sortable: false, filterable: false },
  ];

  return (
    <>
      <h2 className="list-heading">List Client</h2>
      <div className="margin" style={{ marginTop: "25px" }}>

        <DataGrid columns={columns} rows={clients} searchFields={["clientName", "clientEmail"]} processRowUpdate={handleProcessRowUpdate} />
      </div>
    </>
  );
}