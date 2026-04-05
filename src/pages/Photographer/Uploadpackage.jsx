import React, { useState } from "react";
import UploadBox from "../../components/Features/Uploadbox";
import { Input } from "../../components/common/Input";
import Button from "../../components/common/Button";
import Plus from "../../assets/plus.svg";
import Checkbox from "../../assets/checkbox.svg";
import Package from "../../components/Features/Package";

function Uploadpackage() {
  // file state
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1);

  // form state (better single object)
  const [formData, setFormData] = useState({
    packageName: "",
    packagePrice: "",
    days: "",
    description: "",
  });

  // handle file
  const handleFile = (file) => {
    setFile(file);
  };

  // handle input change (reusable)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("File:", file);
    console.log("Form Data:", formData);
  };

  return (
    <div>
      {step === 1 && (
        <div className="min-h-screen p-10 bg-white flex flex-col items-center">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="poppins-medium text-3xl">Upload Package</h1>
            <p className="poppins-regular">
              Upload details of your service packages
            </p>
          </div>

          {/* Upload Box */}
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

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-4xl mt-12 space-y-8"
          >
            <h2 className="poppins-medium text-lg">
              Enter Your Package Details
            </h2>

            {/* Inputs → 2 per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Package Name"
                name="packageName"
                value={formData.packageName}
                onChange={handleChange}
              />

              <Input
                placeholder="Package Price"
                name="packagePrice"
                value={formData.packagePrice}
                onChange={handleChange}
              />

              <Input
                placeholder="No of Days"
                name="days"
                value={formData.days}
                onChange={handleChange}
              />

              <Input
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-center">
              <div className="w-80 h-14">
                <Button type="submit" label="SAVE" onClick={() => setStep(2)} />
              </div>
            </div>
          </form>
        </div>
      )}
      {step === 2 && (
        <div className="min-h-screen p-10 bg-white flex flex-col items-center">
          <div className="text-center space-y-5"><h1 className="poppins-medium text-3xl">Upload Package</h1><p className="poppins-regular ">upload details of your service packages</p></div>
          <div className="w-81 h-89 mt-10">
            <Package
              title="Premium"
              price="$30"
              features={["2 days Package", "Up to 8 Photos", "Up to 1 Video"]}
              variant="edit"
            />
          </div>
          <div className="w-80 h-14 mt-10"><Button label="CREATE NEW PACKAGE" varient="secondary" onClick={()=>setStep(1)}/></div>
        </div>
      )}
    </div>
  );
}

export default Uploadpackage;
