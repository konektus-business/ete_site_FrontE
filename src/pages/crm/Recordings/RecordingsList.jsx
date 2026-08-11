import { useState, useEffect, useCallback, useMemo } from 'react';
import { AlertCircle, X } from 'lucide-react';
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

/**
 * Fonction déclenchant le téléchargement d'un fichier audio.
 * Extraite du composant pour éviter l'imbrication profonde de fonctions (> 4 niveaux)
 * et pour utiliser direct `link.remove()` au lieu de `parentNode.removeChild()`.
 */
function triggerDownload(id, url) {
  const fileUrl = url || `/mock/recordings/${id}.mp3`;
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = `enregistrement-${id}.mp3`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function RecordingsList() {
  const [period, setPeriod] = useState('today');
  const [dates, setDates] = useState(getDefaultDates());
  const [search, setSearch] = useState('');
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchRecordings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getRecordings({ period, ...dates, search });
      const list = Array.isArray(result) ? result : result?.recordings || [];
      setRecordings(list);
      setSelectedIds([]);
    } catch {
      setError('Erreur lors du chargement des enregistrements.');
      setRecordings([]);
    } finally {
      setLoading(false);
    }
  }, [period, dates, search]);

  useEffect(() => {
    fetchRecordings();
  }, [period, dates, fetchRecordings]);

  const toggleSelect = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleExportExcel = () => {
    if (!recordings.length) return;
    exportToExcel(
      recordings,
      `enregistrements-${dates.startDate}-au-${dates.endDate}`,
      recordingExportColumns
    );
  };

  const handleDownloadSelected = () => {
    if (!selectedIds.length) return;
    selectedIds.forEach((id, index) => {
      const item = recordings.find((r) => r.id === id);
      setTimeout(() => triggerDownload(id, item?.url), index * 200);
    });
  };

  const columns = useMemo(
    () => recordingColumns(selectedIds, toggleSelect),
    [selectedIds, toggleSelect]
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans font-semibold text-sm text-gray-900">
            Liste des enregistrements
          </h3>
          <span className="text-xs text-gray-400">
            {new Date().toLocaleString('fr-FR')}
          </span>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <PeriodFilter
            period={period}
            setPeriod={setPeriod}
            dates={dates}
            setDates={setDates}
          />

          <div className="min-w-[200px]">
            <label htmlFor="search" className={labelClass}>
              Recherche
            </label>
            <input
              type="text"
              id="search"
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
            <Button
              type="button"
              variant="warning"
              onClick={handleExportExcel}
              disabled={!recordings.length}
            >
              Excel
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleDownloadSelected}
              disabled={!selectedIds.length}
            >
              Télécharger la sélection ({selectedIds.length})
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="px-4 py-2.5 rounded-lg bg-red-50 text-red-700 border border-red-100 text-xs font-medium flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-sm text-gray-400">
          Chargement...
        </div>
      ) : (
        <Table
          columns={columns}
          data={recordings}
          onRowClick={() => {}}
          itemLabel="enregistrements"
          pageSizeOptions={[20, 50, 100, 200]}
        />
      )}
    </div>
  );
}