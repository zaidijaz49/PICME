import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Button from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { FaUser, FaLock, FaFacebookF } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import api from "../../api/axios"; // ✅ use same api instance as Signin

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [step,setstep] = useState(1)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ error state like Signin
   const [otp, setOtp] = useState("");
    const [time, setTime] = useState(30);
    const role = location.state?.role;
    const type = role === "photographer" ? 1 : 0;
    
   const handleOtpSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!otp) {
    setError("Please enter OTP");
    return;
  }

  try {
    setLoading(true);
    const response = await api.post("/api/v1/users/verify_otp", {
      email: email,    // ✅ from step 1 state
      otp_code: otp,
    });

    const rawToken = response.headers["authorization"];
    if (rawToken) {
      const cleanToken = rawToken.replace(/^Bearer\s+/i, "");
      localStorage.setItem("authToken", cleanToken);
    }

    navigate("/signin");

  } catch (err) {
    setError(err.response?.data?.message || "Invalid OTP. Try again.");
  } finally {
    setLoading(false);
  }
};

const handleResendOtp = async () => {
  try {
    await api.post("/api/v1/users/resend_otp", { email: email }); // ✅ email from state
    setTime(30); // restart timer
    setError("");
  } catch (err) {
    setError(err.response?.data?.message || "Failed to resend OTP.");
  }
};


   useEffect(() => {
  if (step !== 2) return;  // only run on step 2
  if (time === 0) return;  // stop at 0
  const interval = setInterval(() => setTime((prev) => prev - 1), 1000);
  return () => clearInterval(interval);
}, [step, time]); // ← keep both
   
  // ================= GOOGLE LOGIN =================
  const login = useGoogleLogin({
    flow: "auth-code", // ✅ back to auth-code
    onSuccess: async (tokenResponse) => {
      try {
        const res = await api.post("/api/v1/oauth/google_auth", {
          code: tokenResponse.code, // ✅ send code as token
          redirect_url: "http://localhost:5173/customer", // ✅ exact URL from Postman
        });

        const rawToken = res.headers["authorization"];
        if (rawToken) {
          const cleanToken = rawToken.replace(/^Bearer\s+/i, "");
          localStorage.setItem("authToken", cleanToken);
        }

        navigate("/customer");
      } catch (err) {
        console.log("Google login error:", err.response?.data);
        setError(err.response?.data?.message || "Google login failed.");
      }
    },
    onError: () => setError("Google login failed."),
  });
  // ================= FACEBOOK LOGIN =================
  const handleFacebookResponse = (response) => {
    if (!response || !response.accessToken) {
      setError("Facebook login canceled or failed.");
      return;
    }
    // TODO: send accessToken to backend like Google if needed
    navigate("/customer");
  };

  // ================= SIGNUP FORM =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // ✅ clear previous errors

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[@$!%*?&#^()_+\-={};:'"|,.<>/?]/.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    }

    const payload = {
      username,
      email,
      password,
      type: type,
    };

    try {
      setLoading(true);

      const response = await api.post("/api/v1/auth", payload); // ✅ uses api instance

      // Token from header (same pattern as Signin)
      const rawToken = response.headers["authorization"];
      if (rawToken) {
        const cleanToken = rawToken.replace(/^Bearer\s+/i, "");
        localStorage.setItem("authToken", cleanToken); // ✅ same key as Signin
      }
      localStorage.setItem(
        "userRole",
        type === 1 ? "photographer" : "customer",
      );



     setstep(2)
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full max-w-md bg-white rounded-lg p-6 shadow-md">
   {step==1 && ( <div className="">
      <h2 className="text-2xl font-bold text-center mb-4 poppins-semibold">
        Sign Up
      </h2>

      {/* ✅ Error Message — same style as Signin */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          placeholder="User Name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          Icon={<FaUser />}
        />
        <Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          Icon={<AiOutlineMail />}
        />
        <Input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          Icon={<FaLock />}
        />
        <Input
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          type="password"
          Icon={<FaLock />}
        />

        <Button
          type="submit"
          varient="primary"
          label={loading ? "Signing up..." : "Sign Up"}
          disabled={loading}
        />
      </form>

      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="px-3 text-gray-400 text-sm">OR</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <button
        onClick={() => login()}
        className="w-full py-3 flex items-center justify-center border rounded-lg mb-3 hover:bg-gray-100 transition cursor-pointer"
      >
        <FcGoogle className="mr-2" /> Continue with Google
      </button>

      <FacebookLogin
        appId="785522083461166"
        autoLoad={false}
        fields="name,email,picture"
        callback={handleFacebookResponse}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="w-full py-3 flex items-center justify-center border rounded-lg mb-3 hover:bg-gray-100 transition cursor-pointer"
          >
            <FaFacebookF className="mr-2 text-blue-600" />
            Continue with Facebook
          </button>
        )}
      />

      <p className="text-center text-gray-600 mt-4 text-sm">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/signin")}
          className="text-[#2BAFC7] font-medium cursor-pointer"
        >
          Sign in
        </span>
      </p>
    </div>)}
    {step ==2 &&(
      <div className="">
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
  {time > 0 ? (
    <p className="poppins-regular">
      Resend OTP in <span className="text-[#2BAFC7]">{time}s</span>
    </p>
  ) : (
    <p className="text-[#2BAFC7] cursor-pointer poppins-regular" onClick={handleResendOtp}>
      Resend OTP
    </p>
  )}
</div>
    </div>
    )}
    </div>
  );
}

export default Signup;
