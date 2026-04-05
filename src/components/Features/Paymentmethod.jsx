import React from "react";
import Button from "../common/Button";

function Paymentmethod({
  paymentMethods,
  selected,
  onClick,
  setSelected,
  title = "Select the Payment method",
}) {
  return (
    <div className="">
  <div className="relative w-full p-8 text-white rounded-lg shadow-lg flex flex-col justify-between space-y-7 h-141">

        {/* Title */}
<h2 className="text-center text-black shrink-0 poppins-semibold text-2xl">
  {title}
</h2>

{/* Payment Options (Scrollable Area) */}
<div className="flex-1 overflow-y-auto space-y-4 mt-4 pr-1">
  {paymentMethods.map((method) => (
    <div
      key={method.id}
      onClick={() => setSelected(method.id)}
      className="flex items-center justify-between bg-white rounded-xl px-3 py-8 cursor-pointer hover:shadow"
    >
      <div className="flex items-center gap-3">
        <img src={method.logo} alt="" className="h-2 w-auto" />
        <span className="font-medium text-gray-700 poppins-medium">{method.name}</span>
      </div>

      {/* Radio */}
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          selected === method.id ? "border-cyan-500" : "border-gray-300"
        }`}
      >
        {selected === method.id && (
          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
        )}
      </div>
    </div>
  ))}
</div>

{/* Button (Fixed at bottom) */}
<div className="h-15">
  <Button label="CONTINUE" onClick={onClick} />
</div>

      </div>
    </div>
  );
}

export default Paymentmethod;
