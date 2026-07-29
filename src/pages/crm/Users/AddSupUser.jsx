import { useState } from 'react';
import { createSupUser } from '../../../api/agent';
import { userGroups } from '../../../config/userGroups';
import { userRights } from '../../../config/userRights';
import Select from '../../../components/common/Select';
import { checkboxClass } from '../../../styles/checkboxClass';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';
import Button from '../../../components/common/Button';

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

const userLevelOptions = Array.from({ length: 9 }, (_, i) => i + 1).map((level) => ({
  value: level,
  label: String(level),
}));

const userGroupOptions = [
  { value: '', label: '-- Aucun --' },
  ...userGroups.map((group) => ({ value: group, label: group })),
];

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

  const handleFieldChange = (name) => (value) => {
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
            <input
              type="text"
              id="user"
              name="user"
              required
              value={form.user}
              onChange={handleChange}
              className={inputClass}
              placeholder="ex: supervisor01"
            />
          </div>

          <div>
            <label htmlFor="pass" className={labelClass}>Mot de passe *</label>
            <input
              type="password"
              id="pass"
              name="pass"
              required
              value={form.pass}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="full_name" className={labelClass}>Nom complet *</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              required
              value={form.full_name}
              onChange={handleChange}
              className={inputClass}
              placeholder="ex: Sarra Trabelsi"
            />
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
            <input
              type="text"
              id="phone_login"
              name="phone_login"
              value={form.phone_login}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="phone_pass" className={labelClass}>Mot de passe téléphone</label>
            <input
              type="text"
              id="phone_pass"
              name="phone_pass"
              value={form.phone_pass}
              onChange={handleChange}
              className={inputClass}
            />
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
                className={checkboxClass}
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
                    className={checkboxClass}
                  />
                  {right.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {error && <p className="text-xs text-red-600 mt-4">{error}</p>}

        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
          <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Création...' : "Créer l'agent"}</Button> 
          <Button type="button" variant="secondary">Annuler</Button>
        </div>
      </form>
    </div>
  );
}