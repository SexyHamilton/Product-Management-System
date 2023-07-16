import React from "react";
import { Helmet } from "react-helmet-async";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="home" style={{ "min-height": "36vw" }}>
            <h1>Products</h1>
            {/* Filter */}
            <Link to="/create">
                <button className={classes.button}>Add Product</button>
            </Link>
            {/* Product List */}
            {/* Page Nav */}
        </div>
    );
}
