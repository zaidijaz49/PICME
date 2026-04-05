import React, { useState } from "react";
import { Link } from "react-router-dom";

function Welcome() {
  const [active, setActive] = useState(null); // correct useState

  return (
    <div className="min-h-screen flex flex-col items-center pt-24">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 text-center ">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 poppins-semibold text-start  ">
          Experience Photography In a new Dimension
        </h1>

        <div className="flex flex-col gap-4">
          {/* Customer Button */}
          <Link to="/Signin" state={{ role: "customer" }}>
            <button
              onMouseEnter={() => setActive("customer")}
              onMouseLeave={() => setActive(null)}
              className={`w-full py-3 text-lg font-semibold rounded-lg transition cursor-pointer poppins-semibold
              ${
                active === "customer"
                  ? "bg-[#2BAFC7] text-white"
                  : "bg-white text-[#2BAFC7] border-2 border-[#2BAFC7] hover:bg-[#2BAFC7] hover:text-white"
              }`}
            >
              Continue as a Customer
            </button>
          </Link>
          {/* Photographer Button */}
          <Link to="/signin" state={{ role: "photographer" }}>
            {" "}
            <button
              onMouseEnter={() => setActive("photographer")}
              onMouseLeave={() => setActive(null)}
              className={`w-full py-3 text-lg font-semibold rounded-lg transition cursor-pointer poppins-semibold
              ${
                active === "photographer"
                  ? "bg-[#2BAFC7] text-white"
                  : "bg-white text-[#2BAFC7] border-2 border-[#2BAFC7] hover:bg-[#2BAFC7] hover:text-white"
              }`}
            >
              Continue as a Photographer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
