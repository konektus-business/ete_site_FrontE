import { useState, useEffect } from 'react';
import { getGroups, createGroup, updateGroup, deleteGroup } from '../../../api/groups';
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';
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

  const loadGroups = async () => {
    setLoading(true);
    const data = await getGroups();
    setGroups(data);
    setLoading(false);
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) {
      setError('Le nom du groupe est obligatoire.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await createGroup(newGroupName.trim());
      setNewGroupName('');
      setSuccess('Groupe créé avec succès.');
      loadGroups();
    } catch (err) {
      setError(
        err.message === 'exists' ? 'Ce groupe existe déjà.' : "Erreur lors de l'insertion."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteGroup(groupToDelete.group_name);
      setSuccess('Groupe supprimé avec succès.');
      loadGroups();
    } catch (err) {
      setError('Erreur lors de la suppression.');
    } finally {
      setGroupToDelete(null);
    }
  };

  const startEdit = (groupName) => {
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
  
  try {
    await updateGroup(oldName, trimmedValue);
    setSuccess('Groupe renommé avec succès.');
    loadGroups();
  } catch (err) {
    setError(err.message === 'exists' ? 'Un groupe porte déjà ce nom.' : 'Erreur lors de la modification.');
  } finally {
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
            <Button type="submit" variant="primary" disabled={submitting} className="flex items-center gap-1.5">
              <Plus className="w-4 h-4" />{submitting ? 'Création...' : 'Créer'}
            </Button>
          </div>

          {error && (
            <div className="mt-4 flex items-center justify-between rounded-lg bg-red-50 border border-red-100 px-4 py-2.5 text-xs text-red-700">
              {error}
              <button type="button" onClick={() => setError(null)}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          {success && (
            <div className="mt-4 flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-2.5 text-xs text-emerald-700">
              {success}
              <button type="button" onClick={() => setSuccess(null)}>
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
                  <td className="px-6 py-4"><div className="h-3 w-32 bg-gray-100 rounded animate-pulse" /></td>
                  <td className="px-6 py-4"><div className="h-3 w-16 bg-gray-100 rounded animate-pulse" /></td>
                </tr>
              ))
            ) : groups.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-sm text-gray-400">
                  Aucun groupe trouvé
                </td>
              </tr>
            ) : (
              groups.map((group) => (
                <tr key={group.group_name} className="hover:bg-gray-50/50">
                  <td className="px-6 py-3">
                    {editingGroup === group.group_name ? (
                      <input
                        autoFocus
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && confirmEdit(group.group_name)}
                        className="rounded-md border border-emerald-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    ) : (
                      <span className="text-xs font-medium text-gray-900">{group.group_name}</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    {editingGroup === group.group_name ? (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Check
                          className="w-4 h-4 cursor-pointer hover:text-emerald-600"
                          onClick={() => confirmEdit(group.group_name)}
                        />
                        <X className="w-4 h-4 cursor-pointer hover:text-red-600" onClick={cancelEdit} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Pencil
                          className="w-4 h-4 cursor-pointer hover:text-gray-700"
                          onClick={() => startEdit(group.group_name)}
                        />
                        <Trash2
                          className="w-4 h-4 cursor-pointer hover:text-red-600"
                          onClick={() => setGroupToDelete(group)}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))
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