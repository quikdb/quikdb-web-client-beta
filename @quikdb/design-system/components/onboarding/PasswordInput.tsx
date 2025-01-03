'use client';

import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';   

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode; // Allows additional JSX elements (e.g., icons or images)
  className?: string;
}

const PasswordInput: React.FC<InputProps> = ({ children, className, ...props }) => {

  const [ seePassword, setSeePassword ] = useState(false);

  return (
    <div className={'flex items-center justify-between w-full dark:bg-[#141414] border border-[#141414]/50 rounded-2xl px-6 py-4' + (className ? ' ' + className : '')}>
      <input
        className='bg-transparent border-none outline-none flex-1 text-[#A5A5A5] text-[16px]'
        type={ seePassword ? 'text' : 'password' }
        {...props}
      />
      <div onClick={() => setSeePassword(!seePassword)} >
        { seePassword ? <Eye size={20} className='cursor-pointer' /> : <EyeOff size={20} className='cursor-pointer' /> }
      </div>
    </div>
  );
};

export default PasswordInput;
