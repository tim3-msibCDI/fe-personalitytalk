import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/user/login`, { email, password }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/user/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
