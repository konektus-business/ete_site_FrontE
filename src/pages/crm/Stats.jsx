import { useOutletContext } from 'react-router-dom';
import AgentsStats from './Stats/AgentsStats';
import InboundStats from './Stats/InboundStats';
import OutboundStats from './Stats/OutboundStats';
import RHStats from './Stats/RHStats';
import StatusStats from './Stats/StatusStats';

export default function Stats() {
  const { activeTab } = useOutletContext();

  return (
    <div className="p-4">
      {activeTab === 'agents' && <AgentsStats />}
      {activeTab === 'inbound' && <InboundStats />}
      {activeTab === 'outbound' && <OutboundStats />}
      {activeTab === 'rh' && <RHStats />}
      {activeTab === 'status' && <StatusStats />}
    </div>
  );
}