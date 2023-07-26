import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
// import MessageTimeline from 'pages/Message';

export default function Home() {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: "/" }} />;
  }

  return (
    <div>
      Home
      <Link to="new-product">Add Product</Link>
    </div>
  );
}
