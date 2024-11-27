import { Link } from 'react-router-dom';
import { BookmarkFilledIcon, ColumnsIcon, DashboardIcon, FileTextIcon, GearIcon } from '@radix-ui/react-icons';

const OrgSidebar = () => {

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
                    <Link to="/" className="font-satoshi_medium text-gradient text-2xl pl-10">quikDB</Link>
                    <div className='flex flex-col gap-2 mt-16'>
                        {navigation.map((item) => {
                            return (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className={`flex items-center gap-3 rounded-lg py-2 px-8 text-sm leading-7
                                ${location.pathname === `dashboard/${item.to}` ? 'bg-blue-800' : 'hover:bg-blue-800'}`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            )
                        })}
                    </div>
            </div>
        </div>
    );
};

export default OrgSidebar