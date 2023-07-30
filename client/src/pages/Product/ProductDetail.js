import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOneProductAction } from "app/productSlice";
import { Typography } from "antd";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

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
    textTransform: "none",
    margin: theme.spacing(1),
    width: "100%",
    backgroundColor: "#D5F5E3",
    color: "#229954",
    "&:hover": {
      backgroundColor: "#512da8",
    },
  },
}));

export default function ProductDetail() {
  const classes = useStyles();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { currentProduct } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const thisProduct = currentProduct.product;

  useEffect(() => {
    dispatch(fetchOneProductAction({ productId: productId }));
  }, [productId, dispatch]);
  if (!thisProduct) {
    return <div> Loading...</div>;
  } else {
    return (
      <div className="product-detail">
        <h1
          style={{
            fontWeight: "700",
            fontSize: "32px",
            flexGrow: "5",
          }}
        >
          Products Detail
        </h1>
        <img alt="logo" src={thisProduct.link} />
        <Typography.Title level={5}>{thisProduct.category}</Typography.Title>
        <Typography.Title level={2}>{thisProduct.name}</Typography.Title>
        <div>
          <Typography.Title level={2}>${thisProduct.price}</Typography.Title>
          {thisProduct.quantity > 0 ? (
            <Button
              className={classes.buttonGreen}
              variant="text"
              size="small"
              color="primary"
              style={{ width: "113px" }}
            >
              In Stock
            </Button>
          ) : (
            <Button
              className={classes.buttonRed}
              variant="text"
              size="small"
              color="primary"
              style={{ width: "113px" }}
            >
              Out of Stock
            </Button>
          )}
          <Typography.Paragraph>{thisProduct.description}</Typography.Paragraph>

          <Button>Add To Cart</Button>
          {user.id === thisProduct.user ? (
            <Link to={`/update-product/${productId}`}>
              <Button>Edit</Button>
            </Link>
          ) : (
            <Button disabled>Edit</Button>
          )}
        </div>
      </div>
    );
  }
}
