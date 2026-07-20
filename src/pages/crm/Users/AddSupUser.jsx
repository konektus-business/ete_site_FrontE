import { useState } from 'react';
import { createSupUser } from '../../../api/agent';
import { userGroups } from '../../../config/userGroups';
import { userRights } from '../../../config/userRights';

const initialForm = {
  user: '',
  pass: '',
  full_name: '',
  user_level: 9,
  user_group: '',
  phone_login: '',
  phone_pass: '',
};

const initialRights = userRights.reduce(
  (acc, right) => ({ ...acc, [right.field]: false }),
  {}
);

export default function AddSupUser() {
  const [form, setForm] = useState(initialForm);
  const [rights, setRights] = useState(initialRights);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const allChecked = Object.values(rights).every(Boolean);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRightToggle = (field) => {
    setRights((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleCheckAll = () => {
    const newValue = !allChecked;
    const updated = userRights.reduce(
      (acc, right) => ({ ...acc, [right.field]: newValue }),
      {}
    );
    setRights(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createSupUser({ ...form, rights });
      setForm(initialForm);
      setRights(initialRights);
      // TODO: toast succès + redirection vers la liste
    } catch (err) {
      setError('Erreur lors de la création du super-utilisateur');
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
        <h2 className="font-sans font-semibold text-sm text-gray-900">Ajouter un super-utilisateur</h2>
        <p className="text-xs text-gray-400 mt-0.5">Créer un compte avec accès administrateur et droits personnalisés</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Champs de base */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-6 border-b border-gray-100">
          <div>
            <label htmlFor="user" className={labelClass}>Login *</label>
            <input type="text" id="user" name="user" required value={form.user} onChange={handleChange} className={inputClass} placeholder="ex: supervisor01" />
          </div>

          <div>
            <label htmlFor="pass" className={labelClass}>Mot de passe *</label>
            <input type="password" id="pass" name="pass" required value={form.pass} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label htmlFor="full_name" className={labelClass}>Nom complet *</label>
            <input type="text" id="full_name" name="full_name" required value={form.full_name} onChange={handleChange} className={inputClass} placeholder="ex: Sarra Trabelsi" />
          </div>

          <div>
            <label htmlFor="user_level" className={labelClass}>Niveau utilisateur</label>
            <select id="user_level" name="user_level" value={form.user_level} onChange={handleChange} className={inputClass}>
              {Array.from({ length: 9 }, (_, i) => i + 1).map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="user_group" className={labelClass}>Groupe</label>
            <select id="user_group" name="user_group" value={form.user_group} onChange={handleChange} className={inputClass}>
              <option value="">-- Aucun --</option>
              {userGroups.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
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

        {/* Droits d'accès */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-900">Droits d'accès</h4>
            <label className="flex items-center gap-2 text-xs font-medium text-emerald-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={handleCheckAll}
                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              Tous les droits
            </label>
          </div>

          <div className="max-h-80 overflow-y-auto rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
              {userRights.map((right) => (
                <label
                  key={right.field}
                  className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={rights[right.field]}
                    onChange={() => handleRightToggle(right.field)}
                    className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 shrink-0"
                  />
                  {right.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {error && <p className="text-xs text-red-600 mt-4">{error}</p>}

        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-[#1EB394] hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Création...' : 'Créer le super-utilisateur'}
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