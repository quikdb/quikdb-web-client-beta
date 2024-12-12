import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { Toaster } from '../components/ui/sonner';
import { TooltipProvider } from '../components/ui/tooltip';
import { ThemeProvider } from './theme';

const gaMeasurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

type DesignSystemProviderProperties = ThemeProviderProps;

async function loadToolbar() {
  const { VercelToolbar } = await import('@vercel/toolbar/next');
  return <VercelToolbar />;
}

export const DesignSystemProvider = ({ children, ...properties }: DesignSystemProviderProperties) => (
  <>
    <ThemeProvider {...properties}>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
    <Toaster richColors position='top-center' />
    <VercelAnalytics />
    {gaMeasurementId && <GoogleAnalytics gaId={gaMeasurementId} />}
    {process.env.NODE_ENV === 'development' && loadToolbar()}
  </>
);
