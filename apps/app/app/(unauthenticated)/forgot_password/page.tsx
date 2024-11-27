"use client";

import { FormHeader, Input } from '../../components/onboarding';
import { Button } from '../../components/ui/button';
import React, { useState } from "react";

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Submitted email:", emailAddress);
  };

  return (
    <div className="flex flex-col w-full p-10">
      <FormHeader
        title="Forgot password"
        description="Please enter the email assigned to your account for password recovery."
        showLogo
      />

      <main className="flex flex-col items-center justify-center my-16 w-full">
        <div className="flex flex-col w-full md:w-[680px] items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-4 items-center w-full"
          >
            <Input
              type="email"
              placeholder="Enter Address"
              labelTitle="Email Address"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
              required
            />

            <Button
              type="submit"
              className={`w-full ${
                emailAddress !== ""
                  ? "bg-white text-[#141414] hover:text-black hover:bg-[#dadada]"
                  : "bg-[#141414] text-[#A5A5A5]"
              } h-[50px] text-lg rounded-2xl p-6`}
            >
              Send Code
            </Button>

            <span className="text-[16px] text-gradient cursor-pointer">
              Resend code
            </span>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
