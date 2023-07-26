import React from "react";
import { Layout as AntdLayout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

export default function Layout() {
  return (
    <AntdLayout>
      <AntdLayout.Header>
        <Navbar />
      </AntdLayout.Header>

      <AntdLayout.Content>
        <Outlet />
      </AntdLayout.Content>

      <AntdLayout.Footer>This is footer</AntdLayout.Footer>
    </AntdLayout>
  );
}
