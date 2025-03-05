import Image from "next/image";

const ConnectMyCalendar = () => {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-4">
      {/* Header Section */}
      <div className="text-start mb-6 w-full">
        <h2 className="text-xl md:text-2xl font-semibold">Connect my calendar</h2>
        <p className="text-gray-600 text-sm md:text-base pt-2 font-semibold">
          Connect your primary calendar to AMD to avoid scheduling conflicts and <br className="hidden md:block" />
          manually updating multiple calendars.
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-[#F7F7F7] rounded-2xl mt-6 md:mt-14 md:ml-10 p-4 py-8 flex flex-row items-center gap-4 w-full max-w-md md:max-w-lg shadow-md">
        {/* Google Calendar Icon */}
        <div className="w-10 md:w-16 h-10 md:h-16 relative">
          <Image
            src="/googlecalendar.png" // Ensure this image is in the public folder
            alt="Google Calendar"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-black font-semibold">
            Google <br className="hidden md:block" /> Calendar
          </p>
        </div>

        {/* Connect Button */}
        <button className="bg-black text-white text-sm  px-10 md:px-20 py-2 md:py-3 md:mr-10 rounded-lg w-auto">
          Connect
        </button>
      </div>
    </div>
  );
};

export default ConnectMyCalendar;
