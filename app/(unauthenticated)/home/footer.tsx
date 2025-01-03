import { Logo } from "@quikdb/design-system/components/logo";

const Footer = () => {
    return (
      <div className='mt-5 max-md:mt-0 py-16 max-md:py-4 dark:bg-[#090909]'>
        <div className='flex items-center justify-around'>
          <Logo />
          <div  className='flex flex-col gap-12 w-2/3'>
            <div className='max-md:hidden flex items-center justify-between text-[10px]'>
              <div className='flex gap-2'>
                <a href='' className='underline'>
                  Privacy Policy
                </a>
                |
                <a href='' className='underline'>
                  Terms and Conditions
                </a>
                |
                <a href='https://docs.quikdb.com' className='underline'>
                  Documentation
                </a>
                |
                <a href='/download' className='underline'>
                  Get Desktop App
                </a>
              </div>
              <div className='flex gap-3'>
                <img src='/images/youtube.png' alt='' />
                <img src='/images/instagram.png' alt='' />
                <img src='/images/twitter.png' alt='' />
              </div>
              <div>© {new Date().getFullYear()} All rights reserved.</div>
            </div>
          </div>
        </div>
        <div className='md:hidden px-5 my-5 flex items-center justify-between text-[8px]'>
          <div className='flex gap-2'>
            <a href='' className='underline'>
              Privacy Policy
            </a>
            |
            <a href='' className='underline'>
              Terms and Conditions
            </a>
            |
            <a href='https://docs.quikdb.com' className='underline'>
              Documentation
            </a>
          </div>
          <div className='flex gap-0 w-1/5'>
            <img src='/images/youtube.png' alt='' />
            <img src='/images/instagram.png' alt='' />
            <img src='/images/twitter.png' alt='' />
          </div>
          <div>© {new Date().getFullYear()} quikDB. All rights reserved.</div>
        </div>
      </div>
    );
}

export default Footer