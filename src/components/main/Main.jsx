import React from "react";
import "../../style.css";
import {
  Routes,
  Route
} from "react-router-dom";
import AddClientPage from "../../pages/addClientPage";
import AddVendorPage from "../../pages/addVendorPage";
import AddProductPage from "../../pages/addProductPage";
import ListClientPage from "../../pages/listClientPage";
import ListVendorPage from "../../pages/listVendorPage";
import ListProductPage from "../../pages/listProductPage";
// import DisplayPage from './pages/displayPage';
import AddInvoicePage from "../../pages/addInvoice";
import ListInvoicePage from "../../pages/listInvoicePage";
import Navbar from "../navbar/navbar";
import Dashboard from "../dashboard/Dashboard";
// import ProtectedRoutes from "../protected-routes/ProtectedRoutes";
import ListuserPage from "../../pages/listUserPage";
import MyProfilePage from "../../pages/myProfilePage";


export default function Main(props) {
  return (
    <>
        <Navbar user={props.user}/>
        {/* {console.log('In Main '+props.user.photoURL)} */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <Navbar /> */}
                <Dashboard />
              </>
            }
          />
          <Route
            path="/addclient"
            element={
              <>
                {/* <Navbar /> */}
                <AddClientPage />
              </>
            }
          />
          <Route
            path="/addinvoice"
            element={
              <>
                {/* <Navbar /> */}
                <AddInvoicePage />
              </>
            }
          />
          <Route
            path="/addvendor"
            element={
              <>
                {/* <Navbar /> */}
                <AddVendorPage />
              </>
            }
          />
          <Route
            path="/addproduct"
            element={
              <>
                {/* <Navbar /> */}
                <AddProductPage />
              </>
            }
          />
          <Route
            path="/listclient"
            element={
              <>
                {/* <Navbar /> */}
                <ListClientPage />
              </>
            }
          />
          <Route path="/listvendor" element={<ListVendorPage />} />
          <Route
            path="/listproduct"
            element={
              <>
                {/* <Navbar /> */}
                <ListProductPage />
              </>
            }
          />
          <Route
            path="/listinvoice"
            element={
              <>
                {/* <Navbar /> */}
                <ListInvoicePage />
              </>
            }
          />

          <Route
            path="/listuser"
            element={
              <>
              <ListuserPage user={props.user}/>
              </>
            }
          />

          <Route
            path="/myprofile"
            element={
              <>
              <MyProfilePage user={props.user}/>
              </>
            }
          />
        </Routes>
    </>
  );
}
