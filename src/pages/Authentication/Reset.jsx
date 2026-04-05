import React, { useEffect, useState } from "react";
import Check from "../../assets/Sticker.svg";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Input } from "../../components/common/Input";
import Button from "../../components/common/Button";

function Reset() {
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const location = useLocation();

  // ✅ Extract token safely on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const resetToken = params.get("reset_password_token");

    console.log("Reset token from URL:", resetToken);

    if (resetToken) {
      setToken(resetToken);
      localStorage.setItem("reset_token", resetToken); // backup storage
    } else {
      // fallback if page refresh
      const savedToken = localStorage.getItem("reset_token");
      if (savedToken) {
        setToken(savedToken);
      }
    }
  }, [location.search]);

  // ✅ Password validation
  const isStrongPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
    return regex.test(password);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT

    if (!newPassword || !confirmPassword) {
      alert("Fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!isStrongPassword(newPassword)) {
      alert("Password must have 1 uppercase & 1 special character");
      return;
    }

    if (!token) {
      alert("Reset token missing or expired");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(
        "https://api-dev.thepicmeapp.com/api/v1/auth/password",
        {
          token: token,
          password: newPassword,
          password_confirmation: confirmPassword,
        }
      );

      console.log("Reset response:", response.data);

      alert("Password reset successful!");
      localStorage.removeItem("reset_token"); // cleanup
      setStep(2);
    } catch (err) {
      console.error("Reset error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid or expired token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 w-full">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl">

        {/* STEP 1: RESET FORM */}
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold mb-4 poppins-semibold">
              Reset Password
            </h1>

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant="primary"
                label={loading ? "Resetting Password..." : "Reset Password"}
                disabled={loading}
              />
            </form>
          </>
        )}

        {/* STEP 2: SUCCESS */}
        {step === 2 && (
          <div className="max-w-sm mx-auto text-center px-4">
            <div className="mx-auto w-22 h-22 flex items-center justify-center rounded-full bg-[#2BAFC7] mb-4">
              <img src={Check} alt="success" />
            </div>

            <h2 className="text-xl font-bold mb-2 poppins-semibold">
              Password Changed!
            </h2>

            <p className="text-gray-500 mb-6 poppins-regular">
              Your password has been changed successfully.
            </p>

            <Link to="/Signin">
              <Button label="Back to Login" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reset;