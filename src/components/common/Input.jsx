import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const Input = ({
  name,
  onChange,
  value,
  placeholder,
  Icon,
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password";

  return (
    <div className="relative mb-4">
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
          {Icon}
        </div>
      )}

      <input
        name={name}
        type={showPassword ? "text" : type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BAFC7]"
      />

      {inputType && (
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </span>
      )}
    </div>
  );
};