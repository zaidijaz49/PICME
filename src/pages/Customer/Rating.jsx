import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Button from "../../components/common/Button";
import { Link } from "react-router";
function Rating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleSendReview = () => {
    console.log("Rating:", rating);
    console.log("Feedback:", feedback);
    alert(`Rating: ${rating}\nFeedback: ${feedback}`);
    setRating(0);
    setFeedback("");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg mt-30">
      <h2 className="text-2xl font-semibold text-center mb-4 poppins-medium">
        What is Your Rating?
      </h2>

      {/* Stars */}
      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          >
            <FaStar
              size={32}
              className={`mr-1 cursor-pointer ${
                (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      <p className="text-center text-gray-600 mb-4 poppins-regular">
        Please share your feedback about the photographer
      </p>

      {/* Feedback Textarea */}
      <textarea
        className="w-full p-3 mb-4 rounded-lg border border-gray-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 poppins-regular"
        rows={4}
        placeholder="He is super good in photography........."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      ></textarea>

      {/* Send Button */}
      <div>
       <Link to="/auth/signin"> <Button label="Send Review" onClick={handleSendReview} /></Link>
      </div>
    </div>
  );
}

export default Rating;
