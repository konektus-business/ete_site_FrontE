// src/pages/crm/Schedules/HorairesList.jsx
import { useEffect, useState } from 'react';
import Table from '../../../components/dashboard/Table';
import { scheduleColumns } from '../../../config/scheduleColumns';
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';
import { getSchedules, deleteSchedule } from '../../../api/schedules';

// onEdit fourni par le composant parent pour basculer vers le formulaire d'édition
const HorairesList = ({ onEdit }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);

  // Recharge la liste depuis l'API
  const loadSchedules = () => {
    getSchedules().then((data) => {
      setSchedules(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  // Ouvre la modale de confirmation
  const handleDelete = (row) => {
    setScheduleToDelete(row);
  };

  // Confirme la suppression et rafraîchit la liste
  const confirmDelete = async () => {
    if (!scheduleToDelete) return;
    await deleteSchedule(scheduleToDelete.call_time_id);
    setScheduleToDelete(null);
    loadSchedules();
  };

  if (loading) return <div className="text-sm text-gray-500">Chargement...</div>;

  return (
    <>
      <Table
        data={schedules}
        columns={scheduleColumns(onEdit, handleDelete)}
        onRowClick={() => {}}
        itemLabel="horaires"
      />

      <ConfirmDeleteModal
        isOpen={!!scheduleToDelete}
        onClose={() => setScheduleToDelete(null)}
        itemLabel={
          scheduleToDelete
            ? `l'horaire "${scheduleToDelete.call_time_name || scheduleToDelete.call_time_id}"`
            : ''
        }
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default HorairesList;