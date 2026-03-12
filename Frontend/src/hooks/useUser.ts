import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/users`;

export const useUser = () => {
  const getUsers = async () => {
    const res = await axios.get(API);
    return res.data;
  };

  const getUserPosts = async (id: number) => {
    const res = await axios.get(`${API}/${id}/posts`);
    return res.data;
  };

  const updateUser = async (id: number, data: any) => {
    const res = await axios.put(`${API}/${id}`, data);
    return res.data;
  };

  return {
    getUsers,
    getUserPosts,
    updateUser,
  };
};