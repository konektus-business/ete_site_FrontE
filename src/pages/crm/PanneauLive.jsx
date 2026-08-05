import { useOutletContext } from 'react-router-dom';
import LiveOverview from './Live/LiveOverview';
import LiveCalls from './Live/LiveCalls';

export default function PanneauLive() {
  const { activeTab } = useOutletContext();

  return (
    <div className="p-4">
      {activeTab === 'overview' && <LiveOverview />}
      {activeTab === 'calls' && <LiveCalls />}
    </div>
  );
}