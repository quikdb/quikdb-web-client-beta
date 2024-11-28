import { ReactNode } from 'react';
import GlobalSidebar from './components/sidebar';

type LayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <GlobalSidebar />
      {/* Main content area, take remaining space */}
      <div className="flex-grow pl-[18%]">
        {children}
      </div>
    </div>
  );
}
