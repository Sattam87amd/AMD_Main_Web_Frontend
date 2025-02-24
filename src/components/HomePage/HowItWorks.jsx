"use client";

import Image from "next/image";

const HowItWorks = () => {
  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-24 p-8 bg-gray-100 justify-center">
      {/* Left Side Cards */}
      <div className="space-y-12 md:space-y-16">
        {/* How It Works Card */}
        <div className="bg-white p-6 md:p-10 shadow-md w-full md:w-[750px] md:min-h-[420px]">
          <h2 className="text-2xl md:text-5xl font-semibold mb-8">How It Works</h2>
          <div className="space-y-8">
            {[
              { number: "1", title: "Browse & Choose", description: "Find an expert based on your needs." },
              { number: "2", title: "Book A Video Call", description: "Pick a time and confirm your session." },
              { number: "3", title: "One on One and Group Session", description: "Join a live video call and gain valuable insights." },
            ].map((step) => (
              <div key={step.number} className="flex items-start gap-6">
                <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg md:text-3xl font-bold">{step.title}</h3>
                  <p className="text-sm md:text-xl text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instant Access to Insights Card */}
        <div className="bg-black text-white p-6 md:p-10 shadow-md w-full md:w-[750px] md:min-h-[420px] flex flex-col items-start">
          <Image src="/instantaccess.png" alt="Instant Access" width={140} height={100} className="mb-8" />
          <h3 className="text-xl md:text-4xl font-light">Instant Access to Insights</h3>
          <p className="text-sm md:text-xl md:my-6 font-thin leading-relaxed">
            Instant Access to Insights ensures users get valuable knowledge in real-time, enabling quick decision-making. This boosts efficiency, enhances learning, and keeps them ahead of the competition.
          </p>
        </div>

        {/* 100% Secure Payments Card */}
        <div className="bg-white p-6 md:p-10 shadow-md w-full md:w-[750px] md:min-h-[420px] flex flex-col items-start">
          <Image src="/secure.png" alt="100% Secure Payments" width={140} height={100} className="mb-8" />
          <h3 className="text-xl md:text-4xl font-light">100% Secure Payments</h3>
          <p className="text-sm md:text-xl text-gray-600 md:my-6 font-thin leading-relaxed">
            100% Secure Payments ensure safe transactions, protecting customer data and preventing fraud. This builds trust, enhances credibility, and provides a worry-free payment experience.
          </p>
        </div>
      </div>

      {/* Right Side Cards */}
      <div className="space-y-12 md:space-y-16 md:mt-44">
        {/* Top Industry Experts Card */}
        <div className="bg-white p-6 md:p-10 shadow-md w-full md:w-[750px] md:min-h-[420px] flex flex-col items-start">
          <Image src="/top.png" alt="Top Industry Experts" width={140} height={100} className="mb-8" />
          <h3 className="text-xl md:text-4xl font-light">Top Industry Experts</h3>
          <p className="text-sm md:text-xl text-gray-600 md:my-6 font-thin leading-relaxed">
            Featuring Top Industry Experts builds trust, credibility, and authority, providing high-quality insights and innovative ideas. This sets you apart from competitors, drives engagement, and fosters valuable connections.
          </p>
        </div>

        {/* Flexible Scheduling Card */}
        <div className="bg-white p-6 md:p-10 shadow-md w-full md:w-[750px] md:min-h-[420px] flex flex-col items-start">
          <Image src="/schedule.png" alt="Flexible Scheduling" width={140} height={100} className="mb-8" />
          <h3 className="text-xl md:text-4xl font-light">Flexible Scheduling</h3>
          <p className="text-sm md:text-xl text-gray-600 md:my-6 font-thin leading-relaxed">
            Flexible Scheduling offers convenience and accessibility, allowing users to book services at their preferred time. This enhances customer satisfaction, boosts engagement, and accommodates diverse needs effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
