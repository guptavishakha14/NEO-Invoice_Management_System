import React, { useEffect, useState } from 'react'
import DataGrid from "../data-grid/dataGrid";
import { getAllUsers, updateUser, deleteUser } from '../../service/UserService';
import './list-user.css'
import { Button } from "@mui/material";

export default function ListUser(props) {

  const [users, setUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const userList = async (userId) => {
    const response = await getAllUsers(userId);
    setUsers(response);
    setFilteredUsers(response);
  }

  useEffect(() => {
    userList();
  }, [])

  useEffect(() => {

    setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase())));
    console.log("users", users)
  }, [searchQuery], users);


  const handleProcessRowUpdate = async (newRow, oldRow) => {

    await updateUser(newRow);
  }

  const renderDeleteCell = (params) => {
    return (
      <Button onClick={(e) => deleteThisUser(e, params.row)} variant="contained">
        Delete
      </Button>
    );
  };

  const deleteThisUser = (e, row) => {
    e.stopPropagation();
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      const isDeleted = true;
      deleteUser(row, isDeleted)
        .then(() => {
          window.location.reload(true);
        })
    }
  };

  const columns = [
    { field: 'name', headerName: 'Username', width: 300, editable: false },
    { field: 'userId', headerName: 'User Id', width: 350, editable: false },
    { field: 'groupId', headerName: 'Group Id', width: 350, editable: true },
    { field: 'active', headerName: 'Active', width: 150, editable: true },
    { field: 'userType', headerName: 'Usertype', width: 150, editable: true },
    { field: "delete", headerName: "Delete", width: 200, renderCell: renderDeleteCell, sortable: false, filterable: false },
    // { field: "delete", headerName: "Delete", width: 200, renderCell: renderDeleteCell, sortable: false, filterable: false },

  ];


  return (
    <>
      <h2 className="user-list-heading">Users List</h2>
      <div style={{ marginTop: "25px" }}>
        <div>
        </div>
        <DataGrid columns={columns} rows={filteredUsers} searchFields={["name",]} selectFields={["userType"]} processRowUpdate={handleProcessRowUpdate} />
      </div>
    </>
  )
}
