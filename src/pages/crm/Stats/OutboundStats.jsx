import { useState, useEffect } from 'react';
import { getCampaignsList, getListsData, getOutboundStats } from '../../../api/statsReports';
import Select from '../../../components/common/Select';
import MultiSelect from '../../../components/common/MultiSelect';
import { getDefaultDates } from '../../../utils/dateUtils';

export default function OutboundStats() {
  const [period, setPeriod] = useState('today');
  const [dates, setDates] = useState(getDefaultDates());
  const [campaigns, setCampaigns] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [selectedLists, setSelectedLists] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCampaignsList().then(setCampaigns);
    getListsData().then(setLists);
    fetchStats();
  }, []);

  const fetchStats = () => {
    setLoading(true);
    getOutboundStats({ period, ...dates, campaigns: selectedCampaigns, lists: selectedLists }).then((data) => {
      setChartData(data);
      setLoading(false);
    });
  };

  const isCustom = period === 'custom';
  const labelClass = 'block text-xs font-medium text-gray-500 mb-1.5';
  const inputClass =
    'w-full h-[38px] rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-colors';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-sans font-semibold text-sm text-gray-900">Appels sortants - Performance</h3>
          <span className="text-xs text-gray-400">{new Date().toLocaleString('fr-FR')}</span>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-end gap-4 mb-6">
            <div className="w-40">
              <label className={labelClass}>Période</label>
              <Select
                value={period}
                onChange={setPeriod}
                options={[
                  { value: 'today', label: "Aujourd'hui" },
                  { value: 'yesterday', label: 'Hier' },
                  { value: 'week', label: 'Cette semaine' },
                  { value: 'month', label: 'Ce mois' },
                  { value: 'custom', label: 'Personnalisée' },
                ]}
              />
            </div>

            {isCustom && (
              <>
                <div className="w-40">
                  <label className={labelClass}>Date début</label>
                  <input
                    type="date"
                    value={dates.startDate}
                    onChange={(e) => setDates((prev) => ({ ...prev, startDate: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div className="w-40">
                  <label className={labelClass}>Date fin</label>
                  <input
                    type="date"
                    value={dates.endDate}
                    onChange={(e) => setDates((prev) => ({ ...prev, endDate: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              </>
            )}

            <div className="w-56">
              <label className={labelClass}>Campagnes</label>
              <MultiSelect
                values={selectedCampaigns}
                onChange={setSelectedCampaigns}
                options={campaigns}
                placeholder="Toutes les campagnes"
              />
            </div>

            <div className="w-56">
              <label className={labelClass}>Fichiers (listes)</label>
              <MultiSelect
                values={selectedLists}
                onChange={setSelectedLists}
                options={lists}
                placeholder="Toutes les listes"
              />
            </div>

            <button
              onClick={fetchStats}
              className="h-[38px] px-4 rounded-lg text-sm font-medium text-white bg-crmPrimary hover:brightness-95 transition-colors whitespace-nowrap"
            >
              Appliquer
            </button>
          </div>

          <div className="h-[400px] w-full rounded-xl border border-gray-100 bg-gray-50/60 flex items-center justify-center">
            {loading ? (
              <span className="text-xs text-gray-400">Chargement...</span>
            ) : (
              <span className="text-xs text-gray-400">
                Graphique Chart.js à venir — {chartData?.labels.length ?? 0} points de données prêts
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}