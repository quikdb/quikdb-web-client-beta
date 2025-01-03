import { Button } from '@quikdb/design-system/components/ui/button';
import Link from 'next/link';
import { Logo } from '../../../@quikdb/design-system/components/logo';

const DownloadPage = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b text-white overflow-hidden'>
      {/* Header Section */}
      <header className='absolute top-0 left-0 w-full py-5 px-12 flex justify-between items-center max-md:px-5'>
        <Logo />
        <div className='flex gap-3'>
          <Link href='/'>
            <Button className='rounded-full bg-transparent text-white hover:text-gray-300'>Home</Button>
          </Link>
          <Link href='https://docs.quikdb.com'>
            <Button className='rounded-full bg-transparent text-white hover:text-gray-300'>Learn More</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex flex-col items-center justify-center text-center px-5 max-w-3xl'>
        <h1 className='text-4xl font-bold mb-4'>
          Download the <span className='text-gradient'>QuikDB Desktop App</span>
        </h1>
        <p className='text-lg text-gray-300 mb-8'>
          Experience the power of QuikDB on your desktop for seamless database management, faster performance, and offline access. Available for Mac. Windows is coming soon.
        </p>
        <div className='flex gap-6'>
          <Link href='https://drive.google.com/file/d/1TGg06j3vzdq1OSRVnftICObWsdO-dMde/view?usp=sharing'>
            <Button className='rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-8 text-lg focus:scale-90'>
              Download for Mac
            </Button>
          </Link>
          <Link href='/download-desktop'>
            <Button className='rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-8 text-lg focus:scale-90' disabled>
              Download for Windows
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer Section */}
      <footer className='absolute bottom-5 text-sm text-gray-400'>
        <p>© {new Date().getFullYear()} QuikDB. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DownloadPage;
