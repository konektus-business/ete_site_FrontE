import CarrierForm from './CarrierForm';

export default function AddCarrier() {
  const handleSuccess = () => {
    // TODO: toast succès + basculer vers l'onglet "Liste carriers"
    console.log('Carrier créé avec succès');
  };

  const handleCancel = () => {
    // TODO: basculer vers l'onglet "Liste carriers" sans sauvegarder
    console.log('Annulé');
  };

  return <CarrierForm mode="add" onSuccess={handleSuccess} onCancel={handleCancel} />;
}