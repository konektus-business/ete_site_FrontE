// src/pages/crm/Operateur/CarriersList.jsx
import { useEffect, useState } from 'react';
import Table from '../../../components/dashboard/Table';
import { carrierColumns } from '../../../config/carrierColumns';
import { getCarriers, deleteCarrier } from '../../../api/carriers';
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';

const CarriersList = ({ onEdit, onClone }) => {
  const [carriers, setCarriers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrier actuellement ciblé par une demande de suppression.
  // null = modale fermée, sinon la modale s'ouvre pour ce carrier précis
  const [carrierToDelete, setCarrierToDelete] = useState(null);

  const loadCarriers = () => {
    getCarriers().then((data) => {
      setCarriers(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadCarriers();
  }, []);

  // Ouvre la modale de confirmation pour la ligne cliquée
  const handleDeleteClick = (row) => {
    setCarrierToDelete(row);
  };

  // Appelée uniquement après validation du mot de passe dans la modale
  const confirmDelete = async () => {
    await deleteCarrier(carrierToDelete.carrier_id);
    loadCarriers(); // recharge la liste pour refléter la suppression
  };

  if (loading) return <div className="text-sm text-gray-500">Chargement...</div>;

  return (
    <>
      <Table
        data={carriers}
        columns={carrierColumns(onEdit, handleDeleteClick, onClone)}
        onRowClick={() => {}}
        itemLabel="carriers"
      />

      <ConfirmDeleteModal
        isOpen={!!carrierToDelete}
        onClose={() => setCarrierToDelete(null)}
        itemLabel={carrierToDelete ? `le carrier "${carrierToDelete.carrier_name}"` : ''}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default CarriersList;