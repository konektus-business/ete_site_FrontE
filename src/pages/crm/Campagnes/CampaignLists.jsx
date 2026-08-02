import { useState, useEffect } from 'react';
import { List } from 'lucide-react';
import { getCampaignLists } from '../../../api/campaigns';
import Button from '../../../components/common/ButtonCRM';
import StatusBadge from '../../../components/common/StatusBadge';
import { userStatusLabels, userStatusColors } from '../../../utils/statusConstants';

export default function CampaignLists({ campaign, onBack }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCampaignLists(campaign.campaign_id).then((data) => {
      setLists(data);
      setLoading(false);
    });
  }, [campaign]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-[#1EB394]" />
          <h2 className="font-sans font-semibold text-sm text-gray-900">Listes de la campagne : {campaign.campaign_name}</h2>
        </div>
        <Button variant="secondary" onClick={onBack}>Retour</Button>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="text-center text-sm text-gray-400 py-6">Chargement...</div>
        ) : lists.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-6">Aucune liste associée à cette campagne.</p>
        ) : (
          <div className="space-y-2">
            {lists.map((l) => (
              <div key={l.list_id} className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">{l.list_name}</p>
                  <p className="text-xs text-gray-400">{l.list_id} — {l.list_description || '-'}</p>
                </div>
                <StatusBadge status={l.active === 'Y' ? 'actif' : 'inactif'} statusLabels={userStatusLabels} statusColors={userStatusColors} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}