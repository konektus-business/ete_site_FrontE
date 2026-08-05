import { useState } from 'react';
import { createCampaign, updateCampaign, dialMethods } from '../../../api/campaigns';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';

const DIAL_OPTIONS = dialMethods.map((m) => ({ value: m, label: m }));

const emptyCampaign = {
  campaign_id: '',
  campaign_name: '',
  dial_method: 'MANUAL',
  campaign_script: '',
  campaign_cid: '',
  active: 'Y',
};

export default function CampaignForm({ mode = 'add', initialData, onSuccess, onCancel }) {
  const [form, setForm] = useState(initialData ? { ...initialData } : { ...emptyCampaign });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.campaign_id || !form.campaign_name) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (mode === 'edit') {
        await updateCampaign(initialData.campaign_id, form);
      } else {
        await createCampaign(form);
      }
      onSuccess();
    } catch (err) {
      setError(err.message === 'exists' ? 'Cette campagne existe déjà.' : "Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-sans font-semibold text-sm text-gray-900">
          {mode === 'edit' ? 'Modifier la campagne' : 'Créer une campagne'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-2xl">
        {error && <div className="px-4 py-2.5 rounded-lg bg-red-50 text-red-800 border border-red-100 text-sm">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>ID campagne *</label>
            <input
              type="text"
              value={form.campaign_id}
              onChange={(e) => handleChange('campaign_id', e.target.value)}
              disabled={mode === 'edit'}
              placeholder="ex: CAMP001"
              className={`${inputClass} ${mode === 'edit' ? 'bg-gray-50 text-gray-400' : ''}`}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Nom *</label>
            <input type="text" value={form.campaign_name} onChange={(e) => handleChange('campaign_name', e.target.value)} className={inputClass} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Méthode de dial</label>
            <Select value={form.dial_method} onChange={(v) => handleChange('dial_method', v)} options={DIAL_OPTIONS} />
          </div>
          <div>
            <label className={labelClass}>Script</label>
            <input type="text" value={form.campaign_script} onChange={(e) => handleChange('campaign_script', e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Caller ID</label>
          <input type="text" value={form.campaign_cid} onChange={(e) => handleChange('campaign_cid', e.target.value)} className={inputClass} />
        </div>

        {/* Toggle switch identique à CarrierForm.jsx */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            role="switch"
            aria-checked={form.active === 'Y'}
            onClick={() => handleChange('active', form.active === 'Y' ? 'N' : 'Y')}
            className={`relative w-10 h-5 rounded-full transition-colors ${form.active === 'Y' ? 'bg-[#1EB394]' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.active === 'Y' ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
          <span className="text-xs font-medium text-gray-600">Actif</span>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Enregistrement...' : mode === 'edit' ? 'Mettre à jour' : 'Créer'}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button>
        </div>
      </form>
    </div>
  );
}