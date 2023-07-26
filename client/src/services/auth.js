import apiCall from "./api";

export const signUp = async (data) => {
  return await apiCall({
    url: "/auth/signup",
    method: "POST",
    data,
  });
};

export const signIn = async (data) => {
  return await apiCall({
    url: "/auth/signin",
    method: "POST",
    data,
  });
};
