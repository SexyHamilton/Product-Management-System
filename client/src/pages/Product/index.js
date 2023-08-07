import React, { useEffect, useState } from "react";
import { List, Skeleton, Card } from "antd";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAction } from "app/productSlice";
import style from "./style.module.css";
import { Link, Navigate } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@material-ui/core/styles";
import {
    fetchCartAction,
    addProductToCartAction,
    dropProductFromCartAction,
} from "app/cartSlice";

const useStyles = makeStyles((theme) => ({
    button: {
        width: "110px",
        height: "26px",
        border: "none",
        fontSize: "10px",
        "border-radius": "5px",
        textTransform: "none",
        // margin: theme.spacing(1),
        backgroundColor: "#5048E5",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#512da8",
        },
    },
}));

export default function ProductList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);
    const [align] = useState("end");
    const [position] = useState("bottom");
    const [initialCartItemQuantityState, setInitialCartItemQuantityState] =
        useState({});

    //   console.log(user);
    console.log(cartItems);

    // write a reduce function to create an object with all the products, check each product whether they are in the cart if not set the quantity to 0, if yes set the quantity to the quantity in the cart
    // const initialCartItemQuantityState = products.reduce((acc, product) => {
    //     const cartItem = cartItems.find(
    //         (cartItem) => cartItem.id === product._id
    //     );
    //     acc[product._id] = cartItem ? cartItem.quantity : 0;
    //     return acc;
    // }, {});

    console.log(initialCartItemQuantityState);

    // Define the click handler for the "Add to Cart" button
    const handleAddToCart = (userId, product_id) => {
        dispatch(
            addProductToCartAction({ userId: userId, productId: product_id })
        );
        initialCartItemQuantityState[product_id] += 1;
    };

    const handleDropFromCart = (userId, product_id) => {
        dispatch(
            dropProductFromCartAction({ userId: userId, productId: product_id })
        );
        initialCartItemQuantityState[product_id] -= 1;
        // setInitialCartItemQuantityState(initialCartItemQuantityState);
    };

    useEffect(() => {
        dispatch(fetchProductsAction());
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchCartAction({ userId: user.id }));
    }, [dispatch, user.id]);

    useEffect(() => {
        const newCartItemQuantityState = products.reduce((acc, product) => {
            const cartItem = cartItems.find(
                (cartItem) => cartItem.id === product._id
            );
            acc[product._id] = cartItem ? cartItem.quantity : 0;
            return acc;
        }, {});
        setInitialCartItemQuantityState(newCartItemQuantityState);
    }, [cartItems, products]);

    return (
        <List
            grid={{
                column: 5,
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 5,
                xxl: 5,
            }}
            className={style.list}
            loading={status === "pending"}
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                align,
                position,
            }}
            dataSource={products}
            renderItem={(item, idx) => (
                <List.Item className={style.product_item} key={idx}>
                    <Skeleton
                        title={false}
                        loading={status === "pending"}
                        active
                    >
                        <List.Item />
                        <Card
                            style={{
                                border: "solid 1px #CCCCCC",
                                borderRadius: "5px",
                            }}
                            bodyStyle={{ padding: "15px" }}
                        >
                            <Link to={`/product/${item._id}`}>
                                <div className={style.image_container}>
                                    <img
                                        className={style.image}
                                        width={218}
                                        style={{
                                            maxWidth: "80%",
                                            height: "auto",
                                            margin: "auto",
                                        }}
                                        alt="logo"
                                        src={item.link}
                                    />
                                </div>
                                <h5 className={style.product_title}>
                                    {item.name}
                                </h5>
                                <p
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        marginBottom: "4px",
                                        color: "#111827",
                                    }}
                                >
                                    ${item.price}
                                </p>
                            </Link>
                            {user.id &&
                            item.user &&
                            user.id === item.user._id ? (
                                <div>
                                    {initialCartItemQuantityState[item._id] ===
                                    0 ? (
                                        <button
                                            className={classes.button}
                                            onClick={() =>
                                                handleAddToCart(
                                                    user.id,
                                                    item._id
                                                )
                                            }
                                        >
                                            Add
                                        </button>
                                    ) : (
                                        <div
                                            className={
                                                style.list_div_add_and_delete
                                            }
                                        >
                                            <Tooltip title="Remove">
                                                <Button
                                                    className={
                                                        style.add_delete_btn
                                                    }
                                                    onClick={() =>
                                                        handleDropFromCart(
                                                            user.id,
                                                            item._id
                                                        )
                                                    }
                                                >
                                                    <RemoveIcon
                                                        style={{
                                                            color: "white",
                                                            width: "14px",
                                                            height: "14px",
                                                        }}
                                                    />
                                                </Button>
                                            </Tooltip>
                                            <p
                                                className={
                                                    style.btn_quantity_home
                                                }
                                            >
                                                {
                                                    initialCartItemQuantityState[
                                                        item._id
                                                    ]
                                                }
                                            </p>
                                            <Tooltip title="Add">
                                                <Button
                                                    className={
                                                        style.add_delete_btn
                                                    }
                                                    onClick={() =>
                                                        handleAddToCart(
                                                            user.id,
                                                            item._id
                                                        )
                                                    }
                                                >
                                                    <AddIcon
                                                        style={{
                                                            color: "white",
                                                            width: "14px",
                                                            height: "14px",
                                                        }}
                                                    />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    )}
                                    <Link to={`/update-product/${item._id}`}>
                                        <Button
                                            style={{
                                                borderColor: "#CCCCCC",
                                                color: "#535353",
                                                width: "102px",
                                                height: "26px",
                                                fontSize: "10px",
                                                textTransform: "none",
                                            }}
                                            variant="outlined"
                                            disabled
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className={style.btn_div}>
                                    {initialCartItemQuantityState[item._id] ===
                                    0 ? (
                                        <button
                                            className={classes.button}
                                            onClick={() =>
                                                handleAddToCart(
                                                    user.id,
                                                    item._id
                                                )
                                            }
                                        >
                                            Add
                                        </button>
                                    ) : (
                                        <div
                                            className={
                                                style.list_div_add_and_delete
                                            }
                                        >
                                            <Tooltip title="Remove">
                                                <button
                                                    className={
                                                        style.add_delete_btn
                                                    }
                                                    onClick={() =>
                                                        handleDropFromCart(
                                                            user.id,
                                                            item._id
                                                        )
                                                    }
                                                >
                                                    <RemoveIcon
                                                        style={{
                                                            color: "white",
                                                            width: "14px",
                                                            height: "14px",
                                                        }}
                                                    />
                                                </button>
                                            </Tooltip>
                                            <p
                                                className={
                                                    style.btn_quantity_home
                                                }
                                            >
                                                {
                                                    initialCartItemQuantityState[
                                                        item._id
                                                    ]
                                                }
                                            </p>
                                            <Tooltip title="Add">
                                                <button
                                                    className={
                                                        style.add_delete_btn
                                                    }
                                                    onClick={() =>
                                                        handleAddToCart(
                                                            user.id,
                                                            item._id
                                                        )
                                                    }
                                                >
                                                    <AddIcon
                                                        style={{
                                                            color: "white",
                                                            width: "14px",
                                                            height: "14px",
                                                        }}
                                                    />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    )}
                                    <Button
                                        style={{
                                            borderColor: "#CCCCCC",
                                            // color: "#535353",
                                            width: "102px",
                                            height: "26px",
                                            fontSize: "10px",
                                            textTransform: "none",
                                        }}
                                        variant="outlined"
                                        disabled
                                    >
                                        Edit
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </Skeleton>
                </List.Item>
            )}
        ></List>
    );
}
