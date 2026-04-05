import React, { useState } from "react";

// List of categories shown in the dropdown
const CATEGORIES = ["birthday", "wedding", "portrait", "landscape", "event", "corporate", "newborn"];

// UploadModal receives 3 props from UploadBox:
// - open: true/false — controls whether the modal is visible
// - closeModal: function — called when user clicks X or Cancel
// - onSubmit: function — called with { category, file } when user clicks Submit
function UploadModal({ open, closeModal, onSubmit }) {
  // Track which category the user picked
  const [category, setCategory] = useState("birthday");

  // Track the file the user selected
  const [selectedFile, setSelectedFile] = useState([]);

  // Track drag-over state for styling the drop zone
  const [isDragging, setIsDragging] = useState(false);

  // If modal is closed, render nothing
  if (!open) return null;

  // Called when user picks a file via the file input or drag & drop
  function handleFileChange(e) {
    const file = e.target.files[0]; // grab the first file
    if (file) setSelectedFile(file);
  }

  // Called when user drops a file onto the drop zone
  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  }

  // Called when user clicks Submit
  // Sends category + file up to the parent via onSubmit prop
  function handleSubmit() {
    if (!selectedFile) return; // do nothing if no file selected
    onSubmit({ category, file: selectedFile }); // send data to parent
    // Reset state for next time
    setSelectedFile(null);
    setCategory("birthday");
  }

  // Called when modal is closed — also resets state
  function handleClose() {
    setSelectedFile(null);
    setCategory("birthday");
    closeModal();
  }

  return (
    /* Dark overlay behind the modal */
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      {/* Modal box */}
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm relative shadow-2xl">

        {/* Close (X) button — top right corner */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full  text-[#2BAFC7] flex items-center justify-center text-sm hover:bg-teal-50 cursor-pointer"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold text-gray-900 mb-2">
          Select Your Photos
        </h2>

        {/* Subtitle */}
        <p className="text-center text-sm text-gray-500 leading-relaxed mb-6">
          Create your profile to showcase stunning photography and attract clients.
        </p>

        {/* Category dropdown */}
        <div className="relative mb-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)} // update category on change
            className="w-full appearance-none px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-800 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:[#2BAFC7]"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {/* Dropdown arrow icon */}
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
            ▼
          </span>
        </div>

        {/* Drag & Drop / Click to upload area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => document.getElementById("file-input").click()} // open file picker on click
          className={`border-2 border-dashed rounded-2xl py-8 px-4 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-[#2BAFC7]"
              : "border-[#2BAFC7]  hover:bg-teal-100"
          }`}
        >
          {/* Hidden file input — triggered by clicking the drop zone */}
          <input
            id="file-input"
            type="file"
            multiple 
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Upload cloud icon */}
          <svg className="mx-auto mb-3" width="56" height="46" viewBox="0 0 56 46" fill="none">
            <path
              d="M41 30c4.97 0 9-4.03 9-9s-4.03-9-9-9c-.34 0-.68.02-1.01.06C38.62 8.2 33.71 5 28 5 20.27 5 14 11.27 14 19c0 .42.02.84.07 1.25C10.08 21.43 7 24.88 7 29c0 5.52 4.48 10 10 10h24V30z"
              stroke="#14b8a6" strokeWidth="2" fill="none"
            />
            <circle cx="28" cy="33" r="9" fill="#2BAFC7" />
            <path d="M28 30v6M25 32.5L28 30l3 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <p className="text-sm font-semibold text-gray-800 mb-1">
            Drag &amp; drop files or{" "}
            <span className="text-[#2BAFC7] underline">Browse</span>
          </p>
          <p className="text-xs text-gray-400">Supported formats: JPEG, PNG</p>
        </div>

        {/* Show selected file name (if any) */}
        {selectedFile && (
          <div className="mt-3 flex items-center justify-between bg-teal-50 rounded-lg px-3 py-2 text-xs text-gray-700">
            <span className="truncate max-w-[85%]">📷 {selectedFile.name}</span>
            <button
              onClick={() => setSelectedFile(null)} // remove selected file
              className="text-gray-400 hover:text-gray-600 cursor-pointer ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Submit button — disabled if no file selected */}
        <button
          onClick={handleSubmit}
          disabled={!selectedFile}
          className={`w-full mt-5 py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide transition-colors ${
            selectedFile
              ? "bg-[#2BAFC7] hover:bg-[#2BAFC7] cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Submit
        </button>

      </div>
    </div>
  );
}

export default UploadModal;