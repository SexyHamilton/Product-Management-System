import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";

import "./style.css";

const TITLE = "Management Chuwa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(!open);
  };

  const { pathname: location } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        {TITLE}
      </Link>
      <div className="navbar-menu">
        <div className="leftMenu">
          <LeftMenu mode="horizontal" />
        </div>
        <Button className="menuButton" type="text" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <div className="rightMenu">
          <RightMenu mode="horizontal" />
        </div>

        <Drawer
          title={TITLE}
          placement="right"
          closable={true}
          onClose={showDrawer}
          open={open}
          style={{ zIndex: 99 }}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
