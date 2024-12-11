import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogTrigger } from "@repo/design-system/components/ui/dialog";
import Link from "next/link";

const navigation = [
    { name: 'Home', to: '/' },
    { name: 'About us', to: '' },
    { name: 'Solutions', to: '' },
    { name: 'Career', to: '' },
];

const HamburgerMenu = () => {
    return (
        <div className='md:hidden'>
            <Dialog>
                <DialogTrigger>
                    <button
                        type="button"
                        className="rounded-md p-2.5"
                    >
                        <span className="sr-only">Open main menu</span>
                        <HamburgerMenuIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                </DialogTrigger>
                <DialogContent className="fixed h-[70vh] border-[#242527] right-0 z-50 text text-center justify-center bg-blacko w-3/4 rounded-2xl text-white px-6 py-6">
                    <div className="flex items-end justify-center">
                        <div className='text-gradient font-medium text-2xl max-md:text-lg'>quikDB</div>
                    </div>
                        <div className="py-6">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.to}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 hover:bg-blue-800"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default HamburgerMenu