import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Package from "../../components/Features/Package";
import { paymentMethods } from "../../utils/Mock";
import Paymentmethod from "../../components/Features/Paymentmethod";
import Calendar from "../../components/Features/Calendar";
import Walletpic from "../../assets/1.png";
import CardForm from "../../components/Features/CardForm";
import Thankyou from "../../assets/thankyou.png";
import Button from "../../components/common/Button";
import { Link, useLocation} from "react-router";
import api from "../../api/axios";

function Paymentdetails() {
  const { state } = useLocation();
  

  // Package data from previous page
  const selectedPackage = state?.package;
  const photographerId = state?.photographerId;

  // Build features from package fields
  const features = [
    selectedPackage?.delivery_days
      ? `${selectedPackage.delivery_days} days delivery`
      : null,
    selectedPackage?.number_of_tickets
      ? `${selectedPackage.number_of_tickets} ticket`
      : null,
    selectedPackage?.description ? selectedPackage.description : null,
  ].filter(Boolean);

  const [selected, setSelected] = useState();
  const [step, setStep] = useState(1);
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [cardData, setCardData] = useState({ name: "", number: "", expiry: "", csv: "" });

  // Availability data from calendar API
  const [availabilities, setAvailabilities] = useState([]);
  const [unavailabilities, setUnavailabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(selectedPackage.photographer_profile_id)
  // Fetch photographer calendar when step 2 opens
  useEffect(() => {
    if (step === 2 && photographerId) {
      const fetchCalendar = async () => {
        try {
          setLoading(true);
          const res = await api.get(
            `/api/v1/photographers/calendar/${photographerId}`
          );
        
          const data = res.data.data;
          setAvailabilities(data.availabilities || []);
          setUnavailabilities(data.unavailabilities || []);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCalendar();
    }
  }, [step]);

  // Step 2 → Step 3: validate dates selected
  const handleContinue = () => {
    if (!range.from || !range.to) {
      alert("Please select a date range");
      return;
    }
    setStep(3);
  };

  // Step 3 → Step 4: call booking API
  const handlePayment = async () => {
    try {
      // Format dates as DD-MM-YYYY as required by the API
      const startDate = format(range.from, "dd-MM-yyyy");
      const endDate = format(range.to, "dd-MM-yyyy");

      const formData = new FormData();
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);
      formData.append("package_id", selectedPackage.id);
      // payment_intent comes from Stripe — add when Stripe is integrated
      // formData.append("payment_intent", "pi_xxxxx");

      const res = await api.post("/api/v1/bookings", formData);

      if (res.data.success) {
        setStep(4);
      }
    } catch (err) {
      console.log(err);
      alert("Booking failed. Please try again.");
    }
  };

  // Reusable package card shown on steps 1 and 2
  const SelectedPackageCard = () => (
    <div className="w-full max-w-md flex flex-col">
      <Package
        title={selectedPackage?.name}
        label="Selected"
        price={`${selectedPackage?.symbol || "$"}${selectedPackage?.price}`}
        features={features}
        variant="Huge"
        varient="selected"
      />
    </div>
  );

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4 sm:p-8 md:p-10">
      <div className="flex flex-col w-full">
        <div className="text-center p-4 sm:p-5 font-semibold text-xl sm:text-2xl">
          <h1 className="poppins-semibold">PAYMENT DETAILS</h1>
        </div>

        {/* Step 1 — Choose payment method */}
        {step === 1 && (
          <div className="flex flex-col md:flex-row justify-evenly items-stretch gap-6 p-4">
            <SelectedPackageCard />
            <div className="w-full max-w-md flex flex-col">
              <Paymentmethod
                paymentMethods={paymentMethods}
                selected={selected}
                setSelected={setSelected}
                onClick={() => {
                  if (!selected) {
                    alert("Please select a payment method");
                    return;
                  }
                  setStep(2);
                }}
              />
            </div>
          </div>
        )}

        {/* Step 2 — Choose dates from calendar */}
        {step === 2 && (
          <div className="flex flex-col md:flex-row justify-evenly items-stretch gap-6 p-4">
            <SelectedPackageCard />
            <div className="w-full max-w-md flex flex-col">
              {loading ? (
                <p className="text-gray-400 poppins-regular text-sm text-center mt-10">
                  Loading availability...
                </p>
              ) : (
                <Calendar
                  value={range}
                  onChange={setRange}
                  onContinue={handleContinue}
                  title="Choose Date"
                  availabilities={availabilities}
                  unavailabilities={unavailabilities}
                />
              )}
            </div>
          </div>
        )}

        {/* Step 3 — Enter card details */}
        {step === 3 && (
          <div className="flex flex-col md:flex-row justify-evenly items-center gap-8 p-4 sm:p-10">
            <div className="w-full max-w-xs flex justify-center">
              <img
                src={Walletpic}
                className="w-48 sm:w-64 md:w-auto object-contain"
                alt="Wallet"
              />
            </div>
            <div className="w-full max-w-md">
              <CardForm
                title="Enter Card Details"
                cardData={cardData}
                setCardData={setCardData}
                onSubmit={handlePayment}
              />
            </div>
          </div>
        )}

        {/* Step 4 — Booking confirmed */}
        {step === 4 && (
          <div className="flex flex-col md:flex-row justify-evenly items-center gap-8 p-4 sm:p-10">
            <div className="w-full max-w-xs flex justify-center">
              <img
                src={Thankyou}
                className="w-48 sm:w-64 md:w-auto object-contain"
                alt="Thank You"
              />
            </div>
            <div className="rounded-2xl shadow-2xl text-center w-full max-w-md bg-[#F2FAFC] flex flex-col justify-center py-10 px-6">
              <div className="space-y-5">
                <h1 className="text-xl sm:text-2xl font-semibold poppins-medium">
                  Booking Details
                </h1>
                <p className="poppins-regular text-sm sm:text-base">
                  Your{" "}
                  <span className="text-[#2BAFC7]">{selectedPackage?.name}</span>{" "}
                  package is booked from{" "}
                  <span className="text-[#2BAFC7]">
                    {range.from ? format(range.from, "MMM dd, yyyy") : "--"}
                  </span>{" "}
                  to{" "}
                  <span className="text-[#2BAFC7]">
                    {range.to ? format(range.to, "MMM dd, yyyy") : "--"}
                  </span>
                </p>
              </div>
              <div className="p-6 sm:p-10 space-y-4 flex flex-col justify-center items-center">
                <div className="w-full sm:w-80 h-12">
                  <Link to="/customerDashboard/chat">
                    <Button label="Go to chat" />
                  </Link>
                </div>
                <div className="w-full sm:w-80 h-12">
                  <Link to="/customerDashboard">
                    <Button label="Home" varient="secondary" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Paymentdetails;