import React from "react";

const GameChanger = () => {
  return (
    <div className="relative w-full h-screen md:h-[646px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center h-full"
        style={{ backgroundImage: "url('/gamechanger.png')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-white text-2xl md:text-4xl lg:text-4xl max-w-3xl ">
          “A Game-Changer For Professionals Looking To Connect And Share Knowledge Effortlessly.”
        </h2>
        <button className="mt-20 bg-black text-white px-6 py-3 rounded-full  w-[25%] text-lg hover:bg-opacity-80 transition duration-300">
          Join as an Expert
        </button>
      </div>
    </div>
  );
};

export default GameChanger;