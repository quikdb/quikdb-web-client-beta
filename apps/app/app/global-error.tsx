'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { captureException } from '@sentry/nextjs';
import type NextError from 'next/error';
import { useEffect } from 'react';

type GlobalErrorProperties = {
  readonly error: NextError & { digest?: string };
  readonly reset: () => void;
};

const GlobalError = ({ error, reset }: GlobalErrorProperties) => {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <html lang='en'>
      <body>
        <div className='grid place-content-center min-h-screen max-md:text-xl text-3xl'>
          <h2>404: Page Not Found</h2>
          <p>Uh oh! Wrong page 😞</p>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
