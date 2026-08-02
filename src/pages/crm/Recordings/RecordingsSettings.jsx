import { useState, useEffect } from 'react';
import { Mic, Folder, Timer, FileAudio2 } from 'lucide-react';
import { getRecordingSettings, saveRecordingSettings } from '../../../api/recordings';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';

const FORMAT_OPTIONS = [
  { value: 'wav', label: 'WAV' },
  { value: 'gsm', label: 'GSM' },
  { value: 'mp3', label: 'MP3' },
];

export default function RecordingsSettings() {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getRecordingSettings().then(setSettings);
  }, []);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleToggleDirectPlay = () => {
    setSettings((prev) => ({ ...prev, direct_play: !prev.direct_play }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await saveRecordingSettings(settings);
    setSaving(false);
    setSaved(true);
  };

  if (!settings) {
    return <div className="flex items-center justify-center h-40 text-sm text-gray-400">Chargement...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
          <Mic className="w-4.5 h-4.5 text-[#1EB394]" />
        </div>
        <div>
          <h2 className="font-sans font-semibold text-sm text-gray-900">Paramètres des enregistrements</h2>
          <p className="text-xs text-gray-400 mt-0.5">Stockage, conservation et format de lecture des appels enregistrés</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5 max-w-2xl">
        {saved && (
          <div className="px-4 py-2.5 rounded-lg bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5] text-sm">
            Paramètres enregistrés.
          </div>
        )}

        <div>
          <label className={labelClass}>Chemin des enregistrements</label>
          <input
            type="text"
            value={settings.recordings_path}
            onChange={(e) => handleChange('recordings_path', e.target.value)}
            required
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-1">Chemin absolu sur le serveur où sont stockés les fichiers audio.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Durée de conservation (jours)</label>
            <input
              type="number"
              min={1}
              value={settings.retention_days}
              onChange={(e) => handleChange('retention_days', Number(e.target.value))}
              className={inputClass}
            />
            <p className="text-xs text-gray-400 mt-1">0 = suppression automatique désactivée.</p>
          </div>

          <div>
            <label className={labelClass}>Format préféré</label>
            <Select value={settings.preferred_format} onChange={(v) => handleChange('preferred_format', v)} options={FORMAT_OPTIONS} />
            <p className="text-xs text-gray-400 mt-1">Pour la lecture et le téléchargement.</p>
          </div>
        </div>

        {/* Toggle switch identique à CarrierForm.jsx */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            role="switch"
            aria-checked={settings.direct_play}
            onClick={handleToggleDirectPlay}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              settings.direct_play ? 'bg-[#1EB394]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                settings.direct_play ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-xs font-medium text-gray-600">Activer la lecture directe (streaming)</span>
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </div>
  );
}