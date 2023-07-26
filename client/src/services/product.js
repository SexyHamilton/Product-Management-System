import apiCall from "./api";

export const createProduct = async ({ userId, details }) => {
  return await apiCall({
    url: `/users/${userId}/products`,
    method: "POST",
    data: details,
  });
};
