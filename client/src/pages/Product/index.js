import React, { useEffect, useState } from "react";
import { List, Avatar, Skeleton, Space, Button, Typography, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAction } from "app/productSlice";
import style from "./style.module.css";
import { Link } from "react-router-dom";

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const [align] = useState("end");
  //   console.log(user);
  //   console.log(products);

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  return (
    <List
      className={style.list}
      loading={status === "pending"}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
        align,
      }}
      dataSource={products}
      renderItem={(item, idx) => (
        <List.Item
          key={idx}
          actions={[
            // console.log(item.user),
            //the userId and the item.user(product.userId) must exist
            user.id && item.user && user.id === item.user._id
              ? ((<Button>Add</Button>), (<Button>Edit</Button>))
              : ((<Button>Add</Button>), (<Button disabled>Edit</Button>)),
          ]}
        >
          <Skeleton title={false} loading={status === "pending"} active>
            <List.Item.Meta
              title={
                <Link to={item._id}>
                  <img width={100} alt="logo" src={item.link} />
                </Link>
              }
              description={item.name}
            />
            <Typography.Paragraph style={{ fontSize: "1.1rem" }}>
              ${item.price}
            </Typography.Paragraph>
          </Skeleton>
        </List.Item>
      )}
    ></List>
  );
}
