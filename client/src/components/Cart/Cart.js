import React, { useEffect, useState } from "react";
import {
    fetchCartAction,
    removeItem,
    addProductToCartAction,
    dropProductFromCartAction,
    removeWholeProductFromCartAction,
} from "app/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { List, Radio, Skeleton, Button, Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import style from "./style.module.css";

function Cart({ onCartClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { cartItems, status } = useSelector((state) => state.cart);
    const [initialCartItemQuantityState, setInitialCartItemQuantityState] =
        useState({});
    const [discount, setDiscount] = useState(null);
    const [total, setTotal] = useState(0);
    const [promotionUsed, setPromotionUsed] = useState(false);
    const PROMOTION_CODE = "114514";
    if (!isAuthenticated) {
        navigate("/");
    }

    useEffect(() => {
        dispatch(fetchCartAction({ userId: user.id }));
        setLoading(false);
    }, [dispatch, user.id]);

    useEffect(() => {
        setTotal(cartItems.reduce((a, c) => a + c.price * c.quantity, 0));
    }, [cartItems]);

    useEffect(() => {
        // put all the items's quantity for every item in cart to an object
        let newCartItemQuantityState = {};
        cartItems.forEach((item) => {
            newCartItemQuantityState[item.id] = item.quantity;
        });

        setInitialCartItemQuantityState(newCartItemQuantityState);
    }, [cartItems]);

    const handleDiscount = (event) => {
        setDiscount(event.target.value);
    };
    const checkDiscount = (event) => {
        if (discount === PROMOTION_CODE) {
            // setTotal(0.8 * total);
            setPromotionUsed(true);
        }
    };
    const handleCartClose = () => {
        onCartClose(); // Call the callback function to update the state in RightMenu
    };

    const handleAddToCart = (userId, product_id) => {
        dispatch(
            addProductToCartAction({ userId: userId, productId: product_id })
        );
        setInitialCartItemQuantityState((prevState) => ({
            ...prevState,
            [product_id]: prevState[product_id] + 1,
        }));
    };

    const handleDropFromCart = (userId, product_id) => {
        dispatch(
            dropProductFromCartAction({ userId: userId, productId: product_id })
        );
        setInitialCartItemQuantityState((prevState) => ({
            ...prevState,
            [product_id]: prevState[product_id] - 1,
        }));
    };

    if (loading) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    } else if (cartItems.length === 0) {
        return (
            <div>
                <h1>
                    Cart is Empty <Link to="/">Go Shopping</Link>
                </h1>
            </div>
        );
    } else {
        return (
            <>
                <div className={style.cart_container}>
                    <div className={style.cart_top_bar}>
                        <h3 style={{ fontSize: "24px", margin: "0" }}>Cart</h3>
                        <p
                            style={{
                                fontSize: "18px",
                                margin: "0",
                                flexGrow: "1",
                            }}
                        >
                            ({cartItems.length})
                        </p>
                        <button
                            style={{
                                backgroundColor: "#5048E5",
                                border: "none",
                                color: "white",
                                height: "40px",
                            }}
                            onClick={handleCartClose}
                        >
                            <CloseIcon style={{ fontSize: "35px" }} />
                        </button>
                    </div>
                    <div style={{ overflowY: "auto", flexGrow: "1" }}>
                        <List
                            itemLayout="vertical"
                            loading={status === "pending"}
                            dataSource={cartItems}
                            renderItem={(item, idx) => (
                                <List.Item style={{ border: "none" }} key={idx}>
                                    <Skeleton
                                        loading={status === "pending"}
                                        active
                                    >
                                        <Card style={{ border: "none" }}>
                                            <div
                                                className={style.item_container}
                                            >
                                                <img
                                                    alt="logo"
                                                    src={item.link}
                                                    width={112}
                                                    style={{
                                                        maxWidth: "80%",
                                                        height: "auto",
                                                        margin: "auto",
                                                        marginLeft: "10px",
                                                        marginRight: "20px",
                                                    }}
                                                />
                                                <div
                                                    className={
                                                        style.item_right_container
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            style.item_info_container
                                                        }
                                                    >
                                                        <h5
                                                            style={{
                                                                fontSize:
                                                                    "18px",
                                                                fontWeight:
                                                                    "700",
                                                            }}
                                                        >
                                                            {item.name}
                                                        </h5>
                                                        <p
                                                            style={{
                                                                color: "#5048E5",
                                                                fontWeight:
                                                                    "600",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        >
                                                            ${item.price}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={
                                                            style.item_op_container
                                                        }
                                                    >
                                                        <Radio.Group>
                                                            <Radio.Button
                                                                disabled={
                                                                    item.quantity ===
                                                                    1
                                                                }
                                                                onClick={() =>
                                                                    handleDropFromCart(
                                                                        user.id,
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                -
                                                            </Radio.Button>
                                                            <Radio.Button type="text">
                                                                {
                                                                    initialCartItemQuantityState[
                                                                        item.id
                                                                    ]
                                                                }
                                                            </Radio.Button>
                                                            <Radio.Button
                                                                disabled={
                                                                    item.quantity ===
                                                                    item.stockQuantity
                                                                }
                                                                onClick={() =>
                                                                    handleAddToCart(
                                                                        user.id,
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </Radio.Button>
                                                        </Radio.Group>

                                                        <Button
                                                            type="link"
                                                            onClick={() => {
                                                                dispatch(
                                                                    removeItem(
                                                                        item
                                                                    )
                                                                );
                                                                dispatch(
                                                                    removeWholeProductFromCartAction(
                                                                        {
                                                                            userId: user.id,
                                                                            productId:
                                                                                item.id,
                                                                        }
                                                                    )
                                                                );
                                                            }}
                                                            style={{
                                                                color: "#6B7280",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    textDecoration:
                                                                        "underline",
                                                                }}
                                                            >
                                                                Remove
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                        <label
                            for="discount"
                            style={{
                                marginLeft: "30px",
                                color: "#6B7280",
                                fontWeight: "600",
                            }}
                        >
                            Apply Discount Code
                        </label>
                        <div className={style.discount_container}>
                            <TextField
                                id="discount"
                                variant="outlined"
                                placeholder="20 DOLLAR OFF"
                                value={discount}
                                onChange={handleDiscount}
                                size="small"
                                fullWidth
                            />
                            <Button
                                type="primary"
                                onClick={checkDiscount}
                                disabled={promotionUsed}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                    <Card
                        style={{
                            borderRadius: "0",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <h4>Subtotal:</h4>
                            <h4>${total.toFixed(2)}</h4>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <h4>Tax:</h4>
                            <h4>${0.1 * total.toFixed(2)}</h4>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <h4>Discount:</h4>
                            <h4>-${promotionUsed ? "20.00" : "0.00"}</h4>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <h4>Estimated Total:</h4>
                            <h4>
                                $
                                {promotionUsed
                                    ? (total - 20).toFixed(2)
                                    : total.toFixed(2)}
                            </h4>
                        </div>

                        <Button type="primary" style={{ width: "100%" }}>
                            Continue to checkout
                        </Button>
                    </Card>
                </div>
            </>
        );
    }
}

export default Cart;
