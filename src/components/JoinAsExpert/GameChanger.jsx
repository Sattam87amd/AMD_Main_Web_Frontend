import React from "react";
import Link from "next/link";

const GameChanger = () => {
  return (
    <div className="relative md:w-full h-[30rem] w-full md:h-[646px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center md:h-full "
        style={{ backgroundImage: "url('/gamechanger.png')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-4 text-center ">
        <h2 className="text-white text-[15px] font-medium  tracking-wider md:text-4xl  md:max-w-3xl md:tracking-normal ">
          “A Game-Changer For Professionals Looking To Connect And Share Knowledge Effortlessly.”
        </h2>
        <Link href="/expertlogin">
  <button className="mt-20 bg-black text-white px-8 py-3 rounded-full md:w-full h-[60px] text-lg hover:bg-opacity-80 transition duration-300">
    Join as an Expert
  </button>
</Link>
      </div>
    </div>
  );
};

export default GameChanger;