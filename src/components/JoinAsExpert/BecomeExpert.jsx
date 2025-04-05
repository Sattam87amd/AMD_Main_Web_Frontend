import Link from "next/link";
import React from "react";

const BecomeExpert = () => {
  return (
    <div className="relative  mt-24  h-[600px] md:h-[120vh] ">
      {/* left side section*/}
      <div className="absolute inset-0 grid grid-cols-[52%_48%] min-h-screen max-w-full  w-full h-full  ">
        <div className="bg-[#F8F7F3] md:h-full">
          <h1 className=" font-medium text-black text-sm md:text-5xl md:ml-20 tracking-wide uppercase md:mt-10 mt-20 ml-3">
            Become an Expert & <br />
            Share Your Knowledge
          </h1>
          <img
            src="/image1.png"
            alt="Historic Architecture"
            className="rounded-lg mt-10 md:mt-20 md:w-[95%] md:h-[55%] md:mx-10 h-[170px] w-[190px] ml-2"
          />
        </div>
   {/* Right side section */}
        <div className="bg-[#EDECE8] md:h-full h-[60rem] ">
          <div className="mx-52 font-semibold text-lg w-40 md:mt-20">
            <p className="font-normal text-[11px] md:font-3xl md:text-[23px]  md:font-semibold leading-tight  md:w-[313] w-32 mt-9 -ml-[11rem] md:-ml-14 lg:-ml-3 text-black md:tracking-wider  ">
              Offer 1-on-1 virtual <br />
              consultations, help others,
              <br />
              and earn on your terms.
            </p>
          </div>
          
          <Link href="/expertlogin">
            <button className=" md:tracking-widest  md:mx-44 mt-6 font-light text-base rounded-full bg-black text-white md:font-medium md:w-[45%] md:h-[60] h-[35px] w-[150px]   mx-5">
              Join as an Expert
            </button>
          </Link>

          <img
            src="/image2.png"
            alt="Historic Architecture"
            className="rounded-lg md:mx-40 md:mt-14 mt-16 md:h-[60%] md:w-[55%] h-[14rem] w-[10rem] mx-3"
          />
        </div>
      </div>
    </div>
  );
};

export default BecomeExpert;
