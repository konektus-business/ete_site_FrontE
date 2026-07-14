import { NavLink } from 'react-router-dom';
import { getInitials } from '../../utils/avatar';
import { ChevronDown } from 'lucide-react';
import logo from '../../assets/logo.png';

// Icônes custom exportées depuis Figma
const HomeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.832031 8.33203L2.4987 6.66536M2.4987 6.66536L8.33203 0.832031L14.1654 6.66536M2.4987 6.66536V14.9987C2.4987 15.4589 2.87179 15.832 3.33203 15.832H5.83203M14.1654 6.66536L15.832 8.33203M14.1654 6.66536V14.9987C14.1654 15.4589 13.7923 15.832 13.332 15.832H10.832M5.83203 15.832C6.29227 15.832 6.66536 15.4589 6.66536 14.9987V11.6654C6.66536 11.2051 7.03846 10.832 7.4987 10.832H9.16536C9.6256 10.832 9.9987 11.2051 9.9987 11.6654V14.9987C9.9987 15.4589 10.3718 15.832 10.832 15.832M5.83203 15.832H10.832"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShoppingCartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.9375 0.0000395357C0.68886 0.0000395357 0.450403 0.0988118 0.274587 0.274627C0.098772 0.450442 0 0.688899 0 0.93754C0 1.18618 0.098772 1.42464 0.274587 1.60045C0.450403 1.77627 0.68886 1.87504 0.9375 1.87504H3.01875L5.47875 11.7188C5.68781 12.5532 6.435 13.125 7.29469 13.125H18.9853C19.8319 13.125 20.5509 12.5625 20.7731 11.7469L23.2031 2.81254H21.24L18.9844 11.25H7.29375L4.83469 1.40629C4.73311 1.00244 4.49895 0.644363 4.1697 0.389396C3.84045 0.13443 3.43517 -0.00267463 3.01875 0.0000395357H0.9375ZM17.8125 13.125C16.2703 13.125 15 14.3954 15 15.9375C15 17.4797 16.2703 18.75 17.8125 18.75C19.3547 18.75 20.625 17.4797 20.625 15.9375C20.625 14.3954 19.3547 13.125 17.8125 13.125ZM9.375 13.125C7.83281 13.125 6.5625 14.3954 6.5625 15.9375C6.5625 17.4797 7.83281 18.75 9.375 18.75C10.9172 18.75 12.1875 17.4797 12.1875 15.9375C12.1875 14.3954 10.9172 13.125 9.375 13.125ZM12.1875 0.0000395357V4.68754H9.375L13.125 8.43754L16.875 4.68754H14.0625V0.0000395357H12.1875ZM9.375 15C9.90375 15 10.3125 15.4088 10.3125 15.9375C10.3125 16.4663 9.90375 16.875 9.375 16.875C8.84625 16.875 8.4375 16.4663 8.4375 15.9375C8.4375 15.4088 8.84625 15 9.375 15ZM17.8125 15C18.3412 15 18.75 15.4088 18.75 15.9375C18.75 16.4663 18.3412 16.875 17.8125 16.875C17.2838 16.875 16.875 16.4663 16.875 15.9375C16.875 15.4088 17.2838 15 17.8125 15Z"
      fill="currentColor" />
  </svg>
);

const UsersIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.356 16.143C7.126 16.717 7 17.344 7 18V20H17V18C17 17.344 16.874 16.717 16.644 16.143C15.8842 14.2443 14.0451 12.9993 12 12.9993C9.9549 12.9993 8.11578 14.2443 7.356 16.143ZM7 20H2V18C2.00009 16.722 2.80979 15.5844 4.01725 15.1658C5.22471 14.7471 6.56484 15.1394 7.356 16.143M15 7C15 8.65575 13.6557 10 12 10C10.3443 10 9 8.65575 9 7C9 5.34425 10.3443 4 12 4C13.6557 4 15 5.34425 15 7ZM7 10C7 11.1038 6.10383 12 5 12C3.89617 12 3 11.1038 3 10C3 8.89617 3.89617 8 5 8C6.10383 8 7 8.89617 7 10Z"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SettingsIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.60417 3.5975C8.95917 2.13417 11.0408 2.13417 11.3958 3.5975C11.5039 4.04338 11.8184 4.41085 12.2422 4.58645C12.6661 4.76206 13.1483 4.72467 13.54 4.48583C14.8258 3.7025 16.2983 5.17417 15.515 6.46083C15.2765 6.85238 15.2392 7.33423 15.4146 7.75782C15.59 8.1814 15.957 8.49583 16.4025 8.60417C17.8658 8.95917 17.8658 11.0408 16.4025 11.3958C15.9566 11.5039 15.5891 11.8184 15.4135 12.2422C15.2379 12.6661 15.2753 13.1483 15.5142 13.54C16.2975 14.8258 14.8258 16.2983 13.5392 15.515C13.1476 15.2765 12.6658 15.2392 12.2422 15.4146C11.8186 15.59 11.5042 15.957 11.3958 16.4025C11.0408 17.8658 8.95917 17.8658 8.60417 16.4025C8.49613 15.9566 8.18164 15.5891 7.75779 15.4135C7.33394 15.2379 6.85172 15.2753 6.46 15.5142C5.17417 16.2975 3.70167 14.8258 4.485 13.5392C4.72349 13.1476 4.76079 12.6658 4.58539 12.2422C4.41 11.8186 4.04298 11.5042 3.5975 11.3958C2.13417 11.0408 2.13417 8.95917 3.5975 8.60417C4.04338 8.49613 4.41085 8.18164 4.58645 7.75779C4.76206 7.33394 4.72467 6.85172 4.48583 6.46C3.7025 5.17417 5.17417 3.70167 6.46083 4.485C7.29083 4.99167 8.37417 4.54333 8.60417 3.5975V3.5975"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5 10C12.5 11.3798 11.3798 12.5 10 12.5C8.62021 12.5 7.5 11.3798 7.5 10C7.5 8.62021 8.62021 7.5 10 7.5C11.3798 7.5 12.5 8.62021 12.5 10V10"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogOutIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.1667 13.332L17.5 9.9987M17.5 9.9987L14.1667 6.66536M17.5 9.9987H5.83333M10.8333 13.332V14.1654C10.8333 15.5461 9.71404 16.6654 8.33333 16.6654H5C3.61929 16.6654 2.5 15.5461 2.5 14.1654V5.83203C2.5 4.45132 3.61929 3.33203 5 3.33203H8.33333C9.71404 3.33203 10.8333 4.45132 10.8333 5.83203V6.66536"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Sidebar({ user } ) {
  const menuItems = [
    { path: 'dashboard', label: "Vue d'ensemble", icon: HomeIcon },
    { path: 'factures', label: 'Ventes et paiements', icon: ShoppingCartIcon },
    { path: 'clients', label: 'Clients', icon: UsersIcon },
    { path: 'settings', label: 'Paramètres', icon: SettingsIcon },
  ];

  return (
    <aside className="w-[256px] h-screen bg-crmSidebarBg text-slate-300 flex flex-col  sticky top-0 left-0 overflow-y-auto">
      <div className="flex flex-col space-y-6">
        <div className="h-[85.5px] flex items-center gap-3 w-[256px]">
          <div className="h-[85.5px] flex items-center w-[256px]">
            <div className="w-[75px] h-[46px] flex items-center justify-center">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-end h-[46px]">
              <span className="font-jakarta font-bold text-[18px] leading-[22.5px] tracking-normal text-white">KoneKtUs</span>
              <span className="font-jakarta font-semibold text-[10px] leading-[15px] tracking-[1px] uppercase text-emerald-400">VTM</span>
            </div>
          </div>
        </div>
        <div className="px-2">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-4 py-3 rounded-xl font-jakarta text-base leading-5 transition-all ${
                isActive
                  ? 'font-medium bg-crmPrimary text-white shadow-md shadow-emerald-950/20'
                  : 'font-normal text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'stroke-2 text-white' : 'stroke-[1.67] text-slate-300/70 group-hover:text-white'
                  }`}
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
            );
          })}
        </nav>
      </div>
    </div>

      
      <div className="mt-36 py-2 px-4 border-t border-white/5 space-y-1">
        <div className="flex items-center justify-between cursor-pointer group p-1 rounded-lg hover:bg-white/5 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-600 border-2 border-emerald-500 overflow-hidden flex items-center justify-center text-white font-bold text-sm">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(`${user.prenom} ${user.nom}`)
              )}
            </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">{user.name}</span>

            <span
              className="inline-flex items-center gap-1"
              style={{
                fontWeight: 400,
                fontSize: '10px',
                lineHeight: '15px',
                letterSpacing: '0px',
                verticalAlign: 'middle',
                color: '#1EB394',
              }}
            >
              {user.role}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="6" fill="#1EB394" />
                <path
                  d="M3.5 6L5 7.5L8.5 4"
                  stroke="#062D24"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          </div>
          <ChevronDown className="w-5 h-5 stroke-[1.33] text-slate-400 group-hover:text-white transition" />
        </div>

        <button className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-[14px] text-slate-300 hover:bg-white/5 hover:text-white transition-all font-medium">
          <LogOutIcon className="w-6 h-6 stroke-[1.67]" />
          <span>Déconnexion</span>
        </button>
      </div>
    
    </aside>
  );
}