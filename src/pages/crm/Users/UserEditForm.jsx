// src/pages/crm/Users/UserEditForm.jsx
import { useState } from 'react';
import { updateUser } from '../../../api/users';
import { userGroups } from '../../../config/userGroups';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';

const userGroupOptions = userGroups.map((g) => ({ value: g, label: g }));

// Formulaire d'édition d'un utilisateur existant, affiché dans une Modal
// depuis UserList.jsx. onSuccess : callback pour rafraîchir la liste + fermer.
export default function UserEditForm({ user, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    full_name: user.full_name,
    user_group: user.user_group,
    phone_login: user.phone_login,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await updateUser(user.id, form);
      onSuccess?.();
    } catch (err) {
      setError('Erreur lors de la mise à jour de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-96">
      <h2 className="text-base font-bold text-gray-900 mb-4">Modifier l'utilisateur</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Nom complet</label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Groupe</label>
          <Select
            value={form.user_group}
            onChange={(value) => setForm((prev) => ({ ...prev, user_group: value }))}
            options={userGroupOptions}
          />
        </div>

        <div>
          <label className={labelClass}>Login téléphone</label>
          <input
            type="text"
            name="phone_login"
            value={form.phone_login}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}