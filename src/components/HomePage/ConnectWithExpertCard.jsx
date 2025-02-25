import React from "react";

const ConnectWithExpertCard = () => {
  return (
    <div className="bg-white py-12 px-6">
      {/* Heading */}
      <div className="md:my-3">
      <h1 className="text-center text-3xl md:text-[40px] md:uppercase  font-semibold text-black mb-8">
        Connect with Experts, Anytime, Anywhere
      </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Left Text Section */}
        <div className="md:w-1/2">
          <p className="text-lg text-black text-center leading-relaxed md:hidden">
            Our mission is to connect individuals with top experts across various industries, providing personalized advice and insights to help them achieve their goals.
          </p>
          <p className="hidden md:block text-2xl text-black text-start ml-32 font-[600] leading-relaxed ">
            Our mission is to connect individuals with top <br /> 
            experts across various industries, Providing <br /> 
            personalized advice and insights to help <br /> 
            them achieve their goals.
          </p>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-sm rounded-lg shadow-lg"
            src="/connectwitheexperts.png"
            alt="Connect with Experts"
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectWithExpertCard;