import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getCurrentUser } from '../../api/auth';
import { tabsConfig } from '../../config/tabsConfig';
import CrmHeader from './CrmHeader';
import { searchGlobal } from '../../api/search';

function CrmLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const currentPath = location.pathname.split('/')[2];
  const isDashboard = currentPath === 'dashboard';
  const tabs = tabsConfig[currentPath] || [];

  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? null);
  const [user, setUser] = useState(null);
  const [agentStatus, setAgentStatus] = useState('available');

  // Recherche globale : geree ici car CrmHeader (l'input) et Dashboard
  // (l'affichage des resultats) sont deux composants freres qui ne peuvent
  // pas se parler directement. Le parent commun fait le pont.
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    setActiveTab(tabs[0]?.key ?? null);
  }, [currentPath]);

  useEffect(() => {
    getCurrentUser().then((data) => setUser(data));
  }, []);

  // Si on quitte le Dashboard, on vide la recherche pour ne pas la
  // retrouver "collee" si on y revient plus tard.
  useEffect(() => {
    if (!isDashboard) {
      setSearchQuery('');
      setSearchResults(null);
    }
  }, [isDashboard]);

  // Debounce 300ms, uniquement actif sur le Dashboard (la ou la barre existe)
  useEffect(() => {
    if (!isDashboard || searchQuery.trim().length < 2) {
      setSearchResults(null);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    const timer = setTimeout(async () => {
      const results = await searchGlobal(searchQuery);
      setSearchResults(results);
      setSearchLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, isDashboard]);

  if (!user) {
    return <div className="flex h-screen items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="flex h-screen w-full bg-crmBg gap-[16px] overflow-hidden box-border">
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
          agentStatus={agentStatus}
          onAgentStatusChange={setAgentStatus}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 min-h-0">
          <Outlet context={{ activeTab, setActiveTab, searchQuery, searchResults, searchLoading }} />
        </main>
      </div>
    </div>
  );
}

export default CrmLayout;