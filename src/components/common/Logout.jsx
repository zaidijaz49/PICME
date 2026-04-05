import React from "react";
import { Link } from "react-router";

function LogoutPopup({ showModal, onConfirm, onCancel }) {
  if (!showModal) return null; // Only render if showModal is true

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4 poppins-medium">Confirm Logout</h2>
        <p className="mb-4 poppins-regular">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-300 cursor-pointer poppins-semibold"
            onClick={onCancel}
          >
            Cancel
          </button>
          <Link to="/customerDashboard/rating"><button
            className="px-4 py-2 rounded bg-red-500 text-white cursor-pointer poppins-semibold"
            onClick={onConfirm}
          >
            Logout
          </button></Link>
        </div>
      </div>
    </div>
  );
}

export default LogoutPopup;
