import React from 'react';
import AdminNavbar from "../../components/Admin/AdminNavbar";
import { Outlet } from 'react-router-dom';
const AdminRoot = () => {
  return (
    <>
    <AdminNavbar/>
    <Outlet />
    </>
  )
}

export default AdminRoot
