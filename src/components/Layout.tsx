
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && <Navigation />}
      
      <main className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      
      {isMobile && <MobileNavigation />}
    </div>
  );
};

export default Layout;
