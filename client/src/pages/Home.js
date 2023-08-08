import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Navigate } from "react-router-dom";
import ProductTimeline from "pages/Product";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

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

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "30px 20px 0 20px",
          alignItems: "baseline",
        }}
      >
        <h1
          style={{
            fontWeight: "700",
            fontSize: "32px",
            flexGrow: "5",
          }}
        >
          Products
        </h1>
        <TextField size="small" select defaultValue="last_added">
          <MenuItem key={"last_added"} value={"last_added"}>
            Last added
          </MenuItem>
          <MenuItem key={"low_to_high"} value={"low_to_high"}>
            Price: low to high
          </MenuItem>
          <MenuItem key={"high_to_low"} value={"high_to_low"}>
            Price: high to low
          </MenuItem>
        </TextField>
        <Link to="new-product">
          <button className={classes.button}>Add Product</button>
        </Link>
      </div>

      {/* <div style={{ backgroundColor: "white", padding: "20px" }}> */}
      <ProductTimeline />
      {/* </div> */}
    </div>
  );
}
