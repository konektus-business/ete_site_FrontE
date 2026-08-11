import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Users, Clock, Phone, PauseCircle, AlertCircle, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { getRHStats } from '../../../api/statsReports';
import { rhStatsColumns } from '../../../config/statsColumns';
import Table from '../../../components/dashboard/Table';
import KPIWidget from '../../../components/dashboard/KPIWidget';
import BarChart from '../../../components/dashboard/BarChart';
import { getDefaultDates } from '../../../utils/dateUtils';
import { durationToMinutes } from '../../../utils/timeFormat';
import { exportToExcel } from '../../../utils/exportExcel';
import PeriodFilter from '../../../components/dashboard/PeriodFilter';
import Button from '../../../components/common/ButtonCRM';

const NO_OP = () => {};

const rhExportColumns = [
  { key: 'agent', label: 'Agent' },
  { key: 'login', label: "Nom d'utilisateur" },
  { key: 'premiereConnexion', label: '1ère connexion' },
  { key: 'derniereDeconnexion', label: 'Dernière déconnexion' },
  { key: 'production', label: 'Production' },
  { key: 'pausesProductives', label: 'Pauses productives' },
  { key: 'pausesNonProductives', label: 'Pauses non productives' },
];

export default function RHStats() {
  const [period, setPeriod] = useState('today');
  const [dates, setDates] = useState(getDefaultDates());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState(null);

  const captureRef = useRef(null);

  // Fonction de chargement explicite (appelée lors du clic sur le bouton "Appliquer")
  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getRHStats({ period, ...dates });
      setData(result);
    } catch {
      setError('Erreur lors du chargement des statistiques RH.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [period, dates]);

  // Effet de chargement automatique sécurisé contre les fuites de mémoire (unmount)
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getRHStats({ period, ...dates })
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Erreur lors du chargement des statistiques RH.');
          setData(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [period, dates]);

  const handleExportExcel = useCallback(() => {
    if (!data?.rows) return;
    try {
      exportToExcel(
        data.rows,
        `rapport-rh-${dates.startDate}-au-${dates.endDate}`,
        rhExportColumns
      );
    } catch {
      setError("Échec de l'exportation du fichier Excel.");
    }
  }, [data, dates]);

  const handleExportPng = useCallback(async () => {
    if (!captureRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `rapport-rh-${dates.startDate}-au-${dates.endDate}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setError("Échec de la capture d'écran PNG.");
    } finally {
      setExporting(false);
    }
  }, [dates]);

  const chartLabels = useMemo(
    () => data?.rows?.map((r) => r.agent) ?? [],
    [data]
  );

  const pauseChartSeries = useMemo(() => {
    if (!data?.rows) return [];
    return [
      {
        label: 'Pauses productives',
        color: '#1EB394',
        data: data.rows.map((r) =>
          Math.round(durationToMinutes(r.pausesProductives ?? 0))
        ),
      },
      {
        label: 'Pauses non productives',
        color: '#F59E0B',
        data: data.rows.map((r) =>
          Math.round(durationToMinutes(r.pausesNonProductives ?? 0))
        ),
      },
    ];
  }, [data]);

  const formattedDate = useMemo(() => new Date().toLocaleString('fr-FR'), []);

  // Encapsulation des conditions d'affichage pour éviter la ternaire imbriquée dans le JSX
  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center text-sm text-gray-400 py-12">
          Chargement des données...
        </div>
      );
    }

    if (!data) return null;

    return (
      <div ref={captureRef} className="p-1 bg-white rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <KPIWidget
            icon={<Users className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
            title="Agents actifs"
            badge="PÉRIODE"
            value={data.widgets?.agentsActifs ?? 0}
            showPercent={false}
          />
          <KPIWidget
            icon={<Clock className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
            title="Production totale"
            badge="PÉRIODE"
            value={data.widgets?.productionTotale ?? '00:00:00'}
            showPercent={false}
          />
          <KPIWidget
            icon={<Phone className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
            title="Appels total"
            badge="PÉRIODE"
            value={data.widgets?.appelsTotal ?? 0}
            showPercent={false}
          />
          <KPIWidget
            icon={<PauseCircle className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
            title="Pauses totales"
            badge="PÉRIODE"
            value={data.widgets?.pausesTotales ?? '00:00:00'}
            showPercent={false}
          />
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Pauses par agent (minutes)
          </h4>
          <div className="h-[280px] w-full rounded-xl border border-gray-100 bg-gray-50/60 p-4">
            <BarChart
              labels={chartLabels}
              series={pauseChartSeries}
              height={250}
            />
          </div>
        </div>

        <Table
          columns={rhStatsColumns}
          data={data.rows ?? []}
          onRowClick={NO_OP}
          itemLabel="agents"
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-sans font-semibold text-sm text-gray-900">
            Rapports RH
          </h3>
          <span className="text-xs text-gray-400">{formattedDate}</span>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-end gap-4 mb-6">
            <PeriodFilter
              period={period}
              setPeriod={setPeriod}
              dates={dates}
              setDates={setDates}
            />

            <Button type="button" variant="primary" onClick={fetchStats}>
              Appliquer
            </Button>

            <div className="flex gap-2 ml-auto">
              <Button
                type="button"
                variant="warning"
                onClick={handleExportExcel}
                disabled={!data?.rows || loading || exporting}
              >
                Excel
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={handleExportPng}
                disabled={!data || loading || exporting}
              >
                {exporting ? 'Capture...' : 'PNG'}
              </Button>
            </div>
          </div>

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

          {renderContent()}
        </div>
      </div>
    </div>
  );
}