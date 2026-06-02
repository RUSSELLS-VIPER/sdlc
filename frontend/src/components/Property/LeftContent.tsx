import React from 'react';
import agentprofile from "../../assets/images/property_details/michael.png";

const LeftContent: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    // flex-col এবং gap-6 দিয়ে দুটি কার্ডকে একসাথে বাইন্ড রাখা হয়েছে
    <div className="flex flex-col gap-6"> 
      
      {/* ১ম কার্ড: Contact Agent & View Listing */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-4 mb-5">
          <img
            src={agentprofile}
            alt="Agent Profile"
            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
          />
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Michael Rutter</h3>
            <p className="text-sm text-gray-500">Buying Agent</p>
          </div>
        </div>
        <button
          type="button"
          className="bg-[#171e2e] text-white px-5 py-4 rounded-lg font-semibold text-sm hover:bg-[#facc15] hover:text-[#171E2E] shadow hover:shadow-md transition-all duration-200 w-full flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-phone-volume"></i>
          Contact Agent & View Listing
        </button>
      </div>

      {/* ২য় কার্ড: Contact Property Owner */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 text-lg mb-4">
          Contact Property Owner
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
            />
          </div>
          <div>
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#171e2e] text-white px-5 py-4 rounded-lg font-semibold text-sm hover:bg-[#facc15] hover:text-[#171E2E] shadow hover:shadow-md transition-all duration-200 w-full"
          >
            Submit
          </button>
        </form>
      </div>

    </div>
  );
};

export default LeftContent;
