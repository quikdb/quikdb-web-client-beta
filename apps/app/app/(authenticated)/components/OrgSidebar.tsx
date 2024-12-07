import Link from 'next/link'; 
import { useRouter } from 'next/router'; 
import { BookmarkFilledIcon, ColumnsIcon, DashboardIcon, FileTextIcon, GearIcon } from '@radix-ui/react-icons';

const OrgSidebar = () => {
    const router = useRouter(); // Access the current route

    const navigation = [
        { name: 'Overview', to: '', icon: <DashboardIcon /> },
        { name: 'Organizations', to: 'organizations', icon: <ColumnsIcon /> },
        { name: 'Invitations', to: 'list-organizations', icon: <BookmarkFilledIcon /> },
        { name: 'Documentation', to: 'documentation', icon: <FileTextIcon /> },
        { name: 'Settings', to: 'settings', icon: <GearIcon /> },
    ].filter(Boolean);

    return (
        <div className='bg-blackoff w-[18%] border-r-2 border-r-[#1B1C1F] fixed hidden lg:flex flex-col items-center justify-start p-10 py-20 min-h-screen h-full'>
            <div className="flex flex-col h-full">
                <Link href="/" className="font-medium text-gradient text-2xl pl-10">
                    quikDB
                </Link>
                <div className='flex flex-col gap-2 mt-16'>
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={`/dashboard/${item.to}`} // Use Next.js Link with href
                            className={`flex items-center gap-3 rounded-lg py-2 px-8 text-sm leading-7
                            ${router.pathname === `/dashboard/${item.to}` // Check the current path
                                    ? 'bg-blue-800'
                                    : 'hover:bg-blue-800'
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrgSidebar;
