import React from 'react'
import { Link } from 'react-router-dom';

interface FormHeaderProps {
  showLogo: boolean;
  title: string;
  description: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({title, description, showLogo}) => (

  <div className='flex flex-col w-full max-w-screen-2xl gap-y-16  '>
    { showLogo &&
      <header>
        <Link to="/" className='text-gradient'>quikdb</Link>
      </header>
    }
    <div className='flex flex-col w-full items-center justify-center'>
      <section className='flex flex-col items-center w-full md:w-[680px] mb-10 gap-y-2'>
        <p className='text-3xl text-white text-[500]'>{title}</p>
        <p className='text-sm font-light text-[#B3B4B3] w-[50%] text-center'>{description}</p>
      </section>
    </div>
  </div>

)

export default FormHeader

