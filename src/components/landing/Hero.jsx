import React from "react";
import Camera from "../../assets/camera.png";
import { FaApple } from "react-icons/fa";
import Google from "../../assets/google.svg";

function Hero() {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 py-10 lg:py-16 gap-10">
      
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left">
        
        <h1 className="poppins-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight">
          Experience <br />
          <span className="text-[#2BAFC7]">Photography</span> In a <br />
          New Dimension
        </h1>

        <p className="poppins-regular text-base sm:text-lg md:text-xl">
          Unlock a whole new world of creativity with <br className="hidden sm:block" />
          our photography plan.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 sm:gap-5">
          
          {/* Google Play */}
          <div className="bg-[#2BAFC7] w-full sm:w-52 h-14 sm:h-16 rounded-2xl flex justify-center items-center text-white gap-2 cursor-pointer">
            <img src={Google} alt="" className="w-6 h-6" />
            <div className="flex flex-col items-start">
              <p className="poppins-medium text-sm">Get it on</p>
              <p className="poppins-regular text-sm sm:text-base">Google Play</p>
            </div>
          </div>

          {/* App Store */}
          <div className="bg-[#2BAFC7] w-full sm:w-52 h-14 sm:h-16 rounded-2xl flex justify-center items-center text-white gap-2 cursor-pointer">
            <FaApple size={24} />
            <div className="flex flex-col items-start">
              <p className="poppins-medium text-sm">Download on</p>
              <p className="poppins-regular text-sm sm:text-base">App Store</p>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <img
          src={Camera}
          alt="Camera"
          className="w-full max-w-xs sm:max-w-md lg:max-w-lg object-contain"
        />
      </div>

    </div>
  );
}

export default Hero;