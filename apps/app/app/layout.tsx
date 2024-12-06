'use client';
import { Inter, Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import '@repo/design-system/styles/globals.css';
import { Toaster } from '@repo/design-system/components/ui/sonner';
import { TooltipProvider } from '@repo/design-system/components/ui/tooltip';
import { cn } from '@repo/design-system/lib/utils';
import { DesignSystemProvider } from '@repo/design-system/providers';
import { Analytics } from '@vercel/analytics/react';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './store';
import type { ReactNode } from 'react';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

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
        <DesignSystemProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
          <Analytics />
        </DesignSystemProvider>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
