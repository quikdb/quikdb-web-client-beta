"use client";

import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { store } from "./store";

// Example PayPal options
const paypalOptions = {
  clientId: "YOUR_PAYPAL_CLIENT_ID",
  currency: "USD",
};

type ClientProvidersProps = {
  children: React.ReactNode;
};

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <PayPalScriptProvider options={paypalOptions}>{children}</PayPalScriptProvider>
    </ReduxProvider>
  );
}
