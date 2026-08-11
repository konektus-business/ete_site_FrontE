import { useState } from 'react';
import { createCampaign, updateCampaign, dialMethods } from '../../../api/campaigns';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import Toast from '../../../components/common/Toast';
import ToggleSwitch from '../../../components/common/ToggleSwitch';
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
  const [toast, setToast] = useState(null);

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
      setToast({ message: mode === 'edit' ? 'Campagne mise à jour' : 'Campagne créée', type: 'success' });
      setTimeout(() => onSuccess(), 1000);
    } catch (err) {
      setToast({ message: 'Erreur lors de l\'enregistrement.', type: 'error' });
      setError(err.message === 'exists' ? 'Cette campagne existe déjà.' : "Erreur lors de l'enregistrement.");
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
    buttonLabel = 'Créer';
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
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
              <label htmlFor="campaign_id" className={labelClass}>ID campagne *</label>
              <input
                type="text"
                id="campaign_id"
                value={form.campaign_id}
                onChange={(e) => handleChange('campaign_id', e.target.value)}
                disabled={mode === 'edit'}
                placeholder="ex: CAMP001"
                className={`${inputClass} ${mode === 'edit' ? 'bg-gray-50 text-gray-400' : ''}`}
                required
              />
            </div>
            <div>
              <label htmlFor="campaign_name" className={labelClass}>Nom *</label>
              <input type="text" id="campaign_name" value={form.campaign_name} onChange={(e) => handleChange('campaign_name', e.target.value)} className={inputClass} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dial_method" className={labelClass}>Méthode de dial</label>
              <Select value={form.dial_method} onChange={(v) => handleChange('dial_method', v)} options={DIAL_OPTIONS} />
            </div>
            <div>
              <label htmlFor="campaign_script" className={labelClass}>Script</label>
              <input type="text" id="campaign_script" value={form.campaign_script} onChange={(e) => handleChange('campaign_script', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="campaign_cid" className={labelClass}>Caller ID</label>
            <input type="text" id="campaign_cid" value={form.campaign_cid} onChange={(e) => handleChange('campaign_cid', e.target.value)} className={inputClass} />
          </div>

          <ToggleSwitch
            checked={form.active === 'Y'}
            onChange={() => handleChange('active', form.active === 'Y' ? 'N' : 'Y')}
            label="Actif"
            className="pt-1"
          />

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" variant="primary" disabled={saving}>
              {buttonLabel}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button>
          </div>
        </form>
      </div>
    </>
  );
}