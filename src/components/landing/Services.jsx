import React from "react";
import Phone1 from "../../assets/phone1.png"; // first phone image
import Phone2 from "../../assets/phone2.png"; // second phone image
import Pointer from "../../assets/pointer.svg";

function Services() {
  return (
    <div className="w-full py-10 min-h-screen">
      {/* ===== SECTION 1 ===== */}
      <div className="flex items-center justify-between  bg-[#CFF8FF] min-h-screen">
        {/* LEFT IMAGE */}
        <div className="w-1/2 flex justify-center">
          <img
            src={Phone2}
            alt="Photographers List"
            className="max-w-md w-full object-contain"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-1/2 space-y-6">
          <h2 className="text-3xl poppins-semibold">
            Book professional photographers
          </h2>

          <div className="space-y-6 text-gray-600">
            {/* ITEM 1 */}
            <div className="flex items-start gap-3">
              <img src={Pointer} alt="" className="w-6 mt-1" />

              <div>
                <h1 className="poppins-medium text-[20px] text-black">
                  Book professional photographers effortlessly
                </h1>

                <p className="poppins-regular leading-7 pt-2">
                  whether you're at home, exploring a new city, or planning an
                  event at a distant destination. With PicME, you can view
                  photographers available in real time wherever you are, so you
                  never miss capturing those spontaneous moments.
                </p>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="flex items-start gap-3">
              <img src={Pointer} alt="" className="w-6 mt-1" />

              <div>
                <h1 className="poppins-medium text-[20px] text-black">
                  Planning ahead? Check the availability of top-rated
                  photographers
                </h1>

                <p className="poppins-regular leading-7 pt-2">
                  photographers in any location worldwide and schedule shoots
                  for future dates, ensuring your important occasions—vacations,
                  weddings, or corporate events—are beautifully documented.
                  PicME’s platform makes finding the perfect photographer as
                  easy as browsing through portfolios, viewing ratings, and
                  selecting a time that works for you. Whether it’s a casual
                  shoot or a high-profile event, PicME connects you with trusted
                  professionals, anytime and anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SECTION 2 ===== */}
      <div className="flex items-center justify-between px-10 bg-white min-h-screen">
        {/* LEFT CONTENT */}
        <div className="w-1/2 space-y-6">
          <h2 className="text-3xl poppins-semibold">
         Photographers with Picme
          </h2>

          <div className="space-y-6 text-gray-600">
            {/* ITEM 1 */}
            <div className="flex items-start gap-3">
              <img src={Pointer} alt="" className="w-6 mt-1" />

              <div>
                <h1 className="poppins-medium text-[20px] text-black">
                  managing all of your bookings
                </h1>

                <p className="poppins-regular leading-7 pt-2">
                  With PicME, managing all of your bookings has never been
                  easier. Our platform allows you to keep track of all client
                  appointments, scheduling, and location preferences—all in one
                  place. You can view and manage your entire booking calendar
                  from a single, streamlined interface, ensuring you’re always
                  up-to-date with upcoming commitments.
                </p>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="flex items-start gap-3">
              <img src={Pointer} alt="" className="w-6 mt-1" />

              <div>
                <h1 className="poppins-medium text-[20px] text-black">
                  As your availability changes, easily update the services
                </h1>

                <p className="poppins-regular leading-7 pt-2">
                  you offer to reflect when and where you’ll be working. PicME
                  gives you the flexibility to open your calendar based on
                  specific dates and locations, allowing you to plan and accept
                  bookings for areas you’ll be visiting in the coming days,
                  weeks, or even months. Whether you’re local or traveling, make
                  it easy for clients to book your services in advance, knowing
                  you’ll be in their area. By managing your availability and
                  bookings seamlessly, you’ll be able to maximize your time,
                  reach new clients, and keep your schedule organized no matter
                  where your work takes you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-1/2 flex justify-center">
          <img
            src={Phone1}
            alt="Photographer Dashboard"
            className="max-w-md w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Services;
