import apiCall from "./api";

export const createProduct = async ({ userId, details }) => {
  return await apiCall({
    url: `/users/${userId}/products`,
    method: "POST",
    data: details,
  });
};

export const fetchProducts = async () => {
  return await apiCall({
    url: "/products",
    method: "GET",
  });
};

export const updateProduct = async ({ userId, productId, details }) => {
  return await apiCall({
    url: `/users/${userId}/products/${productId}`,
    method: "PATCH",
    data: details,
  });
};
export const fetchOneProduct = async ({ productId }) => {
  return await apiCall({
    url: `/users/products/${productId}`,
    method: "GET",
  });
};

export const fetchCartFromTheUser = async ({ userId }) => {
  return await apiCall({
    url: `users/${userId}/cart`,
    method: "GET",
  });
};
export const removeWholeProductFromCart = async ({ userId, productId }) => {
  return await apiCall({
    url: `/users/${userId}/cartDelete/${productId}`,
    method: "POST",
  });
};

export const addProductToCart = async ({ userId, productId }) => {
  return await apiCall({
    url: `users/${userId}/add/${productId}`,
    method: "POST",
  });
};

export const dropProductFromCart = async ({ userId, productId }) => {
  return await apiCall({
    url: `users/${userId}/drop/${productId}`,
    method: "POST",
  });
};
