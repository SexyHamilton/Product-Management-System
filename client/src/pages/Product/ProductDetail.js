import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOneProductAction } from "app/productSlice";
import { Typography } from "antd";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import styled from "@emotion/styled";
import style from "./style.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Visibility } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  buttonRed: {
    textTransform: "none",
    margin: theme.spacing(1),
    width: "100%",
    backgroundColor: "#FADBD8",
    color: "#B03A2E",
    // "&:hover": {
    //   backgroundColor: "#512da8",
    // },
  },
  buttonGreen: {
    // fontSize: "10px",
    // color: "green",
    // "border-radius": "4px",
    // "background-color": "#D5ECD4",
    // width: "76px",
    // height: "30px",
  },
  button: {
    width: "133px",
    height: "40px",
    border: "none",
    "border-radius": "5px",
    textTransform: "none",
    // margin: theme.spacing(1),
    backgroundColor: "#5048E5",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#512da8",
    },
  },

  edit_button: {
    width: "133px",
    height: "40px",
  },
}));

export default function ProductDetail() {
  const classes = useStyles();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { currentProduct } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const thisProduct = currentProduct.product;

  // State variables for managing visibility
  const [showAddToCartButton, setShowAddToCartButton] = useState(true);

  // Define the click handler for the "Add to Cart" button
  const handleAddToCart = () => {
    // Hide the "Add to Cart" button
    setShowAddToCartButton(false);
  };

  useEffect(() => {
    dispatch(fetchOneProductAction({ productId: productId }));
  }, [productId, dispatch]);
  if (!thisProduct) {
    return <div> Loading...</div>;
  } else {
    return (
      <div className={style.product_detail}>
        <h1
          style={{
            fontWeight: "700",
            fontSize: "32px",
            flexGrow: "5",
          }}
        >
          Products Detail
        </h1>
        <div className={style.product_detail_container}>
          <div
            className={style.product_detail_image_container}
            style={{
              backgroundImage: `url("${thisProduct.link}")`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          {/* <img alt="logo" src={thisProduct.link} /> */}
          <div className={style.product_detail_info_container}>
            <Typography.Title
              level={5}
              style={{
                color: "#6B7280",
                fontSize: "16px",
                margin: "0",
              }}
            >
              {thisProduct.category}
            </Typography.Title>
            <Typography.Title
              level={2}
              style={{
                fontSize: "32px",
                color: "#535353",
                fontWeight: "700",
                margin: "0",
                marginTop: "8px",
              }}
            >
              {thisProduct.name}
            </Typography.Title>
            <div className={style.product_detail_row3_container}>
              <Typography.Title
                level={2}
                style={{
                  fontSize: "32px",
                  color: "#111827",
                  fontWeight: "700",
                  margin: "0",
                }}
              >
                ${thisProduct.price}
              </Typography.Title>
              {thisProduct.quantity > 0 ? (
                <Button
                  className={classes.buttonGreen}
                  variant="text"
                  // size="small"
                  // color="primary"
                  style={{
                    fontSize: "10px",
                    color: "green",
                    borderRadius: "4px",
                    backgroundColor: "#D5ECD4",
                    width: "76px",
                    height: "30px",
                  }}
                >
                  In Stock
                </Button>
              ) : (
                <Button
                  className={classes.buttonRed}
                  variant="text"
                  size="small"
                  color="primary"
                  style={{
                    fontSize: "10px",
                    color: "#EA3D2F",
                    borderRadius: "4px",
                    backgroundColor: "#EA3D2F21",
                    width: "94px",
                    height: "30px",
                    whiteSpace: "nowrap", // Add this style to prevent text wrapping
                  }}
                >
                  Out of Stock
                </Button>
              )}
            </div>
            <Typography.Paragraph
              style={{
                fontSize: "16px",
                color: "#6B7280",
                margin: "0",
                marginTop: "8px",
              }}
            >
              {thisProduct.description}
            </Typography.Paragraph>

            <div className={style.product_detail_row5}>
              {showAddToCartButton ? (
                <button className={classes.button} onClick={handleAddToCart}>
                  Add To Cart
                </button>
              ) : (
                <div className={style.div_add_and_delete}>
                  <Tooltip title="Remove">
                    <Button>
                      <RemoveIcon style={{ color: "white" }} />
                    </Button>
                  </Tooltip>

                  <Tooltip title="Add">
                    <Button>
                      <AddIcon style={{ color: "white" }} />
                    </Button>
                  </Tooltip>
                </div>
              )}

              {user.id === thisProduct.user ? (
                <Link to={`/update-product/${productId}`}>
                  <Button
                    style={{
                      borderColor: "#CCCCCC",
                      color: "#535353",
                    }}
                    className={classes.edit_button}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </Link>
              ) : (
                <Button
                  style={{
                    borderColor: "#CCCCCC",
                    color: "#535353",
                    textTransform: "none",
                  }}
                  className={classes.edit_button}
                  variant="outlined"
                  disabled
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
