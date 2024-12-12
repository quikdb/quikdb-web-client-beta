'use client';
import localFont from 'next/font/local';
import '@quikdb/design-system/styles/globals.css';
import { Toaster } from '@quikdb/design-system/components/ui/sonner';
import { TooltipProvider } from '@quikdb/design-system/components/ui/tooltip';
import { cn } from '@quikdb/design-system/lib/utils';
import { DesignSystemProvider } from '@quikdb/design-system/providers';
import { Analytics } from '@vercel/analytics/react';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './store';
import type { ReactNode } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Bold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Black.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
});

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang='en' className={cn(satoshi.className, 'touch-manipulation font-sans antialiased')} suppressHydrationWarning>
    <body>
      <Provider store={store}>
        <PayPalScriptProvider
          options={{
            clientId: 'Ac_Xli6_91PrL0CLwmnHBEJ8DAuPu9WtEt0YWI5BFOAmEpAigadFBSoGoVS9ZFo2jrqOnTdPrvrD72Y0', 
            currency: 'USD', 
          }}
        >
          <DesignSystemProvider>
            <TooltipProvider>{children}</TooltipProvider>
            {/* <Toaster /> */}
            <Analytics />
          </DesignSystemProvider>
        </PayPalScriptProvider>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
