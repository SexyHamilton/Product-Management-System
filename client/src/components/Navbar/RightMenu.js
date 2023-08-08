import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "./style.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";

const RightMenu = ({ mode }) => {
  const [cartVisible, setCartVisible] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log(cartVisible);

  const handleCartClick = () => {
    setCartVisible(!cartVisible);
  };
  if (!isAuthenticated) {
    return (
      <div>
        <Menu mode={mode}>
          <Menu.Item key="Chuwa-management">
            <Link className="header__homelink">
              <ShoppingCartOutlined />
              $0.00
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }

  return (
    <div>
      <Menu mode={mode}>
        <Menu.Item key="Chuwa-management">
          <Link className="header__homelink" onClick={handleCartClick}>
            <ShoppingCartOutlined />
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="contact">Contact Us</Menu.Item> */}
      </Menu>
      {cartVisible && <Cart onCartClose={() => setCartVisible(false)} />}{" "}
      {/* Render the Cart component when cartVisible is true */}
    </div>
  );
};

export default RightMenu;
