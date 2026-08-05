// src/pages/crm/Leads/ExportTemplates.jsx
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, FileSpreadsheet, Check } from 'lucide-react';
import { getExportTemplates, saveExportTemplate, deleteExportTemplate, availableExportFields } from '../../../api/leads';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';

const FORMAT_OPTIONS = [
  { value: 'csv', label: 'CSV (.csv)' },
  { value: 'xlsx', label: 'Excel (.xlsx)' },
  { value: 'json', label: 'JSON (.json)' }
];

const emptyForm = { name: '', format: 'csv', fields: [] };

const formatBadges = {
  csv: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  xlsx: 'bg-blue-50 text-blue-700 border-blue-200',
  json: 'bg-purple-50 text-purple-700 border-purple-200',
};

export default function ExportTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const load = () => {
    setLoading(true);
    getExportTemplates().then((t) => {
      setTemplates(t || []);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setForm({ ...t });
    setError(null);
    setShowForm(true);
  };

  const toggleField = (key) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.includes(key)
        ? prev.fields.filter((f) => f !== key)
        : [...prev.fields, key],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Veuillez saisir un nom de modèle.');
      return;
    }
    if (form.fields.length === 0) {
      setError('Veuillez sélectionner au moins un champ à exporter.');
      return;
    }
    await saveExportTemplate(editing ? { ...form, id: editing.id } : form);
    setShowForm(false);
    load();
  };

  const confirmDelete = async () => {
    await deleteExportTemplate(toDelete.id);
    setToDelete(null);
    load();
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      {!showForm && (
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Modèles d'exportation</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Gérez vos modèles personnalisés pour exporter facilement vos données de leads.
            </p>
          </div>
          <Button variant="primary" onClick={openAdd} className="flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Nouveau modèle
          </Button>
        </div>
      )}

      {/* Formulaire de création / modification */}
      {showForm ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-sans font-semibold text-sm text-gray-900">
              {editing ? 'Modifier le modèle' : 'Créer un modèle d\'export'}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Choisissez le nom, le format et les colonnes incluses.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="px-4 py-2.5 rounded-lg bg-red-50 text-red-700 border border-red-100 text-xs font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className={labelClass}>Nom du modèle *</label>
                <input
                  type="text"
                  placeholder="ex: Export Ventes Mensuel"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Format du fichier</label>
                <Select
                  value={form.format}
                  onChange={(v) => setForm({ ...form, format: v })}
                  options={FORMAT_OPTIONS}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Champs à inclure *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 mt-2 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                {Object.entries(availableExportFields).map(([key, label]) => {
                  const isChecked = form.fields.includes(key);
                  return (
                    <div
                      key={key}
                      onClick={() => toggleField(key)}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all select-none ${
                        isChecked
                          ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900 shadow-sm'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="truncate">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <Button type="submit" variant="primary">
                {editing ? 'Mettre à jour' : 'Enregistrer le modèle'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Annuler
              </Button>
            </div>
          </form>
        </div>
      ) : loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-sm text-gray-400">
          Chargement des modèles...
        </div>
      ) : templates.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
          <FileSpreadsheet className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h4 className="text-sm font-medium text-gray-900">Aucun modèle défini</h4>
          <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
            Créez un modèle pour sauvegarder vos préférences d'exportation de colonnes.
          </p>
          <Button variant="primary" onClick={openAdd} className="mt-4 inline-flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Créer un modèle
          </Button>
        </div>
      ) : (
        /* Grille de cartes */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{t.name}</h4>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase shrink-0 ${
                      formatBadges[t.format?.toLowerCase()] || 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {t.format}
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block mb-2">
                    Champs inclus ({t.fields?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {t.fields?.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-1 rounded-md bg-gray-50 text-gray-700 border border-gray-100 text-xs font-normal"
                      >
                        {availableExportFields[f] || f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-5 pt-3 border-t border-gray-100">
                <button
                  onClick={() => openEdit(t)}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-emerald-700 transition-colors"
                  title="Modifier"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setToDelete(t)}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={!!toDelete}
        onClose={() => setToDelete(null)}
        itemLabel={toDelete ? `le modèle "${toDelete.name}"` : ''}
        onConfirm={confirmDelete}
      />
    </div>
  );
}