import React from "react";

const WhyJoinUs = () => {
  return (
    <section className="bg-white rounded-3xl border border-gray-300 mx-auto max-w-screen-lg w-full p-6 md:p-12 shadow-lg transform -translate-y-16">
      {/* Upper Left Section */}
      <div className="max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-[#5A3E1B]">Why Join Us?</h2>
        <p className="text-gray-700 mt-4 font-bold">
          We connect industry professionals with people seeking expert guidance. 
          Whether you're a coach, consultant, or creator, our platform makes it 
          easy to monetize your expertise and expand your reach.
        </p>
      </div>

      {/* Bottom Four Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {/* Earn on Your Terms */}
        <div className="flex flex-col items-center text-center">
          <img src="/money.png" alt="Earn" className="w-12 h-12" />
          <h3 className="font-semibold mt-4">Earn on Your Terms</h3>
          <p className="text-gray-600 mt-2 text-sm text-left">
            Set your own rates and availability, giving you full control over how 
            much you charge and when you work.
          </p>
        </div>

        {/* Seamless Scheduling */}
        <div className="flex flex-col items-center text-center">
          <img src="/setting.png" alt="Schedule" className="w-12 h-12" />
          <h3 className="font-semibold mt-4">Seamless Scheduling</h3>
          <p className="text-gray-600 mt-2 text-sm text-left">
            Automated calendar sync ensures smooth appointment management and prevents conflicts.
          </p>
        </div>

        {/* Engage with a Global Audience */}
        <div className="flex flex-col items-center text-center">
          <img src="/nethub.png" alt="Global Audience" className="w-12 h-12" />
          <h3 className="font-semibold mt-4">Engage with a Global Audience</h3>
          <p className="text-gray-600 mt-2 text-sm text-left">
            Connect with people worldwide, expanding your influence and impact beyond borders.
          </p>
        </div>

        {/* Hassle-Free Payouts */}
        <div className="flex flex-col items-center text-center">
          <img src="/wallet.png" alt="Payouts" className="w-12 h-12" />
          <h3 className="font-semibold mt-4">Hassle-Free Payouts</h3>
          <p className="text-gray-600 mt-2 text-sm text-left">
            Get paid securely and on time with our streamlined payment system, ensuring a smooth earnings process.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinUs;
