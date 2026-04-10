import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import Image from "../../assets/image.png";
import Video from "../../assets/Video.png";
import GalleryGrid from "../../components/Features/Gallerygrid";
import UploadBox from "../../components/Features/Uploadbox";
import Frame from "../../assets/Frame.svg";
import Uploadicon from "../../assets/uploadicon.svg";
import api from "../../api/axios.jsx";

function Uploadportfolio() {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(1);
  const [file, setFile] = useState();
  const [photos, setphotos] = useState([]);
  const [videos, setvideos] = useState([]);

  // Controls the loading skeleton while fetching photos from API
  const [loading, setLoading] = useState(false);

  // Pulled out into its own function so we can reuse it
  // both in useEffect and after a successful upload
  const getphotographersdata = async () => {
    setLoading(true); // show skeleton
    try {
      const response = await api.get("/api/v1/photographers/work_list");
      const allPhotos = response.data.data[0]?.photos || [];
      const allvideos = response.data.data[0]?.videos || [];
      setphotos(allPhotos);
      setvideos(allvideos);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      alert(message);
    } finally {
      setLoading(false); // hide skeleton whether success or fail
    }
  };

  useEffect(() => {
    getphotographersdata();
  }, []);

  const handlefile = async (data) => {
    const { category, file } = data;
    const isVideo = file.type.startsWith("video/");

    try {
      const formData = new FormData();
      if (isVideo) {
      formData.append("videos[]", file);  // 👈 video upload
    } else {
      formData.append("photos[]", file);  // 👈 photo upload
    }
      formData.append("work_type", category);

      const response = await api.post(
        "/api/v1/photographers/upload_work",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      console.log("Upload success:", response.data);
      setFile(file);

      // Refetch gallery after upload — this also triggers the skeleton again
      await getphotographersdata();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Upload failed";
      console.error("Upload error:", error);
      alert(message);
    }
  };

  const Handlecontinue = () => {
    if (selected === "photos") setStep(2);
    else if (selected === "videos") setStep(3);
  };

  // Skeleton component — animated grey boxes that appear while photos load
  const LoadingSkeleton = () => (
    <div className="w-full mt-10">
      {/* Fake title bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-5 w-36 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-4 w-24 bg-gray-200 rounded-full animate-pulse" />
      </div>
      {/* Fake image grid — 7 grey boxes matching real grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
        {Array(7)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-gray-200 animate-pulse h-28 w-full"
            />
          ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* ───── Step 1 — Choose Photos or Videos ───── */}
      {step === 1 && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-white">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 poppins-medium">
              Upload Your Work
            </h1>
            <p className="text-gray-500 text-base poppins-regular">
              upload your photos and videos to showcase your work
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Photos Card */}
            <div
              className="w-80 h-52 border-2 border-[#2BAFC780] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition relative"
              onClick={() => setSelected("photos")}
            >
              <div className="absolute top-4 right-4">
                {selected === "photos" && (
                  <img src={Frame} className="w-6 h-6" />
                )}
              </div>
              <img src={Image} alt="photos" className="w-16 h-16 mb-4" />
              <p className="text-cyan-600 font-medium text-lg poppins-medium">
                Photos
              </p>
            </div>

            {/* Videos Card */}
            <div
              className="w-80 h-52 border-2 border-[#2BAFC780] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition relative"
              onClick={() => setSelected("videos")}
            >
              <div className="absolute top-4 right-4">
                {selected === "videos" && (
                  <img src={Frame} className="w-6 h-6" />
                )}
              </div>
              <img src={Video} alt="videos" className="w-16 h-16 mb-4" />
              <p className="text-cyan-600 font-medium text-lg poppins-medium">
                Videos
              </p>
            </div>
          </div>

          <div className="w-full max-w-xs">
            <Button label="CONTINUE" onClick={Handlecontinue} />
          </div>
        </div>
      )}

      {/* ───── Step 2 — Upload Photos ───── */}
      {step === 2 && (
        <div className="min-h-screen p-20">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 poppins-medium">
              Upload Photos
            </h1>
            <p className="text-gray-500 text-base poppins-regular">
              upload your professional photos
            </p>
          </div>

          <UploadBox
            icon={Image}
            icon2={Uploadicon}
            title="Upload Photos"
            type="image"
            handlefile={handlefile}
          />

          {file && (
            <p className="text-sm text-green-600 text-center font-medium mt-2">
              ✅ Uploaded: {file.name}
            </p>
          )}

          {/* Show skeleton while loading, real gallery when done */}
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <GalleryGrid title="Uploaded Photos" images={photos} />
          )}
        </div>
      )}

      {/* ───── Step 3 — Upload Videos ───── */}
      {step === 3 && (
        <div className="min-h-screen p-20">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 poppins-medium">
              Upload Videos
            </h1>
            <p className="text-gray-500 text-base poppins-regular">
              upload your professional videos
            </p>
          </div>

          <UploadBox
            icon={Video}
            icon2={Uploadicon}
            title="Upload Videos"
            type="video"
            handlefile={handlefile}
          />

          {file && (
            <p className="text-sm text-green-600 text-center font-medium mt-2">
              ✅ Uploaded: {file.name}
            </p>
          )}

          {/* Show skeleton while loading, real gallery when done */}
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <GalleryGrid title="Uploaded Videos" images={videos} />
          )}
        </div>
      )}
    </div>
  );
}

export default Uploadportfolio;
