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
      if (mode === 'add') {
        setForm({ ...emptyStatus });
      }
    } catch (err) {
      setError(err?.message === 'exists' ? 'Ce statut existe déjà.' : "Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  let buttonLabel;
  if (saving) {
    buttonLabel = 'Enregistrement...';
  } else if (mode === 'edit') {
    buttonLabel = 'Mettre à jour';
  } else {
    buttonLabel = 'Ajouter le statut';
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="px-4 py-2.5 rounded-lg bg-red-50 text-red-800 border border-red-100 text-sm">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="status" className={labelClass}>Code statut *</label>
          <input
            type="text"
            id="status"
            maxLength={6}
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value.toUpperCase())}
            disabled={mode === 'edit'}
            className={`${inputClass} ${mode === 'edit' ? 'bg-gray-50 text-gray-400' : ''}`}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="status_name" className={labelClass}>Nom *</label>
          <input type="text" id="status_name" value={form.status_name} onChange={(e) => handleChange('status_name', e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="category" className={labelClass}>Catégorie</label>
          <input type="text" id="category" value={form.category} onChange={(e) => handleChange('category', e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {BOOLEAN_FIELDS.map((f) => (
          <div key={f.key}>
            <label htmlFor={f.key} className={labelClass}>{f.label}</label>
            <Select id={f.key} value={form[f.key]} onChange={(v) => handleChange(f.key, v)} options={YES_NO} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="min_sec" className={labelClass}>Min sec</label>
          <input type="number" id="min_sec" value={form.min_sec} onChange={(e) => handleChange('min_sec', Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label htmlFor="max_sec" className={labelClass}>Max sec</label>
          <input type="number" id="max_sec" value={form.max_sec} onChange={(e) => handleChange('max_sec', Number(e.target.value))} className={inputClass} />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={saving}>
          {buttonLabel}
        </Button>
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button>}
      </div>
    </form>
  );
}