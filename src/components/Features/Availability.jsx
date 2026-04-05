import React from "react";
import { IoClose } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import Button from "../common/Button";
import BookingSuccessPopup from "./BookingSucesspopup";
function Availability({ isOpen, onClose, onSubmit, }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      {/* Modal */}
      <div className="bg-white w-125 rounded-3xl shadow-xl p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <IoClose size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center poppins-medium">
          Set Your Availability
        </h2>
        <p className="text-gray-500 text-center mt-2 mb-6 poppins-regular">
          Easily set your availability to manage appointments and commitments.
        </p>

        {/* Date Inputs */}
        <div className="flex gap-4 mb-6">
          {/* From */}
          <div className="relative flex-1">
            <input
              type="date"
              className="w-full border rounded-xl px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="From"
            />
            <FaRegCalendarAlt className="absolute right-3 top-4 text-gray-400" />
          </div>

          {/* To */}
          <div className="relative flex-1">
            <input
              type="date"
              className="w-full border rounded-xl px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="To"
            />
            <FaRegCalendarAlt className="absolute right-3 top-4 text-gray-400" />
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="h-40 bg-gray-200 rounded-2xl mb-6 flex items-center justify-center text-gray-400 poppins-regular">
          Map Preview
        </div>

        {/* Address */}
        <textarea
          rows="3"
          defaultValue="144, D block, Londaan"
          className="w-full border rounded-xl px-4 py-3 outline-none  mb-6 resize-none poppins-regular"
        />

        {/* Submit Button */}
       <Button label="Submit" onClick={onSubmit}/>
      </div>
    
    
    </div>
  );
}

export default Availability;