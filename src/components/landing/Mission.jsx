import React from "react";
import Img1 from "../../assets/mission1.png";
import Img2 from "../../assets/mission2.png";
import Img3 from "../../assets/mission3.png";
import Img4 from "../../assets/mission4.png";

function Mission() {
  return (
    <section className="bg-[#F7F7F7] py-12 md:py-20 px-4 sm:px-8 md:px-16">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">

        {/* Top Section — Text left, Image right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 poppins-medium">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed poppins-regular text-[15px] sm:text-[16px]">
              The picme app is a dynamic platform that bridges creativity with
              opportunity, convenience, and global accessibility. Designed with
              both photographers and customers in mind, picme fosters a vibrant
              community where photographers can showcase their portfolios, set
              their own pricing, and open up their services to clients across
              the world. Whether you're a vacationer capturing memories, a bride
              planning a destination wedding, a model expanding your portfolio,
              or simply someone looking to commemorate a special moment, picme
              makes it easy to find and book talented photographers wherever you
              go.
            </p>
          </div>
          <div>
            <img
              src={Img1}
              alt="Mission"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Middle Section — Image left, Text right (image moves below on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* On mobile: text first, image second via order utilities */}
          <div className="order-2 md:order-1">
            <img
              src={Img2}
              alt="Photographers"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-gray-600 leading-relaxed poppins-regular text-[15px] sm:text-[16px]">
              For photographers, picme is more than just a booking app—it's a
              powerful tool to showcase your unique style, attract clients, and
              build a global presence. With our intuitive project management
              features, photographers can effortlessly manage their schedules,
              customize pricing and offerings, and communicate directly with
              clients to ensure a smooth, collaborative experience. We empower
              photographers to turn their passion into a sustainable career by
              reaching a wider audience, gaining visibility, and accessing new
              markets previously out of reach.
            </p>
          </div>
        </div>

        {/* Bottom Section — Text left, Image right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div>
            <p className="text-gray-600 leading-relaxed poppins-regular text-[15px] sm:text-[16px]">
              As a customer, you can explore a world of photography styles at
              your fingertips, browse portfolios, view ratings, and select the
              photographer that best aligns with your vision. At picme, we're
              committed to connecting and inspiring visual storytelling. By
              making exceptional photography accessible to everyone, we hope to
              foster connections, enhance experiences, and celebrate life's most
              cherished moments.
            </p>
          </div>
          <div>
            <img
              src={Img3}
              alt="Customer Experience"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Last Section — Image left, Text right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div className="order-2 md:order-1">
            <img
              src={Img4}
              alt="Community"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-gray-600 leading-relaxed poppins-regular text-[15px] sm:text-[16px]">
              At PicME, we're committed to connecting and inspiring visual
              storytelling. By making exceptional photography accessible to
              everyone, we hope to foster connections, enhance experiences, and
              celebrate life's most cherished moments. With PicME, finding and
              booking top-rated photographers has never been easier, whether
              you're home or halfway across the world. Join our community today
              and be a part of a global network that celebrates creativity,
              connection, and unforgettable memories.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Mission;