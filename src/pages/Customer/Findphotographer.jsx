import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../components/common/Input.jsx";
import { IoClose, IoChevronDown, IoSearch } from "react-icons/io5";
import PhotographerCard from "../../components/Features/PhotographerCard.jsx";
import Locationsvg from "../../assets/locationsvg.svg";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { allCategories } from "../../utils/Mock.js";
import axios from "axios";
import api from "../../api/axios.jsx";

export default function FindPhotographers() {
  const [activeCategory, setActiveCategory] = useState("");
  const [userLocation, setUserLocation] = useState({ lat: 30.3753, lng: 69.3451 });
  const [step, setStep] = useState(1);
  const [fromdate, setFromDate] = useState("");
  const [todate, setToDate] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("pakistan");
  const [Loading, setLoading] = useState(false);
  const [photographers, setPhotographers] = useState([]);

  const { lat, lng } = userLocation;
  const center = { lat, lng };

  const [showCategories, setShowCategories] = useState(false);
  const dropdownRef = useRef(null);

  const getLatLng = async () => {
    if (!location) return;
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/geocoding?city=${location}&country=${country}`,
        {
          headers: {
            'X-Api-Key': 'jZyfKCOc4hlYgJ0Do0i4TA==B7md8mjl9DFqcrmx'
          }
        }
      );
      if (response.data.length > 0) {
        const lat = response.data[0].latitude;
        const lng = response.data[0].longitude;
        return { lat, lng };
      }
    } catch (err) {
      console.log("Location error:", err);
    }
  };

  const handleSearch = async () => {
    if (!fromdate || !todate || !location) {
      alert("Please fill location and dates");
      return;
    }
    try {
      setLoading(true);
      const coords = await getLatLng();
      if (!coords) return;
      const response = await api.get("/api/v1/customers/search_photographer", {
        params: {
          start_date: fromdate,
          end_date: todate,
          latitude: coords.lat,
          longitude: coords.lng,
        },
      });
      setPhotographers(response.data);
    } catch (err) {
      console.log("Search error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySearch = async (cat) => {
  setActiveCategory(cat);
  setShowCategories(false);
  try {
    const response = await api.get("/api/v1/customers/photographer_by_category", {
      params: { "search[]": cat },
    });

    console.log("Category response:", response.data); // check structure

    // ✅ fix — response.data.data not response.data
    const normalized = response.data.data.map((p) => ({
      photographer: {
        id: p.id,
        name: p.name,
        avatar_url: p.profile_image_url,
        average_rating: p.average_rating,
        total_reviews: p.total_reviews,
        categories: p.categories,
      }
    }));

    setPhotographers(normalized);
  } catch (err) {
    console.log("Category search error:", err.response?.data);
  }
};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] outline-none focus:ring-0">
      {/* MAP */}
      <div className="w-full h-full p-3 sm:p-5">
        <LoadScript googleMapsApiKey="AIzaSyCmG9us0LQ3K6o7rJjTGHj3Q-kBUcqllX8">
          <GoogleMap
            mapContainerClassName="w-full h-full rounded-xl shadow-lg"
            center={center}
            zoom={6}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* TOP CONTROLS */}
      <div className="flex absolute top-5 sm:top-10 right-4 sm:right-10 space-x-2 sm:space-x-4 z-10">
        <div
          onClick={() => setStep(2)}
          className="px-3 sm:px-6 py-2 sm:py-3 bg-white shadow-md rounded-xl cursor-pointer hover:bg-gray-100"
        >
          <button className="cursor-pointer poppins-regular text-sm sm:text-base whitespace-nowrap">
            Find Photographer
          </button>
        </div>
        <button onClick={goToMyLocation} className="bg-white rounded-full shadow-md p-2 sm:p-3 hover:bg-gray-100">
          <img src={Locationsvg} className="w-5 h-5 sm:w-6 sm:h-6" alt="My Location" />
        </button>
      </div>

      {/* DATE PICKER */}
      <div className="absolute top-16 sm:top-24 right-4 sm:right-10 flex space-x-2 z-10">
        <div className="flex flex-col cursor-pointer">
          <label className="text-xs sm:text-sm font-bold">From</label>
          <Input type="date" value={fromdate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label className="text-xs sm:text-sm font-bold">To</label>
          <Input type="date" value={todate} onChange={(e) => setToDate(e.target.value)} />
        </div>
      </div>

      {/* SIDEBAR OVERLAY */}
      {step === 2 && (
        <div className="absolute right-0 top-0 h-full w-full sm:w-80 md:w-95 bg-white shadow-2xl p-4 sm:p-5 overflow-y-auto z-20">
          <div className="flex justify-end mb-4">
            <button onClick={() => setStep(1)} className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 cursor-pointer">
              <IoClose className="w-5 h-5" />
            </button>
          </div>

          {/* Location input */}
          <div className="relative flex items-center">
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <IoSearch
              className="absolute right-3 text-gray-400 cursor-pointer hover:text-[#2BAFC7]"
              size={20}
              onClick={handleSearch}
            />
          </div>

          <h2 className="text-lg sm:text-xl font-semibold mt-4 mb-1 poppins-semibold">Photographers Lists</h2>
          <p className="text-sm text-gray-500 mb-4 poppins-regular">Find the best photographers in your area</p>

          {/* CATEGORY DROPDOWN */}
          <div ref={dropdownRef} className="relative mb-6 z-30">
            {/* ✅ toggle dropdown on click — NOT handleCategorySearch */}
            <div
              onClick={() => setShowCategories(!showCategories)}
              className="flex justify-between items-center w-full px-4 py-3 bg-gray-100 rounded-xl cursor-pointer select-none poppins-regular text-sm sm:text-base"
            >
              <span>{activeCategory || "Select category"}</span>
              <IoChevronDown className={`transition-transform duration-300 ${showCategories ? "rotate-180" : ""}`} />
            </div>

            {showCategories && (
              <div className="absolute left-0 mt-2 w-full bg-white rounded-xl shadow-xl z-50 overflow-hidden">
                {allCategories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => handleCategorySearch(cat)} // ✅ call API on each item click
                    className={`px-4 py-3 cursor-pointer transition-all text-sm sm:text-base ${
                      activeCategory === cat ? "bg-cyan-500 text-white" : "hover:bg-cyan-100"
                    }`}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CARDS */}
          <div>
            {Loading ? (
              <p className="text-center text-gray-400 poppins-regular text-sm mt-4">Searching...</p>
            ) : photographers.length > 0 ? (
              <PhotographerCard
                photographers={photographers}
                activeCategory={activeCategory}
                variant="primary"
                showButtons={false}
                size="sm"
              />
            ) : (
              <p className="text-center text-gray-400 poppins-regular text-sm mt-4">
                No photographers found. Try searching!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}