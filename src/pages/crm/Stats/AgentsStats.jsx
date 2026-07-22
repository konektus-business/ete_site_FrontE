import { useState, useEffect } from 'react';
import { getAgentsStats } from '../../../api/statsReports';
import { agentsStatsColumns } from '../../../config/statsColumns';
import Select from '../../../components/common/Select';
import Table from '../../../components/dashboard/Table';
import { getDefaultDates } from '../../../utils/dateUtils';

export default function AgentsStats() {
  const [period, setPeriod] = useState('today');
  const [dates, setDates] = useState(getDefaultDates());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    setLoading(true);
    getAgentsStats({ period, ...dates }).then((result) => {
      setData(result);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const isCustom = period === 'custom';

  const inputClass =
    'w-full h-[38px] rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-colors';
  const labelClass = 'block text-xs font-medium text-gray-500 mb-1.5';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans font-semibold text-sm text-gray-900">Rapports agents</h3>
          <span className="text-xs text-gray-400">
            {new Date().toLocaleString('fr-FR')}
          </span>
        </div>

        <div className="flex flex-wrap items-end gap-3">
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

          <button
            onClick={fetchStats}
            className="h-[38px] px-4 rounded-lg text-sm font-medium text-white bg-crmPrimary hover:brightness-95 transition-colors"
          >
            Appliquer
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-sm text-gray-400">
          Chargement...
        </div>
      ) : (
        <Table columns={agentsStatsColumns} data={data} onRowClick={() => {}} itemLabel="agents" />
      )}

      {/* TODO: graphique agent-chart (Chart.js) — session dédiée à venir */}
    </div>
  );
}