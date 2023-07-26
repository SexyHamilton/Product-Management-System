const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://chuwaweb.com"
    : "http://localhost:8080";

export default async function apiCall({ url: apiUrl, method, data, headers }) {
  const url = new URL(apiUrl, BASE_URL).href;
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  if (localStorage.getItem("token")) {
    defaultHeaders["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const { error } = await response.json();
    console.log(error);
    throw new Error(error.message);
  }
  const result = await response.json();
  return result;
}
