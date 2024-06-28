import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3000",
    baseUrl: "https://blog-app-backend-fhrz.onrender.com",
  }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    getUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

export default blogApi;
