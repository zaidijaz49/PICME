import React, { useState } from "react";
import Uploadicon from "../../assets/uploadicon.svg";
import UploadModal from "../Features/UploadModal";


function UploadBox({ icon, title, handlefile, icon2 = Uploadicon }) {
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (data) => {
    if (handlefile) {
      handlefile(data); // send {category, file} to parent
    }
    setOpenModal(false);
  };
  return (
    <>
      {/* Upload Box */}
      <div
        className="w-full border-2 border-dashed border-cyan-300 rounded-2xl py-16 flex flex-col items-center justify-center text-center bg-[#2BAFC70F] cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        <img src={icon} alt="" className="w-16 h-16 mb-3" />

        <p className="text-cyan-600 font-medium text-lg flex items-center gap-2 poppins-regular">
          <span>
            <img src={icon2} alt="" />
          </span>
          {title}
        </p>
      </div>

      {/* Modal */}
      <UploadModal
        open={openModal}
        closeModal={() => setOpenModal(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default UploadBox;