import { ReactNode } from 'react';
import GlobalSidebar from './components/sidebar';
import DashHeader from './components/DashHeader'; // Import the header component

type LayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <GlobalSidebar />
      <div className="flex-grow pl-[18%]">
        <DashHeader />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
