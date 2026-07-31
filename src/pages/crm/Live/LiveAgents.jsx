import { Headphones } from 'lucide-react';
import { useLiveData } from '../../../hooks/useLiveData';
import { agentColumns } from '../../../config/liveColumns';
import Table from '../../../components/dashboard/Table';

export default function LiveAgents() {
  const { data, loading } = useLiveData(); // pas de widgets, juste data.agents

  if (loading || !data) {
    return <div className="flex items-center justify-center h-64"><div className="text-sm text-gray-400">Chargement...</div></div>;
  }

  return (
    <div >
      <Table columns={agentColumns} data={data.agents} onRowClick={() => {}} itemLabel="agents" minWidth="1300px" />
    </div>
  );
}