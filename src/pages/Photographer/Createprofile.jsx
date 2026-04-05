import Button from "../../components/common/Button";
import Group from "../../assets/group.png";
import { useState, useEffect } from "react";
import ProfilecreationForm from "../../components/Features/ProfilecreationForm";
import UploadCard from "../../components/Features/Uploadcard";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Createprofile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    gender: "",
    latitude: "",
    longitude: "",
    categories: [],
  });

  // Get user's GPS location when page loads
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => {
        console.log("Location error:", error);
      }
    );
  }, []);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFile = (selectedFile) => {
    setFile(selectedFile);
    console.log("Selected file:", selectedFile);
  };

  // Handle categories (array)
  const handleCategoryChange = (selectedCategories) => {
    setFormData((prev) => ({ ...prev, categories: selectedCategories }));
  };

  // Submit form to API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // text fields
      data.append("name", formData.name);
      data.append("address", formData.address);
      data.append("gender", formData.gender);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);

      // categories — send each one as category[]
      formData.categories.forEach((cat) => {
        data.append("category[]", cat);
      });

      // document file
      if (file) {
        data.append("document_pictures[]", file);
      }

      const res = await api.post("/api/v1/photographers/create_profile", data);

      if (res.data.success) {
        alert("Profile created successfully!");
        navigate("/photographerdashboard");
      }
    } catch (err) {
      console.log(err);
      const message = err.response?.data?.message || "Something went wrong.";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">

      {/* STEP 1 — Welcome screen */}
      {step === 1 && (
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center text-center space-y-6">
          <img src={Group} className="w-40 object-contain" />
          <h2 className="text-2xl font-bold text-gray-800 poppins-medium">
            Create Profile
          </h2>
          <p className="text-gray-500 leading-relaxed poppins-regular">
            Create your profile to showcase stunning <br />
            photography and attract clients
          </p>
          <div className="w-full">
            <Button label="Create profile" onClick={() => setStep(2)} />
          </div>
        </div>
      )}

      {/* STEP 2 — Form */}
      {step === 2 && (
        <div className="w-full max-w-5xl p-10 space-y-10">

          {/* Profile form */}
          <ProfilecreationForm
            formData={formData}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
          />

          {/* Upload ID card */}
          <div className="space-y-4">
            <UploadCard
              title="Upload ID Card"
              subtitle="Upload only in png, jpeg."
              onFileSelect={handleFile}
            />
            {file && (
              <p className="text-sm text-green-600 text-center font-medium">
                File selected: {file.name}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="pt-4 flex justify-center">
            <div className="w-full h-13 md:w-1/3">
              <Button type="submit" label="Submit" onClick={handleSubmit} />
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default Createprofile;