import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode; // Allows additional JSX elements (e.g., icons or images)
  label?: boolean;
  labelTitle?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ children, className, ...props }) => {
  return (
    <div className={'flex flex-col justify-between w-full bg-[#141414] rounded-2xl p-6 py-4' + (className ? ' ' + className : '')}>
      {props.label && <label className='text-[#A5A5A5] text-sm'>{props.labelTitle}</label>}
      <input
        className='bg-transparent border-none outline-none flex-1 text-[#A5A5A5] text-[16px]'
        {...props}
      />
      {children}
    </div>
  );
};

export default Input;
