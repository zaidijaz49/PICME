import React, { useState } from "react";
import { Bookings } from "../../utils/Mock";
import Button from "../../components/common/Button";
import Calendar from "../../components/Features/Calendar";
import Availability from "../../components/Features/Availability";
import BookingSuccessPopup from "../../components/Features/BookingSucesspopup";
function Booking() {
  const [step, setStep] = useState(1);
  const [range, setRange] = useState();
  const [openAvailability, setOpenAvailability] = useState(false);
  const [sucessPopup,setSucessPopup] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header + Tabs */}
      <div className="p-15">
        <h1 className="poppins-medium text-3xl text-center">Bookings</h1>

        <div className="w-full flex justify-center mt-6">
          <div className="bg-[#F2FAFC] flex w-137 h-12 rounded-lg items-center justify-center gap-2">
            {/* Bookings Tab */}
            <div className="w-65 h-9">
              <button
                onClick={() => setStep(1)}
                className={`w-full h-full rounded-lg transition-all duration-300 cursor-pointer poppins-medium
                ${step === 1 ? "bg-[#2BAFC7] text-white" : "bg-white text-black"}`}
              >
                Bookings
              </button>
            </div>

            {/* Calendar Tab */}
            <div className="w-65 h-9">
              <button
                onClick={() => setStep(2)}
                className={`w-full h-full rounded-lg transition-all duration-300 cursor-pointer poppins-medium
                ${step === 2 ? "bg-[#2BAFC7] text-white" : "bg-white text-black"}`}
              >
                Calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Step Content */}

      {/* Bookings Content */}
      {step === 1 && (
        <div className="p-15">
          <div>
            {Bookings.map((item) => (
              <div className="flex space-x-8 justify-between items-center ">
                <div className="flex space-x-3">
                  <div className="">
                    <img
                      src={item.avatar}
                      alt=""
                      className="rounded-full w-13 h-13 "
                    />
                  </div>
                  <div className="flex justify-center items-center space-x-2">
                    <h1 className="poppins-medium text-[#2BAFC7]">
                      {item.name}
                    </h1>
                    <p className="poppins-regular">Confirm Your booking at </p>
                    <span className="poppins-medium">{item.date}</span>
                  </div>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <div className="w-40 h-10 ">
                    <Button label="Accept" />
                  </div>
                  <div className="w-40 h-10">
                    <Button label="Reject" varient="secondary" />
                  </div>
                </div>
              </div>
            ))}

            <div className="w-full h-px mt-3 bg-gray-300 "></div>
          </div>
        </div>
      )}

      {/* Calendar Content */}
      {step === 2 && (
        <div className="p-20">
          <div className=" w-full">
            <Calendar
              value={range}
              onChange={setRange}
              title="July 25, 2024"
              onSetAvailability={() => setOpenAvailability(true)}
              onContinue={() => console.log("continue")}
              Dateheader={false}
              showFooter={false}
              className=""
            />
          </div>
        </div>
      )}
      <Availability
        isOpen={openAvailability}
        onClose={() => setOpenAvailability(false)}
        onSubmit={() => {
          console.log("Availability Saved");
          setOpenAvailability(false);
           setSucessPopup(true); 
        }}
      />
      <BookingSuccessPopup
  open={sucessPopup}
  onClose={() => setSucessPopup(false)}
/>
    </div>
  );
}

export default Booking;
