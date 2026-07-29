import { useState, useEffect } from 'react';
import { getAgentsStats } from '../../../api/statsReports';
import { agentsStatsColumns } from '../../../config/statsColumns';
import Select from '../../../components/common/Select';
import Table from '../../../components/dashboard/Table';
import { getDefaultDates } from '../../../utils/dateUtils';
import { periodOptions } from '../../../config/periodOptions';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';
import PeriodFilter from '../../../components/dashboard/PeriodFilter';
import Button from '../../../components/common/ButtonCRM';

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
          <PeriodFilter period={period} setPeriod={setPeriod} dates={dates} setDates={setDates} />


        <Button type="submit" variant="primary">Appliquer</Button>

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