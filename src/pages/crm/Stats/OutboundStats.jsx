import { useState, useEffect, useCallback, useMemo } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { getCampaignsList, getListsData, getOutboundStats } from '../../../api/statsReports';
import MultiSelect from '../../../components/common/MultiSelect';
import { getDefaultDates } from '../../../utils/dateUtils';
import MultiMetricChart from '../../../components/dashboard/MultiMetricChart';
import { labelClass } from '../../../styles/formClasses';
import PeriodFilter from '../../../components/dashboard/PeriodFilter';
import Button from '../../../components/common/ButtonCRM';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction de rechargement manuel déclenchée par "Appliquer"
  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOutboundStats({
        period,
        ...dates,
        campaigns: selectedCampaigns,
        lists: selectedLists,
      });
      setChartData(data);
    } catch {
      setError("Erreur lors du chargement des statistiques d'appels sortants.");
      setChartData(null);
    } finally {
      setLoading(false);
    }
  }, [period, dates, selectedCampaigns, selectedLists]);

  // Chargement des listes de filtres et premier affichage des statistiques au montage
  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getCampaignsList().catch(() => []),
      getListsData().catch(() => []),
    ]).then(([campaignsData, listsData]) => {
      if (isMounted) {
        if (campaignsData) setCampaigns(campaignsData);
        if (listsData) setLists(listsData);
      }
    });

  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Structuration mémoïsée des séries du graphique
  const activeSeries = useMemo(() => {
    return outboundMetrics.map((m) => ({
      key: m.field,
      label: m.label,
      color: m.color,
      data: chartData?.[m.field] ?? [],
    }));
  }, [chartData]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-sans font-semibold text-sm text-gray-900">
            Appels sortants - Performance
          </h3>
          <span className="text-xs text-gray-400">
            {new Date().toLocaleString('fr-FR')}
          </span>
        </div>

        <div className="p-6">
          {/* Filtres */}
          <div className="flex flex-wrap items-end gap-4 mb-6">
            <PeriodFilter
              period={period}
              setPeriod={setPeriod}
              dates={dates}
              setDates={setDates}
            />

            <div className="w-56">
              <label htmlFor="campaigns" className={labelClass}>
                Campagnes
              </label>
              <MultiSelect
                id="campaigns"
                values={selectedCampaigns}
                onChange={setSelectedCampaigns}
                options={campaigns}
                placeholder="Toutes les campagnes"
              />
            </div>

            <div className="w-56">
              <label htmlFor="lists" className={labelClass}>
                Fichiers (listes)
              </label>
              <MultiSelect
                id="lists"
                values={selectedLists}
                onChange={setSelectedLists}
                options={lists}
                placeholder="Toutes les listes"
              />
            </div>

            <Button type="button" variant="primary" onClick={fetchStats}>
              Appliquer
            </Button>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-6 px-4 py-2.5 rounded-lg bg-red-50 text-red-700 border border-red-100 text-xs font-medium flex items-center justify-between gap-2">
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

          {/* Graphique */}
          <div className="h-[400px] w-full rounded-xl border border-gray-100 bg-gray-50/60 p-4">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <span className="text-xs text-gray-400">
                  Chargement des données...
                </span>
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