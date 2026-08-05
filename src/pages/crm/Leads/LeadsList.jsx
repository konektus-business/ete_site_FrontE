import { useState, useEffect } from 'react';
import { getAllLeadLists, deleteLeadList } from '../../../api/campaigns';
import { leadListColumns } from '../../../config/leadListColumns';
import Table from '../../../components/dashboard/Table';
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';

export default function LeadsList({ onEdit }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);

  const load = () => {
    setLoading(true);
    getAllLeadLists().then((data) => { setLists(data); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const confirmDelete = async () => {
    await deleteLeadList(toDelete.campaign_id, toDelete.list_id);
    setToDelete(null);
    load();
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-sm text-gray-400">Chargement...</div>
      ) : (
        <Table columns={leadListColumns(onEdit, setToDelete)} data={lists.map((l) => ({ ...l, id: l.list_id }))} onRowClick={() => {}} itemLabel="listes" />
      )}
      <ConfirmDeleteModal isOpen={!!toDelete} onClose={() => setToDelete(null)} itemLabel={toDelete ? `la liste ${toDelete.list_name}` : ''} onConfirm={confirmDelete} />
    </div>
  );
}