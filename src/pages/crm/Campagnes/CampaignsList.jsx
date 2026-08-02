import { useState, useEffect } from 'react';
import { getCampaigns, deleteCampaign } from '../../../api/campaigns';
import { campaignColumns } from '../../../config/campaignColumns';
import Table from '../../../components/dashboard/Table';
import Modal from '../../../components/common/Modal';
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';

export default function CampaignsList({ onEdit, onLists }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewedCampaign, setViewedCampaign] = useState(null);
  const [campaignToDelete, setCampaignToDelete] = useState(null);

  const loadCampaigns = () => {
    setLoading(true);
    getCampaigns().then((data) => {
      setCampaigns(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const confirmDelete = async () => {
    await deleteCampaign(campaignToDelete.campaign_id);
    loadCampaigns();
  };

  return (

    <div className="space-y-4">
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-sm text-gray-400">Chargement...</div>
      ) : (
        <Table
          columns={campaignColumns(setViewedCampaign, onLists, onEdit, setCampaignToDelete)}
          data={campaigns.map((c) => ({ ...c, id: c.campaign_id }))}
          onRowClick={() => {}}
          itemLabel="campagnes"
        />
      )}

      {/* Détails (view.php) */}
      <Modal isOpen={!!viewedCampaign} onClose={() => setViewedCampaign(null)}>
        {viewedCampaign && (
          <div className="w-96">
            <h2 className="text-base font-bold text-gray-900 mb-4">{viewedCampaign.campaign_name}</h2>
            <div className="divide-y divide-gray-100 text-sm">
              {Object.entries(viewedCampaign).filter(([key]) => key !== 'id').map(([key, value]) => (
                <div key={key} className="flex justify-between py-2">
                  <span className="text-gray-400">{key}</span>
                  <span className="text-gray-800 font-medium">{value ?? '-'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDeleteModal
        isOpen={!!campaignToDelete}
        onClose={() => setCampaignToDelete(null)}
        itemLabel={campaignToDelete ? `la campagne ${campaignToDelete.campaign_name}` : ''}
        onConfirm={confirmDelete}
      />
    </div>
  );
}