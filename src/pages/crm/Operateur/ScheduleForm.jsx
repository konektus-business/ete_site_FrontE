import { useState } from 'react';
import { createSchedule, updateSchedule } from '../../../api/schedules';
import { hhmmToTimeInput, timeInputToHhmm } from '../../../utils/timeFormat';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';
import Button from '../../../components/common/ButtonCRM';

// Valeurs par défaut d'un nouvel horaire (ct_default_start/stop en HHMM)
const emptyForm = {
  call_time_id: '',
  call_time_name: '',
  call_time_comments: '',
  ct_default_start: 900,
  ct_default_stop: 2100,
};

// Composant unique réutilisé pour ajout ET édition (mode: 'add' | 'edit')
export default function ScheduleForm({ mode = 'add', initialData = null, onSuccess, onCancel }) {
  // Pré-remplit le formulaire avec initialData en mode edit, sinon formulaire vide
  const getInitialForm = () => (initialData ? { ...emptyForm, ...initialData } : emptyForm);

  const [form, setForm] = useState(getInitialForm);
  // Garde l'ID original en mémoire séparément : nécessaire si l'utilisateur modifie
  // call_time_id lui-même pendant l'édition (sinon on perdrait la référence pour l'update)
  const [originalId] = useState(initialData?.call_time_id ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Gère les inputs texte classiques (name/value standard)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Gère spécifiquement les <input type="time">, avec conversion HH:MM -> HHMM
  // au moment de la saisie (le form garde toujours le format HHMM en interne)
  const handleTimeChange = (name) => (e) => {
    setForm((prev) => ({ ...prev, [name]: timeInputToHhmm(e.target.value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'edit') {
        await updateSchedule(originalId, form);
      } else {
        await createSchedule(form);
      }
      onSuccess?.(form);
    } catch (err) {
      setError(
        mode === 'edit' ? "Erreur lors de la mise à jour de l'horaire" : "Erreur lors de la création de l'horaire"
      );
    } finally {
      setLoading(false);
    }
  };

  // Textes affichés selon le mode (add vs edit)
  const titles = {
    add: { title: 'Ajouter un horaire', subtitle: 'Créer un nouveau créneau horaire' },
    edit: { title: "Modifier l'horaire", subtitle: 'Mettre à jour le créneau horaire' },
  };
  const submitLabels = { add: 'Créer', edit: 'Mettre à jour' };


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-sans font-semibold text-sm text-gray-900">{titles[mode].title}</h2>
        <p className="text-xs text-gray-400 mt-0.5">{titles[mode].subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="call_time_id" className={labelClass}>ID horaire *</label>
            <input
              type="text"
              id="call_time_id"
              name="call_time_id"
              required
              value={form.call_time_id}
              onChange={handleChange}
              className={inputClass}
              placeholder="ex: office_hours"
            />
          </div>

          <div>
            <label htmlFor="call_time_name" className={labelClass}>Nom *</label>
            <input
              type="text"
              id="call_time_name"
              name="call_time_name"
              required
              value={form.call_time_name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="call_time_comments" className={labelClass}>Commentaires</label>
            <input
              type="text"
              id="call_time_comments"
              name="call_time_comments"
              value={form.call_time_comments}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="ct_default_start" className={labelClass}>Heure début par défaut</label>
            {/* value convertie HHMM -> HH:MM pour l'input, reconvertie en HHMM à chaque changement */}
            <input
              type="time"
              id="ct_default_start"
              value={hhmmToTimeInput(form.ct_default_start)}
              onChange={handleTimeChange('ct_default_start')}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="ct_default_stop" className={labelClass}>Heure fin par défaut</label>
            <input
              type="time"
              id="ct_default_stop"
              value={hhmmToTimeInput(form.ct_default_stop)}
              onChange={handleTimeChange('ct_default_stop')}
              className={inputClass}
            />
          </div>
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