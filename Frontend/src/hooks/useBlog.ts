import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/posts`;
console.log("API URL:", API); 

export const useBlog = () => {
  const getPosts = async () => {
    try {
      const res = await axios.get(API);
      console.log("Raw API response:", res.data);
      return res.data.data ?? [];
    } catch (err) {
      console.error("API error:", err);
      return [];
    }
  };

  const getPostById = async (id: number) => {
    const res = await axios.get(`${API}/${id}`);
    return res.data.data;
  };

  const createPost = async (data: any) => {
    const res = await axios.post(API, data);
    return res.data;
  };

  const updatePost = async (id: number, data: any) => {
    const res = await axios.put(`${API}/${id}`, data);
    return res.data;
  };

  return {
    getPosts,
    getPostById,
    createPost,
    updatePost,
  };
};