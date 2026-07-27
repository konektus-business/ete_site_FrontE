import { useEffect, useState } from 'react';
import Table from '../../../components/dashboard/Table';
import { trunkColumns } from '../../../config/trunkColumns';
import { getTrunkStatus } from '../../../api/trunks';

const POLL_INTERVAL = 30000; // 30s, comme le PHP original

export default function EtatSip() {
  const [trunks, setTrunks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const loadTrunks = async () => {
    const data = await getTrunkStatus();
    setTrunks(data);
    setLastUpdate(new Date());
    setLoading(false);
  };

  useEffect(() => {
    loadTrunks();
    const interval = setInterval(loadTrunks, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = lastUpdate
    ? lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '--:--:--';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="font-sans font-semibold text-sm text-gray-900">État SIP peers</h2>
          <p className="text-xs text-gray-400 mt-0.5">Statut des trunks en temps réel</p>
        </div>
        <span className="text-xs text-gray-400">Dernière mise à jour : {formattedTime}</span>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="text-sm text-gray-500">Chargement...</div>
        ) : (
          <Table data={trunks} columns={trunkColumns} onRowClick={() => {}} itemLabel="trunks" />
        )}
      </div>
    </div>
  );
}