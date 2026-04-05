import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import Logo2 from "../../assets/whitelogo.png";
import Avatar from "../../assets/avatar.png";
import { Link } from "react-router";
import { IoChevronDown } from "react-icons/io5";
import api from "../../api/axios";
import { getDeviceToken } from "../../utils/deviceToken";
function CustomerNavbar({ menuItems }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [currentRole, setCurrentRole] = useState(localStorage.getItem("userRole"));
 const [user,setUser] = useState()
  const device_token = getDeviceToken();
 

 useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/v1/users/me");
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  const navigate= useNavigate()
  const handleConfirmLogout = async () => {

    try {
      await api.delete("/api/v1/logout", device_token); // ✅ correct way to send body in DELETE

      // 👇 Clear token from both storages
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");

      alert("Logged out successfully!");
      window.location.href = "/auth/signin";
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong."; // ✅ was missing `const`
      alert(message); // ✅ was not being shown
    }
  };
const handlerole = async () => {
  const newRole = currentRole === "photographer" ? "customer" : "photographer";

  try {
    const response = await api.put("/api/v1/users/switch_role", {
      role: newRole,
    });

    const rawToken = response.headers["authorization"];
    if (rawToken) {
      const cleanToken = rawToken.replace(/^Bearer\s+/i, "");
      localStorage.setItem("authToken", cleanToken);
    }

    localStorage.setItem("userRole", newRole);
    setCurrentRole(newRole); // 👈 update state too

    if (newRole === "photographer") {
      navigate("/photographerdashboard");
    } else {
      navigate("/customer");
    }

  } catch (err) {
    const message = err.response?.data?.message || "Something went wrong.";
    alert(message);
  }
};

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="h-20 bg-[#239ab5] shadow flex items-center justify-between px-4 sm:px-8 relative z-50">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img src={Logo2} className="h-15 w-auto" alt="Logo" />
      </div>

      {/* Right side: nav items (desktop only) + avatar (always) */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Desktop nav items */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-white">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <item.icon size={20} />
                <span className="text-sm font-medium poppins-semibold">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Avatar + Name + Arrow — always visible */}
        <div
          ref={dropdownRef}
          className="relative flex items-center gap-2 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src={user?.profile_image_url}
            alt="user"
            className="w-8 h-8 rounded-full object-cover border-2 border-white flex-shrink-0"
          />
          <span className="text-white text-sm font-medium poppins-semibold hidden sm:inline">
            {user?.name}
          </span>
          <IoChevronDown
            className={`text-white transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
          />

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-11 bg-white rounded-xl shadow-xl w-50 overflow-hidden  z-50">
              {/* Mobile-only: nav items appear here */}
              <div className="md:hidden border-b border-gray-100">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 poppins-regular cursor-pointer">
                      <item.icon size={16} />
                      {item.label}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Always visible */}

              <div
                className="px-4 py-3 text-sm text-[#2BAFC7] hover:bg-gray-50 poppins-regular cursor-pointer"
                onClick={handlerole}
            
              >
                <h1 className="poppins-semibold"> Switch to {currentRole === "photographer" ? "Customer" : "Photographer"}</h1>
              </div>

              <Link
                to="/customerDashboard/profile"
                onClick={() => setDropdownOpen(false)}
              >
                <div className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 poppins-regular cursor-pointer">
                  Profile
                </div>
              </Link>
              <Link
                to="/customerDashboard/settings"
                onClick={() => setDropdownOpen(false)}
              >
                <div className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 poppins-regular cursor-pointer">
                  Settings
                </div>
              </Link>
              <div
                className="px-4 py-3 text-sm text-red-500 hover:bg-gray-50 poppins-regular cursor-pointer border-t border-gray-100"
                onClick={handleConfirmLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
