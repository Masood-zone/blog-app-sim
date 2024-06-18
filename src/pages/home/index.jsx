import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

function MainPage() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <div className=" mt-10 mx-auto h-full ">
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainPage;
