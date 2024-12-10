const Footer = () => {
    return (
        <div className="mt-10 py-16 bg-[#090909] flex items-center justify-around">
            <div className='text-gradient font-medium text-2xl'>quikDB</div>

            <div className='flex flex-col gap-12 w-2/3'>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-3">
                        <p className="font-medium">Products</p>
                        <div className="flex flex-col gap-2 text-sm text-gray-400 font-light">
                            <p>Lorem ipsum</p>
                            <p>Lorem ipsum</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="font-medium">Pricing</p>
                        <div className="flex flex-col gap-2 text-sm text-gray-400 font-light">
                            <p>Lorem ipsum</p>
                            <p>Lorem ipsum</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="font-medium">Documentation</p>
                        <div className="flex flex-col gap-2 text-sm text-gray-400 font-light">
                            <p>Lorem ipsum</p>
                            <p>Lorem ipsum</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="font-medium">Support</p>
                        <div className="flex flex-col gap-2 text-sm text-gray-400 font-light">
                            <p>Lorem ipsum</p>
                            <p>Lorem ipsum</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs">
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
    )
}

export default Footer