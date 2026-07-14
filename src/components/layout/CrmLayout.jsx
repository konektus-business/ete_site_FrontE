import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { currentUser } from '../../api/auth';

const tabsConfig = {
  ventes: [
    { key: 'toutes', label: 'Toutes les ventes' },
    { key: 'en-attente', label: 'En attente' },
    { key: 'remboursements', label: 'Remboursements' },
    { key: 'statistiques', label: 'Statistiques' },
  ],
  clients: [
    { key: 'tous', label: 'Tous les clients' },
    { key: 'essais', label: 'Essais en cours' },
    { key: 'suspendus', label: 'Comptes suspendus' },
  ],
};

function CrmLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const currentPath = location.pathname.split('/')[2];
  const isDashboard = currentPath === 'dashboard';
  const tabs = tabsConfig[currentPath] || [];

  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? null);

  useEffect(() => {
    setActiveTab(tabs[0]?.key ?? null);
  }, [currentPath]);

  return (
    <div className="flex h-screen w-full bg-crmBg overflow-hidden">
      <Sidebar user={currentUser} />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header
          user={currentUser}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          showSearch={isDashboard}
          showMenuButton={isDashboard}
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet context={{ activeTab }} />
        </main>
       
      </div>
    </div>
  );
}