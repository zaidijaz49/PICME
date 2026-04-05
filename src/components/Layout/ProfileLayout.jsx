// Layout.jsx
import { Outlet } from "react-router";
import React from "react";
import Logo from "../../assets/logo.png";
const ProfileLayout = () => {
  return (
    <div className="flex  justify-center min-h-screen w-full ">
      <div className="mt-5 ml-5 md:ml-10 ">
        <img src={Logo} className="w-16 h-16 md:w-17 md:h-18" alt="Logo" />
      </div>
      {/* Form / Outlet */}
      <div className="flex flex-1 items-center justify-center px-4 md:px-10 h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
