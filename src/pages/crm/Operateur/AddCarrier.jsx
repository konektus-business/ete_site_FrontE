import { useOutletContext } from 'react-router-dom';
import CarrierForm from './CarrierForm';

export default function AddCarrier() {
  const { setActiveTab } = useOutletContext() || {};

  const handleSuccess = () => {
    if (setActiveTab) setActiveTab('liste');
  };

  const handleCancel = () => {
    if (setActiveTab) setActiveTab('liste');
  };

  return (
    <CarrierForm mode="add" onSuccess={handleSuccess} onCancel={handleCancel} />
  );
}