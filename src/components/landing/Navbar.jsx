import React from "react";
import Button from "../common/Button";
import Logo from "../../assets/whitelogo.png"
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="bg-[#2BAFC7] w-full h-20 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="pl-15">
          <img src={Logo} alt="" />
        </div>
        <div className="flex  w-full justify-end pr-10 space-x-3">
          <div className="w-30 h-11"><Link to="/auth"><Button label="SIGNUP" varient="simple"/></Link></div>
          <div className="w-30 h-11"><Link to="/auth/signin"><Button label="LOGIN" varient="secondary"/></Link></div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
