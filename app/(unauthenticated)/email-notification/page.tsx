'use client';
import { Input, FormDivider, PasswordInput, FormHeader } from '@quikdb/design-system/components/onboarding';
import React from 'react';

// interface EmailNotificationProps {
//   email?: string;
// }

const EmailNotification = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full p-10">
      <FormHeader
        title="You’ve got mail"
        description={`An email has been sent to you at email. Click the link to access your account.`}
        showLogo
      />
      <main className="">
        <span className="text-[16px] text-gradient cursor-pointer">{`Resend code`}</span>
      </main>
    </div>
  );
};

export default EmailNotification;
