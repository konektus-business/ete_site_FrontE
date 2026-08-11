import { useState, useEffect, useCallback, useMemo } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { getAllLeadLists, deleteLeadList } from '../../../api/campaigns';
import { leadListColumns } from '../../../config/leadListColumns';
import Table from '../../../components/dashboard/Table';
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';

export default function LeadsList({ onEdit }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  // Fonction de rechargement stabilisée
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllLeadLists();
      setLists(data || []);
    } catch {
      setError('Erreur lors du chargement des listes de leads.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Chargement initial sécurisé contre le démontage
  useEffect(() => {
    let isMounted = true;

    getAllLeadLists()
      .then((data) => {
        if (isMounted) {
          setLists(data || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Erreur lors du chargement des listes de leads.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteLeadList(toDelete.campaign_id, toDelete.list_id);
      setToDelete(null);
      await load();
    } catch {
      setError('Erreur lors de la suppression de la liste.');
    }
  };

  // Mémoïsation des colonnes pour éviter les recalculs inutiles
  const columns = useMemo(
    () => leadListColumns(onEdit, setToDelete),
    [onEdit]
  );

  // Mémoïsation du formatage des données du tableau
  const tableData = useMemo(
    () => lists.map((l) => ({ ...l, id: l.list_id })),
    [lists]
  );

  return (
    <div className="space-y-4">
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-sm text-gray-400">
          Chargement des listes...
        </div>
      ) : (
        <Table
          columns={columns}
          data={tableData}
          onRowClick={() => {}}
          itemLabel="listes"
        />
      )}

      <ConfirmDeleteModal
        isOpen={!!toDelete}
        onClose={() => setToDelete(null)}
        itemLabel={toDelete ? `la liste "${toDelete.list_name}"` : ''}
        onConfirm={confirmDelete}
      />
    </div>
  );
}