import { useState, useEffect, useRef } from 'react';
import { getRHStats } from '../../../api/statsReports';
import { rhStatsColumns } from '../../../config/statsColumns';
import Select from '../../../components/common/Select';
import Table from '../../../components/dashboard/Table';
import KPIWidget from '../../../components/dashboard/KPIWidget';
import BarChart from '../../../components/dashboard/BarChart';
import { Users, Clock, Phone, PauseCircle } from 'lucide-react';
import { getDefaultDates } from '../../../utils/dateUtils';
import { durationToMinutes } from '../../../utils/timeFormat';
import { exportToExcel } from '../../../utils/exportExcel';
import html2canvas from 'html2canvas';
import { periodOptions } from '../../../config/periodOptions';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';
import PeriodFilter from '../../../components/dashboard/PeriodFilter';
import Button from '../../../components/common/ButtonCRM';

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
  const captureRef = useRef(null); // référence vers la zone à capturer en PNG (KPI + graphique + tableau)

  const fetchStats = () => {
    setLoading(true);
    getRHStats({ period, ...dates }).then((result) => {
      setData(result);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleExportExcel = () => {
    if (!data) return;
    exportToExcel(data.rows, `rapport-rh-${dates.startDate}-au-${dates.endDate}`, rhExportColumns);
  };
  // Capture la zone "captureRef" en image PNG et déclenche le téléchargement.
// scale: 2 = rendu en haute résolution (utile si l'image est zoomée ou imprimée)

const handleExportPng = async () => {
  if (!captureRef.current) return;
  const canvas = await html2canvas(captureRef.current, {
    backgroundColor: '#ffffff',
    scale: 2,
  });
  const link = document.createElement('a');
  link.download = `rapport-rh-${dates.startDate}-au-${dates.endDate}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

  const pauseChartSeries = data && [
    {
      label: 'Pauses productives',
      color: '#1EB394',
      data: data.rows.map((r) => Math.round(durationToMinutes(r.pausesProductives))),
    },
    {
      label: 'Pauses non productives',
      color: '#F59E0B',
      data: data.rows.map((r) => Math.round(durationToMinutes(r.pausesNonProductives))),
    },
  ];



  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-sans font-semibold text-sm text-gray-900">Rapports RH</h3>
          <span className="text-xs text-gray-400">{new Date().toLocaleString('fr-FR')}</span>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-end gap-4 mb-6">
            <PeriodFilter period={period} setPeriod={setPeriod} dates={dates} setDates={setDates} />


        <Button type="submit" variant="primary"onClick={fetchStats}>Appliquer</Button>


            {/* TODO: brancher exports Excel/PNG une fois les libs xlsx/FileSaver installées */}
            <div className="flex gap-2 ml-auto">
              <Button variant="warning" onClick={handleExportExcel} disabled={!data}>Excel</Button> 
              <Button variant="danger" onClick={handleExportPng} disabled={!data}>PNG</Button>
            </div>
          </div>

        {loading ? (
          <div className="text-center text-sm text-gray-400 py-6">Chargement...</div>
        ) : (
          // captureRef entoure uniquement KPI + graphique + tableau,
          // PAS la barre de filtres ni les boutons Excel/PNG (sinon ils
          // apparaîtraient dans le screenshot, ce qui n'a pas de sens)
          <div ref={captureRef}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <KPIWidget
                icon={<Users className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
                title="Agents actifs"
                badge="PÉRIODE"
                value={data.widgets.agentsActifs}
                showPercent={false}
              />
              <KPIWidget
                icon={<Clock className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
                title="Production totale"
                badge="PÉRIODE"
                value={data.widgets.productionTotale}
                showPercent={false}
              />
              <KPIWidget
                icon={<Phone className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
                title="Appels total"
                badge="PÉRIODE"
                value={data.widgets.appelsTotal}
                showPercent={false}
              />
              <KPIWidget
                icon={<PauseCircle className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
                title="Pauses totales"
                badge="PÉRIODE"
                value={data.widgets.pausesTotales}
                showPercent={false}
              />
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Pauses par agent (minutes)</h4>
              <div className="h-[280px] w-full rounded-xl border border-gray-100 bg-gray-50/60 p-4">
                <BarChart labels={data.rows.map((r) => r.agent)} series={pauseChartSeries} height={250} />
              </div>
            </div>

            <Table columns={rhStatsColumns} data={data.rows} onRowClick={() => {}} itemLabel="agents" />
          </div>
        )}
        </div>
      </div>
    </div>
  );
}