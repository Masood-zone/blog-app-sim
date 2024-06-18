import axios from "axios";

export const getBlogs = async () => {
  const response = await axios.get("http://localhost:3000/blogs");
  return response.data;
};
