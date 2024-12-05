// import { Bars3Icon } from '@heroicons/react/24/outline';
import { Dialog, DialogContent, DialogTrigger } from '@repo/design-system/components/ui/dialog';
import {
    BarChartIcon,
    BookmarkFilledIcon,
    Crosshair2Icon,
    DashboardIcon,
    FileTextIcon,
    GearIcon,
    HamburgerMenuIcon,
    ListBulletIcon,
    PersonIcon,
} from '@radix-ui/react-icons';
import { CloudUpload, HeadphonesIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@repo/design-system/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const MobileSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignout = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('/api/sign-out', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                setSuccess(true);
                setError('');
                router.push('/sign-in');
            } else {
                setError(result.error || 'Failed to sign out.');
            }
        } catch (err: any) {
            console.error('Error during sign-out:', err);
            setError('An error occurred during sign-out. Please try again.');
        } finally {
            setLoading(false);
            router.push('/sign-in');
        }
    };

    const navigation = [
        { name: 'Overview', to: '/overview', icon: <DashboardIcon /> },
        { name: 'Projects', to: '/projects', icon: <FileTextIcon /> },
        { name: 'User Management', to: '/user-mgt', icon: <PersonIcon /> },
        { name: 'Audit Logs', to: '/audit-logs', icon: <ListBulletIcon /> },
        { name: 'Analytics', to: '/analytics', icon: <BarChartIcon /> },
        { name: 'Access Token', to: '/access-token', icon: <Crosshair2Icon /> },
        { name: 'Rewards', to: '/rewards', icon: <BookmarkFilledIcon /> },
        { name: 'Data Backup', to: '/data-backup', icon: <CloudUpload size={16} /> },
        { name: 'Settings', to: '/settings', icon: <GearIcon /> },
    ].filter(Boolean);

    return (
        <div className='lg:hidden'>
            <Dialog>
                <DialogTrigger>
                    <button
                        type="button"
                        className="rounded-md p-2.5"
                    >
                        <span className="sr-only">Open main menu</span>
                        <HamburgerMenuIcon className="w-4 h-4" aria-hidden="true" />
                    </button>
                </DialogTrigger>
                <DialogContent className="fixed h-full left-32 z-50 w-2/ bg-blackoff text-white px-6 py-6">
                    <div className='flex flex-col justify-between h-full w-full'>
                        <div>
                            <Link href='/' className='font-medium text-gradient text-2xl pl-10'>
                                quikDB
                            </Link>
                            <div className='flex flex-col gap-2 mt-16'>
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.to}
                                        className={`flex items-center gap-3 rounded-lg py-2 px-8 text-sm leading-7 ${pathname === item.to ? 'bg-gradient' : 'hover:bg-gradient'
                                            }`}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className='py-6 mt-6 flex flex-col gap-2 w-full items-'>
                            {/* <Button size='lg' className='flex items-center gap-3 rounded-lg py-2 px-8 text-sm leading-7 hover:bg-gradient bg-blackoff text-gradient'>
            <HeadphonesIcon /> Support
          </Button> */}
                            <Button
                                className='flex items-center gap-3 rounded-lg px-8 text-sm leading-7 hover:bg-gradient bg-blackoff text-gradient w-full'
                                onClick={handleSignout}
                                disabled={loading}
                            >
                                <LogOutIcon />
                                Logout
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MobileSidebar;