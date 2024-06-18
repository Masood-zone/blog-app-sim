import React from "react";
import { RouterProvider } from "react-router-dom";
import rootRoutes from "./pages";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <RouterProvider router={rootRoutes} />
      <Toaster />
    </div>
  );
}

export default App;
