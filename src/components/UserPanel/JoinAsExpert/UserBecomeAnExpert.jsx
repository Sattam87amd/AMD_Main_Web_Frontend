'use client'
import React from "react";
import { useRouter } from "next/navigation"



const UserBecomeExpert = () => {

    const router = useRouter(); // Initialize router
    
      const handleJoinClick = () => {
        router.push("/login"); // Redirect to /signup or any desired route
      };
    return (
        <div className="relative md:h-[68rem] min-h-screen md:pt-24 mt-24">
            {/* Background Layout - Custom Split */}
            <div className="absolute inset-0 grid grid-cols-[52%_48%] min-h-screen ">
                <div className="bg-[#F8F7F3] md:h-full h-[60%]">
                    <div className=" mx-1 md:mx-10 md:text-2xl md:mt-32 md:font-semibold  lg:mx-16 mt-7 lg:text-5xl font-semibold lg:tracking-wider lg:mt-4">

                        Become an Expert & <br />
                        Share Your Knowledge
                    </div>
                    <div>
                        <img
                            src="/image1.png"
                            alt="Historic Architecture"
                            className="rounded-lg mt-10  md:w-[95%] md:h-[70%] lg:mt-20 lg:w-[98%] lg:h-[55%] md:mx-6 h-[170px] w-[190px] ml-2 translate-x-2"
                        />
                    </div>
                </div>
                
                <div className="bg-[#EDECE8] md:h-full h-[90%] ">
                    <p className="md:mx-16 lg:mx-44 md:mt-16 md:font-semibold md:text-xl md:tracking-wide text-lg font-medium mx-4 lg:tracking-wider lg:text-2xl ">
                        Offer 1-on-1 virtual <br />
                        consultations, help others,
                        <br />
                        and earn on your terms.
                    </p>

                    <button 
                    onClick={handleJoinClick}
                    className=" md:mx-14 md:mt-10 text-[0.678rem] w-[65%] h-[6%] lg:mx-36 bg-black text-white rounded-full md:w-[17rem] md:px-10 lg:w-[45%] md:h-[5%] mt-4 tracking-wide lg:text-xl md:text-[19px] mx-8">
                        Join as an expert
                    </button>
                    <img
                        src="/image2.png"
                        alt="Historic Architecture"
                        className="rounded-lg md:mx-10 lg:mx-20 md:mt-14 mt-10 md:h-[35%] md:w-[80%] lg:h-[55%] lg:w-[65%]   h-[14rem] w-[10rem] mx-3"
                    />
                </div>
            </div>




        </div>


    );
};

export default UserBecomeExpert;
