import { useState } from 'react';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';

const YES_NO = [
  { value: 'Y', label: 'Oui' },
  { value: 'N', label: 'Non' },
];

const BOOLEAN_FIELDS = [
  { key: 'selectable', label: 'Sélectionnable' },
  { key: 'human_answered', label: 'Humain répondu' },
  { key: 'sale', label: 'Vente' },
  { key: 'dnc', label: 'DNC' },
  { key: 'customer_contact', label: 'Contact client' },
  { key: 'not_interested', label: 'Pas intéressé' },
  { key: 'unworkable', label: 'Non travaillable' },
  { key: 'scheduled_callback', label: 'Rappel programmé' },
  { key: 'completed', label: 'Complété' },
  { key: 'answering_machine', label: 'Répondeur' },
];

const emptyStatus = {
  status: '',
  status_name: '',
  category: 'UNDEFINED',
  min_sec: 0,
  max_sec: 0,
  ...Object.fromEntries(BOOLEAN_FIELDS.map((f) => [f.key, 'N'])),
};

export default function StatusForm({ mode = 'add', initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialData ? { ...initialData } : { ...emptyStatus });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.status || !form.status_name) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSubmit(form);
      if (mode === 'add') setForm({ ...emptyStatus }); // formulaire réinitialisé après ajout, prêt pour le suivant
    } catch (err) {
      setError(err.message === 'exists' ? 'Ce statut existe déjà.' : "Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="px-4 py-2.5 rounded-lg bg-red-50 text-red-800 border border-red-100 text-sm">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className={labelClass}>Code statut *</label>
          <input
            type="text"
            maxLength={6}
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value.toUpperCase())}
            disabled={mode === 'edit'}
            className={`${inputClass} ${mode === 'edit' ? 'bg-gray-50 text-gray-400' : ''}`}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Nom *</label>
          <input type="text" value={form.status_name} onChange={(e) => handleChange('status_name', e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Catégorie</label>
          <input type="text" value={form.category} onChange={(e) => handleChange('category', e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {BOOLEAN_FIELDS.map((f) => (
          <div key={f.key}>
            <label className={labelClass}>{f.label}</label>
            <Select value={form[f.key]} onChange={(v) => handleChange(f.key, v)} options={YES_NO} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className={labelClass}>Min sec</label>
          <input type="number" value={form.min_sec} onChange={(e) => handleChange('min_sec', Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Max sec</label>
          <input type="number" value={form.max_sec} onChange={(e) => handleChange('max_sec', Number(e.target.value))} className={inputClass} />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? 'Enregistrement...' : mode === 'edit' ? 'Mettre à jour' : 'Ajouter le statut'}
        </Button>
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button>}
      </div>
    </form>
  );
}