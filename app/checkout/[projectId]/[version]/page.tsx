'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { DatabaseVersion } from '@/@types';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const Checkout = () => {
  const router = useRouter();
  const params = useParams();

  const projectId = params.projectId as string;
  const version = params.version as string;

  const [{ isPending }] = usePayPalScriptReducer();

  const [plan, setPlan] = useState<DatabaseVersion | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const orderIDRef = useRef<string>('');

  useEffect(() => {
    if (version === DatabaseVersion.PREMIUM) {
      setPlan(DatabaseVersion.PREMIUM);
      setAmount(10);
    } else if (version === DatabaseVersion.PROFESSIONAL) {
      setPlan(DatabaseVersion.PROFESSIONAL);
      setAmount(50);
    } else {
      setPlan(null);
      setAmount(0);
    }
  }, [version]);

  const onCreateOrder = async (data: any) => {
    const response = await fetch('/api/create-paypal-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, databaseVersion: plan, projectId }),
    });
    const result = await response.json();

    if (response.ok) {
      orderIDRef.current = result.data.id;
      return result.data.id;
    } else {
      toast.success('Error creating PayPal order');
      throw new Error(result.error || 'Error creating order');
    }
  };

  const onApproveOrder = async (data: any) => {
    if (!orderIDRef.current) {
      toast.error('Order ID is missing');
      return;
    }

    try {
      const captureResponse = await fetch('/api/capture-paypal-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ OrderID: orderIDRef.current }),
      });

      const captureResult = await captureResponse.json();

      if (!captureResponse.ok) {
        toast.error('Error capturing payment');
        console.error(captureResult.error || 'Error capturing order');
        return;
      }

      const projectTokenResponse = await fetch('/api/create-project-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, databaseVersion: version }),
      });

      const projectTokenResult = await projectTokenResponse.json();

      if (projectTokenResponse.ok) {
        toast.success('Project token created successfully!');
        toast.success('Payment successful!');
        router.push('/projects');
      } else {
        toast.warning(projectTokenResult.message || 'Failed to create project token. Please try again later.');
      }
    } catch (error) {
      console.error('Error during approval process:', error);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white max-w-3xl mx-auto p-8 rounded-xl shadow-lg'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>Checkout</h1>
          <p className='text-base text-gray-600 mt-2'>You're about to pay for the selected plan</p>
        </div>

        <div className='mt-6 text-center'>
          {plan ? (
            <>
              <h2 className='text-2xl font-semibold text-gray-900'>
                {plan === DatabaseVersion.PREMIUM ? 'Premium' : 'Professional'} Plan - ${amount}
              </h2>

              {isPending ? (
                <p className='mt-4 text-gray-500'>Loading PayPal Buttons...</p>
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
            </>
          ) : (
            <p className='text-lg text-red-500'>Invalid plan selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
