import { Button } from '@repo/design-system/components/ui/button'

const Header = () => {
  return (
    <div className='flex items-center justify-between px-12'>
      <div className='text-gradient font-medium text-2xl'>quikDB</div>

      <div className='flex gap-7'>
        <p>Home</p>
        <p>About us</p>
        <p>Solutions</p>
        <p>Career</p>
      </div>
      <div className='flex gap-3'>
        <Button className='rounded-full'>Learn more</Button>
        <Button className='bg-gradient rounded-full'>Sign up for free</Button>
      </div>
    </div>
  )
}

export default Header