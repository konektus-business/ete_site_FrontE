import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { pageLabels } from '../../utils/pageLabels';
import { getInitials } from '../../utils/avatar';
import { searchGlobal } from '../../api/search';
import SearchDropdown from '../common/SearchDropdown';
import NotificationsDropdown from '../common/NotificationsDropdown';

// Statuts agent possibles pour un centre d'appels VICIdial.
// ADAPTE les valeurs/labels si ton backend utilise d'autres codes.
const AGENT_STATUSES = [
  { value: 'available', label: 'Disponible', color: '#22C55E' },
  { value: 'paused', label: 'En pause', color: '#F59E0B' },
  { value: 'offline', label: 'Hors ligne', color: '#94A3B8' },
];

export default function CrmHeader({
  user,
  onToggleSidebar,
  showSearch = false,
  showMenuButton = false,
  tabs = [],
  activeTab,
  onTabChange,
  agentStatus = 'available',
  onAgentStatusChange,
  onLogout,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/').pop();
  const pageTitle = pageLabels[currentPath] || 'CRM';

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchWrapperRef = useRef(null);
  const searchInputRef = useRef(null);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const today = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const CalendarIcon = ({ className, style }) => (
    <svg className={className} style={style} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.66667 5.83333V2.5M13.3333 5.83333V2.5M5.83333 9.16667H14.1667M4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V5.83333C17.5 4.91286 16.7538 4.16667 15.8333 4.16667H4.16667C3.24619 4.16667 2.5 4.91286 2.5 5.83333V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Debounce 300ms : on ne relance la recherche qu'apres une pause de frappe
  useEffect(() => {
    if (query.trim().length < 2) {
      setSearchResults(null);
      setShowSearchDropdown(false);
      return;
    }

    setSearchLoading(true);
    setShowSearchDropdown(true);
    const timer = setTimeout(async () => {
      const results = await searchGlobal(query);
      setSearchResults(results);
      setSearchLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Raccourci Ctrl+K / Cmd+K pour focus la recherche, comme affiche dans le kbd hint
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setShowSearchDropdown(false);
        searchInputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fermeture au clic exterieur (recherche + menu utilisateur)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentStatus = AGENT_STATUSES.find((s) => s.value === agentStatus) || AGENT_STATUSES[0];

  return (
    <div className="bg-white rounded-[30px]  border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-[55px] pt-[20px] pb-[20px] gap-3 sm:gap-6">
        <div className="flex flex-col gap-[16px] shrink-0 min-w-0">
          <div className="flex items-center gap-4">
            {showMenuButton && (
              <button onClick={onToggleSidebar} className="text-slate-black shrink-0">
                <Menu className="w-5 h-5" />
              </button>
            )}
            <h1 className="font-bold text-[18px] leading-[24px] tracking-normal text-[#1E293B] truncate max-w-[160px] sm:max-w-none">
              {pageTitle}
            </h1>
          </div>

          {tabs.length > 0 && (
            <div className="flex items-center gap-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={`text-sm pb-1 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-crmPrimary text-crmPrimary font-medium'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {showSearch && (
          <div ref={searchWrapperRef} className="relative flex-1 min-w-0 max-w-[480px] hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim().length >= 2 && setShowSearchDropdown(true)}
              placeholder="Chercher un agent, une campagne..."
              className="w-full h-9 rounded-lg py-[9px] pr-4 pl-10 bg-slate-100 font-jakarta text-sm leading-none focus:outline-none focus:ring-2 focus:ring-crmPrimary placeholder:font-normal placeholder:text-sm placeholder:leading-none placeholder:text-gray-500"
            />
            <kbd className="hidden lg:inline-flex absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] leading-[15px] text-slate-400 border border-slate-300 rounded px-1 h-[17px] items-center">
              Ctrl + K
            </kbd>

            {showSearchDropdown && (
              <SearchDropdown
                results={searchResults}
                loading={searchLoading}
                query={query}
                onSelect={() => {
                  setShowSearchDropdown(false);
                  setQuery('');
                }}
              />
            )}
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <NotificationsDropdown />

          <div className="hidden md:flex items-center gap-2 font-jakarta font-medium text-sm leading-5 text-slate-500">
            <CalendarIcon className="w-4 h-4" style={{ color: '#64748B' }} />
            <span>{today}</span>
          </div>

          <div className="relative" ref={userMenuRef}>
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="relative shrink-0">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="w-9 h-9 bg-slate-200 text-slate-600 rounded-full items-center justify-center font-medium border border-slate-300 text-sm"
                  style={{ display: user?.avatarUrl ? 'none' : 'flex' }}
                >
                  {getInitials(`${user?.prenom || ''} ${user?.nom || ''}`)}
                </div>
                {/* Pastille de statut agent - visible directement sur l'avatar */}
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
                  style={{ background: currentStatus.color }}
                  title={currentStatus.label}
                />
              </div>

              <div className="hidden lg:flex flex-col min-w-0">
                <span
                  className="truncate max-w-[100px]"
                  style={{
                    fontFamily: 'Plus Jakarta Sans',
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0px',
                    color: '#1E293B',
                  }}
                >
                  {user?.name || 'Utilisateur'}
                </span>
                <span className="text-[10px] font-medium text-crmPrimary truncate max-w-[100px]">
                  {user?.role || 'Rôle'}
                </span>
              </div>

              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition shrink-0" />
            </div>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100 mb-1">
                  <p className="text-sm font-semibold text-slate-800 truncate">{user?.name || 'Utilisateur'}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email || user?.role}</p>
                </div>

                {/* Statut agent */}
                <div className="px-4 py-2">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Statut</p>
                  <div className="flex flex-col gap-1">
                    {AGENT_STATUSES.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => onAgentStatusChange?.(s.value)}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                          agentStatus === s.value ? 'bg-slate-50 font-medium text-slate-800' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button
                    onClick={() => navigate('/crm/profile')}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    Mon profil
                  </button>
                  <button
                    onClick={() => navigate('/crm/settings')}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                    Paramètres
                  </button>
                </div>

                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}