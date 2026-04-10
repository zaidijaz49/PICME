import React, { useEffect, useState } from "react";
import UploadBox from "../../components/Features/Uploadbox";
import { Input } from "../../components/common/Input";
import Button from "../../components/common/Button";
import Plus from "../../assets/plus.svg";
import Checkbox from "../../assets/checkbox.svg";
import Package from "../../components/Features/Package";
import api from "../../api/axios";

function Uploadpackage() {
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1);
  const [photographerId, setPhotographerId] = useState(null);
  const [packages, setPackages] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(null); // 👈 track which package is being edited

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    delivery_days: "",
  });

  // ───── fetch packages by photographer id ─────
  const fetchPackages = async (id) => {
    try {
      const packagesResponse = await api.get(`/api/v1/packages`, {
        params: { photographer_id: id },
      });
      setPackages(packagesResponse.data.data || []);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.log(message);
    }
  };

  // ───── Fetch photographer id + packages on mount ─────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get("/api/v1/users/me");
        const id = userResponse.data.user.id;
        setPhotographerId(id);
        await fetchPackages(id);
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        console.log(message);
      }
    };

    fetchData();
  }, []);

  // ───── when user clicks edit on a package ─────
  const handleEditClick = (pkg) => {
    console.log("clicked")
    setSelectedPackageId(pkg.id); // 👈 save package id
    setFormData({                  // 👈 prefill form with existing data
      name: pkg.name,
      price: pkg.price,
      description: pkg.description,
      delivery_days: pkg.delivery_days,
    });
    setStep(2); // 👈 go to form
  };

  // ───── when user clicks CREATE NEW PACKAGE ─────
  const handleCreateClick = () => {
    setSelectedPackageId(null); // 👈 no package selected = create mode
    setFormData({ name: "", price: "", description: "", delivery_days: "" }); // 👈 empty form
    setStep(2);
  };

  const handleFile = (file) => {
    setFile(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ───── form submit — handles both create and update ─────
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("delivery_days", formData.delivery_days);

      if (file) data.append("image", file);

      if (selectedPackageId) {
        // ───── PATCH — update existing package ─────
        await api.patch(`/api/v1/packages/${selectedPackageId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Package updated");
      } else {
        // ───── POST — create new package ─────
        await api.post("/api/v1/packages", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Package created");
      }

      // ───── reset everything after success ─────
      setFormData({ name: "", price: "", description: "", delivery_days: "" });
      setFile(null);
      setSelectedPackageId(null);
      await fetchPackages(photographerId); // 👈 refetch updated list
      setStep(1); // 👈 go back to list

    } catch (error) {
      const message = error.response?.data?.message || error.message;
      alert(message);
    }
  };

  return (
    <div>
      {/* ───── Step 1 — View Packages ───── */}
      {step === 1 && (
        <div className="min-h-screen p-10 bg-white flex flex-col items-center">
          <div className="text-center space-y-5">
            <h1 className="poppins-medium text-3xl">Upload Package</h1>
            <p className="poppins-regular">
              upload details of your service packages
            </p>
          </div>

          {/* ───── No packages — show message ───── */}
          {packages.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 space-y-4">
              <p className="text-gray-400 text-lg poppins-regular">
                You don't have any packages yet.
              </p>
              <p className="text-gray-400 text-sm poppins-regular">
                Please create a package to showcase your services.
              </p>
            </div>
          ) : (
            /* ───── Has packages — show them ───── */
            <div className="w-full max-w-4xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <Package
                  key={pkg.id}
                  title={pkg.name}
                  price={`$${pkg.price}`}
                  features={[
                    pkg.description,
                    `${pkg.delivery_days} days delivery`,
                  ]}
                  variant="edit"
                  onClick={() => handleEditClick(pkg)} // 👈 pass full pkg object
                />
              ))}
            </div>
          )}

          <div className="w-80 h-14 mt-10">
            <Button
              label="CREATE NEW PACKAGE"
              varient="secondary"
              onClick={handleCreateClick} // 👈 resets form and goes to step 2
            />
          </div>
        </div>
      )}

      {/* ───── Step 2 — Create / Edit Package ───── */}
      {step === 2 && (
        <div className="min-h-screen p-10 bg-white flex flex-col items-center">
          <div className="text-center space-y-2">
            {/* ───── title changes based on mode ───── */}
            <h1 className="poppins-medium text-3xl">
              {selectedPackageId ? "Edit Package" : "Create Package"}
            </h1>
            <p className="poppins-regular">
              Upload details of your service packages
            </p>
          </div>

          <div className="w-230 mt-10">
            <UploadBox
              title="Create new package"
              icon={Checkbox}
              icon2={Plus}
              handlefile={handleFile}
            />
            {file && (
              <p className="text-sm text-green-600 text-center font-medium mt-2">
                File selected: {file.name}
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-4xl mt-12 space-y-8"
          >
            <h2 className="poppins-medium text-lg">
              Enter Your Package Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Package Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                placeholder="Package Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              <Input
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <Input
                placeholder="Delivery Days"
                name="delivery_days"
                value={formData.delivery_days}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-center gap-4">
              {/* ───── Back button ───── */}
              <div className="w-40 h-14">
                <Button
                  label="BACK"
                  varient="secondary"
                  onClick={() => setStep(1)}
                />
              </div>
              {/* ───── Save button ───── */}
              <div className="w-40 h-14">
                <Button type="submit" label="SAVE" />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Uploadpackage;