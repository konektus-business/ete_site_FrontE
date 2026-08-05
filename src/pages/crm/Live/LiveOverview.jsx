import { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Gauge, Headphones, ChevronDown } from 'lucide-react';
import { useLiveData } from '../../../hooks/useLiveData';
import { outboundWidgetsConfig, inboundWidgetsConfig, powerWidgetsConfig } from '../../../config/liveWidgets';
import { agentColumns } from '../../../config/liveColumns';
import LiveWidgetsSection from '../../../components/live/LiveWidgetsSection';
import Table from '../../../components/dashboard/Table';

const ALL_WIDGETS = [...outboundWidgetsConfig, ...inboundWidgetsConfig, ...powerWidgetsConfig];

// Header de section cliquable : toggle l'ouverture/fermeture au clic
// sur le header entier (icône + titre + flèche).
const SectionHeader = ({ title, icon: Icon, isOpen, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="w-full flex items-center justify-between gap-2 mb-3 group"
  >
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-[#1EB394]" />
      <h5 className="text-sm font-semibold text-gray-800">{title}</h5>
    </div>
    <ChevronDown
      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
        isOpen ? 'rotate-180' : ''
      }`}
    />
  </button>
);

export default function LiveOverview() {
  const { data, history, loading } = useLiveData(ALL_WIDGETS);

  const [openSections, setOpenSections] = useState({
    outbound: true,
    inbound: true,
    power: true,
  });

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  if (loading || !data) {
    return <div className="flex items-center justify-center h-64"><div className="text-sm text-gray-400">Chargement...</div></div>;
  }

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <SectionHeader
          title="Appels sortants"
          icon={ArrowUpCircle}
          isOpen={openSections.outbound}
          onToggle={() => toggleSection('outbound')}
        />
        {openSections.outbound && (
          <LiveWidgetsSection config={outboundWidgetsConfig} data={data} history={history} />
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <SectionHeader
          title="Appels entrants"
          icon={ArrowDownCircle}
          isOpen={openSections.inbound}
          onToggle={() => toggleSection('inbound')}
        />
        {openSections.inbound && (
          <LiveWidgetsSection config={inboundWidgetsConfig} data={data} history={history} />
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <SectionHeader
          title="Puissance & Files"
          icon={Gauge}
          isOpen={openSections.power}
          onToggle={() => toggleSection('power')}
        />
        {openSections.power && (
          <LiveWidgetsSection config={powerWidgetsConfig} data={data} history={history} />
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Headphones className="w-5 h-5 text-[#1EB394]" />
          <h5 className="text-sm font-semibold text-gray-800">Liste des agents</h5>
        </div>
        <Table columns={agentColumns} data={data.agents} onRowClick={() => {}} itemLabel="agents" minWidth="1300px" />
      </div>
    </div>
  );
}