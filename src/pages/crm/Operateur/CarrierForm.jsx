import { useState } from 'react';
import { createCarrier, updateCarrier } from '../../../api/carriers';
import Select from '../../../components/common/Select';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';
import Button from '../../../components/common/Button';

const protocolOptions = [
  { value: 'SIP', label: 'SIP' },
  { value: 'PJSIP', label: 'PJSIP' },
  { value: 'PJSIP_WIZ', label: 'PJSIP_WIZ' },
  { value: 'IAX2', label: 'IAX2' },
  { value: 'EXTERNAL', label: 'EXTERNAL' },
];

const emptyForm = {
  carrier_id: '',
  carrier_name: '',
  protocol: 'SIP',
  account_entry: '',
  server_ip: '',
  carrier_description: '',
  globals_string: '',
  dialplan_entry: '',
  active: 'Y',
};

// mode: 'add' | 'edit' | 'clone'
// initialData: carrier existant (requis pour edit/clone, ignoré pour add)
export default function CarrierForm({ mode = 'add', initialData = null, onSuccess, onCancel }) {
  const getInitialForm = () => {
    if (!initialData) return emptyForm;
    if (mode === 'clone') return { ...emptyForm, ...initialData, carrier_id: '' };
    return { ...emptyForm, ...initialData };
  };

  const [form, setForm] = useState(getInitialForm);
  const [originalCarrierId] = useState(initialData?.carrier_id ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldChange = (name) => (value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleActive = () => {
    setForm((prev) => ({ ...prev, active: prev.active === 'Y' ? 'N' : 'Y' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'edit') {
        await updateCarrier(originalCarrierId, form);
      } else {
        // 'add' et 'clone' créent tous les deux un nouveau carrier
        await createCarrier(form);
      }
      onSuccess?.(form);
    } catch (err) {
      setError(
        mode === 'edit'
          ? 'Erreur lors de la mise à jour du carrier'
          : 'Erreur lors de la création du carrier'
      );
    } finally {
      setLoading(false);
    }
  };

  const titles = {
    add: { title: 'Ajouter un carrier', subtitle: 'Créer un nouveau trunk SIP' },
    edit: { title: 'Modifier le carrier', subtitle: 'Mettre à jour les informations du trunk' },
    clone: { title: 'Cloner le carrier', subtitle: 'Créer un nouveau trunk à partir de valeurs existantes' },
  };
  const submitLabels = { add: 'Créer', edit: 'Mettre à jour', clone: 'Cloner' };


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-sans font-semibold text-sm text-gray-900">{titles[mode].title}</h2>
        <p className="text-xs text-gray-400 mt-0.5">{titles[mode].subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="carrier_id" className={labelClass}>ID carrier *</label>
            <input
              type="text"
              id="carrier_id"
              name="carrier_id"
              required
              value={form.carrier_id}
              onChange={handleChange}
              className={inputClass}
              placeholder="ex: mycarrier01"
            />
          </div>

          <div>
            <label htmlFor="carrier_name" className={labelClass}>Nom *</label>
            <input
              type="text"
              id="carrier_name"
              name="carrier_name"
              required
              value={form.carrier_name}
              onChange={handleChange}
              className={inputClass}
              placeholder="ex: Orange Tunisie"
            />
          </div>

          <div>
            <label className={labelClass}>Protocole</label>
            <Select
              value={form.protocol}
              onChange={handleFieldChange('protocol')}
              options={protocolOptions}
            />
          </div>

          <div>
            <label htmlFor="server_ip" className={labelClass}>Serveur IP *</label>
            <input
              type="text"
              id="server_ip"
              name="server_ip"
              required
              value={form.server_ip}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="account_entry" className={labelClass}>Compte (account_entry)</label>
            <textarea
              id="account_entry"
              name="account_entry"
              rows={4}
              value={form.account_entry}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="carrier_description" className={labelClass}>Description</label>
            <input
              type="text"
              id="carrier_description"
              name="carrier_description"
              value={form.carrier_description}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="globals_string" className={labelClass}>Globals String</label>
            <input
              type="text"
              id="globals_string"
              name="globals_string"
              value={form.globals_string}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="dialplan_entry" className={labelClass}>Dialplan Entry</label>
            <textarea
              id="dialplan_entry"
              name="dialplan_entry"
              rows={4}
              value={form.dialplan_entry}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <button
            type="button"
            role="switch"
            aria-checked={form.active === 'Y'}
            onClick={handleToggleActive}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              form.active === 'Y' ? 'bg-[#1EB394]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                form.active === 'Y' ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-xs font-medium text-gray-600">Actif</span>
        </div>

        {error && <p className="text-xs text-red-600 mt-4">{error}</p>}

        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
          <Button type="submit" variant="primary" disabled={loading}>{loading ? '...' : submitLabels[mode]}</Button> 
          <Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button>
        </div>
      </form>
    </div>
  );
}