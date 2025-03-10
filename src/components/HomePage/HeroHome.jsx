"use client";

import Image from "next/image";
import Link from "next/link";

function HeroHome() {
  return (
    <div>
      <section className="bg-[#F8F7F3] w-full h-screen grid md:grid-cols-[52%_48%] md:mt-0">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center md:items-start p-6 md:p-8 w-full">
          <h1 className="text-xl md:text-4xl uppercase font-extrabold md:font-semibold text-black text-center md:text-left mb-6">
            <span>
              Personalized Guidance from <br />{" "}
            </span>
            <span className="md:my-3 my-2 block">
              {" "}
              Industry Experts – Anytime, <br />{" "}
            </span>
            <span>Anywhere!</span>
          </h1>

          <Link href="/experts">
            <button className="bg-black text-white text-[15px] py-4 px-8 my-4 md:my-10 md:ml-28 rounded-2xl uppercase">
              Find Your Expert
            </button>
          </Link>

          <h3 className="hidden md:block text-black font-semibold text-2xl text-center md:ml-16 md:mt-3 uppercase">
            Trusted by 100+ companies
          </h3>
        </div>

        {/* Right Section */}
        <div className="bg-[#EDECE8] relative flex justify-center items-end p-6 md:p-8 w-full h-full">
          <div className="absolute bottom-0 w-full flex justify-center">
            <Image
              src="/home_hero_arab_img.png"
              alt="Industry Expert"
              width={450}
              height={400}
              className="object-contain md:w-[560px]"
              priority
            />
          </div>
        </div>
      </section>

      {/* Supported By Section */}
      <section className="bg-white py-10 md:py-20">
        <div className="text-center">
          <h2 className="text-xl md:text-3xl font-semibold md:font-bold uppercase">
            Supported by
          </h2>
        </div>
      </section>
    </div>
  );
}

export default HeroHome;
