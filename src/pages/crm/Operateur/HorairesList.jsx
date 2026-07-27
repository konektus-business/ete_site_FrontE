import { useEffect, useState } from 'react';
import Table from '../../../components/dashboard/Table';
import { scheduleColumns } from '../../../config/scheduleColumns';
import { getSchedules, deleteSchedule } from '../../../api/schedules';

// onEdit fourni par Operateurs.jsx pour basculer vers le formulaire d'édition
const HorairesList = ({ onEdit }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recharge la liste depuis le mock - appelée au montage et après une suppression
  const loadSchedules = () => {
    getSchedules().then((data) => {
      setSchedules(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  const handleDelete = async (row) => {
    // TODO: modal de confirmation, comme dans schedules.php (onclick="return confirm(...)")
    await deleteSchedule(row.call_time_id);
    loadSchedules(); // recharge après suppression pour refléter le nouvel état
  };

  if (loading) return <div className="text-sm text-gray-500">Chargement...</div>;

  return (
    <Table
      data={schedules}
      columns={scheduleColumns(onEdit, handleDelete)}
      onRowClick={() => {}}
      itemLabel="horaires"
    />
  );
};

export default HorairesList;