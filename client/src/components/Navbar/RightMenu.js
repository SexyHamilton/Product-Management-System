import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "./style.css";
import { ShoppingCartOutlined } from "@ant-design/icons";

const RightMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="Chuwa-management">
        <Link className="header__homelink" to="/cart">
          <ShoppingCartOutlined />
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="contact">Contact Us</Menu.Item> */}
    </Menu>
  );
};

export default RightMenu;
