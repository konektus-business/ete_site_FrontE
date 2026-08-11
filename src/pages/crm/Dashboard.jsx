import { useState, useEffect, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getDashboardStats } from '../../api/dashboardStats';
import { widgetsConfig } from '../../config/dashboardWidgets';
import KPIWidget from '../../components/dashboard/KPIWidget';
import KPISkeleton from '../../components/dashboard/KPISkeleton';
import EvolutionChart from '../../components/dashboard/EvolutionChart';
import CampaignDonutChart from '../../components/dashboard/CampaignDonutChart';
import { getCallsEvolution, getCampaignsRepartition } from '../../api/dashboardCharts';
import { getDefaultDates } from '../../utils/dateUtils';
import { labelClass } from '../../styles/formClasses';
import Button from '../../components/common/ButtonCRM';
import DateInput from '../../components/common/DateInput';
import Table from '../../components/dashboard/Table';
import { buildSearchRows, searchTypeColors } from '../../utils/searchRows';

export default function Dashboard() {
  const { searchQuery, searchResults, searchLoading } = useOutletContext();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState(getDefaultDates());

  // Récupération sécurisée des statistiques KPI
  const fetchStats = useCallback(async (startDate, endDate) => {
    setLoading(true);
    try {
      const data = await getDashboardStats(startDate, endDate);
      setStats(data);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques du dashboard :', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats(dates.startDate, dates.endDate);
  }, [fetchStats, dates.startDate, dates.endDate]);

  const handleApply = (e) => {
    e.preventDefault();
    fetchStats(dates.startDate, dates.endDate);
  };

  const handleReset = () => {
    const defaults = getDefaultDates();
    setDates(defaults);
    fetchStats(defaults.startDate, defaults.endDate);
  };

  // Une recherche est "active" dès que la query fait 2+ caractères
  const isSearching = searchQuery && searchQuery.trim().length >= 2;

  // Mémoïsation des données et de la configuration du tableau de recherche
  const searchRows = useMemo(
    () => (isSearching ? buildSearchRows(searchResults) : []),
    [isSearching, searchResults]
  );

  const searchColumns = useMemo(
    () => [
      {
        key: 'type',
        label: 'Type',
        render: (row) => (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
              searchTypeColors[row.type] || 'bg-gray-50 text-gray-700'
            }`}
          >
            {row.type}
          </span>
        ),
      },
      {
        key: 'label',
        label: 'Nom',
        render: (row) => (
          <span className="text-sm font-medium text-gray-900">{row.label}</span>
        ),
      },
      {
        key: 'meta',
        label: 'Détails',
        render: (row) => <span className="text-xs text-gray-500">{row.meta}</span>,
      },
    ],
    []
  );

  const renderSearchResults = () => {
    if (searchLoading) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-sm text-gray-400">
          Recherche en cours...
        </div>
      );
    }

    if (searchRows.length === 0) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-sm text-gray-400">
          Aucun résultat pour « {searchQuery} »
        </div>
      );
    }

    return <Table data={searchRows} columns={searchColumns} itemLabel="résultats" />;
  };

  if (isSearching) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-sans font-semibold text-sm text-gray-700">
            Résultats pour « {searchQuery} »
          </h2>
        </div>

        {renderSearchResults()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtre de dates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <form onSubmit={handleApply} className="flex flex-wrap items-end gap-3">
          <div className="w-40">
            <label htmlFor="startDate" className={labelClass}>Du</label>
            <DateInput
              id="startDate"
              value={dates.startDate}
              onChange={(e) =>
                setDates((prev) => ({ ...prev, startDate: e.target.value }))
              }
              rangeStart={dates.startDate}
              rangeEnd={dates.endDate}
            />
          </div>
          <div className="w-40">
            <label htmlFor="endDate" className={labelClass}>Au</label>
            <DateInput
              id="endDate"
              value={dates.endDate}
              onChange={(e) =>
                setDates((prev) => ({ ...prev, endDate: e.target.value }))
              }
              rangeStart={dates.startDate}
              rangeEnd={dates.endDate}
            />
          </div>

          <Button type="submit" variant="primary">
            Appliquer
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Réinitialiser
          </Button>
        </form>
      </div>

      {/* Widgets KPI */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <KPISkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {widgetsConfig.map(
            ({ key, icon: Icon, title, badge, variationLabel, suffix = '' }) => {
              const data = stats?.[key];
              if (!data) return null;

              return (
                <KPIWidget
                  key={key}
                  icon={<Icon className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
                  title={title}
                  badge={badge}
                  value={`${data.total?.toLocaleString('fr-FR') ?? 0}${suffix}`}
                  variation={data.variation}
                  variationLabel={variationLabel}
                  showPercent={false}
                  sparklineData={data.sparkline}
                />
              );
            }
          )}
        </div>
      )}

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <EvolutionChart
            title="Évolution des appels"
            fetchData={getCallsEvolution}
          />
        </div>
        <div className="lg:col-span-1">
          <CampaignDonutChart fetchData={getCampaignsRepartition} />
        </div>
      </div>
    </div>
  );
}