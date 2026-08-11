import { useState, useEffect, useRef, useCallback } from 'react';
import { updateUser } from '../../../api/users';
import { userGroups } from '../../../config/userGroups';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import Toast from '../../../components/common/Toast';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';
import { formatGroupName } from '../../../utils/formatGroupName';

const userGroupOptions = userGroups.map((g) => ({ value: g, label: g }));

export default function UserEditForm({ user, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    full_name: user?.full_name ?? '',
    user_group: user?.user_group ?? '',
    phone_login: user?.phone_login ?? '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const timerRef = useRef(null);

  // Nettoyage du setTimeout au démonte-composant pour prévenir les fuites de mémoire
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleGroupChange = useCallback((value) => {
    setForm((prev) => ({
      ...prev,
      user_group: formatGroupName(value),
    }));
  }, []);

  const handleCloseToast = useCallback(() => {
    setToast(null);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(user.id, form);
      setToast({ message: 'Utilisateur mis à jour', type: 'success' });
      timerRef.current = setTimeout(() => onSuccess?.(form), 1000);
    } catch {
      setToast({ message: "Erreur lors de l'enregistrement.", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
      <div className="w-96">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          Modifier l'utilisateur
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="full_name" className={labelClass}>
              Nom complet
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="user_group" className={labelClass}>
              Groupe
            </label>
            <Select
              id="user_group"
              value={form.user_group}
              onChange={handleGroupChange}
              options={userGroupOptions}
            />
          </div>

          <div>
            <label htmlFor="phone_login" className={labelClass}>
              Login téléphone
            </label>
            <input
              type="text"
              id="phone_login"
              name="phone_login"
              value={form.phone_login}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

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
    </>
  );
}