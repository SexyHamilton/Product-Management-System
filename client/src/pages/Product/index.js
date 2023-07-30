import React, { useEffect, useState } from "react";
import { List, Skeleton, Button, Typography, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAction } from "app/productSlice";
import style from "./style.module.css";
import { Link, Navigate } from "react-router-dom";
import { Padding } from "@mui/icons-material";
import NewProduct from "./NewProduct";

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const [align] = useState("end");
  const [position] = useState("bottom");
  //   console.log(user);
  //   console.log(products);

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

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
          <Skeleton title={false} loading={status === "pending"} active>
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
                <h5 className={style.product_title}>{item.name}</h5>
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
              {user.id && item.user && user.id === item.user._id ? (
                <div>
                  <Button>Add</Button>
                  <Link to={`/update-product/${item._id}`}>
                    <Button>Edit</Button>
                  </Link>
                </div>
              ) : (
                <div>
                  <Button>Add</Button> <Button disabled>Edit</Button>
                </div>
              )}
            </Card>
          </Skeleton>
        </List.Item>
      )}
    ></List>
  );
}
