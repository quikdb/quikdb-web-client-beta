import { Button } from '@quikdb/design-system/components/ui/button'
import HamburgerMenu from './hamburger'
import Link from 'next/link'
import { Logo } from '../../../@quikdb/design-system/components/logo';

const Header = () => {
  return (
    <div className='flex items-center justify-between px-12 max-md:px-5'>
      <Logo />
      <div className='flex gap-7 max-md:hidden'>
        {/* <p>Home</p>
        <p>About us</p>
        <p>Solutions</p>
        <p>Career</p> */}
      </div>
      <div className='flex gap-3 lg:w-1/5 max-md:hidden'>
        <Link href='https://docs.quikdb.com'>
          <Button className='rounded-full focus:scale-90'>Learn more</Button>
        </Link>
        <Link href='/sign-up'>
          <Button className='bg-gradient rounded-full focus:scale-90'>Sign up for free</Button>
        </Link>
      </div>
      <HamburgerMenu />
    </div>
  );
}

export default Header