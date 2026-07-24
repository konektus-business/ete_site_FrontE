import { NavLink } from 'react-router-dom';
import { getInitials } from '../../utils/avatar';
import logo from '../../assets/logo.png';
import { ChevronDown, LayoutDashboard, Users, Radio, BarChart3, Mic, Headset, Megaphone, UserPlus, FileClock, Link2, Plug, Phone } from 'lucide-react';


const LogOutIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.1667 13.332L17.5 9.9987M17.5 9.9987L14.1667 6.66536M17.5 9.9987H5.83333M10.8333 13.332V14.1654C10.8333 15.5461 9.71404 16.6654 8.33333 16.6654H5C3.61929 16.6654 2.5 15.5461 2.5 14.1654V5.83203C2.5 4.45132 3.61929 3.33203 5 3.33203H8.33333C9.71404 3.33203 10.8333 4.45132 10.8333 5.83203V6.66536"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export default function Sidebar({ user, isOpen }) {
const menuItems = [
  { path: 'dashboard', label: "Dashboard", icon: LayoutDashboard },  
  { path: 'users', label: 'Users', icon: Users },
  { path: 'panneauLive', label: 'PanneauLive', icon: Radio },
  { path: 'stats', label: 'Stats', icon: BarChart3 },
  { path: 'enregistrement', label: 'Enregistrement', icon: Mic },
  { path: 'operateur', label: "Operateurs", icon: Headset },  
  { path: 'compagnes', label: 'Compagnes', icon: Megaphone },
  { path: 'leads', label: 'Leads', icon: UserPlus },
  { path: 'CDR', label: 'CDR', icon: FileClock },
  { path: 'VTM', label: 'VTM', icon: Link2 },
  { path: 'integration', label: 'Integration', icon: Plug },
  { path: 'VOIP', label: 'VOIP', icon: Phone },
];

  return (
      <aside
        className={`
          h-screen bg-crmSidebarBg text-slate-300 flex flex-col sticky top-0 left-0
          overflow-y-auto transition-all duration-300 ease-in-out min-w-0
          ${isOpen ? 'w-[256px]' : 'w-0 overflow-hidden'}
        `}
      >
      <div className="flex flex-col">
        <div className="h-[64px] flex items-center gap-3 w-[256px] mb-2">
          <div className="h-[85.5px] flex items-center w-[256px]">
            <div className="w-[75px] h-[46px] flex items-center justify-center">
              <img 
                src={logo} 
                alt="Logo KoneKTUs" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-end h-[46px]">
              <span className="font-jakarta font-bold text-[18px] leading-[22.5px] tracking-normal text-white">KoneKtUs</span>
              <span className="font-jakarta font-semibold text-[10px] leading-[15px] tracking-[1px] uppercase text-emerald-400">CRM</span>
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
    </aside>
  );
}