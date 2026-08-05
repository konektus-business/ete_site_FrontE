// src/pages/crm/Operateur/CarriersList.jsx
import { useEffect, useState } from 'react';
import Table from '../../../components/dashboard/Table';
import { carrierColumns } from '../../../config/carrierColumns';
import { getCarriers, deleteCarrier } from '../../../api/carriers';
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';
import CarrierForm from './CarrierForm';

const CarriersList = () => {
  const [carriers, setCarriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrierToDelete, setCarrierToDelete] = useState(null);

  // Pilote l'affichage inline du formulaire : null = table affichée,
  // sinon { mode: 'edit' | 'clone', data: carrier } = formulaire affiché
  const [formState, setFormState] = useState(null);

  const loadCarriers = () => {
    getCarriers().then((data) => {
      setCarriers(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadCarriers();
  }, []);

  const handleEdit = (row) => setFormState({ mode: 'edit', data: row });
  const handleClone = (row) => setFormState({ mode: 'clone', data: row });
  const handleDeleteClick = (row) => setCarrierToDelete(row);

  const confirmDelete = async () => {
    await deleteCarrier(carrierToDelete.carrier_id);
    setCarrierToDelete(null);
    loadCarriers();
  };

  const handleFormSuccess = () => {
    setFormState(null);
    loadCarriers();
  };

  const handleFormCancel = () => {
    setFormState(null);
  };

  if (loading) return <div className="text-sm text-gray-500">Chargement...</div>;

  // Formulaire affiché à la place de la table, sans changer d'onglet
  if (formState) {
    return (
      <CarrierForm
        mode={formState.mode}
        initialData={formState.data}
        onSuccess={handleFormSuccess}
        onCancel={handleFormCancel}
      />
    );
  }

  return (
    <>
      <Table
        data={carriers}
        columns={carrierColumns(handleEdit, handleDeleteClick, handleClone)}
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