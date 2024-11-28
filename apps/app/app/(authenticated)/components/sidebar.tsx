'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import {
  BarChartIcon,
  BookmarkFilledIcon,
  Crosshair2Icon,
  DashboardIcon,
  FileTextIcon,
  GearIcon,
  ListBulletIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { CloudUpload, HeadphonesIcon, LogOutIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface GlobalSidebarProps {
  children?: ReactNode;
}

const GlobalSidebar: React.FC<GlobalSidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const navigation = [
    { name: 'Overview', to: '/', icon: <DashboardIcon /> },
    { name: 'Projects', to: '/projects', icon: <FileTextIcon /> },
    { name: 'User Management', to: '/user-mgt', icon: <PersonIcon /> },
    { name: 'Audit Logs', to: '/audit-logs', icon: <ListBulletIcon /> },
    { name: 'Analytics', to: '/analytics', icon: <BarChartIcon /> },
    { name: 'Access Token', to: '/access-token', icon: <Crosshair2Icon /> },
    { name: 'Rewards', to: '/rewards', icon: <BookmarkFilledIcon /> },
    { name: 'Data Backup', to: '/data-backup', icon: <CloudUpload size={16} /> },
    { name: 'Settings', to: '/', icon: <GearIcon /> },
  ];

  return (
    <div className="bg-blackoff w-[18%] border-r-2 border-r-[#1B1C1F] fixed hidden lg:flex flex-col items-center justify-start p-10 py-20 min-h-screen h-full">
      <div className="flex flex-col justify-between h-full">
        {/* Logo Section */}
        <div>
          <Link href="/" className="font-satoshi_medium text-gradient text-2xl pl-10">
            quikDB
          </Link>
          {/* Navigation Links */}
          <div className="flex flex-col gap-2 mt-16">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.to}
                className={`flex items-center gap-3 rounded-lg py-2 px-8 text-sm leading-7 ${
                  pathname === item.to ? 'bg-gradient' : 'hover:bg-gradient'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        {/* Support and Logout */}
        <div className="py-6 mt-20 flex flex-col gap-2">
          <Link href="/support">
            <Button size="lg">
              <HeadphonesIcon /> Support
            </Button>
          </Link>
          <Link href="/logout">
            <Button size="lg">
              <LogOutIcon /> Logout
            </Button>
          </Link>
        </div>
      </div>
      {/* Children */}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default GlobalSidebar;
