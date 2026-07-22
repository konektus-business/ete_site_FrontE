// src/pages/crm/users/AddAgent.jsx
import { useState } from 'react';
import { createAgent } from '../../../api/agent';
import { userGroups } from '../../../config/userGroups';
import Select from '../../../components/common/Select';

const initialForm = {
  user: '',
  pass: '',
  full_name: '',
  user_level: 1,
  user_group: '',
  phone_login: '',
  phone_pass: '',
};

const userLevelOptions = Array.from({ length: 9 }, (_, i) => i + 1).map((level) => ({
  value: level,
  label: String(level),
}));

const userGroupOptions = [
  { value: '', label: '-- Aucun --' },
  ...userGroups.map((group) => ({ value: group, label: group })),
];

export default function AddAgent() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldChange = (name) => (value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createAgent(form);
      setForm(initialForm);
      // TODO: toast succès + redirection vers la liste
    } catch (err) {
      setError("Erreur lors de la création de l'agent");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-colors';
  const labelClass = 'block text-xs font-medium text-gray-500 mb-1.5';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-sans font-semibold text-sm text-gray-900">Ajouter un agent</h2>
        <p className="text-xs text-gray-400 mt-0.5">Créer un nouvel agent avec ses accès de connexion</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label htmlFor="user" className={labelClass}>Login *</label>
            <input type="text" id="user" name="user" required value={form.user} onChange={handleChange} className={inputClass} placeholder="ex: agent042" />
          </div>

          <div>
            <label htmlFor="pass" className={labelClass}>Mot de passe *</label>
            <input type="password" id="pass" name="pass" required value={form.pass} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label htmlFor="full_name" className={labelClass}>Nom complet *</label>
            <input type="text" id="full_name" name="full_name" required value={form.full_name} onChange={handleChange} className={inputClass} placeholder="ex: Ahmed Ben Ali" />
          </div>

          <div>
            <label className={labelClass}>Niveau utilisateur</label>
            <Select
              value={form.user_level}
              onChange={handleFieldChange('user_level')}
              options={userLevelOptions}
            />
          </div>

          <div>
            <label className={labelClass}>Groupe</label>
            <Select
              value={form.user_group}
              onChange={handleFieldChange('user_group')}
              options={userGroupOptions}
            />
          </div>

          <div>
            <label htmlFor="phone_login" className={labelClass}>Login téléphone</label>
            <input type="text" id="phone_login" name="phone_login" value={form.phone_login} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label htmlFor="phone_pass" className={labelClass}>Mot de passe téléphone</label>
            <input type="text" id="phone_pass" name="phone_pass" value={form.phone_pass} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        {error && <p className="text-xs text-red-600 mt-4">{error}</p>}

        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-[#1EB394] hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Création...' : "Créer l'agent"}
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}