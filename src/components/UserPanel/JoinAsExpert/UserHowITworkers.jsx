"use client";

import Image from "next/image";

const UserHowItWorks = () => {
    return (
        <div className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-16 p-6 bg-[#EDECE8] justify-center">
            {/* Left Side Cards */}
            <div className="space-y-8 md:space-y-12">
                {/* How It Works Card */}
                <div className="bg-[#F8F7F3] p-4 md:p-8 shadow-md w-full md:w-[600px] md:min-h-[360px] overflow-hidden ">
                    <h2 className="text-2xl md:text-4xl font-semibold mb-6">How It Works</h2>
                    <div className="space-y-6">
                        {[
                            { number: "1", title: "Browse & Choose", description: "Find an expert based on your needs." },
                            { number: "2", title: "Book A Video Call", description: "Pick a time and confirm your session." },
                            { number: "3", title: "One on One and Group Session", description: "Join a live video call and gain valuable insights." },
                        ].map((step) => (
                            <div key={step.number} className="flex items-start gap-4">
                                <div className="bg-black text-white rounded-l-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                                    {step.number}
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-2xl font-bold">{step.title}</h3>
                                    <p className="text-sm md:text-sm font-semibold text-black">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
      
                {/* profile Card */}
                 <div className="bg-black text-white p-4 md:p-8 shadow-md w-full md:w-[600px] md:min-h-[360px] overflow-hidden ">
                          <Image src="/girlimage.png" alt="Instant Access" width={100} height={80} className="mb-6" />
                          <h3 className="text-xl md:text-3xl font-bold">Create Your profile</h3>
                          <p className="text-sm md:text-lg mt-4 leading-relaxed">
                          Upload a professional photo, write a compelling bio highlighting your expertise, and set your session price to showcase your value to potential clients.
                          </p>
                        </div>

                 {/* Share Your Booking Link Card */}
                        <div className="bg-white p-4 md:p-8 shadow-md w-full md:w-[600px] md:min-h-[360px] overflow-hidden ">
                          <Image src="/phone.png" alt="100% Secure Payments" width={100} height={80} className="mb-6" />
                          <h3 className="text-xl md:text-3xl font-bold">Share Your Booking Link</h3>
                          <p className="text-sm md:text-lg text-gray-600 mt-4 leading-relaxed">
                          Maximize your reach by promoting your personalized booking page across social media, websites, email newsletters, and professional networks to attract more clients.
                          </p>
                        </div>
            </div>

            {/* Right Side Cards */}
            <div className="space-y-8 md:space-y-12 md:mt-60">
                 {/* Set Your Schedule Card */}
                        <div className="bg-white p-4 md:p-8 shadow-md w-full md:w-[600px] md:min-h-[360px] overflow-hidden">
                          <Image src="/book.png" alt="Top Industry Experts" width={100} height={80} className="mb-6" />
                          <h3 className="text-xl md:text-3xl font-bold">Set Your Schedule</h3>
                          <p className="text-sm md:text-lg text-gray-600 mt-4 leading-relaxed">
                          Customize your availability by selecting preferred time slots that fit your routine, ensuring a seamless balance between work and flexibility.
                          </p>
                        </div>

                {/* connect via call Card */}
                       <div className="bg-white p-4 md:p-8 shadow-md w-full md:w-[600px] md:min-h-[360px] overflow-hidden">
                         <Image src="/study.png" alt="Flexible Scheduling" width={100} height={80} className="mb-6" />
                         <h3 className="text-xl md:text-3xl font-bold">Connect Via Video Calls</h3>
                         <p className="text-sm md:text-lg text-gray-600 mt-4 leading-relaxed">
                         Host high-quality video consultations in a seamless and interactive environment, providing expert guidance while delivering real value to your audience.
                         </p>
                       </div>
            </div>
        </div>
    );
};

export default UserHowItWorks;
