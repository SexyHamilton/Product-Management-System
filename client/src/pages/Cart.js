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

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems, status } = useSelector((state) => state.cart);
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

  const handleDiscount = (event) => {
    setDiscount(event.target.value);
  };
  const checkDiscount = (event) => {
    if (discount === PROMOTION_CODE) {
      // setTotal(0.8 * total);
      setPromotionUsed(true);
    }
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
        <List
          itemLayout="vertical"
          loading={status === "pending"}
          dataSource={cartItems}
          renderItem={(item, idx) => (
            <List.Item key={idx}>
              <Skeleton loading={status === "pending"} active>
                <Card>
                  <img
                    alt="logo"
                    src={item.link}
                    width={218}
                    style={{
                      maxWidth: "80%",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <h5>{item.name}</h5>
                  <p>${item.price}</p>
                  <Radio.Group>
                    <Radio.Button
                      disabled={item.quantity === 1}
                      onClick={() =>
                        dispatch(
                          dropProductFromCartAction({
                            userId: user.id,
                            productId: item.id,
                          })
                        )
                      }
                    >
                      -
                    </Radio.Button>
                    <Radio.Button type="text">{item.quantity}</Radio.Button>
                    <Radio.Button
                      disabled={item.quantity === item.stockQuantity}
                      onClick={() =>
                        dispatch(
                          addProductToCartAction({
                            userId: user.id,
                            productId: item.id,
                          })
                        )
                      }
                    >
                      +
                    </Radio.Button>
                  </Radio.Group>

                  <Button
                    type="link"
                    onClick={() => {
                      dispatch(removeItem(item));
                      dispatch(
                        removeWholeProductFromCartAction({
                          userId: user.id,
                          productId: item.id,
                        })
                      );
                    }}
                  >
                    Remove
                  </Button>
                </Card>
              </Skeleton>
            </List.Item>
          )}
        />
        <Card>
          <label for="discount"> Apply Discount Code</label>
          <TextField
            id="discount"
            variant="outlined"
            placeholder="20 DOLLAR OFF"
            value={discount}
            onChange={handleDiscount}
          />
          <Button
            type="primary"
            onClick={checkDiscount}
            disabled={promotionUsed}
          >
            Apply
          </Button>
          <h4 className="left">
            Subtotal:
            <h4 className="right">${total.toFixed(2)}</h4>
          </h4>
          <h4 className="left">
            Tax:
            <h4 className="right">${0.1 * total.toFixed(2)}</h4>
          </h4>
          <h4 className="left">
            Discount:
            <h4 className="right">-${promotionUsed ? "20.00" : "0.00"}</h4>
          </h4>
          <h4 className="left">
            Estimated Total:
            <h4 className="right">
              ${promotionUsed ? (total - 20).toFixed(2) : total.toFixed(2)}
            </h4>
          </h4>
          <Button type="primary"> Continue to checkout</Button>
        </Card>
      </>
    );
  }
}
