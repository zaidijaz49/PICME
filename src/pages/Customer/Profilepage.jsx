import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button";
import LogoutPopup from "../../components/common/Logout";
import api from "../../api/axios";
import { getDeviceToken } from "../../utils/deviceToken";

function ProfilePage() {
  const device_token = getDeviceToken();
  const [showLogout, setShowLogout] = useState(false);
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [imageFile, setImageFile] = useState(null);      // actual file object
  const [imagePreview, setImagePreview] = useState(null); // preview URL

  const [card, setCard] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/v1/users/me");
        setUser(response.data.user);
        setFullName(response.data.user?.name || "");
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  // When user picks a new image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // show preview instantly
    }
  };

  // Update name and/or image
 const handleUpdate = async () => {
  try {
    const formData = new FormData();
    formData.append("user[name]", fullName);
    if (imageFile) {
      formData.append("user[profile_image]", imageFile);
    }

    const response = await api.patch(`/api/v1/users/me`, formData);

    if (response.data.success) {
      alert("Profile updated successfully!");
    }
  } catch (error) {
    console.log(error);
    alert("Update failed. Please try again.");
  }
};

  // Logout
  const handleLogoutClick = () => setShowLogout(true);
  const handleCancelLogout = () => setShowLogout(false);
  const handleConfirmLogout = async () => {
    try {
      setShowLogout(false);
      await api.delete("/api/v1/logout", device_token);
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      alert("Logged out successfully!");
      window.location.href = "/auth/signin";
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong.";
      alert(message);
    }
  };

  const handleCardChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full border p-3 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#2BAFC7]/40";
  const disabledClass =
    "w-full border p-3 rounded-lg text-sm sm:text-base bg-gray-100 text-gray-400 cursor-not-allowed";

  if (!user) {
    return (
      <p className="text-center text-gray-400 mt-20">Loading...</p>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">

      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8 sm:mb-10">
        {/* Clicking image opens file picker */}
        <label className="cursor-pointer relative">
          <img
            src={imagePreview || user?.profile_image_url || "https://randomuser.me/api/portraits/women/44.jpg"}
            alt="profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 bg-[#2BAFC7] text-white text-xs px-2 py-0.5 rounded-full">
            Edit
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        <h2 className="text-lg sm:text-xl font-semibold mt-4 text-cyan-600 poppins-medium">
          {user?.name}
        </h2>
        <p className="text-gray-500 poppins-regular text-sm">{user?.email}</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">

        {/* Customize Profile */}
        <div className="bg-white p-5 sm:p-8 rounded-xl shadow">
          <h2 className="text-lg sm:text-xl font-semibold text-center mb-5 sm:mb-6 poppins-medium">
            Customize Your Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Disabled — not editable */}
            <input
              placeholder={user?.email}
              disabled
              className={disabledClass}
            />
            <input
              placeholder={user?.active_role}
              disabled
              className={disabledClass}
            />

            {/* Editable — only name */}
            <input
              name="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
            />

            {/* Disabled — not editable */}
            <input
              placeholder={user?.currency}
              disabled
              className={disabledClass}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <div className="w-full h-15 sm:w-40">
              <Button label="Update" onClick={handleUpdate} />
            </div>
            <div className="w-full h-15 sm:w-40">
              <Button
                label="Cancel"
                varient="secondary"
                onClick={() => {
                  setFullName(user?.name || "");
                  setImageFile(null);
                  setImagePreview(null);
                }}
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-5 sm:p-8 rounded-xl shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold poppins-medium">
              Payment Method
            </h2>
            <div className="w-full sm:w-40">
              <Button label="Remove" varient="danger" />
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <LogoutPopup
              showModal={showLogout}
              onConfirm={handleConfirmLogout}
              onCancel={handleCancelLogout}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input placeholder="Master Card" className={inputClass} />
            <input
              name="cardName"
              placeholder="Sarah Ahmed"
              value={card.cardName}
              onChange={handleCardChange}
              className={inputClass}
            />
            <input
              name="cardNumber"
              placeholder="XXXX XXXX XXXX"
              value={card.cardNumber}
              onChange={handleCardChange}
              className={inputClass}
            />
            <input
              type="month"
              name="expiry"
              value={card.expiry}
              onChange={handleCardChange}
              className={inputClass}
            />
            <input
              name="cvv"
              placeholder="XXXX"
              value={card.cvv}
              onChange={handleCardChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Logout */}
        <div className="w-full flex justify-end">
          <div className="w-full h-15 sm:w-40">
            <Button label="Logout" varient="danger" onClick={handleLogoutClick} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;