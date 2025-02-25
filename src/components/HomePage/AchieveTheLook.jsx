import React from "react";

const AchieveTheLook = () => {
  return (
    <main className="relative md:min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-20">
        {/* Heading */}
        <h1 className="text-center text-black uppercase text-2xl md:text-4xl font-bold mb-10">
          Achieve the look you’ve always dreamed of
        </h1>

        {/* Desktop Section (Visible on md and above) */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Column #1 */}
            <div className="grid gap-4">
              <div className="h-64">
                <img
                  className="w-full h-full object-cover object-top rounded-none shadow"
                  src="./aaliyaabadi.png"
                  alt="Aaliya Abadi"
                />
              </div>
              <div className="h-64">
                <img
                  className="w-full h-full object-cover object-top rounded-none shadow"
                  src="./aishaaziz.png"
                  alt="Aisha Aziz"
                />
              </div>
              <div className="h-64">
                <img
                  className="w-full h-full object-cover object-top rounded-none shadow"
                  src="./jennywilson.png"
                  alt="Jenny Wilson"
                />
              </div>
            </div>

            {/* Column #2 */}
            <div className="grid gap-4">
              <div className="h-48">
                <img
                  className="w-full h-full object-cover object-top rounded-none shadow"
                  src="./guyhawkins.png"
                  alt="Guy Hawkins"
                />
              </div>
              <div className="h-80">
                <img
                  className="w-full h-full object-cover object-top rounded-none shadow"
                  src="./ralphedwards.png"
                  alt="Ralph Edwards"
                />
              </div>
              <div className="h-64">
                <img
                  className="w-full h-full object-cover object-top rounded-none shadow"
                  src="./aaliyaabadi.png"
                  alt="Aaliya Abadi"
                />
              </div>
            </div>

            {/* Column #3 */}
            <div className="grid gap-4">
              <div className="h-80">
                <img
                  className="w-full h-full object-cover object-top rounded-none shadow"
                  src="./aishaaziz.png"
                  alt="Aisha Aziz"
                />
              </div>
              <div className="h-60">
                <img
                  className="w-full h-full object-cover object-top rounded-none shadow"
                  src="./jennywilson.png"
                  alt="Jenny Wilson"
                />
              </div>
              <div className="h-64">
                <img
                  className="w-full h-full object-cover object-top rounded-none shadow"
                  src="./guyhawkins.png"
                  alt="Guy Hawkins"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Section (Visible on default, hidden on md and above) */}
        <div className="block md:hidden">
          <div className="overflow-x-auto whitespace-nowrap space-x-4 flex">
            {/* Images for Mobile Scrolling */}
            {[
              "./aaliyaabadi.png",
              "./aishaaziz.png",
              "./jennywilson.png",
              "./guyhawkins.png",
              "./ralphedwards.png",
            ].map((src, index) => (
              <div key={index} className="h-64 min-w-[200px]">
                <img
                  className="w-full h-full object-cover object-center rounded-none shadow"
                  src={src}
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AchieveTheLook;
