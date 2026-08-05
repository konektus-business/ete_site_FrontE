import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getCurrentUser } from '../../api/auth';
import { tabsConfig } from '../../config/tabsConfig';
import CrmHeader from './CrmHeader';

function CrmLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const currentPath = location.pathname.split('/')[2];
  const isDashboard = currentPath === 'dashboard';
  const tabs = tabsConfig[currentPath] || [];

  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setActiveTab(tabs[0]?.key ?? null);
  }, [currentPath]);

  useEffect(() => {
    getCurrentUser().then((data) => setUser(data));
  }, []);

  if (!user) {
    return <div className="flex h-screen items-center justify-center">Chargement...</div>;
  }

return (
  <div className="flex h-screen w-full bg-crmBg  gap-[16px] overflow-hidden box-border">
    <Sidebar isOpen={sidebarOpen} />
    <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden gap-[18px]">
      <CrmHeader
        user={user}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        showSearch={isDashboard}
        showMenuButton={true}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6    min-h-0">
        <Outlet context={{ activeTab, setActiveTab }} />
      </main>
    </div>
  </div>
);
}

export default CrmLayout;