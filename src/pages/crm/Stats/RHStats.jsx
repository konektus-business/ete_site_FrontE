import { useState, useEffect } from 'react';
import { getRHStats } from '../../../api/statsReports';
import { rhStatsColumns } from '../../../config/statsColumns';
import Select from '../../../components/common/Select';
import Table from '../../../components/dashboard/Table';
import KPIWidget from '../../../components/dashboard/KPIWidget';
import { Users, Clock, Phone, PauseCircle } from 'lucide-react';
import { getDefaultDates } from '../../../utils/dateUtils';

export default function RHStats() {
  const [period, setPeriod] = useState('today');
  const [dates, setDates] = useState(getDefaultDates());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const isCustom = period === 'custom';
  const labelClass = 'block text-xs font-medium text-gray-500 mb-1.5';
  const inputClass =
    'w-full h-[38px] rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-colors';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-sans font-semibold text-sm text-gray-900">Rapports RH</h3>
          <span className="text-xs text-gray-400">{new Date().toLocaleString('fr-FR')}</span>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-end gap-4 mb-6">
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

            <button
              onClick={fetchStats}
              className="h-[38px] px-4 rounded-lg text-sm font-medium text-white bg-crmPrimary hover:brightness-95 transition-colors whitespace-nowrap"
            >
              Appliquer
            </button>

            {/* TODO: brancher exports Excel/PNG une fois les libs xlsx/FileSaver installées */}
            <div className="flex gap-2 ml-auto">
              <button
                disabled
                className="h-[38px] px-4 rounded-lg text-sm font-medium text-amber-600 border border-amber-200 opacity-50 cursor-not-allowed"
              >
                Excel
              </button>
              <button
                disabled
                className="h-[38px] px-4 rounded-lg text-sm font-medium text-red-500 border border-red-200 opacity-50 cursor-not-allowed"
              >
                PNG
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-sm text-gray-400 py-6">Chargement...</div>
          ) : (
            <>
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

              <Table columns={rhStatsColumns} data={data.rows} onRowClick={() => {}} itemLabel="agents" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}