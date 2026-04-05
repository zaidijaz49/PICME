function GalleryGrid({ title = "Uploaded Photos", images = [] }) {
  
  // Safety check — if images is null/undefined, show nothing
  if (!images || images.length === 0) {
    return (
      <div className="w-full mt-10">
        <h2 className="text-[#2BAFC7] font-semibold text-lg poppins-medium">{title}</h2>
        <p className="text-gray-400 text-sm mt-4 text-center">No uploads yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#2BAFC7] font-semibold text-lg poppins-medium">{title}</h2>
        <p className="text-[#747688] text-sm cursor-pointer poppins-regular">
          Category Type ▼
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition h-39 w-41"
          >
            <img src={img} alt="" className="w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryGrid;