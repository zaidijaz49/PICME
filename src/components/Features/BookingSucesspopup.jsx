import React from "react";
import { X } from "lucide-react"; // install: npm i lucide-react
import Checktick from "../../assets/Checktick.svg"

function BookingSuccessPopup({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      {/* Modal */}
      <div className="relative bg-white rounded-3xl p-10 w-120 text-center shadow-xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <X size={28} className="cursor-pointer" />
        </button>

        {/* Check Badge */}
        <div className="flex justify-center mb-6">
          <img src={Checktick} alt="" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 poppins-medium">
          Completed Bookings
        </h2>

        {/* Description */}
        <p className="text-gray-500 leading-relaxed poppins-regular">
          You've successfully booked a{" "}
          <span className="text-cyan-500 font-medium poppins-regular">
            6 July to 7 July 2026
          </span>
          , with{" "}
          <span className="text-cyan-500 font-medium poppins-regular">John Doe</span> under the{" "}
          <span className="text-cyan-500 font-medium poppins-regular">premium package</span>.
        </p>
      </div>
    </div>
  );
}

export default BookingSuccessPopup;