import React from "react";
import { Input } from "../common/Input";

function ProfilecreationForm({ formData, handleChange }) {
  return (
    <div className="w-full">
      <form className="space-y-8 w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create Profile
        </h2>
        <p className="poppins-regular text-center">Update your details in the form provided</p>
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            type="text"
          />
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Base Address"
            type="text"
          />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          name="photographerType"
          value={formData.photographerType}
          onChange={handleChange}
          placeholder="Photographer Type"
          type="text"
        />
        </div>
      </form>
    </div>
  );
}

export default ProfilecreationForm;
