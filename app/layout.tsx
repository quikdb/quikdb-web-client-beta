import localFont from 'next/font/local';
import '@quikdb/design-system/styles/globals.css';
import { TooltipProvider } from '@quikdb/design-system/components/ui/tooltip';
import { cn } from '@quikdb/design-system/lib/utils';
import { DesignSystemProvider } from '@quikdb/design-system/providers';
import { Analytics } from '@vercel/analytics/react';
import type { ReactNode } from 'react';
// import { ThemeHydration } from './utility';
import ClientProviders from './client-providers';
import ScrollingAlert from './(authenticated)/components/ScrolingAlert';

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
      {/* <ThemeHydration /> */}
      <ClientProviders>
          <DesignSystemProvider>
          <ScrollingAlert />
            <TooltipProvider>{children}</TooltipProvider>
            <Analytics />
          </DesignSystemProvider>
        </ClientProviders>
    </body>
  </html>
);

export default RootLayout;
