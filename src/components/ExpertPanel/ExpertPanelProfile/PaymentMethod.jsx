'use client';

import { useState } from 'react';
import Image from 'next/image';

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState("wallet");

  const handleSelection = (method) => {
    setSelectedMethod(method);
  };

  return (
    <div className="w-full p-4 md:p-6">
      <h2 className="text-2xl font-bold text-black">Payment method</h2>

      {/* Wallet Section - Only show amount when "Wallet" is selected */}
      <div className="w-full md:w-[460px] border border-[#7E7E7E] rounded-xl p-6 mt-4 flex flex-col md:flex-row items-center justify-between bg-white shadow-md">
        <div>
          <Image src="/paymentimg.png" alt="Wallet" width={80} height={60} className="mx-auto md:mx-0"/>
        </div>
        <div className="mt-4 md:mt-0 md:mr-16 text-center">
          <p className="text-lg font-normal">Your Wallet Balance is-</p>
          <p className="text-3xl font-bold text-black mt-2">
            {selectedMethod === "wallet" ? `$1500` : ""}
          </p>
        </div>
      </div>

      {/* Payment Options */}
      <div className="mt-6 grid grid-cols-1  gap-x-6 gap-y-4">
        {/* Wallet Payment */}
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-neutral "
            checked={selectedMethod === "wallet"}
            onChange={() => handleSelection("wallet")}
          />
          <span className="text-sm md:text-lg font-medium">Pay through your Wallet. <a href="#" className="text-blue-500">Add Money to your Wallet</a></span>
        </label>

        {/* PayPal */}
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-neutral"
            checked={selectedMethod === "paypal"}
            onChange={() => handleSelection("paypal")}
          />
          <span className="text-sm md:text-lg font-medium">Paypal</span>
          <Image src="/paypal.png" alt="Paypal" width={30} height={30} />
        </label>

        {/* Credit/Debit Card */}
        <label className="flex flex-col space-y-3 cursor-pointer">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="checkbox checkbox-neutral"
              checked={selectedMethod === "card"}
              onChange={() => handleSelection("card")}
            />
            <span className="text-sm md:text-lg font-medium">Credit or Debit Card</span>
          </div>
          <Image src="/bankcards.png" alt="Bank Cards" width={550} height={5} />
        </label>

        {/* Net Banking */}
        <label className="flex flex-col space-y-3 cursor-pointer">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="checkbox checkbox-neutral"
              checked={selectedMethod === "netbanking"}
              onChange={() => handleSelection("netbanking")}
            />
            <span className="text-sm md:text-lg font-medium">Net Banking</span>
          </div>
          <select className="w-full md:w-48 p-2 border rounded-md bg-gray-100 text-gray-600">
            <option>Select Bank</option>
            <option>HDFC</option>
            <option>ICICI</option>
            <option>SBI</option>
            <option>Axis Bank</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethods;
