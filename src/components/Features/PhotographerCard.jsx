import React from "react";
import Button from "../common/Button";
import { FaBriefcase, FaBoxOpen } from "react-icons/fa";
import Avatar from "../../assets/avatar.png";
import { Link } from "react-router";

function PhotographerCard({
  photographers = [],
  activeCategory,
  variant = "primary",
  showButtons = false,
  size = "md",
}) { // ✅ brace must be right after )
  const baseStyle = "flex flex-col items-center p-4 space-y-2";

  const variants = {
    primary: "bg-white rounded-xl shadow-md",
    secondary: "bg-gray-100",
  };

  const sizes = {
    sm: "w-full sm:w-36 h-auto",
    md: "w-full sm:w-64 h-auto",
    lg: "w-full h-full",
  };

  const filteredPhotographers = activeCategory
    ? photographers.filter((p) => p.photographer.categories.includes(activeCategory))
    : photographers;

  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 w-full outline-none focus:outline-none focus:ring-0" tabIndex={-1}>
      {filteredPhotographers.map((p) => (
        // ✅ Link wraps the entire card
        <Link
          key={p.photographer.id}
          to={`/customerDashboard/photographerswork/${p.photographer.id}`}
          state={{ photographer: p.photographer }}
        >
          <div className={`${baseStyle} ${variants[variant]} ${sizes[size]}`}>

            {/* Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              <img
                src={p.photographer.avatar_url || Avatar}
                alt={p.photographer.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <h4 className="font-bold text-center poppins-semibold text-sm sm:text-base">
              {p.photographer.name}
            </h4>

            {/* Categories */}
            <p className="text-gray-500 text-center poppins-regular text-xs sm:text-sm">
              {p.photographer.categories[0] || "No category"}
            </p>

            {/* Rating */}
            <p className="flex items-center justify-center gap-1 text-yellow-500 whitespace-nowrap">
              ⭐
              <span className="text-black poppins-regular text-xs sm:text-sm">
                {p.photographer.average_rating} ({p.photographer.total_reviews} reviews)
              </span>
            </p>

            {/* Optional Buttons */}
            {showButtons && (
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 justify-center w-full">
                <div className="w-full sm:w-40">
                  <Button label="Portfolio" varient="primary" Icon={FaBriefcase} />
                </div>
                <div className="w-full sm:w-40">
                  <Button label="Package" varient="secondary" Icon={FaBoxOpen} />
                </div>
              </div>
            )}
          </div>
        </Link>
      ))}

      {/* empty state */}
      {filteredPhotographers.length === 0 && (
        <p className="text-center text-gray-400 poppins-regular text-sm w-full mt-4">
          No photographers found.
        </p>
      )}
    </div>
  );
}

export default PhotographerCard;