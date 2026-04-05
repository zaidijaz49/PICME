import React, { useState } from "react";
import Package from "../../assets/Package.png";
import Port from "../../assets/Port.png";
import Booking from "../../assets/Booking.png";
import Button from "../../components/common/Button";
import Frame from "../../assets/Frame.svg";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate(); // ✅ call the hook
  const [selected, setSelected] = useState(null);

  const handlecontinue = () => {
    if (selected === "Portfolio") {
      navigate("/photographerdashboard/uploadportfolio");
    } else if (selected === "Package") {
      navigate("/photographerdashboard/uploadpackage");
    } else if (selected === "Booking") {
      navigate("/photographerdashboard/booking");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center  ">
      
      <div className="flex flex-col text-center mb-14 space-y-2 ">
        <h1 className="text-3xl font-bold text-gray-800 poppins-medium">Tim's Offering</h1>
        <p className="text-gray-500 text-base poppins-regular">Update your services below</p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">

        {/* Portfolio */}
        <div
          className="bg-[#DAF9FF] h-55 w-90 flex flex-col items-center justify-center rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 relative cursor-pointer"
          onClick={() => setSelected("Portfolio")}
        >
          <div className="absolute top-4 right-4">
            {selected === "Portfolio" && (
              <img src={Frame} className="w-6 h-6" />
            )}
          </div>
          <img src={Port} className="h-24 w-24 mb-4 object-contain" />
          <h1 className="font-semibold text-2xl text-gray-800 poppins-medium">Portfolio</h1>
        </div>

        {/* Package */}
        <div
          className="bg-[#A7DBFB] h-55 w-90 flex flex-col items-center justify-center rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 relative cursor-pointer"
          onClick={() => setSelected("Package")}
        >
          <div className="absolute top-4 right-4">
            {selected === "Package" && (
              <img src={Frame} className="w-6 h-6" />
            )}
          </div>
          <img src={Package} className="h-24 w-24 mb-4 object-contain" />
          <h1 className="font-semibold text-2xl text-gray-800 poppins-medium">Package</h1>
        </div>

        {/* Booking */}
        <div
          className="bg-[#DAE2FF] h-55 w-90 flex flex-col items-center justify-center rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 relative cursor-pointer"
          onClick={() => setSelected("Booking")} // ✅ fixed case
        >
          <div className="absolute top-4 right-4">
            {selected === "Booking" && (
              <img src={Frame} className="w-6 h-6" />
            )}
          </div>
          <img src={Booking} className="h-24 w-24 mb-4 object-contain" />
          <h1 className="font-semibold text-2xl text-gray-800 poppins-medium">Booking</h1>
        </div>

      </div>

      <div className="w-full h-14 max-w-sm">
        <Button label="Continue" onClick={handlecontinue} />
      </div>
    </div>
  );
}

export default Home;
