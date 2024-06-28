import React from "react";
import { Outlet } from "react-router-dom";

function MainFormPage() {
  return (
    <section className="w-full h-full overflow-hidden">
      {/* Form */}
      <div className="w-full m-8 flex items-center justify-center ">
        <Outlet />
      </div>
    </section>
  );
}

export default MainFormPage;
