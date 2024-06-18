import axios from "axios";

export const getBlogs = async () => {
  const response = await axios.get(
    "https://blog-app-backend-ijr4.onrender.com/blogs"
  );
  return response.data;
};
