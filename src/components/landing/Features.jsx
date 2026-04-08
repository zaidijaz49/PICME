import React from "react";
import { FaImage, FaCrosshairs, FaCamera } from "react-icons/fa";
import Camera from "../../assets/Camera1.png"
import Image from "../../assets/image1.png"
import Focus from "../../assets/focus.png"

function Features() {
  const features = [
    {
      icon: Image,
      title: "Professional editing",
      desc: "Your creativity our inspiration. Whatever you want",
    },
    {
      icon: Focus ,
      title: "Long hour shoots",
      desc: "Your creativity our inspiration. Whatever you want",
    },
    {
      icon: Camera,
      title: "Extensive equipment",
      desc: "Your creativity our inspiration. Whatever you want",
    },
  ];

  return (
    <section className="w-full h-110 bg-[#E6F3F6] py-20">
      
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl poppins-semibold">
          Empower Photographers To Turn Their Passion
        </h2>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            
            {/* Circle Icon */}
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white text-[#2BAFC7] shadow-sm">
              <img src={item.icon} alt="" className="w-10"/>
            </div>

            {/* Title */}
            <h3 className="text-lg poppins-medium text-[#2BAFC7]">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 max-w-55">
              {item.desc}
            </p>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Features;