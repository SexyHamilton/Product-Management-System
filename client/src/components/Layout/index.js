import React, { useMemo } from "react";
import { Layout as AntdLayout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { useMediaQuery } from "hooks/useMediaQuery";
import Footer from "../Footer";

export default function Layout() {
  const isMobile = useMediaQuery("(max-width: 450px)");
  console.log(isMobile);

  const headerStyle = useMemo(
    () => ({
      height: "64px",
    }),
    []
  );

  const contentStyle = useMemo(
    () => ({
      height: "calc(100vh - 64px - 69px)",
      padding: "0 50px",
      width: isMobile ? "440px" : "100%",
      margin: "0 auto",
      overflowY: "auto",
    }),
    [isMobile]
  );

  const footerStyle = useMemo(
    () => ({
      backgroundColor: "#111827",
      width: "100%",
      color: "white",
      height: "85px",
    }),
    []
  );

  return (
    <AntdLayout>
      <AntdLayout.Header>
        <Navbar />
      </AntdLayout.Header>

      <AntdLayout.Content style={contentStyle}>
        <Outlet />
      </AntdLayout.Content>

      <AntdLayout.Footer style={footerStyle}>
        <Footer />
      </AntdLayout.Footer>
    </AntdLayout>
  );
}
