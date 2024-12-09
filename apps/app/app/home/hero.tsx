import Header from './components/header'
import { Input } from '@repo/design-system/components/onboarding'
import { Button } from '@repo/design-system/components/ui/button'

const Hero = () => {
    return (
        <div className='flex flex-col gap-20'>
            <Header />
            <div className='text-center flex flex-col gap-8'>
                <div className='bg-[#683FEA]/10 w-fit mx-auto p-2 rounded-full'>
                    <p className='text-gradient text-xs'># We help you fund your dreams</p>
                </div>
                <p className='text-4xl font-medium'>Welcome to the <span className='text-gradient2'>TX quikDB</span></p>
                <p className='text-4xl font-medium'><span className='text-gradient'>Data management</span> made smarter and faster</p>
                <p className='font- w-1/3 mx-auto text-[#777A7F]'>Simplify database management and collaboration with QuikDB’s seamless tools and rewarding features.</p>
                <div className='flex items-center gap-2 mx-auto w-1/3 mt-5'>
                    <Input placeholder='Email address' />
                    <Button size={'lg'} className='bg-gradient h-11'>Get started</Button>
                </div>
            </div>
            <img src="/images/grid.png" alt=""/>
        </div>
    )
}

export default Hero