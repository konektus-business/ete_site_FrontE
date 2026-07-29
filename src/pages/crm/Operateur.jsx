// src/pages/crm/Operateur.jsx
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CarriersList from './Operateur/CarriersList';
import CarrierForm from './Operateur/CarrierForm';
import EtatSip from './Operateur/EtatSip';
import HorairesList from './Operateur/HorairesList';
import ScheduleForm from './Operateur/ScheduleForm';
import Button from '../../components/common/Button';
import { Plus } from 'lucide-react';

export default function Operateurs() {
  const { activeTab, setActiveTab } = useOutletContext();

  // État existant pour les carriers
  const [formMode, setFormMode] = useState('add');
  const [selectedCarrier, setSelectedCarrier] = useState(null);

  // Nouvel état, même principe pour les horaires : null = liste,
  // 'add'/'edit' = formulaire affiché à la place de la liste
  const [scheduleMode, setScheduleMode] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

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

  // Bascule vers le formulaire d'édition d'un horaire existant
  const handleEditSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setScheduleMode('edit');
  };

  // Bascule vers le formulaire d'ajout d'un nouvel horaire
  const handleAddSchedule = () => {
    setSelectedSchedule(null);
    setScheduleMode('add');
  };

  // Retour à la liste après succès ou annulation
  const handleScheduleDone = () => {
    setScheduleMode(null);
    setSelectedSchedule(null);
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
      {activeTab === 'sip' && <EtatSip />}

      {activeTab === 'horaires' && (
        scheduleMode ? (
          <ScheduleForm
            mode={scheduleMode}
            initialData={selectedSchedule}
            onSuccess={handleScheduleDone}
            onCancel={handleScheduleDone}
          />
        ) : (
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
        )
      )}
    </div>
  );
}