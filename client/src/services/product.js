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
