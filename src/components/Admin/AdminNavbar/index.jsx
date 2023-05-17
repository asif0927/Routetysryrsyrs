import React from 'react';
import { Link } from 'react-router-dom';
import style from "./index.module.css";

const AdminNavbar = () => {
  return (
    <>
    <div className={style.maindiv}>
      <p className={style.paragraph}>React-App | routing |Admin</p>
    <ul className={style.ahd}>
        <li>
          <Link to='/admin'>EmployeesAdmin</Link>
        </li>
        <li>
          <Link to='/admin/add-employees'>EmployeesAdd</Link>
        </li>
        <li>
          <Link to='/'>Home</Link>
        </li>
    </ul>
    </div>
    </>
  )
}

export default AdminNavbar
