import { Input } from "@repo/design-system/components/onboarding";
import { Button } from "@repo/design-system/components/ui/button"
import { Card } from "@repo/design-system/components/ui/card"
import { Label } from "@repo/design-system/components/ui/label";
import { ArrowRight } from "lucide-react";

const buttonStyle = 'lg:w-[48%] max-md:w-[48%] w-full border-[1px] bg-transparent border-[#1F1F1F] text-xs max-md:text-[9px] rounded-2xl px-4 text-white hover:text-blacko';

const Steps = () => {
    return (
        <div className="px-12 max-md:px-5">
            <p className="text-2xl max-md:text-xl font-medium text-center my-16 max-md:my-10">How it works</p>
            <div className="flex max-md:flex-col gap-10 max-md:gap-7">
                <Card className="px-10 max-md:px-5 py-5 last:p-0 flex flex-col gap-7 md:w-[30%]">
                    <div className="max-md:text-center">
                        <p className="text-lg max-md:text-base font-medium mb-3">1. Authentication</p>
                        <div>
                            <p className="text-base max-md:text-sm font-medium mb-2">Sign in securely, earn rewards.</p>
                            <p className="text-[#858585] text-sm max-md:text-xs w-[80%] max-md:mx-auto">Use your internet identity to access QuikDB. Start earning credits for secure and seamless logins.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button className={buttonStyle}>
                            <img className="w-4" src="/images/onetime.png" alt="" />
                            Sign up with one-time link
                        </Button>
                        <Button className={buttonStyle}>
                            <img className="w-" src="/images/icp.png" alt="" />
                            Sign up with internet identity
                        </Button>
                        <Button className={buttonStyle}>
                            <img className="w-3" src="/images/google.png" alt="" />
                            Sign Up with Google
                        </Button>
                        <Button className={buttonStyle}>
                            <img className="w-4" src="/images/github.png" alt="" />
                            Sign up with Github
                        </Button>
                    </div>
                </Card>
                <Card className="px-10 max-md:px-5 py-5 flex flex-col gap-7 md:w-[30%]">
                    <div className="max-md:text-center">
                        <p className="text-lg max-md:text-base font-medium mb-3">2. Create your first database</p>
                        <div>
                            <p className="text-base max-md:text-sm font-medium mb-2">Set up and organize your data easily.</p>
                            <p className="text-[#858585] text-sm max-md:text-xs max-md:mx-auto w-[80%]">Set up and organize your data with just a few clicks. No coding required.</p>
                        </div>
                    </div>
                    <div className="text-xs max-md:text-[10px] max-md:mx-5">
                        <div>
                            <p className='font-medium'>Add Data Group</p>
                            <p className="text-[10px] max-md:text-[8px] mt-1 text-[#858585]">Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum</p>
                        </div>
                        <hr className='mt-2' />
                        <div className='grid gap-2 py-4'>
                            <div className='grid gap-1'>
                                <Label htmlFor='name' className="text-[10px] max-md:text-[8px]">Data Group Name</Label>
                                <Input id='name' placeholder='' className='col-span-3 h-1' disabled />
                            </div>
                            <div className='grid gap-1'>
                                <Label htmlFor='attributes' className="text-[10px] max-md:text-[8px]">Attributes</Label>
                                <Input id='attributes' placeholder='' className='col-span-3 placeholder:text-[8px] h-1' disabled />
                            </div>
                        </div>
                        <div className='sm:justify-start'>
                            <Button className='bg-gradient w-fit px-2 h-5 text-[10px] max-md:text-[8px] text-[#0F1407]'>Add Data</Button>
                        </div>
                    </div>
                </Card>
                <Card className="px-10 max-md:px-5 py-5 flex flex-col gap-7 md:w-[30%]">
                    <div className="max-md:text-center">
                        <p className="text-lg max-md:text-base font-medium mb-3">3. Collaborate with your team</p>
                        <div>
                            <p className="text-base max-md:text-sm font-medium mb-2">Invite your team and share insights.</p>
                            <p className="text-[#858585] text-sm max-md:text-xs max-md:mx-auto w-[80%]">Collaborate with your team in real-time by inviting members to access, edit, and share data.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-5 px-5 max-md:w-[80%] max-md:mx-auto max-md:justify-center">
                        <img src="/images/avatar.png" alt="" className="w-14 max-lg:w-8" />
                        <img src="/images/avatar.png" alt="" className="w-14 max-lg:w-8" />
                        <img src="/images/avatar.png" alt="" className="w-14 max-lg:w-8" />
                        <img src="/images/avatar.png" alt="" className="w-14 max-lg:w-8" />
                        <img src="/images/avatar.png" alt="" className="w-14 max-lg:w-8" />
                        <img src="/images/avatar.png" alt="" className="w-14 max-lg:w-8" />
                        <img src="/images/avatar.png" alt="" className="w-14 max-lg:w-8" />
                        <img src="/images/avatar.png" alt="" className="w-14 max-lg:w-8" />
                    </div>
                </Card>
            </div >
            <div className="text-center mt-16 max-md:mt-8">
                <Button className="bg-gradient rounded-full max-md:scale-90">
                    Try it now
                    <ArrowRight />
                </Button>
            </div>
        </div >
    )
}

export default Steps