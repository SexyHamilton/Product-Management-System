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

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems, status } = useSelector((state) => state.cart);
  if (!isAuthenticated) {
    navigate("/");
  }
  console.log(cartItems);

  useEffect(() => {
    dispatch(fetchCartAction({ userId: user.id }));
  }, [dispatch, user.id]);

  if (cartItems.length === 0) {
    return (
      <div>
        <h1>
          Cart is Empty <Link to="/">Go Shopping</Link>
        </h1>
      </div>
    );
  } else {
    return (
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
    );
    // return (
    //   <List
    //     dataSource={cartItems}
    //     renderItem={(item, idx) => <Card>{item.name}</Card>}
    //   ></List>
    // );
  }
}
