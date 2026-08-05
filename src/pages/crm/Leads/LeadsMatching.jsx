// src/pages/crm/Leads/LeadsMatching.jsx
import { useState, useEffect, useRef } from 'react';
import { PlayCircle, Database, UploadCloud, RotateCcw, CheckCircle2 } from 'lucide-react';
import { getCustomTables, launchExtraction } from '../../../api/leads';
import { getCampaigns } from '../../../api/campaigns';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';
import { getDefaultDates } from '../../../utils/dateUtils';

const EXPORT_TYPE_OPTIONS = [
  { value: 'modele_ok', label: 'Modèle des OK (Ventes uniquement)' },
  { value: 'modele_outcome', label: 'Modèle Outcome (Toutes les lignes)' },
];

export default function LeadsMatching() {
  const [tables, setTables] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  // Mode de source : 'existing' (table existante) ou 'new' (créer depuis CSV)
  const [sourceMode, setSourceMode] = useState('existing');
  const [selectedTable, setSelectedTable] = useState('');
  const [newTableName, setNewTableName] = useState('');
  const [file, setFile] = useState(null);

  const [dates, setDates] = useState(getDefaultDates(0));
  const [exportType, setExportType] = useState('modele_ok');
  const [campaignId, setCampaignId] = useState('ALL');

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    getCustomTables()
      .then((t) => setTables(t || []))
      .catch(() => setError('Erreur lors du chargement des tables.'));
    getCampaigns()
      .then((c) => setCampaigns(c || []))
      .catch(() => setError('Erreur lors du chargement des campagnes.'));
  }, []);

  const handleReset = () => {
    setSourceMode('existing');
    setSelectedTable('');
    setNewTableName('');
    setFile(null);
    setDates(getDefaultDates(0));
    setExportType('modele_ok');
    setCampaignId('ALL');
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // Validation selon le mode choisi
    if (sourceMode === 'existing' && !selectedTable) {
      setError('Veuillez choisir une table existante dans la liste.');
      return;
    }

    if (sourceMode === 'new') {
      if (!newTableName.trim()) {
        setError('Veuillez donner un nom à la nouvelle base.');
        return;
      }
      if (!file) {
        setError('Veuillez sélectionner un fichier CSV.');
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        selected_table: sourceMode === 'existing' ? selectedTable : '',
        new_table_name: sourceMode === 'new' ? newTableName.trim() : '',
        file: sourceMode === 'new' ? file : null, // Transmission du fichier
        date_start: dates.startDate,
        date_end: dates.endDate,
        export_type: exportType,
        campaign_id: campaignId,
      };

      const res = await launchExtraction(payload);
      setResult(res);

      // Si création réussie, rafraîchir la liste et basculer sur la nouvelle table
      if (sourceMode === 'new' && newTableName) {
        const updatedTables = await getCustomTables();
        setTables(updatedTables || []);
        setSelectedTable(`custom_${newTableName.trim()}`);
        setSourceMode('existing');
        setNewTableName('');
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err.message || "Erreur lors de l meffetuation de l'extraction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-sans font-semibold text-sm text-gray-900">Bases & Matching</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Croisez vos bases de contacts avec les historiques Vicidial et lancez des extractions ciblées.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 max-w-4xl">
        {/* Banner Succès */}
        {result && (
          <div className="px-4 py-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Extraction terminée : <strong>{result.rows_matched ?? 0}</strong> ligne(s) correspondante(s).
            </span>
          </div>
        )}

        {/* Banner Erreur */}
        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-50 text-red-700 border border-red-100 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Étape 1 : Source de la base client */}
        <div className="space-y-3">
          <label className={`${labelClass} font-semibold text-gray-900 block`}>
            1. Source de la base client
          </label>

          {/* Commutateur de Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setSourceMode('existing');
                setNewTableName('');
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                sourceMode === 'existing'
                  ? 'border-emerald-500 bg-emerald-50/30 text-emerald-900 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className={`p-2 rounded-lg ${sourceMode === 'existing' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                <Database className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold">Base existante</p>
                <p className="text-[11px] text-gray-400">Choisir une table déjà enregistrée</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setSourceMode('new');
                setSelectedTable('');
              }}
              className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                sourceMode === 'new'
                  ? 'border-emerald-500 bg-emerald-50/30 text-emerald-900 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className={`p-2 rounded-lg ${sourceMode === 'new' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                <UploadCloud className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold">Nouvelle base</p>
                <p className="text-[11px] text-gray-400">Importer un nouveau fichier CSV</p>
              </div>
            </button>
          </div>

          {/* Zone conditionnelle du mode */}
          <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 mt-2">
            {sourceMode === 'existing' ? (
              <div>
                <label className={labelClass}>Sélectionner la table existante *</label>
                <Select
                  value={selectedTable}
                  onChange={setSelectedTable}
                  options={[
                    { value: '', label: '-- Choisir une table --' },
                    ...tables.map((t) => ({
                      value: t,
                      label: t.replace('custom_', '').toUpperCase(),
                    })),
                  ]}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Nom de la nouvelle table *</label>
                  <input
                    type="text"
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                    placeholder="ex: ooredoo_mars"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Fichier CSV *</label>
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      id="matching-csv-upload"
                      type="file"
                      accept=".csv"
                      onChange={(e) => setFile(e.target.files[0] || null)}
                      className="hidden"
                    />
                    <label
                      htmlFor="matching-csv-upload"
                      className="flex items-center justify-between w-full px-3 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 cursor-pointer text-sm transition-colors"
                    >
                      <span className="truncate text-gray-600 font-normal">
                        {file ? file.name : 'Choisir le fichier CSV...'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Étape 2 : Filtres et configuration de l'extraction */}
        <div className="space-y-3 pt-2">
          <label className={`${labelClass} font-semibold text-gray-900 block`}>
            2. Paramètres d'extraction
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Date de début *</label>
              <input
                type="date"
                value={dates.startDate}
                onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Date de fin *</label>
              <input
                type="date"
                value={dates.endDate}
                onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Modèle d'export *</label>
              <Select
                value={exportType}
                onChange={setExportType}
                options={EXPORT_TYPE_OPTIONS}
              />
            </div>

            <div>
              <label className={labelClass}>Campagne Vicidial</label>
              <Select
                value={campaignId}
                onChange={setCampaignId}
                options={[
                  { value: 'ALL', label: 'Toutes les campagnes' },
                  ...campaigns.map((c) => ({
                    value: c.campaign_id,
                    label: c.campaign_name,
                  })),
                ]}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="flex items-center gap-2"
          >
            <PlayCircle className="w-4 h-4" />
            {loading ? 'Extraction en cours...' : "Lancer l'extraction"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={loading}
            className="flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Réinitialiser
          </Button>
        </div>
      </form>
    </div>
  );
}