import React, { useEffect, useState } from "react";
import ProductForm from "components/ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProductAction } from "app/productSlice";
import validation from "validation/product";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock_quantity, setStock_quantity] = useState("");
  const [link, setLink] = useState("");
  const { user } = useSelector((state) => state.user);
  const [imagePreview, setImagePreview] = useState(null); // New state variable for the image preview

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/users/products/${productId}`
        );
        const { product } = data;
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(product.price);
        setStock_quantity(product.quantity);
        setLink(product.link);
        //set all previous data then render these data.
        setLoading(false);
      } catch (e) {
        console.log(e);
        navigate("*");
      }
    }
    fetchData();
  }, [navigate, productId]);

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

  const onUpdate = (data) => {
    data.preventDefault();
    let updateProduct = undefined;
    try {
      updateProduct = {
        name: validation.checkName(name),
        description: validation.checkDescription(description),
        category: validation.checkCategory(category),
        price: validation.checkPrice(price),
        quantity: validation.checkQuantity(stock_quantity),
        link: validation.checkLink(link),
      };
      dispatch(
        updateProductAction({
          userId: user.id,
          productId: productId,
          details: updateProduct,
        })
      ).then(() => {
        navigate("/");
      });
    } catch (error) {
      alert(error);
    }
  };
  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  } else {
    return (
      <div style={{ maxWidth: "660px", margin: "50px auto 50px auto" }}>
        <h1 className="create__title" style={{ position: "left" }}>
          Update Product
        </h1>
        <ProductForm
          onSubmit={onUpdate}
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
        />
      </div>
    );
  }
}
