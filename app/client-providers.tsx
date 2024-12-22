'use client';

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { store } from './store';

// Example PayPal options
const paypalOptions = {
  clientId: 'Ac_Xli6_91PrL0CLwmnHBEJ8DAuPu9WtEt0YWI5BFOAmEpAigadFBSoGoVS9ZFo2jrqOnTdPrvrD72Y0',
  currency: 'USD',
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
