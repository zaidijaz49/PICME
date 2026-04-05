import React from "react";
function Button({
  label,
  type = "button",
  disabled = false,
  varient = "primary",
  onClick,
  Icon,
  onMouseEnter,
  onMouseLeave,
}) {
  const baseStyle =
    "w-full h-full py-3 transition mb-6 font-semibold rounded-lg flex items-center justify-center gap-2 poppins-semibold "; // flex added

  const varients = {
    primary: "bg-[#2BAFC7] text-white hover:bg-[#239ab5]",
    secondary: "bg-white text-[#2BAFC7] border border-[#2BAFC7]",
    simple: " text-white border border-[#ffffff]",
    danger: "bg-red-600 text-white ",
    selected: "bg-white text-[#2BAFC7] ",
  };

  // Optional: Icon styles per variant
  const iconStyles = {
    secondary: "w-5 h-5 text-[#2BAFC7]",
  };

  return (
    
      <button
        type={type}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${baseStyle} ${varients[varient]}`}
        disabled={disabled}
      >
        {Icon && <Icon className={iconStyles[varient]} />} {/* styled icon */}
        {label}
      </button>
    
  );
}

export default Button;
