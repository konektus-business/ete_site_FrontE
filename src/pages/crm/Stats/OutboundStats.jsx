import { useState, useEffect } from 'react';
import { getCampaignsList, getListsData, getOutboundStats } from '../../../api/statsReports';
import Select from '../../../components/common/Select';
import MultiSelect from '../../../components/common/MultiSelect';
import { getDefaultDates } from '../../../utils/dateUtils';
import MultiMetricChart from '../../../components/dashboard/MultiMetricChart';
import { periodOptions } from '../../../config/periodOptions';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';
import PeriodFilter from '../../../components/dashboard/PeriodFilter';
import Button from '../../../components/common/ButtonCRM';

// Définit les 5 métriques fixes à afficher, avec les mêmes couleurs
const outboundMetrics = [
  { field: 'totalFiches', label: 'Total Fiches', color: '#1EB394' },
  { field: 'avgTalk', label: 'Durée Com. (s)', color: '#2563EB' },
  { field: 'avgDispo', label: 'Durée Traitement (s)', color: '#F59E0B' },
  { field: 'avgWait', label: 'Durée Attente (s)', color: '#EF4444' },
  { field: 'avgPause', label: 'Durée Mise en attente (s)', color: '#8B5CF6' },
];

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


  // Transforme la config statique en séries prêtes pour le graphique,
  // en piochant les données réelles dans chartData
  const activeSeries = outboundMetrics.map((m) => ({
    key: m.field,
    label: m.label,
    color: m.color,
    data: chartData?.[m.field] ?? [],
  }));
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-sans font-semibold text-sm text-gray-900">Appels sortants - Performance</h3>
          <span className="text-xs text-gray-400">{new Date().toLocaleString('fr-FR')}</span>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-end gap-4 mb-6">
              <PeriodFilter period={period} setPeriod={setPeriod} dates={dates} setDates={setDates} />

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


            <Button type="submit" variant="primary">Appliquer</Button>

          </div>

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