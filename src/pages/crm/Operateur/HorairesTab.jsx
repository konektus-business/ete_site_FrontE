import { useState } from 'react';
import HorairesList from './HorairesList';
import ScheduleForm from './ScheduleForm';
import Button from '../../../components/common/ButtonCRM';
import { Plus } from 'lucide-react';

export default function HorairesTab() {
  const [scheduleMode, setScheduleMode] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleEditSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setScheduleMode('edit');
  };

  const handleAddSchedule = () => {
    setSelectedSchedule(null);
    setScheduleMode('add');
  };

  const handleScheduleDone = () => {
    setScheduleMode(null);
    setSelectedSchedule(null);
  };

  if (scheduleMode) {
    return (
      <ScheduleForm
        mode={scheduleMode}
        initialData={selectedSchedule}
        onSuccess={handleScheduleDone}
        onCancel={handleScheduleDone}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="font-sans font-semibold text-sm text-gray-900">Horaires</h2>
          <p className="text-xs text-gray-400 mt-0.5">Gérer les créneaux horaires disponibles</p>
        </div>
        <Button variant="primary" onClick={handleAddSchedule} className="flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          Ajouter un horaire
        </Button>
      </div>
      <div className="p-4">
        <HorairesList onEdit={handleEditSchedule} />
      </div>
    </div>
  );
}