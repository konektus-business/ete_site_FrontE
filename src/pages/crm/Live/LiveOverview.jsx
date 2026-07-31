import { ArrowUpCircle, ArrowDownCircle, Gauge, Headphones, Heading1Icon } from 'lucide-react';
import { useLiveData } from '../../../hooks/useLiveData';
import { outboundWidgetsConfig, inboundWidgetsConfig, powerWidgetsConfig } from '../../../config/liveWidgets';
import { agentColumns } from '../../../config/liveColumns';
import LiveWidgetsSection from '../../../components/live/LiveWidgetsSection';
import Table from '../../../components/dashboard/Table';

const ALL_WIDGETS = [...outboundWidgetsConfig, ...inboundWidgetsConfig, ...powerWidgetsConfig];

// Header de section simplifié, sans bouton de repli (plus nécessaire depuis
// que chaque section a son propre onglet dédié dans le header)
const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 mb-3">
    <Icon className="w-5 h-5 text-[#1EB394]" />
    <h5 className="text-sm font-semibold text-gray-800">{title}</h5>
  </div>
);

export default function LiveOverview() {
  const { data, history, loading } = useLiveData(ALL_WIDGETS);

  if (loading || !data) {
    return <div className="flex items-center justify-center h-64"><div className="text-sm text-gray-400">Chargement...</div></div>;
  }

  return (
    <div className="space-y-6">


      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <SectionHeader title="Appels sortants" icon={ArrowUpCircle} />
        <LiveWidgetsSection config={outboundWidgetsConfig} data={data} history={history} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <SectionHeader title="Appels entrants" icon={ArrowDownCircle} />
        <LiveWidgetsSection config={inboundWidgetsConfig} data={data} history={history} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <SectionHeader title="Puissance & Files" icon={Gauge} />
        <LiveWidgetsSection config={powerWidgetsConfig} data={data} history={history} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-4">
        <SectionHeader title="Liste des agents" icon={Headphones} />
        </div>
        <Table columns={agentColumns} data={data.agents} onRowClick={() => {}} itemLabel="agents" minWidth="1300px" />
      </div>
    </div>
  );
}