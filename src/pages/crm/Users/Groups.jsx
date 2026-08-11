import { useState, useEffect, useCallback } from 'react';
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';
import { getGroups, createGroup, updateGroup, deleteGroup } from '../../../api/groups';
import { formInputClass as inputClass } from '../../../styles/formClasses';
import Button from '../../../components/common/ButtonCRM';
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGroupName, setNewGroupName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [groupToDelete, setGroupToDelete] = useState(null);

  const clearAlerts = () => {
    setError(null);
    setSuccess(null);
  };

  const loadGroups = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getGroups();
      setGroups(data ?? []);
    } catch {
      setError('Erreur lors du chargement des groupes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadGroups();
  }, [loadGroups]);

  const handleAdd = async (e) => {
    e.preventDefault();
    clearAlerts();

    const trimmedName = newGroupName.trim();
    if (!trimmedName) {
      setError('Le nom du groupe est obligatoire.');
      return;
    }

    setSubmitting(true);
    try {
      await createGroup(trimmedName);
      setNewGroupName('');
      setSuccess('Groupe créé avec succès.');
      await loadGroups();
    } catch (err) {
      setError(
        err.message === 'exists'
          ? 'Ce groupe existe déjà.'
          : "Erreur lors de la création du groupe."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!groupToDelete?.group_name) return;
    clearAlerts();

    try {
      await deleteGroup(groupToDelete.group_name);
      setSuccess('Groupe supprimé avec succès.');
      await loadGroups();
    } catch {
      setError('Erreur lors de la suppression.');
    } finally {
      setGroupToDelete(null);
    }
  };

  const startEdit = (groupName) => {
    clearAlerts();
    setEditingGroup(groupName);
    setEditValue(groupName);
  };

  const cancelEdit = () => {
    setEditingGroup(null);
    setEditValue('');
  };

  const confirmEdit = async (oldName) => {
    const trimmedValue = editValue.trim();
    if (!trimmedValue || trimmedValue === oldName) {
      cancelEdit();
      return;
    }

    clearAlerts();
    try {
      await updateGroup(oldName, trimmedValue);
      setSuccess('Groupe renommé avec succès.');
      await loadGroups();
    } catch (err) {
      setError(
        err.message === 'exists'
          ? 'Un groupe porte déjà ce nom.'
          : 'Erreur lors de la modification.'
      );
    } finally {
      cancelEdit();
    }
  };

  const handleKeyDownEdit = (e, oldName) => {
    if (e.key === 'Enter') {
      confirmEdit(oldName);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulaire d'ajout */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-sans font-semibold text-sm text-gray-900">Ajouter un groupe</h3>
        </div>
        <form onSubmit={handleAdd} className="p-6">
          <div className="flex items-end gap-3 max-w-md">
            <div className="flex-1">
              <label htmlFor="group_name" className="block text-xs font-medium text-gray-500 mb-1.5">
                Nom du groupe *
              </label>
              <input
                type="text"
                id="group_name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className={inputClass}
                placeholder="ex: TEAM_SALES"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              className="flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              {submitting ? 'Création...' : 'Créer'}
            </Button>
          </div>

          {/* Messages de retour */}
          {error && (
            <div className="mt-4 flex items-center justify-between rounded-lg bg-red-50 border border-red-100 px-4 py-2.5 text-xs text-red-700">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          {success && (
            <div className="mt-4 flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-2.5 text-xs text-emerald-700">
              <span>{success}</span>
              <button
                type="button"
                onClick={() => setSuccess(null)}
                className="text-emerald-400 hover:text-emerald-600 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Liste des groupes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-sans font-semibold text-sm text-gray-900">Liste des groupes</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase select-none">
                Nom du groupe
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase w-32 select-none">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : groups.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-sm text-gray-400">
                  Aucun groupe trouvé
                </td>
              </tr>
            ) : (
              groups.map((group) => {
                const isEditing = editingGroup === group.group_name;
                return (
                  <tr key={group.group_name} className="hover:bg-gray-50/50">
                    <td className="px-6 py-3">
                      {isEditing ? (
                        <input
                          autoFocus
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => handleKeyDownEdit(e, group.group_name)}
                          className="rounded-md border border-emerald-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      ) : (
                        <span className="text-xs font-medium text-gray-900">
                          {group.group_name}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => confirmEdit(group.group_name)}
                            className="text-gray-400 hover:text-emerald-600 transition-colors p-1"
                            aria-label="Valider la modification"
                            title="Valider"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            aria-label="Annuler la modification"
                            title="Annuler"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(group.group_name)}
                            className="text-gray-400 hover:text-gray-700 transition-colors p-1"
                            aria-label={`Modifier le groupe ${group.group_name}`}
                            title="Modifier"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setGroupToDelete(group)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            aria-label={`Supprimer le groupe ${group.group_name}`}
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmation de suppression */}
      <ConfirmDeleteModal
        isOpen={!!groupToDelete}
        onClose={() => setGroupToDelete(null)}
        itemLabel={groupToDelete ? `le groupe ${groupToDelete.group_name}` : ''}
        onConfirm={confirmDelete}
      />
    </div>
  );
}