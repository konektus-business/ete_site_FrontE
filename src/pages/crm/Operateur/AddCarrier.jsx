import { useOutletContext } from 'react-router-dom';
import CarrierForm from './CarrierForm';

export default function AddCarrier() {
  const context = useOutletContext() || {};
  const { 
    setActiveTab, 
    formMode = 'add', 
    setFormMode, 
    selectedCarrier = null, 
    setSelectedCarrier 
  } = context;

  const handleSuccess = () => {
    // toast.success('Carrier enregistré avec succès');
    console.log('Carrier créé avec succès');

    // Réinitialisation et retour à l'onglet liste
    if (setFormMode) setFormMode('add');
    if (setSelectedCarrier) setSelectedCarrier(null);
    if (setActiveTab) setActiveTab('liste');
  };

  const handleCancel = () => {
    // Annulation et retour à la liste sans sauvegarder
    if (setFormMode) setFormMode('add');
    if (setSelectedCarrier) setSelectedCarrier(null);
    if (setActiveTab) setActiveTab('liste');
  };

  return (
    <CarrierForm 
      mode={formMode} 
      initialData={selectedCarrier}
      onSuccess={handleSuccess} 
      onCancel={handleCancel} 
    />
  );
}