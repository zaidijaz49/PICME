import React from "react";
import Camera from "../../assets/camera.png";
import { FaApple } from "react-icons/fa";
import Google from "../../assets/google.svg";

function Hero() {
  return (
    <div className="flex items-center justify-between px-20 py-16">
      {/* LEFT SIDE */}
      <div className="w-1/2 space-y-8">
        <h1 className="poppins-semibold text-[56px] leading-tight">
          Experience <br />
          <span className="text-[#2BAFC7]">Photography</span> In a <br />
          New Dimension
        </h1>

        <p className="poppins-regular text-[20px]">
          Unlock a whole new world of creativity with <br /> our photography
          plan.
        </p>

        <div className="flex justify-start items-start gap-5">
            <div className="bg-[#2BAFC7] w-57 h-16 rounded-2xl flex justify-center items-center text-white gap-2 cursor-pointer">
            <div> <img src={Google} alt="" /></div>
          <div className="flex flex-col justify-center items-start ">
            <p className="poppins-medium ">Get it on</p>
            <div className="flex justify-center gap-2 ">
              <p className="poppins-regular">Google Play</p>
            </div>
           
          </div>
           
        </div>
          <div className="bg-[#2BAFC7] w-57 h-16 rounded-2xl flex justify-center items-center text-white gap-2 cursor-pointer ">
            <div> <FaApple size={30} /></div>
          <div className="flex flex-col justify-center items-start ">
            <p className="poppins-medium ">Download on</p>
            <div className="flex justify-center gap-2 ">
              <p className="poppins-regular">App store</p>
            </div>
           
          </div>
           
        </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex justify-end">
        <img
          src={Camera}
          alt="Camera"
          className="max-w-125 w-full object-contain"
        />
      </div>
    </div>
  );
}

export default Hero;
