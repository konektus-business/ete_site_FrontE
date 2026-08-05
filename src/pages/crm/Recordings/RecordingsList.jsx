// src/pages/crm/Recordings/RecordingsList.jsx
import { useState, useEffect, useCallback } from 'react';
import { getRecordings } from '../../../api/recordings';
import { recordingColumns } from '../../../config/recordingColumns';
import Table from '../../../components/dashboard/Table';
import Button from '../../../components/common/ButtonCRM';
import PeriodFilter from '../../../components/dashboard/PeriodFilter';
import { getDefaultDates } from '../../../utils/dateUtils';
import { exportToExcel } from '../../../utils/exportExcel';
import { filterInputClass as inputClass, labelClass } from '../../../styles/formClasses';

const recordingExportColumns = [
  { key: 'date', label: 'Date' },
  { key: 'agent', label: 'Agent' },
  { key: 'phone', label: 'Téléphone' },
  { key: 'status', label: 'Statut' },
  { key: 'list', label: 'Liste' },
  { key: 'duration', label: 'Durée (s)' },
];

export default function RecordingsList() {
  const [period, setPeriod] = useState('today');
  const [dates, setDates] = useState(getDefaultDates());
  const [search, setSearch] = useState('');
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchRecordings = useCallback(() => {
    setLoading(true);
    getRecordings({ period, ...dates, search }).then((result) => {
      setRecordings(result.recordings);
      setSelectedIds([]);
      setLoading(false);
    });
  }, [period, dates, search]);

  useEffect(() => {
    fetchRecordings();
  }, [fetchRecordings]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleExportExcel = () => {
    if (!recordings.length) return;
    exportToExcel(recordings, `enregistrements-${dates.startDate}-au-${dates.endDate}`, recordingExportColumns);
  };

  const handleDownloadSelected = () => {
    if (!selectedIds.length) return;
    selectedIds.forEach((id, index) => {
      setTimeout(() => {
        const item = recordings.find((r) => r.id === id);
        const url = item?.url || `/mock/recordings/${id}.mp3`;
        const link = document.createElement('a');
        link.href = url;
        link.download = `enregistrement-${id}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 200); // Léger délai entre chaque téléchargement
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans font-semibold text-sm text-gray-900">Liste des enregistrements</h3>
          <span className="text-xs text-gray-400">{new Date().toLocaleString('fr-FR')}</span>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <PeriodFilter period={period} setPeriod={setPeriod} dates={dates} setDates={setDates} />

          <div className="min-w-[200px]">
            <label className={labelClass}>Recherche</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Agent, téléphone, statut, liste..."
              className={inputClass}
            />
          </div>

          <Button type="button" variant="primary" onClick={fetchRecordings}>
            Appliquer
          </Button>

          <div className="flex gap-2 ml-auto">
            <Button variant="warning" onClick={handleExportExcel} disabled={!recordings.length}>
              Excel
            </Button>
            <Button variant="secondary" onClick={handleDownloadSelected} disabled={!selectedIds.length}>
              Télécharger la sélection ({selectedIds.length})
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-sm text-gray-400">
          Chargement...
        </div>
      ) : (
        <Table
          columns={recordingColumns(selectedIds, toggleSelect)}
          data={recordings}
          onRowClick={() => {}}
          itemLabel="enregistrements"
          pageSizeOptions={[20, 50, 100, 200]}
        />
      )}
    </div>
  );
}