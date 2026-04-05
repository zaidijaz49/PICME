import React from "react";
import Button from "../common/Button";
import Diamond from "../../assets/diamond.svg";
import Hexa from "../../assets/hexa.svg";
import Square from "../../assets/square.svg";
import Edit from "../../assets/edit.svg";

function Package({ title, label, price, features = [], variant = "basic", varient, onClick }) {
  const variants = {
    basic: {
      bg: "bg-[#2BC7A5CC]",
      icon: Diamond,
      title: "text-xl font-semibold poppins-medium",
      price: "text-5xl font-bold poppins-semibold",
    },
    essential: {
      bg: "bg-[#2BAFC7]",
      icon: Hexa,
      title: "text-xl font-semibold poppins-medium",
      price: "text-5xl font-bold poppins-semibold",
    },
    premium: {
      bg: "bg-[#1ACEEF]",
      icon: Square,
      title: "text-xl font-semibold poppins-medium",
      price: "text-5xl font-bold poppins-semibold",
    },
    edit: {
      bg: "bg-[#1ACEEF]",
      icon: Edit,
      title: "text-xl font-semibold poppins-medium",
      price: "text-5xl font-bold poppins-semibold",
    },
    Huge: {
      bg: "bg-[#2BC7A5CC]",
      icon: Square,
      title: "text-2xl sm:text-3xl font-semibold poppins-medium",
      price: "text-5xl sm:text-7xl font-bold poppins-semibold",
      items: "text-base sm:text-xl poppins-regular",
    },
  };

  const selectedVariant = variants[variant] || variants.basic;

  return (
    <div
      className={`
        relative w-full h-full p-6 sm:p-8 text-white rounded-2xl shadow-lg
        flex flex-col justify-between
        ${selectedVariant.bg}
      `}
    >
      {/* Icon */}
      <img
        src={selectedVariant.icon}
        alt="logo"
        className="absolute top-4 right-4 w-6 h-6 opacity-90"
      />

      {/* Title + Price */}
      <div className="text-center mb-6 space-y-4">
        <h2 className={selectedVariant.title}>{title}</h2>
        <h1 className={selectedVariant.price}>{price}</h1>
      </div>

      {/* Features */}
      <ul className="space-y-2 mb-8 flex-1">
        {features.map((item, index) => (
          <li
            key={index}
            className={`flex items-center gap-2 poppins-regular ${selectedVariant.items || "text-sm sm:text-base"}`}
          >
            <span>•</span> {item}
          </li>
        ))}
      </ul>

      {/* Button */}
      <div className="h-12 sm:h-14">
        {label && (
          <Button label={label} varient={varient} onClick={onClick} />
        )}
      </div>
    </div>
  );
}

export default Package;