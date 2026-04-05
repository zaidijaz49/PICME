import React, { useRef } from "react";
import { UploadCloud } from "lucide-react";
import Upload from "../../assets/upload.svg";
import Uploadicon from "../../assets/uploadicon.svg";
function UploadCard({
  title = "Upload ID Card",
  subtitle = "Upload only in png, jpeg.",
  onFileSelect,
}) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full p-8 border-2 border-dashed border-sky-300 rounded-3xl bg-sky-50 flex justify-center items-center transition hover:border-sky-400">
      <div
        onClick={handleClick}
        className="cursor-pointer bg-white rounded-2xl px-14 py-10 flex flex-col items-center justify-center space-y-3 shadow-md hover:shadow-xl transition-all duration-300 w-102 h-44"
      >
        {/* Icon */}
        <div className=" p-4 ">
          <img src={Upload} alt="" />
        </div>

        {/* Title */}
        <p className="text-[#2BAFC7] font-semibold text-lg poppins-medium flex justify-center items-center gap-2">
          <span>
            <img src={Uploadicon} alt="" />
          </span>
          {title}
        </p>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm poppins-regular">{subtitle}</p>

        {/* Hidden input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default UploadCard;
