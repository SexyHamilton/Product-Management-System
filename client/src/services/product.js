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

export const updateProduct = async ({ userId, productId }) => {
  console.log(userId, productId);
  return await apiCall({
    url: `/users/${userId}/products/${productId}`,
    method: "PATCH",
  });
};
