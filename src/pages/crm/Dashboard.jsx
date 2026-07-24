import { useState, useEffect } from 'react';
import { Users, DollarSign, Megaphone, Phone, ArrowLeftRight, Smartphone, Clock, PhoneCall } from 'lucide-react';
import { getDashboardStats } from '../../api/dashboardStats';
import { widgetsConfig } from '../../config/dashboardWidgets';
import KPIWidget from '../../components/dashboard/KPIWidget';
import KPISkeleton from '../../components/dashboard/KPISkeleton';



const getDefaultDates = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 7);
  const format = (d) => d.toISOString().split('T')[0];
  return { startDate: format(start), endDate: format(end) };
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState(getDefaultDates());

  const fetchStats = (startDate, endDate) => {
    setLoading(true);
    getDashboardStats(startDate, endDate).then((data) => {
      setStats(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchStats(dates.startDate, dates.endDate);
  }, []);

  const handleApply = (e) => {
    e.preventDefault();
    fetchStats(dates.startDate, dates.endDate);
  };

  const handleReset = () => {
    const defaults = getDefaultDates();
    setDates(defaults);
    fetchStats(defaults.startDate, defaults.endDate);
  };

  const inputClass =
    'rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-colors';

  return (
    <div className="space-y-6">
      {/* Filtre de dates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <form onSubmit={handleApply} className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Du</label>
            <input
              type="date"
              value={dates.startDate}
              onChange={(e) => setDates((prev) => ({ ...prev, startDate: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Au</label>
            <input
              type="date"
              value={dates.endDate}
              onChange={(e) => setDates((prev) => ({ ...prev, endDate: e.target.value }))}
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-crmPrimary hover:brightness-95 transition-colors"
          >
            Appliquer
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Réinitialiser
          </button>
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
          {widgetsConfig.map(({ key, icon: Icon, title, badge, variationLabel, suffix = '' }) => {
            const data = stats[key];
            return (
              <KPIWidget
                key={key}
                icon={<Icon className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
                title={title}
                badge={badge}
                value={`${data.total.toLocaleString('fr-FR')}${suffix}`}
                variation={data.variation}
                variationLabel={variationLabel}
                showPercent={false}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}