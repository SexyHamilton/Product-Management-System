import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";

function SearchBox() {
  return (
    <div className="header__search">
      <label for="searchbox"></label>
      <input
        id="searchbox"
        className="header__searchInput"
        placeholder="Search"
        type="text"
      />
      <div className="header__iconContainer">
        <SearchIcon className="header__searchIcon" />
      </div>
    </div>
  );
}

export default SearchBox;
