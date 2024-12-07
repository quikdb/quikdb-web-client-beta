'use client';
import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
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
    <div>
      <h1>Choose Your Plan</h1>
      <button onClick={() => onSelectPlan(DatabaseVersion.PREMIUM)}>Premium - $9.99</button>
      <button onClick={() => onSelectPlan(DatabaseVersion.PROFESSIONAL)}>Professional - $19.99</button>

      {plan && (
        <div>
          <h2>{plan} Plan - ${amount}</h2>
          {isPending ? (
            <p>Loading PayPal Buttons...</p>
          ) : (
            <PayPalButtons
              style={{ layout: "vertical" }}
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
