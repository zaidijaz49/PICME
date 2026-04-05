import React from "react";
import { useEffect, useState } from "react";
import { Input } from "../../components/common/Input";
import Button from "../../components/common/Button";
// import api from "../../api/axios";
function Verification() {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(30);
  const handleOtpSubmit =  async (e) => {
    e.preventDefault();
    // try {
    //   const reponse = await api.post("/api/v1/users/verify_otp",{})
    // } catch (error) {
      
    // }

  };
  useEffect(() => {
    if (time === 0) return;
    const interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [time]);
 
  
    <div>
      <h1 className="text-2xl font-bold mb-4 poppins-semibold">Verify OTP</h1>

      <form onSubmit={handleOtpSubmit} className="space-y-3">
        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button type="submit" variant="primary" label="Verify OTP" />
      </form>
      <div>
        <p className="poppins-regular">
          Resend OTP in <span className="text-[#2BAFC7]">{time}</span>
        </p>
      </div>
    </div>
  
}

export default Verification;
