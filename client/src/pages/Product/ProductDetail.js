import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { productId } = useParams();

  return <div>Your productId is :{productId}</div>;
}
