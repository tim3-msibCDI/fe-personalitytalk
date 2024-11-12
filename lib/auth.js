import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

export const setToken = (token) => {
  Cookies.set("authToken", token, { expires: 7 });
};

export const removeToken = () => {
  Cookies.remove("authToken");
};

export const getToken = () => {
  return Cookies.get("authToken");
};

export const isAuthenticated = () => {
  return !!getToken();
};
