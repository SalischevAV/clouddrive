import React from "react";
import { NavLink } from 'react-router-dom';
import "./navbar.css";
import Logo from "../../assets/img/navbar_logo.svg";

export default () => {
  return (
    <div className="navbar">
      <div className="container">
        <img src={Logo} alt="navbar_logo" className="navbar__logo" />
        <div className="navbar__header">Cloud Drive</div>
        <div className="navbar__login"><NavLink to='/login'>Login</NavLink></div>
        <div className="navbar__registration"><NavLink to='/registration'>Registration</NavLink></div>
      </div>
    </div>
  );
};
