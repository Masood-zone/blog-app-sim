import { createRoutesFromElements } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./home";
import { Route } from "react-router-dom";
import Layout from "./layout";
import MainFormPage from "./auth/index";

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
        <Route path="/auth" element={<MainFormPage />}>
          <Route
            path="login"
            lazy={async () => {
              const { default: Login } = await import("./auth/login");
              return { Component: Login };
            }}
          />
          <Route
            path="signup"
            lazy={async () => {
              const { default: Signup } = await import("./auth/signup");
              return { Component: Signup };
            }}
          />
        </Route>
      </Route>
    </Route>
  )
);

export default rootRoutes;
