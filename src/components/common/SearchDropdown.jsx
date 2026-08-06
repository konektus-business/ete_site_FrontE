// src/components/common/SearchDropdown.jsx
import { useNavigate } from 'react-router-dom';
import { Users, Layers, Megaphone, PhoneCall, Search as SearchIcon } from 'lucide-react';

// ADAPTE les routes ci-dessous a tes vraies routes react-router.
// Pas de routes detail par id dans ce projet (voir App.jsx) : chaque resultat
// renvoie simplement vers la page liste correspondante.
// -> Les "Groupes" n'ont pas de route dediee, je pars du principe qu'ils sont
//    un onglet dans la page Users (comme le reste de tes modules a onglets).
//    Dis-moi si c'est different et j'ajuste.
const SECTIONS = [
  { key: 'agents', label: 'Agents', icon: Users, path: () => '/crm/users' },
  { key: 'groupes', label: 'Groupes', icon: Layers, path: () => '/crm/users' },
  { key: 'campagnes', label: 'Campagnes', icon: Megaphone, path: () => '/crm/compagnes' },
  { key: 'appels', label: 'Appels', icon: PhoneCall, path: () => '/crm/CDR' },
];

export default function SearchDropdown({ results, loading, query, onSelect }) {
  const navigate = useNavigate();
  const hasResults = results && Object.values(results).some((arr) => arr.length > 0);

  const handleClick = (section, item) => {
    navigate(section.path(item));
    onSelect?.();
  };

  return (
    <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg max-h-96 overflow-y-auto z-50">
      {loading ? (
        <div className="px-4 py-6 text-center text-sm text-slate-400">Recherche en cours...</div>
      ) : !hasResults ? (
        <div className="px-4 py-6 flex flex-col items-center gap-2 text-sm text-slate-400">
          <SearchIcon className="w-5 h-5 text-slate-300" />
          Aucun resultat pour « {query} »
        </div>
      ) : (
        SECTIONS.map((section) => {
          const items = results[section.key] || [];
          if (items.length === 0) return null;
          const Icon = section.icon;
          return (
            <div key={section.key} className="py-2 border-b border-slate-100 last:border-0">
              <p className="px-4 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                {section.label}
              </p>
              {items.map((item) => (
                <button
                  key={item.id || item.group_name || item.campaign_id}
                  onClick={() => handleClick(section, item)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-crmPrimary shrink-0" />
                  <span className="truncate">
                    {item.full_name || item.campaign_name || item.group_name || item.phone_number}
                  </span>
                </button>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}