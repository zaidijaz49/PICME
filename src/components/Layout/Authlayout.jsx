import React from "react";
import Logo from "../../assets/logo.png";
import Camera from "../../assets/camera.png";
import { Outlet } from "react-router";

function Authlayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-white flex flex-col min-h-screen">
        {/* Logo */}
        <div className="mt-5 ml-5 md:ml-10">
          <img src={Logo} className="w-16 h-16" alt="Logo" />
        </div>

        {/* Form / Outlet */}
        <div className="flex flex-1 items-center justify-center px-4 md:px-10">
          <Outlet />
        </div>
      </div>

      {/* Right Side — hidden on mobile, visible md and up */}
      <div className="hidden md:flex w-full md:w-1/2 min-h-screen bg-[#2BAFC7] justify-center items-center">
        <img
          src={Camera}
          className="w-80 h-80 lg:w-[22rem] lg:h-[22rem] xl:w-[26rem] xl:h-[26rem] object-contain"
          alt="Camera"
        />
      </div>
    </div>
  );
}

export default Authlayout;