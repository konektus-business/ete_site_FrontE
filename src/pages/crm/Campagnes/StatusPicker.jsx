import { useState, useEffect } from 'react';
import { Search, Settings2, ListChecks, DollarSign, Ban, PhoneCall } from 'lucide-react';
import { getCampaignsWithStatusCount, getGlobalStatusStats } from '../../../api/campaigns';
import Button from '../../../components/common/ButtonCRM';
import KPIWidget from '../../../components/dashboard/KPIWidget';

export default function StatusPicker({ onSelect }) {
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Promise.all([getCampaignsWithStatusCount(), getGlobalStatusStats()]).then(([campaignsData, statsData]) => {
      setCampaigns(campaignsData);
      setStats(statsData);
      setLoading(false);
    });
  }, []);

  const filtered = campaigns.filter((c) =>
    `${c.campaign_name} ${c.campaign_id}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Carte filtre, même format que CdrList/RHStats/AgentsStats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans font-semibold text-sm text-gray-900">Gestion des statuts par campagne</h3>
          <span className="text-xs text-gray-400">{new Date().toLocaleString('fr-FR')}</span>
        </div>

        <div className="relative max-w-xs">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une campagne..."
            className="w-full h-[38px] pl-9 pr-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-sm text-gray-400">
          Chargement...
        </div>
      ) : (
        <>
          {/* Widgets nus, comme sur CdrList (pas de carte englobante) */}
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPIWidget icon={<ListChecks className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />} title="Statuts configurés" badge="GLOBAL" value={stats.total} showPercent={false} />
              <KPIWidget icon={<DollarSign className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />} title="Statuts vente" badge="GLOBAL" value={stats.sale} showPercent={false} />
              <KPIWidget icon={<Ban className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />} title="Statuts DNC" badge="GLOBAL" value={stats.dnc} showPercent={false} />
              <KPIWidget icon={<PhoneCall className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />} title="Rappels programmés" badge="GLOBAL" value={stats.callback} showPercent={false} />
            </div>
          )}

          {/* "Table" : grille des campagnes, dans sa propre carte comme Table.jsx */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            {filtered.length === 0 ? (
              <div className="text-center text-sm text-gray-400 py-6">Aucune campagne active trouvée</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filtered.map((c) => (
                  <div key={c.campaign_id} className="rounded-xl border border-gray-100 shadow-sm p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-bold text-gray-900">{c.campaign_name}</h3>
                      <span className="px-2 py-1 rounded-[4px] bg-[#F0FDF4] text-[#059669] text-[10px] font-bold uppercase whitespace-nowrap">
                        {c.status_count} statut{c.status_count > 1 ? 's' : ''}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">ID: {c.campaign_id}</p>
                    <Button variant="secondary" onClick={() => onSelect(c)} className="w-full flex items-center justify-center gap-1.5">
                      <Settings2 className="w-3.5 h-3.5" /> Gérer les statuts
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}