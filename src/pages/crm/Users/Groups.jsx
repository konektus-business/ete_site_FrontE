import { useState, useEffect } from 'react';
import { getGroups, createGroup, deleteGroup } from '../../../api/groups';
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGroupName, setNewGroupName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
  const [editValue, setEditValue] = useState('');

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

  const handleDelete = async (groupName) => {
    if (!window.confirm(`Supprimer le groupe "${groupName}" ? Cette action est irréversible.`)) {
      return;
    }
    await deleteGroup(groupName);
    setSuccess('Opération réussie.');
    loadGroups();
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
    if (!editValue.trim() || editValue.trim() === oldName) {
      cancelEdit();
      return;
    }
    // TODO: brancher sur une vraie route de rename une fois l'API définie
    setGroups((prev) =>
      prev.map((g) => (g.group_name === oldName ? { group_name: editValue.trim() } : g))
    );
    cancelEdit();
  };

  const inputClass =
    'w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-colors';

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
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-crmPrimary text-white shadow-md shadow-emerald-950/20 ring-1 ring-inset ring-white/20 hover:brightness-95 disabled:opacity-50 transition-colors shrink-0">
              <Plus className="w-4 h-4" />
              {submitting ? 'Création...' : 'Créer'}
            </button>
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
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Nom du groupe</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase w-32">Actions</th>
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
                          onClick={() => handleDelete(group.group_name)}
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
    </div>
  );
}