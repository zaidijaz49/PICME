import Button from "../../components/common/Button";
import Illustration from "../../assets/Illustration.png";
import { Link } from "react-router";

const ChooseLocation = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
      <div className="rounded-lg flex flex-col items-center justify-center px-6 sm:px-10 text-center w-full max-w-md shadow-2xl py-10">
        <div>
          <img
            src={Illustration}
            className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
            alt="Illustration"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4 mt-4 poppins-semibold">
          Search Location
        </h2>

        {/* Description */}
        <p className="text-sm mb-8 leading-relaxed poppins-regular">
          Find the best photographers in your area for your next event!
        </p>

        {/* Button */}
        <div className="w-full h-12">
          <Link to="/customerDashboard">
            <Button label="Choose Location" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseLocation;
