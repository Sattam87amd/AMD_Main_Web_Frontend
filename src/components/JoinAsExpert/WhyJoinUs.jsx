import React from "react";

const WhyJoinUs = () => {
  return (
    <section className="bg-white rounded-3xl border border-gray-300 mx-auto max-w-screen-lg w-[90%] md:w-[90%] p-6 md:p-12 shadow-lg transform -translate-y-16 md:mt-10 -mt-20">
      {/* Upper Left Section */}
      <div className="max-w-2xl ">
        <h2 className="text-2xl md:text-3xl font-bold text-[#5A3E1B]">Why Join Us?</h2>
        <p className="text-gray-700 mt-4 font-bold">
          We connect industry professionals with people seeking expert guidance. 
          Whether you're a coach, consultant, or creator, our platform makes it 
          easy to monetize your expertise and expand your reach.
        </p>
      </div>

      {/* Bottom Four Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-16 ">
        {/* Earn on Your Terms */}
        <div className="flex flex-col items-center lg:items-start text-center">
          <img src="/money.png" alt="Earn" className="w-12 h-12 mx-10" />
          <h3 className="font-semibold mt-4 ">Earn on Your Terms</h3>
          <p className="text-gray-600 mt-2 text-sm md:text-left px-10 md-px-1 lg:px-1 lg:mt-8 text-justify">
            Set your own rates and availability, giving you full control over how 
            much you charge and when you work.
          </p>
        </div>

        {/* Seamless Scheduling */}
        <div className="flex flex-col items-center lg:items-start text-center ">
          <img src="/setting.png" alt="Schedule" className="w-12 h-12 mx-12" />
          <h3 className="font-semibold mt-4">Seamless Scheduling</h3>
          <p className="text-gray-600 mt-2 text-sm md:text-left px-10 md-px-1 lg:px-1 lg:mt-8 text-justify">
            Automated calendar sync ensures smooth appointment management and prevents conflicts.
          </p>
        </div>

        {/* Engage with a Global Audience */}
        <div className="flex flex-col items-center lg:items-start text-center">
          <img src="/nethub.png" alt="Global Audience" className="w-12 h-12 mx-12" />
          <h3 className="font-semibold mt-4 text-left  ">Engage with a Global <br/>Audience</h3>
          <p className="text-gray-600 mt-2 text-sm  md:text-left px-10 md-px-1 lg:px-1 text-justify">
            Connect with people worldwide, expanding your influence and impact beyond borders.
          </p>
        </div>

        {/* Hassle-Free Payouts */}
        <div className="flex flex-col items-center lg:items-start text-center">
          <img src="/wallet.png" alt="Payouts" className="w-12 h-12 mx-10" />
          <h3 className="font-semibold mt-4">Hassle-Free Payouts</h3>
          <p className="text-gray-600 mt-2 text-sm md:text-left px-10 md-px-1 lg:px-1 lg:mt-8 text-justify">
            Get paid securely and on time with our streamlined payment system, ensuring a smooth earnings process.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinUs;
