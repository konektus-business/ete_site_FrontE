import { useState, useEffect } from 'react';
import { Settings2 } from 'lucide-react';
import { getCdrConfig, saveCdrConfig, paysList, operateursMobiles } from '../../../api/cdr';
import { paysFlags } from '../../../utils/paysFlags';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';

const PAYS_OPTIONS = [
  { value: '', label: '-- Choisir --' },
  ...Object.entries(paysList).map(([pays, indicatif]) => ({ value: pays, label: `${pays} (+${indicatif})` })),
];

export default function CdrConfig() {
  const [pays, setPays] = useState('');
  const [config, setConfig] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handlePaysChange = (selectedPays) => {
    setPays(selectedPays);
    setSaved(false);
    if (!selectedPays) {
      setConfig(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (!pays) return;

    const fetchConfig = async () => {
      try {
        const data = await getCdrConfig(pays);
        if (isMounted) {
          setConfig(data);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération de la configuration CDR :', err);
      }
    };

    fetchConfig();

    return () => {
      isMounted = false;
    };
  }, [pays]);

  const operateurs = pays ? (operateursMobiles[pays] || ['Mobile']) : [];

  const handleFixeChange = (field, value) => {
    setConfig((prev) => ({ ...prev, fixe: { ...prev?.fixe, [field]: value } }));
    setSaved(false);
  };

  const handleMobileChange = (op, field, value) => {
    setConfig((prev) => ({
      ...prev,
      mobile: { ...prev?.mobile, [op]: { ...prev?.mobile?.[op], [field]: value } },
    }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveCdrConfig(pays, config);
      setSaved(true);
    } catch (err) {
      console.error('Erreur lors de la sauvegarde de la configuration CDR :', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
          <Settings2 className="w-4.5 h-4.5 text-[#1EB394]" />
        </div>
        <div>
          <h2 className="font-sans font-semibold text-sm text-gray-900">Configuration des coûts CDR</h2>
          <p className="text-xs text-gray-400 mt-0.5">Prix par minute et préfixes par pays et par opérateur</p>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-xs mb-6">
          <label htmlFor="select-pays" className={labelClass}>Sélectionner un pays</label>
          <Select id="select-pays" value={pays} onChange={handlePaysChange} options={PAYS_OPTIONS} />
          {pays && paysFlags[pays] && (
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <span className={`rounded-[4px] fi fi-${paysFlags[pays]}`}></span>
              {pays}
            </div>
          )}
        </div>

        {config && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {saved && (
              <div className="px-4 py-2.5 rounded-lg bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5] text-sm">
                Configuration enregistrée avec succès.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="fixe-prix" className={labelClass}>Prix minute fixe (€)</label>
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  id="fixe-prix"
                  value={config.fixe?.prix ?? ''}
                  onChange={(e) => handleFixeChange('prix', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="fixe-prefixes" className={labelClass}>Préfixes fixes (séparés par des virgules)</label>
                <input
                  type="text"
                  id="fixe-prefixes"
                  value={config.fixe?.prefixes ?? ''}
                  onChange={(e) => handleFixeChange('prefixes', e.target.value)}
                  placeholder="ex: 1,2,3,4,5,9"
                  className={inputClass}
                />
              </div>
            </div>

            {operateurs.map((op) => {
              const opIdKey = op.toLowerCase().replace(/\s+/g, '-');
              const prixId = `mobile-prix-${opIdKey}`;
              const prefixesId = `mobile-prefixes-${opIdKey}`;

              return (
                <div key={op} className="border border-gray-100 rounded-xl p-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-3">{op}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor={prixId} className={labelClass}>Prix minute (€)</label>
                      <input
                        type="number"
                        step="0.0001"
                        min="0"
                        id={prixId}
                        value={config.mobile?.[op]?.prix ?? ''}
                        onChange={(e) => handleMobileChange(op, 'prix', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor={prefixesId} className={labelClass}>Préfixes mobiles (séparés par des virgules)</label>
                      <input
                        type="text"
                        id={prefixesId}
                        value={config.mobile?.[op]?.prefixes ?? ''}
                        onChange={(e) => handleMobileChange(op, 'prefixes', e.target.value)}
                        placeholder="ex: 6,7"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}