import axios from "axios";

export const loginUser = async (userData) => {
  const response = await axios.post(
    "https://note-sigma-black.vercel.app/api/v1/users/signIn",
    userData
  );

  return response.data;
};