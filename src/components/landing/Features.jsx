import React from "react";
import Camera from "../../assets/Camera1.png";
import Image from "../../assets/image1.png";
import Focus from "../../assets/focus.png";

function Features() {
  const features = [
    {
      icon: Image,
      title: "Professional editing",
      desc: "Your creativity our inspiration. Whatever you want",
    },
    {
      icon: Focus,
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
    <section className="w-full bg-[#E6F3F6] py-12 md:py-20 px-4 sm:px-6">

      {/* Heading */}
      <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl poppins-semibold leading-snug">
          Empower Photographers To Turn Their Passion
        </h2>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 text-center">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">

            {/* Circle Icon */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-white text-[#2BAFC7] shadow-sm">
              <img src={item.icon} alt={item.title} className="w-9 sm:w-10" />
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg poppins-medium text-[#2BAFC7]">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm sm:text-base max-w-xs">
              {item.desc}
            </p>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Features;