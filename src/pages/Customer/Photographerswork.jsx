import { useState, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaStar, FaBriefcase, FaBoxOpen } from "react-icons/fa";
import Button from "../../components/common/Button";
import Package from "../../components/Features/Package";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import Avatar from "../../assets/avatar.png";

function Photographerswork() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [photographer, setPhotographer] = useState(null);
  const [work, setWork] = useState([]);
  const [packages, setPackages] = useState([]);
   const [reviews,setReviews] = useState([])
  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const res = await api.get(`/api/v1/photographers/${id}`);
        setPhotographer(res.data.data);
        setWork(res.data.data.work_list);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPackages = async () => {
      try {
        const res = await api.get("/api/v1/packages", {
          params: { photographer_id: id },  // sends ?photographer_id=808
        });
        const rawData = res.data.data;
        // Handle both array and single object response
        setPackages(Array.isArray(rawData) ? rawData : [rawData]);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchReviews = async () => {
  try {
    const res = await api.get("/api/v1/reviews", {
      params: { user_id: id }
    });
    setReviews(res.data.data);
  } catch (err) {
    console.log(err);
  }
};
fetchPhotographer();
fetchPackages();
fetchReviews()
  }, [id]);

  const handleclick = (pkg, assignedVariant) => {
    navigate("/customerDashboard/paymentdetails", {
      state: { package: pkg, variant: assignedVariant,photographerId: id  },
    });
  };

  const navItem =
    "flex items-center gap-2 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full";

  // Cycles through basic → essential → premium for any number of packages
  const variantCycle = ["basic", "essential", "premium"];

  return (
    <div className="w-full min-h-full rounded-2xl shadow-2xl p-4 sm:p-8 md:p-15">
      {/* Photographer Info */}
      {photographer ? (
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-cyan-400">
            <img
              src={photographer.profile_image_url || Avatar}
              alt={photographer.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-bold poppins-semibold">
            {photographer.name}
          </h2>
          <p className="text-gray-500 poppins-regular text-sm">
            {(photographer.categories && photographer.categories[0]) ||
              "No category"}
          </p>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`w-4 h-4 ${i < Math.round(photographer.average_rating) ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-sm text-gray-500 poppins-regular ml-1">
              {photographer.average_rating} ({photographer.total_reviews} reviews)
            </span>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400 poppins-regular mb-6">
          Loading...
        </p>
      )}

      {/* Portfolio / Package Buttons */}
      <div className="flex justify-center space-x-2.5 items-center mt-4">
        <div className="w-32 sm:w-38">
          <Button
            label="Portfolio"
            Icon={FaBriefcase}
            varient={step !== 5 ? "primary" : "secondary"}
            onClick={() => setStep(1)}
          />
        </div>
        <div className="w-32 sm:w-38">
          <Button
            label="Package"
            varient={step === 5 ? "primary" : "secondary"}
            Icon={FaBoxOpen}
            onClick={() => setStep(5)}
          />
        </div>
      </div>

      <div>
        {/* Nav tabs */}
        {step !== 5 && (
          <div className="flex w-full flex-col sm:flex-row justify-between p-4 gap-3 sm:gap-0">
            <div className="flex gap-4 sm:gap-10 flex-wrap">
              <h1
                className={`${navItem} poppins-regular text-sm sm:text-base`}
                onClick={() => setStep(1)}
              >
                PHOTOS <IoChevronDown />
              </h1>
              <h1
                className={`${navItem} poppins-regular text-sm sm:text-base`}
                onClick={() => setStep(2)}
              >
                VIDEOS <IoChevronDown />
              </h1>
              <h1
                className={`${navItem} poppins-regular text-sm sm:text-base`}
                onClick={() => setStep(3)}
              >
                REVIEWS
              </h1>
            </div>
          </div>
        )}

        {/* Photos */}
        {step === 1 && (
          <div className="flex flex-wrap gap-4 sm:gap-10 p-4">
            {work.flatMap((w) => w.photos).length > 0 ? (
              work
                .flatMap((w) => w.photos)
                .map((photo, i) => (
                  <img
                    key={i}
                    src={photo}
                    alt="work"
                    className="w-24 h-24 sm:w-32 sm:h-32 border-2 object-cover rounded-2xl"
                  />
                ))
            ) : (
              <p className="text-gray-400 poppins-regular text-sm">
                No photos available.
              </p>
            )}
          </div>
        )}

        {/* Videos */}
        {step === 2 && (
          <div className="flex flex-wrap gap-4 sm:gap-10 p-4">
            {work.flatMap((w) => w.videos).length > 0 ? (
              work
                .flatMap((w) => w.videos)
                .map((video, i) => (
                  <video
                    key={i}
                    src={video}
                    controls
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover"
                  />
                ))
            ) : (
              <p className="text-gray-400 poppins-regular text-sm">
                No videos available.
              </p>
            )}
          </div>
        )}

        {/* Reviews */}
      {step === 3 && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 sm:p-6">
    {reviews.length === 0 ? (
      <p className="text-gray-400 poppins-regular text-sm">No reviews yet.</p>
    ) : (
      reviews.map((review) => (
        <div key={review.id} className="p-4 rounded-lg shadow-sm w-full h-full">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <img
                src={review.reviewer.profile_image_url || Avatar}
                alt={review.reviewer.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold poppins-medium text-sm">
                {review.reviewer.name}
              </span>
            </div>
            <span className="text-xs text-gray-500 poppins-regular">
              {review.created_at.split("T")[0]}
            </span>
          </div>
          <div className="flex mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={`h-4 w-4 ${index < review.rating ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <p className="text-gray-700 poppins-regular text-sm">
            {review.comment}
          </p>
        </div>
      ))
    )}
  </div>
)}

        {/* Packages — dynamically rendered from API */}
        {step === 5 && (
          <div>
            <div className="flex w-full justify-between p-4 sm:pl-10">
              <h1 className="poppins-medium text-[#2BAFC7] border-b-2 border-[#2BAFC7] pb-2 w-fit text-sm sm:text-base">
                CHOOSE PACKAGE
              </h1>
            </div>

            {packages.length === 0 ? (
              <p className="text-gray-400 poppins-regular text-sm p-4 sm:pl-10">
                No packages available.
              </p>
            ) : (
              <div className="flex flex-col sm:flex-row flex-wrap w-full p-4 sm:pl-10 gap-6 sm:gap-10 items-center sm:items-start">
                {packages.map((pkg, index) => {
                  // Cycle through variants: basic → essential → premium
                  const assignedVariant = variantCycle[index % variantCycle.length];

                  // Build features list from API fields
                  const features = [
                    pkg.delivery_days ? `${pkg.delivery_days} days delivery` : null,
                    pkg.number_of_tickets ? `${pkg.number_of_tickets} ticket` : null,
                    pkg.description ? pkg.description : null,
                  ].filter(Boolean); // removes any null values
                    console.log(features)
                  return (
                    <div
                      key={pkg._id || pkg.id || index}
                      className="w-full sm:w-72 md:w-81 h-auto"
                    >
                      <Package
                        title={pkg.name || pkg.title}
                        price={`${pkg.symbol || "$"}${pkg.price}`}
                        features={features}
                        variant={assignedVariant}
                        label="CONTINUE"
                        varient="simple"
                        onClick={() => handleclick(pkg, assignedVariant)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Photographerswork;