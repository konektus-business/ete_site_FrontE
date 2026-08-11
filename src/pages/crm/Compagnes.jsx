import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CampaignsList from './Campagnes/CampaignsList';
import CampaignForm from './Campagnes/CampaignForm';
import CampaignLists from './Campagnes/CampaignLists';
import StatusPicker from './Campagnes/StatusPicker';
import CampaignStatusManager from './Campagnes/CampaignStatusManager';

export default function Compagnes() {
  const { activeTab, setActiveTab } = useOutletContext();

  const [formMode, setFormMode] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [listsCampaign, setListsCampaign] = useState(null);
  const [statusCampaign, setStatusCampaign] = useState(null); // campagne dont on gère les statuts

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    setFormMode('edit');
  };

  // Après création ou édition, on revient à la liste (et à son onglet)
  const handleDone = () => {
    setFormMode(null);
    setSelectedCampaign(null);
    setActiveTab('liste');
  };

  const renderListContent = () => {
    if (listsCampaign) {
      return <CampaignLists campaign={listsCampaign} onBack={() => setListsCampaign(null)} />;
    }
    if (formMode === 'edit') {
      return <CampaignForm mode="edit" initialData={selectedCampaign} onSuccess={handleDone} onCancel={handleDone} />;
    }
    return <CampaignsList onEdit={handleEdit} onLists={setListsCampaign} />;
  };

  return (
    <div className="p-4">
      {activeTab === 'liste' && renderListContent()}

      {activeTab === 'add' && (
        <CampaignForm mode="add" onSuccess={handleDone} onCancel={() => setActiveTab('liste')} />
      )}

      {activeTab === 'statuts' && (
        statusCampaign ? (
          <CampaignStatusManager campaign={statusCampaign} onBack={() => setStatusCampaign(null)} />
        ) : (
          <StatusPicker onSelect={setStatusCampaign} />
        )
      )}
    </div>
  );
}