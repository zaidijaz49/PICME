import React from "react";
import Card from "../../assets/Card.png";
import { History } from "../../utils/Mock";
function Transaction() {
  return (
    <div>
      <div className="p-10">
        <div className="w-full">
          <h1 className="poppins-medium text-3xl text-center">
            Transaction History
          </h1>
        </div>
        <div className="flex justify-center  h-70">
          <img src={Card} alt="" className="h-80" />
        </div>
        <div>
          <h1 className="poppins-medium p-4 text-xl">Recent Transaction</h1>
        </div>

        {History.map((item) => (
          <div className="p-4 flex">
            <div>
              <img
                src={item.avatar}
                className="rounded-full w-13 h-13 "
              />
            </div>
            <div className="pl-4">
              <h1 className="poppins-medium">{item.name}</h1>{" "}
              <p className="poppins-regular text-sm">{item.package}</p>
            </div>
            <div className="flex w-300 items-center justify-end ">
              <h1 className="poppins-semibold text-[#21C465]">$</h1>{" "}
              <span className="poppins-semibold text-[#21C465]">{item.price}</span>
            </div>
          </div>
        ))}
        <div className="w-full h-px  bg-gray-300 "></div>
      </div>
    </div>
  );
}

export default Transaction;
