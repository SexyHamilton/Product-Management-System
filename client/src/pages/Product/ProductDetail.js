import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOneProductAction } from "app/productSlice";
import { Typography } from "antd";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import style from "./style.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
    fetchCartAction,
    addProductToCartAction,
    dropProductFromCartAction,
} from "app/cartSlice";

const useStyles = makeStyles((theme) => ({
    buttonRed: {
        textTransform: "none",
        margin: theme.spacing(1),
        width: "100%",
        backgroundColor: "#FADBD8",
        color: "#B03A2E",
    },
    button: {
        width: "133px",
        height: "40px",
        border: "none",
        borderRadius: "5px",
        textTransform: "none",
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
    const [itemQuantity, setItemQuantity] = useState(0);
    const thisProduct = currentProduct.product;

    const handleAddToCart = (userId, product_id) => {
        dispatch(
            addProductToCartAction({ userId: userId, productId: product_id })
        );
        setItemQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleRemoveFromCart = (userId, product_id) => {
        dispatch(
            dropProductFromCartAction({ userId: userId, productId: product_id })
        );
        setItemQuantity((prevQuantity) => prevQuantity - 1);
    };

    useEffect(() => {
        dispatch(fetchOneProductAction({ productId: productId }));
        dispatch(fetchCartAction({ userId: user.id }));
    }, [productId, dispatch, user.id]);

    useEffect(() => {
        const updatedItem = cartItems.find((item) => item.id === productId);
        const updatedQuantity = updatedItem ? updatedItem.quantity : 0;
        setItemQuantity(updatedQuantity);
    }, [cartItems, productId]);

    if (!thisProduct) {
        return <div>Loading...</div>;
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
                                    style={{
                                        fontSize: "10px",
                                        color: "#EA3D2F",
                                        borderRadius: "4px",
                                        backgroundColor: "#EA3D2F21",
                                        width: "94px",
                                        height: "30px",
                                        whiteSpace: "nowrap",
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
                            {itemQuantity === 0 ? (
                                <button
                                    className={classes.button}
                                    onClick={() =>
                                        handleAddToCart(user.id, productId)
                                    }
                                >
                                    Add To Cart
                                </button>
                            ) : (
                                <div className={style.div_add_and_delete}>
                                    <Tooltip title="Remove">
                                        <Button
                                            onClick={() =>
                                                handleRemoveFromCart(
                                                    user.id,
                                                    productId
                                                )
                                            }
                                        >
                                            <RemoveIcon
                                                style={{ color: "white" }}
                                            />
                                        </Button>
                                    </Tooltip>
                                    <p className={style.btn_quantity}>
                                        {itemQuantity}
                                    </p>
                                    <Tooltip title="Add">
                                        <Button
                                            onClick={() =>
                                                handleAddToCart(
                                                    user.id,
                                                    productId
                                                )
                                            }
                                        >
                                            <AddIcon
                                                style={{ color: "white" }}
                                            />
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
