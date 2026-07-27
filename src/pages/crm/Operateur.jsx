import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CarriersList from './Operateur/CarriersList';
import CarrierForm from './Operateur/CarrierForm';
import EtatSip from './Operateur/EtatSip';
import Horaires from './Operateur/HorairesList';

export default function Operateurs() {
  const { activeTab, setActiveTab } = useOutletContext();
  const [formMode, setFormMode] = useState('add'); // 'add' | 'edit' | 'clone'
  const [selectedCarrier, setSelectedCarrier] = useState(null);

  const handleEdit = (carrier) => {
    setFormMode('edit');
    setSelectedCarrier(carrier);
    setActiveTab('ajouter');
  };

  const handleClone = (carrier) => {
    setFormMode('clone');
    setSelectedCarrier(carrier);
    setActiveTab('ajouter');
  };

  const handleFormSuccess = () => {
    setFormMode('add');
    setSelectedCarrier(null);
    setActiveTab('liste');
  };

  const handleFormCancel = () => {
    setFormMode('add');
    setSelectedCarrier(null);
    setActiveTab('liste');
  };

  return (
    <div className="p-4">
      {activeTab === 'liste' && (
        <CarriersList onEdit={handleEdit} onClone={handleClone} />
      )}
      {activeTab === 'ajouter' && (
        <CarrierForm
          mode={formMode}
          initialData={selectedCarrier}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}
      { activeTab === 'sip' && <EtatSip /> }
      {activeTab === 'horaires' && <Horaires /> }
    </div>
  );
}