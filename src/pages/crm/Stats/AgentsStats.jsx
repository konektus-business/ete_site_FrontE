import { useState, useEffect, useCallback } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { getAgentsStats } from '../../../api/statsReports';
import { agentsStatsColumns } from '../../../config/statsColumns';
import Table from '../../../components/dashboard/Table';
import { getDefaultDates } from '../../../utils/dateUtils';
import PeriodFilter from '../../../components/dashboard/PeriodFilter';
import Button from '../../../components/common/ButtonCRM';

export default function AgentsStats() {
  const [period, setPeriod] = useState('today');
  const [dates, setDates] = useState(getDefaultDates());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction de chargement appelée manuellement via "Appliquer"
  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAgentsStats({ period, ...dates });
      const statsList = Array.isArray(result) ? result : result?.data || [];
      setData(statsList);
    } catch {
      setError('Erreur lors du chargement des statistiques agents.');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [period, dates]);

  // Chargement initial unique au montage
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans font-semibold text-sm text-gray-900">
            Rapports agents
          </h3>
          <span className="text-xs text-gray-400">
            {new Date().toLocaleString('fr-FR')}
          </span>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <PeriodFilter
            period={period}
            setPeriod={setPeriod}
            dates={dates}
            setDates={setDates}
          />

          <Button type="button" variant="primary" onClick={fetchStats}>
            Appliquer
          </Button>
        </div>
      </div>

      {/* Banner d'erreur */}
      {error && (
        <div className="px-4 py-2.5 rounded-lg bg-red-50 text-red-700 border border-red-100 text-xs font-medium flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-sm text-gray-400">
          Chargement des statistiques...
        </div>
      ) : (
        <Table
          columns={agentsStatsColumns}
          data={data}
          onRowClick={() => {}}
          itemLabel="agents"
        />
      )}

      {/* TODO: graphique agent-chart (Chart.js) — session dédiée à venir */}
    </div>
  );
}