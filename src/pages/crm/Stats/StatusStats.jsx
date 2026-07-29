import { useState, useEffect, useRef } from 'react';
import {
  getGlobalStatusStats,
  getAgentStatusSummary,
  getAgentStatusDetail,
} from '../../../api/statsReports';
import { globalStatusColumns, agentSummaryColumns, agentDetailColumns } from '../../../config/statsColumns';
import Table from '../../../components/dashboard/Table';
import { checkboxClass } from '../../../styles/checkboxClass';
import { getDefaultDates } from '../../../utils/dateUtils';
import BarChart from '../../../components/dashboard/BarChart';
import { labelClass } from '../../../styles/formClasses';
import PeriodFilter from '../../../components/dashboard/PeriodFilter';
import Button from '../../../components/common/ButtonCRM';
import { useExportReport } from '../../../hooks/useExportReport';

// Colonnes exportées en Excel pour l'onglet "Statuts globaux"
const statusExportColumns = [
  { key: 'qualification', label: 'Qualification' },
  { key: 'code', label: 'Code' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'pourcentage', label: 'Pourcentage' },
];

export default function StatusStats() {
  const [period, setPeriod] = useState('today');
  const [dates, setDates] = useState(getDefaultDates());
  const [qualifAgent, setQualifAgent] = useState(true);
  const [qualifSystem, setQualifSystem] = useState(true);
  const [innerTab, setInnerTab] = useState('global');

  const [globalData, setGlobalData] = useState(null);
  const [agentSummary, setAgentSummary] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentDetail, setAgentDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  // Référence vers la zone à capturer en PNG (tableau + graphique),
  // utilisée par le hook useExportReport
  const captureRef = useRef(null);
  const { exportExcel, exportPng } = useExportReport(captureRef);

  const fetchGlobal = () => {
    setLoading(true);
    getGlobalStatusStats({ period, ...dates, qualifAgent, qualifSystem }).then((data) => {
      setGlobalData(data);
      setLoading(false);
    });
  };

  const fetchAgentSummary = () => {
    getAgentStatusSummary({ period, ...dates }).then(setAgentSummary);
  };

  useEffect(() => {
    fetchGlobal();
    fetchAgentSummary();
  }, []);

  const handleApply = () => {
    fetchGlobal();
    fetchAgentSummary();
    setSelectedAgent(null);
  };

  const handleSelectAgent = (row) => {
    setSelectedAgent(row);
    getAgentStatusDetail(row.id).then(setAgentDetail);
  };

  const handleExportExcel = () =>
    exportExcel(globalData?.rows, statusExportColumns, `rapport-statuts-${dates.startDate}-au-${dates.endDate}`);

  const handleExportPng = () =>
    exportPng(`rapport-statuts-${dates.startDate}-au-${dates.endDate}`);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-sans font-semibold text-sm text-gray-900">Rapports de statuts</h3>
          <span className="text-xs text-gray-400">{new Date().toLocaleString('fr-FR')}</span>
        </div>

        <div className="p-6">
          {/* Filtres */}
          <div className="flex flex-wrap items-end gap-4 mb-4">
            <PeriodFilter period={period} setPeriod={setPeriod} dates={dates} setDates={setDates} />

            <div>
              <label className={labelClass}>Qualifications</label>
              <div className="flex items-center gap-4 h-[38px]">
                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={qualifAgent}
                    onChange={() => setQualifAgent((v) => !v)}
                    className={checkboxClass}
                  />
                  Agents
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={qualifSystem}
                    onChange={() => setQualifSystem((v) => !v)}
                    className={checkboxClass}
                  />
                  Système
                </label>
              </div>
            </div>

            <Button type="button" variant="primary" onClick={handleApply}>Appliquer</Button>

            <div className="flex gap-2 ml-auto">
              <Button variant="warning" onClick={handleExportExcel} disabled={!globalData}>Excel</Button>
              <Button variant="danger" onClick={handleExportPng} disabled={!globalData}>PNG</Button>
            </div>
          </div>

          {/* Onglets internes */}
          <div className="flex gap-1 border-b border-gray-100 mb-5">
            {[
              { key: 'global', label: 'Statuts globaux' },
              { key: 'agent', label: 'Qualifications par agent' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setInnerTab(tab.key)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  innerTab === tab.key
                    ? 'border-crmPrimary text-crmPrimary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* captureRef entoure uniquement le contenu exportable
              (tableau + graphique), pas les filtres ni les onglets */}
          <div ref={captureRef}>
            {loading ? (
              <div className="text-center text-sm text-gray-400 py-6">Chargement...</div>
            ) : innerTab === 'global' ? (
              <div className="space-y-6">
                <Table
                  columns={globalStatusColumns()}
                  data={globalData.rows}
                  onRowClick={() => {}}
                  itemLabel="qualifications"
                />

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Évolution horaire</h4>
                  <div className="h-[300px] w-full rounded-xl border border-gray-100 bg-gray-50/60 p-4">
                    <BarChart
                      labels={globalData.hourly.labels}
                      data={globalData.hourly.data}
                      color="#1EB394"
                      height={270}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Récapitulatif par agent</h4>
                  <Table
                    columns={agentSummaryColumns(handleSelectAgent)}
                    data={agentSummary}
                    onRowClick={() => {}}
                    itemLabel="agents"
                  />
                </div>

                {selectedAgent && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Détail des statuts pour {selectedAgent.agent}
                    </h4>
                    <Table columns={agentDetailColumns} data={agentDetail} onRowClick={() => {}} itemLabel="statuts" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}