import React, { useState } from "react";
import Button from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Link,} from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";

import { AiOutlineArrowLeft, AiOutlineCheck } from "react-icons/ai";
import axios from "axios";

function Forgotpassword() {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      redirect_url: "http://localhost:5173/reset",
    };
    try {
      const response = await axios.post(
        "https://api-dev.thepicmeapp.com/api/v1/auth/password",
        payload,
      );
      console.log("Reset email sent:", response.data);
      alert("Reset password email sent");
    } catch (error) {
      console.error("Reset email error:", error.response?.data || error.message);
      alert(
        "Reset email sent failed: " +
          (error.response?.data?.message || error.message || "Unknown error"),
      );
    }
  };

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 w-full">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl">
        {/* STEP 1: EMAIL */}

        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold poppins-semibold">
              Forgot Password
            </h1>
            <p className="mt-2 text-sm poppins-regular">
              Enter your email to receive OTP
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <Input
              placeholder="Email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              Icon={<AiOutlineMail />}
            />
            <Button type="submit" varient="primary" label="Continue" />
          </form>

          <Link to="/auth/signin">
            <Button
              varient="secondary"
              label="Back to login"
              Icon={AiOutlineArrowLeft}
            />
          </Link>
        </>

        {/* STEP 3: NEW PASSWORD */}
      </div>
    </div>
  );
}

export default Forgotpassword;
