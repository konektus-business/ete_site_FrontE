import { useEffect, useState } from 'react';
import Table from '../../../components/dashboard/Table';
import { carrierColumns } from '../../../config/carrierColumns';
import { getCarriers } from '../../../api/carriers';

const CarriersList = ({ onEdit, onClone }) => {
  const [carriers, setCarriers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCarriers().then((data) => {
      setCarriers(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = (row) => {
    // TODO: modal de confirmation + mot de passe admin, comme dans list.php
    console.log('delete', row.carrier_id);
  };

  if (loading) return <div className="text-sm text-gray-500">Chargement...</div>;

  return (
    <Table
      data={carriers}
      columns={carrierColumns(onEdit, handleDelete, onClone)}
      onRowClick={() => {}}
      itemLabel="carriers"
    />
  );
};

export default CarriersList;