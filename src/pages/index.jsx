import { createRoutesFromElements } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./home";
import { Route } from "react-router-dom";
import Layout from "./layout";

const rootRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route element={<MainPage />}>
        <Route
          path="/"
          lazy={async () => {
            const { default: Blogs } = await import("./blog");
            return { Component: Blogs };
          }}
        />
        <Route
          path="/blog/:id"
          lazy={async () => {
            const { default: SingleBlog } = await import("./blog/blog");
            return { Component: SingleBlog };
          }}
        />
        <Route
          path="about"
          lazy={async () => {
            const { default: About } = await import("./about");
            return { Component: About };
          }}
        />
        <Route
          path="contact"
          lazy={async () => {
            const { default: Contact } = await import("./contact");
            return { Component: Contact };
          }}
        />
      </Route>
    </Route>
  )
);

export default rootRoutes;
