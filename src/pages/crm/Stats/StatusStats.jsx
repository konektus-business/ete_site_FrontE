import { useState, useEffect } from 'react';
import {
  getGlobalStatusStats,
  getAgentStatusSummary,
  getAgentStatusDetail,
} from '../../../api/statsReports';
import { globalStatusColumns, agentSummaryColumns, agentDetailColumns } from '../../../config/statsColumns';
import Select from '../../../components/common/Select';
import Table from '../../../components/dashboard/Table';
import { checkboxClass } from '../../../styles/checkboxClass';
import { getDefaultDates } from '../../../utils/dateUtils';

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

  const isCustom = period === 'custom';
  const labelClass = 'block text-xs font-medium text-gray-500 mb-1.5';
  const inputClass =
    'w-full h-[38px] rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-colors';

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
            <div className="w-40">
              <label className={labelClass}>Période</label>
              <Select
                value={period}
                onChange={setPeriod}
                options={[
                  { value: 'today', label: "Aujourd'hui" },
                  { value: 'yesterday', label: 'Hier' },
                  { value: 'week', label: 'Cette semaine' },
                  { value: 'month', label: 'Ce mois' },
                  { value: 'custom', label: 'Personnalisée' },
                ]}
              />
            </div>

            {isCustom && (
              <>
                <div className="w-40">
                  <label className={labelClass}>Date début</label>
                  <input
                    type="date"
                    value={dates.startDate}
                    onChange={(e) => setDates((prev) => ({ ...prev, startDate: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div className="w-40">
                  <label className={labelClass}>Date fin</label>
                  <input
                    type="date"
                    value={dates.endDate}
                    onChange={(e) => setDates((prev) => ({ ...prev, endDate: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              </>
            )}

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

            <button
              onClick={handleApply}
              className="h-[38px] px-4 rounded-lg text-sm font-medium text-white bg-crmPrimary hover:brightness-95 transition-colors whitespace-nowrap"
            >
              Appliquer
            </button>

            {/* TODO: brancher exports Excel/PNG une fois les libs xlsx/FileSaver installées */}
            <div className="flex gap-2 ml-auto">
              <button disabled className="h-[38px] px-4 rounded-lg text-sm font-medium text-amber-600 border border-amber-200 opacity-50 cursor-not-allowed">
                Excel
              </button>
              <button disabled className="h-[38px] px-4 rounded-lg text-sm font-medium text-red-500 border border-red-200 opacity-50 cursor-not-allowed">
                PNG
              </button>
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
                <div className="h-[300px] w-full rounded-xl border border-gray-100 bg-gray-50/60 flex items-center justify-center">
                  <span className="text-xs text-gray-400">
                    Graphique Chart.js à venir — {globalData.hourly.labels.length} points de données prêts
                  </span>
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
  );
}