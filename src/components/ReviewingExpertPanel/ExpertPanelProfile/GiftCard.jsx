import { useState } from "react";
import { Gift } from "lucide-react";

function GiftCard({ onContinue }) {
  const amounts = [200, 500, 750, 1000];
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  return (
    <div className="flex justify-center items-center">
      <div className="w-full bg-white p-6 rounded-xl border">
        {/* Icon and Heading */}
        <div className="flex flex-col items-center space-y-2 mb-12">
          <Gift
            strokeWidth={0.9}
            className="w-10 h-10 md:w-14 md:h-14 text-black"
          />
          <h2 className="text-lg font-semibold">Send a gift card</h2>
          <p className="text-[#3B9AB8] cursor-pointer text-sm md:text-xl">
            Gift a session to a friend, family, or coworker
          </p>
        </div>

        {/* Amount Selection */}
        <div className="mt-5">
          <h3 className="text-lg md:text-xl font-semibold">Buy a giftcard</h3>
          <p className="text-black text-sm md:text-lg mb-6">
            Please select an amount
          </p>

          <div className="grid grid-cols-3 gap-3 md:grid-cols-5 mt-4 mb-9">
            {amounts.map((amount) => (
              <button
                key={amount}
                className={`p-3 text-center font-semibold transition-all ${
                  selectedAmount === amount
                    ? "bg-black text-white"
                    : "bg-[#D9D9D9] text-black"
                }`}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount("");
                }}
              >
                ${amount}
              </button>
            ))}

            {/* Custom Input */}
            <input
              type="number"
              className="p-3 border border-gray-400 text-center w-full focus:outline-none"
              placeholder="$Custom"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
            />
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-6 flex justify-center pb-8">
          <button
            className="w-56 bg-black text-white py-3 rounded-2xl font-normal disabled:opacity-50"
            disabled={!selectedAmount && !customAmount}
            onClick={onContinue} // Switches to BuyGiftCard
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default GiftCard;
