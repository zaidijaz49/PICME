import { useState } from "react";
import { ChevronDown } from "lucide-react";

import {faqs} from "../../utils/Mock.js"

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#EAFCFF] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12 poppins-medium">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5 ">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white  rounded-xl transition-all duration-300  ${
                openIndex === index
                  ? "bg-white shadow-lg"
                  : "hover:bg-gray-200"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left px-6 py-5 cursor-pointer"
              >
                <span className="text-lg font-medium text-gray-700 poppins-medium ">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`w-5 h-5 text-emerald-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed poppins-regular">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}