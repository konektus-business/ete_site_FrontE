import { useEffect, useState, useCallback } from 'react';
import { RefreshCw, AlertCircle, X } from 'lucide-react';
import Table from '../../../components/dashboard/Table';
import { trunkColumns } from '../../../config/trunkColumns';
import { getTrunkStatus } from '../../../api/trunks';

const POLL_INTERVAL = 30000; // 30s

export default function EtatSip() {
  const [trunks, setTrunks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Fonction de rechargement stabilisée
  const loadTrunks = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const data = await getTrunkStatus();
      setTrunks(data || []);
      setLastUpdate(new Date());
      setError(null);
    } catch {
      setError('Erreur lors du chargement de l\'état des trunks SIP.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Polling automatique avec nettoyage du timer et vérification de montage
  useEffect(() => {
    let isMounted = true;

    const fetchInitial = async () => {
      try {
        const data = await getTrunkStatus();
        if (isMounted) {
          setTrunks(data || []);
          setLastUpdate(new Date());
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError('Erreur lors du chargement de l\'état des trunks SIP.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchInitial();

    const interval = setInterval(() => {
      if (isMounted) {
        loadTrunks();
      }
    }, POLL_INTERVAL);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [loadTrunks]);

  const formattedTime = lastUpdate
    ? lastUpdate.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : '--:--:--';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* En-tête avec bouton de rafraîchissement manuel */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-sans font-semibold text-sm text-gray-900">
            État SIP peers
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Statut des trunks en temps réel
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            Dernière mise à jour : {formattedTime}
          </span>
          <button
            type="button"
            onClick={() => loadTrunks(true)}
            disabled={refreshing || loading}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors disabled:opacity-50"
            title="Rafraîchir manuellement"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`}
            />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Banner d'erreur */}
        {error && (
          <div className="px-4 py-2.5 rounded-lg bg-red-50 text-red-700 border border-red-100 text-xs font-medium flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {loading ? (
          <div className="p-6 text-center text-sm text-gray-400">
            Chargement de l'état des trunks...
          </div>
        ) : (
          <Table
            data={trunks}
            columns={trunkColumns}
            onRowClick={() => {}}
            itemLabel="trunks"
          />
        )}
      </div>
    </div>
  );
}