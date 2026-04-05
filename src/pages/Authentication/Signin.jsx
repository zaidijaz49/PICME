import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Button from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";

function Signin() {
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Role passed from Welcome page: "customer" or "photographer"
  const role = location.state?.role;
  const type = role === "photographer" ? 1 : 0; // ✅ 0=customer, 1=photographer

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    const payload = {
      email: email,
      password: password,
      remember_me: remember,
      type: type,
    };

    try {
      setLoading(true);

      const response = await api.post("/api/v1/auth/sign_in", payload); // ✅

      // Token from header
      const rawToken = response.headers["authorization"];
      const cleanToken = rawToken.replace(/^Bearer\s+/i, "");

      // Save token
      if (remember) {
        localStorage.setItem("authToken", cleanToken);
      } else {
        sessionStorage.setItem("authToken", cleanToken);
      }
      localStorage.setItem(
        "userRole",
        type === 1 ? "photographer" : "customer",
      );

      navigate(type === 1 ? "/photographer" : "/customer");
      
    } catch (err) {
      const message = err.response?.data?.errors?.[0] || "something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 poppins-semibold">Sign in</h2>

        {/* Error Message — replaces alert() */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            Icon={<AiOutlineMail />}
          />

          <div className="relative mb-4">
            <Input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              Icon={<FaLock />}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <div
                className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                  remember ? "bg-[#2BAFC7]" : "bg-gray-300"
                }`}
                onClick={() => setRemember(!remember)}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    remember ? "translate-x-5" : ""
                  }`}
                />
              </div>
              <span className="text-gray-600 text-sm poppins-regular">
                Remember Me
              </span>
            </label>

            <a
              href="/forgotpassword"
              className="text-[#2BAFC7] text-sm font-medium poppins-regular"
            >
              Forgot Password?
            </a>
          </div>

          <Button
            type="submit"
            varient="primary"
            label={loading ? "Signing in..." : "Sign In"}
          />
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-gray-400 text-sm poppins-regular">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button className="w-full py-3 flex items-center justify-center border rounded-lg mb-3 hover:bg-gray-100 transition cursor-pointer">
          <FcGoogle className="mr-2" />
          Login with Google
        </button>

        <button className="w-full py-3 flex items-center justify-center border rounded-lg mb-3 hover:bg-gray-100 transition cursor-pointer">
          <FaFacebookF className="mr-2 text-blue-600" />
          Login with Facebook
        </button>

        <p className="text-center text-gray-600 mt-4 text-sm poppins-regular">
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-[#2BAFC7] font-medium poppins-regular"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
