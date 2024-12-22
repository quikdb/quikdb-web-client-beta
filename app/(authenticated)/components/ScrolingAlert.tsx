'use client';

import React from 'react';

const ScrollingAlert: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-orange-300 text-black py-2">
      <div className="inline-block whitespace-nowrap animate-scroll tracking-widest font-bold">
        T H I S &nbsp; A P P &nbsp; I S &nbsp; I N &nbsp; B E T A &nbsp; M O D E
      </div>
    </div>
  );
};

export default ScrollingAlert;
