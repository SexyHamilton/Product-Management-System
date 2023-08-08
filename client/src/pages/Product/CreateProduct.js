import React, { useState } from "react";
import ProductForm from "components/ProductForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProductAction } from "app/productSlice";
import validation from "validation/product";
export default function CreateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock_quantity, setStock_quantity] = useState("");
  const [link, setLink] = useState("");
  const { user } = useSelector((state) => state.user);
  const [imagePreview, setImagePreview] = useState(null);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleStock_quantityChange = (event) => {
    setStock_quantity(event.target.value);
  };
  const handleImageChange = (event) => {
    const imageLink = event.target.value;
    setLink(imageLink);
    console.log(imageLink);
  };
  const handleUploadBottonClick = (event) => {
    // Clear the existing image preview before loading the new image
    setImagePreview(null);
    // Use an Image object to check if the image is valid and available
    const image = new Image();
    image.src = link;
    image.onload = () => {
      // Image is available, update the image preview state
      setImagePreview(link);
    };
    image.onerror = () => {
      // Image is not available or invalid, clear the image preview
      setImagePreview(null);
    };
  };
  const onSubmit = (data) => {
    data.preventDefault();
    let newProduct = undefined;
    try {
      newProduct = {
        name: validation.checkName(name),
        description: validation.checkDescription(description),
        category: validation.checkCategory(category),
        price: validation.checkPrice(price),
        quantity: validation.checkQuantity(stock_quantity),
        link: validation.checkLink(link),
      };
      console.log(newProduct);
      dispatch(
        createProductAction({ userId: user.id, details: newProduct })
      ).then(() => {
        alert("You have successfully create a product");
        navigate("/");
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div style={{ maxWidth: "660px", margin: "50px auto 50px auto" }}>
      <h1 className="create__title" style={{ position: "left" }}>
        Create Product
      </h1>
      <ProductForm
        onSubmit={onSubmit}
        name={name}
        description={description}
        category={category}
        price={price}
        quantity={stock_quantity}
        link={link}
        handleNameChange={handleNameChange}
        handleDescriptionChange={handleDescriptionChange}
        handleCategoryChange={handleCategoryChange}
        handlePriceChange={handlePriceChange}
        handleStock_quantityChange={handleStock_quantityChange}
        handleImageChange={handleImageChange}
        handleUploadBottonClick={handleUploadBottonClick}
        imagePreview={imagePreview}
      ></ProductForm>
    </div>
  );
}
