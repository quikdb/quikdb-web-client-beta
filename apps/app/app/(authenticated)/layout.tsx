import { SidebarProvider } from '@repo/design-system/components/ui/sidebar';
import { showBetaFeature } from '@repo/feature-flags';
import type { ReactElement, ReactNode } from 'react';
import { GlobalSidebar } from './components/sidebar';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

const AppLayout = async ({
  children,
}: AppLayoutProperties): Promise<ReactElement> => {
  const betaFeature = await showBetaFeature();

  // redirect to sign in if user is not available.

  return (
    <SidebarProvider>
      <GlobalSidebar>
        {betaFeature && (
          <div className="m-4 rounded-full bg-success p-1.5 text-center text-sm text-success-foreground">
            Beta feature now available
          </div>
        )}
        {children}
      </GlobalSidebar>
    </SidebarProvider>
  );
};

export default AppLayout;
