import { Button } from '@quikdb/design-system/components/ui/button'
import HamburgerMenu from './hamburger'
import Link from 'next/link'
import { Logo } from '../../../@quikdb/design-system/components/logo';

const Header = () => {
  return (
    <div className='flex items-center justify-between px-12 max-md:px-5'>
      <Logo />
      <div className='flex gap-7 max-md:hidden'>
        <p>Home</p>
        <p>About us</p>
        <p>Solutions</p>
        <p>Career</p>
      </div>
      <div className='flex gap-3 lg:w-1/5 max-md:hidden'>
        <Button className='rounded-full'>Learn more</Button>
        <Link href='/sign-up'>
          <Button className='bg-gradient rounded-full'>Sign up for free</Button>
        </Link>
      </div>
      <HamburgerMenu />
    </div>
  );
}

export default Header