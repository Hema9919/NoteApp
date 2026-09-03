import axios from "axios";

const BASE_AUTH_URL = "https://note-sigma-black.vercel.app/api/v1/users";

export const loginUser = async (userData) => {
  const response = await axios.post(`${BASE_AUTH_URL}/signIn`, userData);
  return response.data;
};

export const signUpUser = async (userData) => {
  const response = await axios.post(`${BASE_AUTH_URL}/signUp`, userData);
  return response.data;
};