const Footer = () => {
    return (
        <div className="mt-5 max-md:mt-0 py-16 max-md:py-4 bg-[#090909]">
            <div className="flex items-center justify-around">
                <div className='text-gradient font-medium text-2xl max-md:text-base'>quikDB</div>

                <div className='flex flex-col gap-12 w-2/3'>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3">
                            <p className="font-medium max-md:text-[10px]">Products</p>
                            <div className="flex flex-col gap-2 text-sm max-md:text-[8px] text-gray-400 font-light">
                                <p>Lorem ipsum</p>
                                <p>Lorem ipsum</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="font-medium max-md:text-[10px]">Pricing</p>
                            <div className="flex flex-col gap-2 text-sm max-md:text-[8px] text-gray-400 font-light">
                                <p>Lorem ipsum</p>
                                <p>Lorem ipsum</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="font-medium max-md:text-[10px]">Documentation</p>
                            <div className="flex flex-col gap-2 text-sm max-md:text-[8px] text-gray-400 font-light">
                                <p>Lorem ipsum</p>
                                <p>Lorem ipsum</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="font-medium max-md:text-[10px]">Support</p>
                            <div className="flex flex-col gap-2 text-sm max-md:text-[8px] text-gray-400 font-light">
                                <p>Lorem ipsum</p>
                                <p>Lorem ipsum</p>
                            </div>
                        </div>
                    </div>

                    <div className="max-md:hidden flex items-center justify-between text-[10px]">
                        <div className="flex gap-2">
                            <a href="" className="underline">Privacy Policy</a>
                            |
                            <a href="" className="underline">Terms and Conditions</a>
                        </div>
                        <div className="flex gap-3">
                            <img src="/images/youtube.png" alt="" />
                            <img src="/images/instagram.png" alt="" />
                            <img src="/images/twitter.png" alt="" />
                        </div>
                        <div>
                            © 2024 quikDB. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden px-5 my-5 flex items-center justify-between text-[8px]">
                <div className="flex gap-2">
                    <a href="" className="underline">Privacy Policy</a>
                    |
                    <a href="" className="underline">Terms and Conditions</a>
                </div>
                <div className="flex gap-0 w-1/5">
                    <img src="/images/youtube.png" alt="" />
                    <img src="/images/instagram.png" alt="" />
                    <img src="/images/twitter.png" alt="" />
                </div>
                <div>
                    © 2024 quikDB. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer