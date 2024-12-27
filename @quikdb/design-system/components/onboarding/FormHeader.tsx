import React from 'react';
import Link from 'next/link'; // Import Next.js Link

interface FormHeaderProps {
  showLogo: boolean;
  title: string;
  description: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, description, showLogo }) => (
  <div className='flex flex-col w-full max-w-screen-2xl gap-y-16 mt-10 max-md:px-7'>
    {showLogo && (
      <header>
        <Link href="/" className='text-gradient font-medium text-2xl'>
          quikdb
        </Link>
      </header>
    )}
    <div className='flex flex-col w-full items-center justify-center'>
      <section className='flex flex-col items-center w-full md:w-[680px] mb-10 gap-y-2'>
        <p className='text-3xl max-md:text-2xl'>{title}</p>
        <p className='text-sm font- text-[#B3B4B3] w-[50%] max-md:w-full text-center'>
          {description}
        </p>
      </section>
    </div>
  </div>
);

export default FormHeader;
