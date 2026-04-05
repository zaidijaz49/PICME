import React from "react";
import Button from "../common/Button";

function CardForm({
  title = "Enter Card Details",
  cardData,
  setCardData,
  onSubmit,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  return (
    <div className="p-6 sm:p-10 rounded-2xl shadow-md w-full bg-[#F2FAFC]">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 poppins-medium">
        {title}
      </h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Card Holder Name"
          value={cardData.name}
          onChange={handleChange}
          className="w-full p-3 sm:p-4 rounded-2xl poppins-regular bg-white text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#2BAFC7]/40"
        />

        <input
          type="text"
          name="number"
          placeholder="Card Number"
          value={cardData.number}
          onChange={handleChange}
          className="w-full p-3 sm:p-4 rounded-2xl poppins-regular bg-white text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#2BAFC7]/40"
        />

        <input
          type="month"
          name="expiry"
          value={cardData.expiry}
          onChange={handleChange}
          className="w-full p-3 sm:p-4 rounded-2xl poppins-regular bg-white text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#2BAFC7]/40"
        />

        <input
          type="number"
          name="csv"
          placeholder="CSV"
          value={cardData.csv}
          onChange={handleChange}
          className="w-full p-3 sm:p-4 rounded-2xl poppins-regular bg-white text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#2BAFC7]/40"
        />

        <div className="h-12">
          <Button onClick={onSubmit} label="Continue" />
        </div>
      </div>
    </div>
  );
}

export default CardForm;