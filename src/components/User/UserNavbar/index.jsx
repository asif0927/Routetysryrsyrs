import React from 'react';
import { Link } from 'react-router-dom';
import style from "./index.module.css";
import { useBasketContext } from '../../../context/BasketContext';
const UserNavbar = () => {
  const [ basket] = useBasketContext();
  return (
    <div className={style.maindiv}>
      <p className={style.paragraph}>React-App | routing | json.server</p>
      <ul className={style.ahd}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/employees">Employees</Link>
        </li>
        <li>
          <Link to="/favorite">Favorite {<span className='count'>{basket.length}</span>}</Link>
        </li>
        <li>
          <Link to="/admin">Admin Panel</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserNavbar;
