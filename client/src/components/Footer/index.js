import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./style.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__right">
        <p>©2022 All Rights Reserved.</p>
      </div>
      <div className="footer__media">
        <YouTubeIcon className="footer__youtubeIcon" />
        <FacebookIcon className="footer__facebookIcon" />
        <TwitterIcon className="footer__twitterIcon" />
      </div>
      <div className="footer__nav">
        <span className="footer__navItem1">Contact us</span>
        <span className="footer__navItem2">Privacy Policies</span>
        <span className="footer__navItem3">Help</span>
      </div>
    </div>
  );
};

export default Footer;
