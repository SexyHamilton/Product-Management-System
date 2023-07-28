import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Navigate } from "react-router-dom";
// import MessageTimeline from 'pages/Message';

const useStyles = makeStyles((theme) => ({
  button: {
    width: "133px",
    height: "40px",
    border: "none",
    "border-radius": "5px",
    textTransform: "none",
    margin: theme.spacing(1),
    backgroundColor: "#5048E5",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#512da8",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: "/" }} />;
  }

  return (
    <div>
      <Link to="new-product">
        <button className={classes.button}>Add Product</button>
      </Link>
    </div>
  );
}
