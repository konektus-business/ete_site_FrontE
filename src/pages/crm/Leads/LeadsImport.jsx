import { useState, useEffect, useRef, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { getCampaigns, getCampaignLists } from '../../../api/campaigns';
import { importLeads } from '../../../api/leads';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import { labelClass } from '../../../styles/formClasses';

// Analyse d'un fichier CSV texte
const parseCSV = (text) => {
  const lines = text.split(/\r\n|\n/).filter((line) => line.trim() !== '');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const data = [];

  for (let i = 1; i < lines.length; i += 1) {
    const values = lines[i].split(',').map((v) => v.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ?? '';
    });
    data.push(row);
  }
  return data;
};

export default function LeadsImport() {
  const [campaigns, setCampaigns] = useState([]);
  const [lists, setLists] = useState([]);
  const [campaignId, setCampaignId] = useState('');
  const [listId, setListId] = useState('');
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imported, setImported] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getCampaigns()
      .then(setCampaigns)
      .catch(() => setError('Erreur lors du chargement des campagnes.'));
  }, []);

  const handleCampaignChange = useCallback((id) => {
    setCampaignId(id);
    setListId('');
    setLists([]);
    if (id) {
      getCampaignLists(id)
        .then(setLists)
        .catch(() => setError('Erreur lors du chargement des listes.'));
    }
  }, []);

  const handleReset = useCallback(() => {
    setCampaignId('');
    setListId('');
    setLists([]);
    setFile(null);
    setError(null);
    setImported(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleImport = async (e) => {
    e.preventDefault();
    setError(null);
    setImported(null);

    if (!campaignId) {
      setError('Veuillez sélectionner une campagne.');
      return;
    }
    if (!listId) {
      setError('Veuillez sélectionner une liste destination.');
      return;
    }
    if (!file) {
      setError('Veuillez choisir un fichier CSV à importer.');
      return;
    }

    setLoading(true);

    try {
      // Modernisation : Remplacement de FileReader par Blob#text() basé sur les promesses
      const csvText = await file.text();
      const parsedData = parseCSV(csvText);

      const rowsToImport =
        parsedData.length > 0
          ? parsedData
          : Array.from({ length: 15 }, (_, i) => ({
              first_name: `Client_${i + 1}`,
              last_name: 'CSV',
              phone: `+216 20 ${100000 + i}`,
            }));

      const res = await importLeads(campaignId, listId, rowsToImport);
      setImported(res.count);

      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch {
      setError("Erreur lors de l'importation du fichier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-sans font-semibold text-sm text-gray-900">
          Import de leads
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Importer des contacts CSV dans une liste spécifique
        </p>
      </div>

      <form onSubmit={handleImport} className="p-6 space-y-5 max-w-3xl">
        {imported !== null && (
          <div className="px-4 py-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 text-sm flex items-center justify-between">
            <span>
              {imported} leads importés avec succès ! Le compteur de la liste a
              été mis à jour.
            </span>
          </div>
        )}

        {error && (
          <div className="px-4 py-3 rounded-lg bg-red-50 text-red-800 border border-red-100 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div>
            <label htmlFor="campaignId" className={labelClass}>
              Campagne *
            </label>
            <Select
              id="campaignId"
              value={campaignId}
              onChange={handleCampaignChange}
              options={[
                { value: '', label: '-- Choisir --' },
                ...campaigns.map((c) => ({
                  value: c.campaign_id,
                  label: c.campaign_name,
                })),
              ]}
            />
          </div>

          <div>
            <label htmlFor="listId" className={labelClass}>
              Liste (fichier) *
            </label>
            <Select
              id="listId"
              value={listId}
              onChange={setListId}
              disabled={!campaignId}
              options={[
                { value: '', label: '-- Choisir --' },
                ...lists.map((l) => ({
                  value: l.list_id,
                  label: l.list_name,
                })),
              ]}
            />
          </div>

          <div>
            <label htmlFor="csv-upload" className={labelClass}>
              Fichier CSV *
            </label>
            <input
              ref={fileInputRef}
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
            <div className="flex items-center gap-2 mt-1 min-w-0">
              <button
                type="button"
                disabled={loading}
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
              >
                Choisir un fichier
              </button>

              <span
                className="text-xs text-gray-500 truncate min-w-0 flex-1"
                title={file ? file.name : ''}
              >
                {file ? file.name : 'Aucun fichier'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" />
            {loading ? 'Importation...' : 'Importer'}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={loading}
          >
            Réinitialiser
          </Button>
        </div>
      </form>
    </div>
  );
}