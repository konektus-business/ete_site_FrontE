import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AlertCircle, X } from 'lucide-react';
import {
  getGlobalStatusStats,
  getAgentStatusSummary,
  getAgentStatusDetail,
} from '../../../api/statsReports';
import {
  globalStatusColumns,
  agentSummaryColumns,
  agentDetailColumns,
} from '../../../config/statsColumns';
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
  const [error, setError] = useState(null);

  const captureRef = useRef(null);
  const { exportExcel, exportPng } = useExportReport(captureRef);

  // Chargement global et synthétique lors du clic sur "Appliquer"
  const handleApply = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSelectedAgent(null);
    setAgentDetail([]);

    try {
      const [globalRes, summaryRes] = await Promise.all([
        getGlobalStatusStats({ period, ...dates, qualifAgent, qualifSystem }),
        getAgentStatusSummary({ period, ...dates }),
      ]);
      setGlobalData(globalRes);
      setAgentSummary(summaryRes ?? []);
    } catch {
      setError("Erreur lors de la récupération des rapports de statuts.");
    } finally {
      setLoading(false);
    }
  }, [period, dates, qualifAgent, qualifSystem]);

  // Chargement initial unique au montage
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleApply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sélection d'un agent pour afficher le détail
  const handleSelectAgent = useCallback(async (row) => {
    if (!row?.id) return;
    setSelectedAgent(row);
    try {
      const detail = await getAgentStatusDetail(row.id);
      setAgentDetail(detail ?? []);
    } catch {
      setError(`Erreur lors du chargement des détails pour ${row.agent ?? 'l\'agent'}.`);
      setAgentDetail([]);
    }
  }, []);

  const handleExportExcel = useCallback(() => {
    if (!globalData?.rows) return;
    exportExcel(
      globalData.rows,
      statusExportColumns,
      `rapport-statuts-${dates.startDate}-au-${dates.endDate}`
    );
  }, [exportExcel, globalData, dates]);

  const handleExportPng = useCallback(() => {
    exportPng(`rapport-statuts-${dates.startDate}-au-${dates.endDate}`);
  }, [exportPng, dates]);

  // Colonnes mémoïsées pour le tableau de synthèse des agents
  const computedAgentSummaryColumns = useMemo(
    () => agentSummaryColumns(handleSelectAgent),
    [handleSelectAgent]
  );

  const computedGlobalStatusColumns = useMemo(
    () => globalStatusColumns(),
    []
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-sans font-semibold text-sm text-gray-900">
            Rapports de statuts
          </h3>
          <span className="text-xs text-gray-400">
            {new Date().toLocaleString('fr-FR')}
          </span>
        </div>

        <div className="p-6">
          {/* Filtres */}
          <div className="flex flex-wrap items-end gap-4 mb-4">
            <PeriodFilter
              period={period}
              setPeriod={setPeriod}
              dates={dates}
              setDates={setDates}
            />

            <div>
              <label htmlFor="qualifications" className={labelClass}>
                Qualifications
              </label>
              <div className="flex items-center gap-4 h-[38px]">
                <label htmlFor="qualifAgent" className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="qualifAgent"
                    checked={qualifAgent}
                    onChange={() => setQualifAgent((v) => !v)}
                    className={checkboxClass}
                  />{' '}
                  Agents
                </label>
                <label htmlFor="qualifSystem" className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="qualifSystem"
                    checked={qualifSystem}
                    onChange={() => setQualifSystem((v) => !v)}
                    className={checkboxClass}
                  />{' '}
                  Système
                </label>
              </div>
            </div>

            <Button type="button" variant="primary" onClick={handleApply}>
              Appliquer
            </Button>

            <div className="flex gap-2 ml-auto">
              <Button
                type="button"
                variant="warning"
                onClick={handleExportExcel}
                disabled={!globalData?.rows || loading}
              >
                Excel
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={handleExportPng}
                disabled={!globalData || loading}
              >
                PNG
              </Button>
            </div>
          </div>

          {/* Banner d'erreur */}
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

          {/* Onglets internes */}
          <div className="flex gap-1 border-b border-gray-100 mb-5">
            {[
              { key: 'global', label: 'Statuts globaux' },
              { key: 'agent', label: 'Qualifications par agent' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
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

          {/* Contenu capturable en PNG */}
          <div ref={captureRef} className="p-1 bg-white rounded-lg">
            {loading ? (
              <div className="text-center text-sm text-gray-400 py-12">
                Chargement des données...
              </div>
            ) : innerTab === 'global' ? (
              <div className="space-y-6">
                <Table
                  columns={computedGlobalStatusColumns}
                  data={globalData?.rows ?? []}
                  onRowClick={() => {}}
                  itemLabel="qualifications"
                />

                {globalData?.hourly && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Évolution horaire
                    </h4>
                    <div className="h-[300px] w-full rounded-xl border border-gray-100 bg-gray-50/60 p-4">
                      <BarChart
                        labels={globalData.hourly.labels ?? []}
                        series={[
                          {
                            label: 'Qualifications',
                            color: '#1EB394',
                            data: globalData.hourly.data ?? [],
                          },
                        ]}
                        height={270}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Récapitulatif par agent
                  </h4>
                  <Table
                    columns={computedAgentSummaryColumns}
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
                    <Table
                      columns={agentDetailColumns}
                      data={agentDetail}
                      onRowClick={() => {}}
                      itemLabel="statuts"
                    />
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