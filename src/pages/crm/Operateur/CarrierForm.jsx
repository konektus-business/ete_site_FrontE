import { useState, useRef } from 'react';
import { createCarrier, updateCarrier } from '../../../api/carriers';
import Select from '../../../components/common/Select';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';
import Button from '../../../components/common/ButtonCRM';
import Toast from '../../../components/common/Toast';
import ToggleSwitch from '../../../components/common/ToggleSwitch';
import { checkboxClass } from '../../../styles/checkboxClass';
import { processLogoFile } from '../../../utils/logoProcessing';

const PROTOCOL_OPTIONS = Object.freeze([
  { value: 'SIP', label: 'SIP' },
  { value: 'PJSIP', label: 'PJSIP' },
  { value: 'PJSIP_WIZ', label: 'PJSIP_WIZ' },
  { value: 'IAX2', label: 'IAX2' },
  { value: 'EXTERNAL', label: 'EXTERNAL' },
]);

const EMPTY_FORM = Object.freeze({
  carrier_id: '',
  carrier_name: '',
  protocol: 'SIP',
  account_entry: '',
  server_ip: '',
  carrier_description: '',
  globals_string: '',
  dialplan_entry: '',
  active: 'Y',
  logo: '',
});

const FORM_TITLES = Object.freeze({
  add: { title: 'Ajouter un carrier', subtitle: 'Créer un nouveau trunk SIP' },
  edit: { title: 'Modifier le carrier', subtitle: 'Mettre à jour les informations du trunk' },
  clone: { title: 'Cloner le carrier', subtitle: 'Créer un nouveau trunk à partir de valeurs existantes' },
});

const SUBMIT_LABELS = Object.freeze({
  add: 'Créer',
  edit: 'Mettre à jour',
  clone: 'Cloner',
});

// mode: 'add' | 'edit' | 'clone'
export default function CarrierForm({ mode = 'add', initialData = null, onSuccess, onCancel }) {
  const getInitialForm = () => {
    if (!initialData) return { ...EMPTY_FORM };
    if (mode === 'clone') return { ...EMPTY_FORM, ...initialData, carrier_id: '' };
    return { ...EMPTY_FORM, ...initialData };
  };

  const [form, setForm] = useState(getInitialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const fileInputRef = useRef(null);
  const originalCarrierIdRef = useRef(initialData?.carrier_id ?? null);

  const [removeBackground, setRemoveBackground] = useState(true);
  const [logoError, setLogoError] = useState(null);
  const [processing, setProcessing] = useState(false);

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

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setLogoError('Le fichier doit être une image (PNG, JPG, SVG...)');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setLogoError('Image trop lourde (max 2 Mo)');
      return;
    }

    setLogoError(null);
    setProcessing(true);
    try {
      const dataUrl = await processLogoFile(file, { removeBackground });
      setForm((prev) => ({ ...prev, logo: dataUrl }));
    } catch {
      setLogoError('Impossible de traiter cette image');
    } finally {
      setProcessing(false);
    }
  };

  const handleRemoveLogo = () => {
    setForm((prev) => ({ ...prev, logo: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'edit') {
        await updateCarrier(originalCarrierIdRef.current, form);
      } else {
        await createCarrier(form);
      }
      setToast({ message: mode === 'edit' ? 'Carrier mis à jour' : 'Carrier créé', type: 'success' });
      setTimeout(() => onSuccess?.(form), 1000);
    } catch {
      setToast({ message: "Erreur lors de l'enregistrement.", type: 'error' });
      setError(
        mode === 'edit'
          ? 'Erreur lors de la mise à jour du carrier'
          : 'Erreur lors de la création du carrier'
      );
    } finally {
      setLoading(false);
    }
  };

  const currentTitle = FORM_TITLES[mode] ?? FORM_TITLES.add;
  const currentSubmitLabel = SUBMIT_LABELS[mode] ?? SUBMIT_LABELS.add;

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-sans font-semibold text-sm text-gray-900">{currentTitle.title}</h2>
          <p className="text-xs text-gray-400 mt-0.5">{currentTitle.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Section Logo */}
          <div className="mb-6 pb-6 border-b border-gray-100">
            <span className={labelClass}>Logo du carrier (optionnel)</span>
            <p className="text-xs text-gray-400 mb-3">
              PNG recommandé, idéalement déjà à fond transparent. Sans logo, le nom du carrier
              s'affichera en texte dans les tableaux.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-20 h-12 rounded-lg border border-gray-200 bg-[repeating-conic-gradient(#f3f4f6_0%_25%,white_0%_50%)] bg-[length:10px_10px] flex items-center justify-center overflow-hidden shrink-0">
                {form.logo ? (
                  <img src={form.logo} alt="Aperçu logo carrier" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-[10px] text-gray-400">Aucun</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  id="carrier-logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={processing}
                  className="hidden"
                />

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={processing}
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {processing ? 'Traitement...' : 'Choisir un fichier'}
                  </button>

                  <span className="text-xs text-gray-400">
                    {form.logo ? 'Logo chargé ✓' : 'Aucun fichier choisi'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remove-bg-checkbox"
                    className={checkboxClass}
                    checked={removeBackground}
                    onChange={(e) => setRemoveBackground(e.target.checked)}
                  />
                  <label htmlFor="remove-bg-checkbox" className="text-xs text-gray-500 cursor-pointer">
                    Tenter de retirer le fond automatiquement (fond uni uniquement)
                  </label>
                </div>

                {form.logo && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="text-xs text-red-600 text-left hover:underline cursor-pointer"
                  >
                    Retirer le logo
                  </button>
                )}
              </div>
            </div>

            {logoError && <p className="text-xs text-red-600 mt-2">{logoError}</p>}
          </div>

          {/* Autres Champs du formulaire */}
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
              <label htmlFor="protocol" className={labelClass}>Protocole</label>
              <Select
                id="protocol"
                value={form.protocol}
                onChange={handleFieldChange('protocol')}
                options={PROTOCOL_OPTIONS}
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

          <ToggleSwitch
            checked={form.active === 'Y'}
            onChange={handleToggleActive}
            label="Actif"
            className="mt-5"
          />

          {error && <p className="text-xs text-red-600 mt-4">{error}</p>}

          {/* Boutons d'action */}
          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Enregistrement...' : currentSubmitLabel}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}