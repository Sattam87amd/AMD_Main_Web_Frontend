import React from "react";

const BecomeExpert = () => {
  return (
    <div className="relative min-h-screen md:pt-24 mt-24 overflow-hidden h-screen lg:h-[120vh]">
    {/* Background Layout - Custom Split */}
    <div className="absolute inset-0 grid grid-cols-[52%_48%] min-h-screen h-full">
      <div className="bg-[#F8F7F3] h-full">
      <h1 className=" font-medium text-black  text-5xl ml-20">
          
        Become an Expert & <br/>Share Your Knowledge
        </h1>
        <img
          src="/image1.png"
          alt="Historic Architecture"
          className="rounded-lg mt-20 w-[95%] h-[55%] mx-10"
        />
        </div>
     
      <div className="bg-[#EDECE8] h-full">
      <div className="mt-10 mx-72 font-semibold text-lg w-40 ">
       <p className="font-bold font-xl w-[313]">
        Offer 1-on-1 virtual  <br/>consultations, help others,<br/>and earn on your terms.
        </p> 
        </div>
        <button className="mx-60 rounded-full bg-black text-white w-[50%] h-[63]">Join as an Expert</button>

        <img
          src="/image2.png"
          alt="Historic Architecture"
          className="rounded-lg  mx-56 mt-10"
        />
      </div>
    </div>

    
   
    
</div> 
  );
};

export default BecomeExpert;
