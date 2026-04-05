import React, { useState } from "react";
import Button from "../../components/common/Button";
import LogoutPopup from "../../components/common/Logout";
import CardForm from "../../components/Features/CardForm";
import Walletpic from "../../assets/1.png";

function PhotographerProfile() {

  const [showLogout, setShowLogout] = useState(false);
  const [step, setStep] = useState(1);
  const handleLogoutClick = () => {
    setShowLogout(true);
  };

  const handleConfirmLogout = () => {
    setShowLogout(false);
    alert("Logged out!");
  };

  const handleCancelLogout = () => {
    setShowLogout(false);
  };

  const [profile, setProfile] = useState({
    name: "",
    gender: "",
    address: "",
    type: "",
  });
  const [cardData, setCardData] = useState({
      name: "",
      number: "",
      expiry: "",
      csv: "",
    });
  
    const handleSubmit = () => {
    console.log(cardData);
    alert("Payment Submitted");
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {step === 1 && (
        <div className="min-h-screen bg-white p-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-10">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="profile"
              className="w-28 h-28 rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold mt-4 text-cyan-600 poppins-medium">
              Sarah Ahmed
            </h2>
            <p className="text-gray-500 poppins-regular">johndoe@gmail.com</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Customize Profile */}
            <div className="bg-white p-8 rounded-xl shadow">
              <div className="flex w-full justify-between items-center mb-6 ">
                {" "}
                <h2 className="text-2xl font-semibold text-center pl-70 poppins-medium ">
                  Customize Your Profile
                </h2>
                <div className="w-50 h-15 p-1 ">
                  <Button
                    label="ADD PAYMENT DETAILS"
                    onClick={() => setStep(2)}
                  />
                </div>
              </div>
              <div className="relative flex justify-center items-center">
                <LogoutPopup
                  showModal={showLogout}
                  onConfirm={handleConfirmLogout}
                  onCancel={handleCancelLogout}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="username"
                  placeholder="User Name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="border-gray-50 border-2 p-3 rounded-lg"
                />

                <input
                  name="gender"
                  type="text"
                  placeholder="Gender"
                  value={profile.gender}
                  onChange={handleProfileChange}
                  className="border-gray-50 border-2 p-3 rounded-lg"
                />

                <input
                  name="address"
                  placeholder="Address"
                  value={profile.address}
                  onChange={handleProfileChange}
                  className="border-gray-50 border-2 p-3 rounded-lg"
                />

                <input
                  name="type"
                  type="text"
                  placeholder="Street Photographer"
                  value={profile.type}
                  onChange={handleProfileChange}
                  className="border-gray-50 border-2 p-3 rounded-lg"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <div className="w-50 h-12">
                  <Button label="Update" onClick={handleProfileChange} />
                </div>
                <div className="w-50 h-12">
                  <Button label="Cancel" varient="secondary" />
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="w-full flex justify-end">
              <div className="w-55 h-10">
                {" "}
                <Button
                  label="Logout"
                  varient="danger"
                  onClick={handleLogoutClick}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {step ===2 &&(
        <div className="p-10">
          <div><h1 className="poppins-medium text-2xl text-center">Payment Details</h1></div>
      <div className="flex justify-evenly p-10">
            <div>
              <img src={Walletpic} />
            </div>
            <div className="w-lg h-141">
              <CardForm
                title="Enter Card Details"
                cardData={cardData}
                setCardData={setCardData}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
          </div>
      )}
    </div>
  );
}

export default PhotographerProfile;
