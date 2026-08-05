import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Search, ChevronDown, LogOut } from 'lucide-react';
import { pageLabels } from '../../utils/pageLabels';
import { getInitials } from '../../utils/avatar';

export default function CrmHeader({
  user,
  onToggleSidebar,
  showSearch = false,
  showMenuButton = false,
  tabs = [],
  activeTab,
  onTabChange,
}) {
  const location = useLocation();
  const [notifCount, setNotifCount] = useState(8);
  const currentPath = location.pathname.split('/').pop();
  const pageTitle = pageLabels[currentPath] || 'CRM';
  const [query, setQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const today = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const BellIcon = ({ className, style }) => (
    <svg className={className} style={style} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 19H20L18.595 17.595C18.2139 17.2139 17.9999 16.697 18 16.158V13C18.0003 10.4567 16.3976 8.18933 14 7.341V7C14 5.89617 13.1038 5 12 5C10.8962 5 10 5.89617 10 7V7.341C7.67 8.165 6 10.388 6 13V16.159C6 16.697 5.786 17.214 5.405 17.595L4 19H9M15 19V20C15 21.6557 13.6557 23 12 23C10.3443 23 9 21.6557 9 20V19M15 19H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

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
          <div className="relative flex-1 min-w-0 max-w-[480px] hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Chercher un agent, une campagne..."
              className="w-full h-9 rounded-lg py-[9px] pr-4 pl-10 bg-slate-100 font-jakarta text-sm leading-none focus:outline-none focus:ring-2 focus:ring-crmPrimary placeholder:font-normal placeholder:text-sm placeholder:leading-none placeholder:text-gray-500"
            />
            <kbd className="hidden lg:inline-flex absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] leading-[15px] text-slate-400 border border-slate-300 rounded px-1 h-[17px] items-center">
              Ctrl + K
            </kbd>
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button className="relative p-2 text-slate-500 hover:text-crmPrimary rounded-full hover:bg-slate-100 transition-colors">
            <BellIcon className="w-5 h-5" style={{ color: '#94A3B8', strokeWidth: 2 }} />
            {notifCount > 0 && (
              <span
                className="absolute flex items-center justify-center rounded-full text-white leading-none"
                style={{
                  top: '5px',
                  right: '4px',
                  width: '16px',
                  height: '19px',
                  background: '#EF4444',
                  border: '2px solid #FFFFFF',
                  borderRadius: '9999px',
                  fontFamily: 'Plus Jakarta Sans',
                  fontWeight: 400,
                  fontSize: '10px',
                }}
              >
                {notifCount > 9 ? '9+' : notifCount}
              </span>
            )}
          </button>

          <div className="hidden md:flex items-center gap-2 font-jakarta font-medium text-sm leading-5 text-slate-500">
            <CalendarIcon className="w-4 h-4" style={{ color: '#64748B' }} />
            <span>{today}</span>
          </div>

          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-300 shrink-0"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className="w-9 h-9 bg-slate-200 text-slate-600 rounded-full items-center justify-center font-medium border border-slate-300 text-sm shrink-0"
                style={{ display: user?.avatarUrl ? 'none' : 'flex' }}
              >
                {getInitials(`${user?.prenom || ''} ${user?.nom || ''}`)}
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
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition">
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}