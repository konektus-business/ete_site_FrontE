import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { getCampaignStatuses, addCampaignStatus, updateCampaignStatus, deleteCampaignStatus } from '../../../api/campaigns';
import { campaignStatusColumns } from '../../../config/campaignStatusColumns';
import Table from '../../../components/dashboard/Table';
import Button from '../../../components/common/ButtonCRM';
import Modal from '../../../components/common/Modal';
import StatusForm from './StatusForm';
import Toast from '../../../components/common/Toast';
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';

export default function CampaignStatusManager({ campaign, onBack }) {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingStatus, setEditingStatus] = useState(null);
  const [statusToDelete, setStatusToDelete] = useState(null);
  const [toast, setToast] = useState(null);

  // Fonction réutilisable pour charger/recharger la liste
  // (montage initial, et après ajout, modification ou suppression)
  const loadStatuses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCampaignStatuses(campaign.campaign_id);
      setStatuses(data);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Erreur lors du chargement des statuts', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [campaign.campaign_id]);

  // Chargement initial
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadStatuses();
  }, [loadStatuses]);

  const handleAdd = async (data) => {
    await addCampaignStatus(campaign.campaign_id, data);
    loadStatuses();
    setToast({ message: 'Statut ajouté avec succès', type: 'success' });
  };

  const handleUpdate = async (data) => {
    await updateCampaignStatus(campaign.campaign_id, editingStatus.status, data);
    setEditingStatus(null);
    loadStatuses();
    setToast({ message: 'Statut mis à jour', type: 'success' });
  };

  const handleDelete = async () => {
    try {
      await deleteCampaignStatus(campaign.campaign_id, statusToDelete.status);
      setToast({ message: 'Statut supprimé', type: 'success' });
    } catch (err) {
      console.error(err);
      setToast({ message: 'Erreur lors de la suppression du statut', type: 'error' });
    } finally {
      setStatusToDelete(null);
      loadStatuses();
    }
  };

  const filtered = statuses.filter((s) =>
    `${s.status} ${s.status_name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-sans font-semibold text-sm text-gray-900">
              Gestion des statuts pour la campagne : {campaign.campaign_name}
            </h2>
            <Button variant="secondary" onClick={onBack} className="flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" /> Retour
            </Button>
          </div>

          <div className="p-6">
            <h3 className="text-xs font-semibold text-gray-700 mb-3">Ajouter un nouveau statut</h3>
            <StatusForm mode="add" onSubmit={handleAdd} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="relative max-w-xs mb-4">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un statut (code ou nom)..."
              className="w-full h-[38px] pl-9 pr-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {loading ? (
            <div className="text-center text-sm text-gray-400 py-6">Chargement...</div>
          ) : (
            <Table
              columns={campaignStatusColumns(setEditingStatus, setStatusToDelete)}
              data={filtered.map((s) => ({ ...s, id: s.status }))}
              onRowClick={() => {}}
              itemLabel="statuts"
              minWidth="1400px"
            />
          )}
        </div>

        {/* Édition */}
        <Modal isOpen={!!editingStatus} onClose={() => setEditingStatus(null)}>
          {editingStatus && (
            <div className="w-[700px] max-w-full">
              <h2 className="text-base font-bold text-gray-900 mb-4">Modifier le statut {editingStatus.status}</h2>
              <StatusForm mode="edit" initialData={editingStatus} onSubmit={handleUpdate} onCancel={() => setEditingStatus(null)} />
            </div>
          )}
        </Modal>

        {/* Suppression */}
        <ConfirmDeleteModal
          isOpen={!!statusToDelete}
          onClose={() => setStatusToDelete(null)}
          itemLabel={statusToDelete ? `le statut ${statusToDelete.status}` : ''}
          onConfirm={handleDelete}
        />
      </div>
    </>
  );
}