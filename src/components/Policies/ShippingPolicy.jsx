import React from 'react';

export default function ShippingPolicy() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 md:mt-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 md:p-10">
        <h1 className="text-4xl font-bold text-center mb-6" style={{ color: '#106EB5' }}>
          Shipping and Delivery Policy
        </h1>
        <div className="space-y-6 text-gray-700 text-lg">
          <p>
            At <strong>AMD</strong>, we ensure a seamless shipping and delivery process for any physical materials or certificates (if applicable). Our shipping policy is as follows:
          </p>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <strong>Shipping Timeline:</strong>
              <p>Materials will be shipped within <strong>7-10 business days</strong> after order confirmation.</p>
            </li>
            <li>
              <strong>Shipping Costs:</strong>
              <p>Any applicable shipping charges will be displayed at the time of checkout.</p>
            </li>
            <li>
              <strong>Delivery Timelines:</strong>
              <p>Delivery times vary depending on your location and the courier services available.</p>
            </li>
            <li>
              <strong>Tracking Information:</strong>
              <p>Tracking details will be provided once your order is shipped for your convenience.</p>
            </li>
          </ol>
          <p>
            For any shipping or delivery-related concerns, please contact us at&nbsp;
            <a href="mailto:nexcorealliance@gmail.com" className="text-blue-500 hover:underline">
              nexcorealliance@gmail.com
            </a>. We’re here to assist you.
          </p>
        </div>
      </div>
    </div>
  );
}