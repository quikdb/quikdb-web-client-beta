// app/(unauthenticated)/google-oauth-callback/page.tsx

'use client';

import dynamic from 'next/dynamic';

// Dynamically import the GoogleCallback component with SSR disabled
const GoogleCallback = dynamic(() => import('../../(authenticated)/components/GoogleCallback'), { ssr: false });

const Page = () => {
  return <GoogleCallback />;
};

export default Page;
