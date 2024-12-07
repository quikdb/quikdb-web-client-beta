'use client';
import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { DatabaseVersion } from '@/@types';

const Checkout = () => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [plan, setPlan] = useState<DatabaseVersion | null>(null);
  const [amount, setAmount] = useState(0);

  const onSelectPlan = (planType: DatabaseVersion) => {
    setPlan(planType);
    setAmount(planType === DatabaseVersion.FREE ? 9.99 : 19.99); // Set amount based on plan
  };

  const onCreateOrder = async (data: any) => {
    const response = await fetch('/api/create-paypal-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const result = await response.json();

    if (response.ok) {
      return result.orderID; // Return PayPal Order ID
    } else {
      alert('Error creating PayPal order');
      throw new Error(result.error || 'Error creating order');
    }
  };

  const onApproveOrder = async (data: any) => {
    const response = await fetch('/api/capture-paypal-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ OrderID: data.orderID }),
    });
    const result = await response.json();

    if (response.ok) {
      alert('Payment successful!');
    } else {
      alert('Error capturing payment');
      console.error(result.error || 'Error capturing order');
    }
  };

  return (
    <div className="bg-white max-w-3xl mx-auto p-8 rounded-xl shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="text-base text-gray-600 mt-2">Select the plan that suits your needs</p>
      </div>

      <div className="mt-6 space-y-4">
        <button
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          onClick={() => onSelectPlan(DatabaseVersion.PREMIUM)}
        >
          Premium - $9.99
        </button>
        <button
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          onClick={() => onSelectPlan(DatabaseVersion.PROFESSIONAL)}
        >
          Professional - $19.99
        </button>
      </div>

      {plan && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {plan} Plan - ${amount}
          </h2>

          {isPending ? (
            <p className="mt-4 text-gray-500">Loading PayPal Buttons...</p>
          ) : (
            <PayPalButtons
              style={{
                layout: 'vertical',
                color: 'gold',
                shape: 'pill',
                label: 'paypal',
              }}
              createOrder={(data, actions) => onCreateOrder(data)}
              onApprove={(data, actions) => onApproveOrder(data)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Checkout;
