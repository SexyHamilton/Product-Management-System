import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header__title">
        <Link className="header__homeLink" to="/">
          <h1 className="header__title1">Management</h1>
          <h2 className="header__title2">Chuwa</h2>
        </Link>
      </div>
      <div className="header__search">
        <input
          className="header__searchInput"
          placeholder="Search"
          type="text"
        />
        <div className="header__iconContainer">
          <SearchIcon className="header__searchIcon" />
        </div>
      </div>
      <div className="header__nav">
        <div className="header__signin">
          <Link className="header__loginLink" to="/login">
            <ManageAccountsIcon className="header__signinIcon" />
            <span className="header__signinLabel">Sign In</span>
          </Link>
        </div>
        <div className="header__cart">
          <ShoppingCartIcon className="header__cartIcon" />
          <span className="header__cartLabel">$0.00</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
