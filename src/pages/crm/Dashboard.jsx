import { useState, useEffect } from 'react';
import { Users, DollarSign, Megaphone, Phone, ArrowLeftRight, Smartphone, Clock, PhoneCall } from 'lucide-react';
import { getDashboardStats } from '../../api/dashboardStats';
import { widgetsConfig } from '../../config/dashboardWidgets';
import KPIWidget from '../../components/dashboard/KPIWidget';
import KPISkeleton from '../../components/dashboard/KPISkeleton';
import EvolutionChart from '../../components/dashboard/EvolutionChart';
import CampaignDonutChart from '../../components/dashboard/CampaignDonutChart';
import { getCallsEvolution, getCampaignsRepartition } from '../../api/dashboardCharts';
import { getDefaultDates } from '../../utils/dateUtils';
import { formInputClass as inputClass, labelClass } from '../../styles/formClasses';
import Button from '../../components/common/ButtonCRM';

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

          <Button type="submit" variant="primary">Appliquer</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>Réinitialiser</Button>
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
                sparklineData={data.sparkline}
              />
            );
          })}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <EvolutionChart title="Évolution des appels" fetchData={getCallsEvolution} />
        </div>
        <div className="lg:col-span-1">
          <CampaignDonutChart fetchData={getCampaignsRepartition} />
        </div>
      </div>
    </div>
    
  );

}