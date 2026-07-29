import { useState, useEffect } from 'react';
import Select from '../../../components/common/Select';
import MultiSelect from '../../../components/common/MultiSelect';
import { getCampaignsList, getInboundStats } from '../../../api/statsReports';
import { checkboxClass } from '../../../styles/checkboxClass'; 
import { getDefaultDates } from '../../../utils/dateUtils';
import MultiMetricChart from '../../../components/dashboard/MultiMetricChart';
import { periodOptions } from '../../../config/periodOptions';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';
import PeriodFilter from '../../../components/dashboard/PeriodFilter';
import Button from '../../../components/common/ButtonCRM';

const metricsConfig = [
  { key: 'total_fiches', label: 'Total Fiches' },
  { key: 'avg_talk', label: 'Durée Com. (s)' },
  { key: 'avg_dispo', label: 'Durée Traitement (s)' },
  { key: 'avg_wait', label: 'Durée Attente (s)' },
  { key: 'avg_pause', label: 'Durée Mise en attente (s)' },
];
// Fait le lien entre les clés "snake_case" des checkboxes (metricsConfig)
// et les champs "camelCase" réellement renvoyés par getInboundStats()
const metricsFieldMap = {
  total_fiches: { field: 'totalFiches', color: '#1EB394' },
  avg_talk: { field: 'avgTalk', color: '#2563EB' },
  avg_dispo: { field: 'avgDispo', color: '#F59E0B' },
  avg_wait: { field: 'avgWait', color: '#EF4444' },
  avg_pause: { field: 'avgPause', color: '#8B5CF6' },
};

const initialMetrics = metricsConfig.reduce((acc, m) => ({ ...acc, [m.key]: true }), {});


export default function InboundStats() {
  const [period, setPeriod] = useState('today');
  const [dates, setDates] = useState(getDefaultDates());
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [metrics, setMetrics] = useState(initialMetrics);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCampaignsList().then(setCampaigns);
    fetchStats();
  }, []);

  const fetchStats = () => {
    setLoading(true);
    getInboundStats({ period, ...dates, campaigns: selectedCampaigns, metrics }).then((data) => {
      setChartData(data);
      setLoading(false);
    });
  };
  

  const toggleMetric = (key) => {
    setMetrics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isCustom = period === 'custom';


  // Construit dynamiquement les séries à afficher, en filtrant sur les
  // métriques cochées (metrics) et en piochant les bonnes couleurs/labels
  const activeSeries = metricsConfig
    .filter((m) => metrics[m.key])
    .map((m) => {
      const { field, color } = metricsFieldMap[m.key];
      return { key: m.key, label: m.label, color, data: chartData?.[field] ?? [] };
    });
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-sans font-semibold text-sm text-gray-900">Appels entrants - Performance</h3>
          <span className="text-xs text-gray-400">{new Date().toLocaleString('fr-FR')}</span>
        </div>

        <div className="p-6">
          {/* Filtres — tous alignés sur la même ligne */}
          <div className="flex flex-wrap items-end gap-4 mb-6">
            <PeriodFilter period={period} setPeriod={setPeriod} dates={dates} setDates={setDates} />


            {/* Dropdown Campagnes via MultiSelect */}
            <div className="w-60">
              <label className={labelClass}>Campagnes</label>
              <MultiSelect
                values={selectedCampaigns}
                onChange={setSelectedCampaigns}
                options={campaigns}
                placeholder="Toutes les campagnes"
              />
            </div>


              <Button type="submit" variant="primary">Appliquer</Button>
             
          </div>

          {/* Métriques */}
          <div className="mb-6 pt-5 border-t border-gray-100">
            <label className="block text-xs font-medium text-gray-500 mb-3">Métriques à afficher</label>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {metricsConfig.map((m) => (
                <label
                  key={m.key}
                  className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={metrics[m.key]}
                    onChange={() => toggleMetric(m.key)}
                    className={checkboxClass}
                  />
                  {m.label}
                </label>
              ))}
            </div>
          </div>

        {/* Graphique */}
        <div className="h-[400px] w-full rounded-xl border border-gray-100 bg-gray-50/60 p-4">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <span className="text-xs text-gray-400">Chargement...</span>
            </div>
          ) : (
            <MultiMetricChart
              labels={chartData?.labels ?? []}
              series={activeSeries}
              height={370}
            />
          )}
        </div>
        </div>
      </div>
    </div>
  );
}