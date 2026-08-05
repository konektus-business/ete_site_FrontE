// src/pages/crm/Leads/LeadsImport.jsx
import { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';
import { getCampaigns, getCampaignLists } from '../../../api/campaigns';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import { labelClass } from '../../../styles/formClasses';

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

  const handleCampaignChange = (id) => {
    setCampaignId(id);
    setListId('');
    setLists([]);
    if (id) {
      getCampaignLists(id)
        .then(setLists)
        .catch(() => setError('Erreur lors du chargement des listes.'));
    }
  };

  const handleReset = () => {
    setCampaignId('');
    setListId('');
    setLists([]);
    setFile(null);
    setError(null);
    setImported(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImport = async (e) => {
    e.preventDefault();
    setError(null);
    setImported(null);

    // Validation explicite avec retour visuel
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
      // Simulation d'import (à remplacer par l'appel API réel d'importation)
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockCount = Math.floor(Math.random() * 50) + 10;
      setImported(mockCount);

      // Réinitialiser uniquement le fichier après succès
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError("Erreur lors de l'importation du fichier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-sans font-semibold text-sm text-gray-900">Import de leads</h2>
        <p className="text-xs text-gray-400 mt-0.5">Importer des contacts CSV dans une liste spécifique</p>
      </div>

      <form onSubmit={handleImport} className="p-6 space-y-5 max-w-3xl">
        {imported !== null && (
          <div className="px-4 py-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 text-sm flex items-center justify-between">
            <span>{imported} leads importés avec succès !</span>
          </div>
        )}

        {error && (
          <div className="px-4 py-3 rounded-lg bg-red-50 text-red-800 border border-red-100 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Campagne *</label>
            <Select
              value={campaignId}
              onChange={handleCampaignChange}
              options={[
                { value: '', label: '-- Choisir --' },
                ...campaigns.map((c) => ({ value: c.campaign_id, label: c.campaign_name })),
              ]}
            />
          </div>

          <div>
            <label className={labelClass}>Liste (fichier) *</label>
            <Select
              value={listId}
              onChange={setListId}
              disabled={!campaignId}
              options={[
                { value: '', label: '-- Choisir --' },
                ...lists.map((l) => ({ value: l.list_id, label: l.list_name })),
              ]}
            />
          </div>

        <div>
          <label className={labelClass}>Fichier CSV *</label>
          <div className="relative">
            <input
              ref={fileInputRef}
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0] || null)}
              className="hidden"
            />
            <label
              htmlFor="csv-upload"
              className="flex items-center justify-between w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer text-sm transition-colors"
            >
              <span className="truncate text-gray-600 font-normal">
                {file ? file.name : 'Choisir un fichier CSV...'}
              </span>

            </label>
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