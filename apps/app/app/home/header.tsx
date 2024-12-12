import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Button } from '@repo/design-system/components/ui/button'
import HamburgerMenu from './hamburger'

const Header = () => {
  return (
    <div className='flex items-center justify-between px-12 max-md:px-5'>
      <div className='text-gradient font-medium text-2xl max-md:text-lg w-1/5'>quikDB</div>
      <div className='flex gap-7 max-md:hidden'>
        <p>Home</p>
        <p>About us</p>
        <p>Solutions</p>
        <p>Career</p>
      </div>
      <div className='flex gap-3 lg:w-1/5 max-md:hidden'>
        <Button className='rounded-full'>Learn more</Button>
        <Button className='bg-gradient rounded-full'>Sign up for free</Button>
      </div>
      <HamburgerMenu />
    </div>
  )
}

export default Header