// src/pages/crm/Users/UserList.jsx
import { usersTable } from '../../../config/userColumns';
import { getUsers, softDeleteUser } from '../../../api/users';
import { useState, useEffect } from 'react';
import { getAvatarColor, getInitials } from '../../../utils/avatar';
import { userStatusLabels, userStatusColors } from '../../../utils/statusConstants';
import Table from '../../../components/dashboard/Table';
import Modal from '../../../components/common/Modal';
import StatusBadge from '../../../components/common/StatusBadge';
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';
import UserEditForm from './UserEditForm';

function TableSkeleton({ rows = 6, columns = 5 }) {
  return (
    <div className="overflow-x-auto w-full rounded-xl shadow-md bg-white">
      <div className="bg-[#DDF4EF] h-10" />
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 px-4 py-3">
            {Array.from({ length: columns }).map((_, j) => (
              <div key={j} className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UsersList() {
  // Liste complète (y compris désactivés) + états des 3 modales
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const loadUsers = () => {
    setLoading(true);
    getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // "Cache" les utilisateurs désactivés (active === 'N') de la liste affichée,
  // sans les supprimer de mockUsers — ils restent en base, juste invisibles ici.
  const visibleUsers = users.filter((u) => u.active !== 'N');

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Appelée uniquement après validation du mot de passe admin dans ConfirmDeleteModal
  const confirmSoftDelete = async () => {
    await softDeleteUser(userToDelete.id);
    loadUsers();
  };

  return (
    <>
      {loading ? (
        <TableSkeleton columns={usersTable().columns.length} />
      ) : (
        <Table
          data={visibleUsers}
          columns={usersTable(setEditingUser, setUserToDelete).columns}
          onRowClick={handleRowClick}
        />
      )}

      {/* Modale de détail (clic sur une ligne) */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedUser && (
          <div className="w-80">
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${getAvatarColor(selectedUser.id)}`}>
                {getInitials(selectedUser.full_name)}
              </span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedUser.full_name}</h2>
                <p className="text-sm text-gray-500">{selectedUser.user_group}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 uppercase">Login</p>
                <p className="text-sm text-gray-800">{selectedUser.user}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Login téléphone</p>
                <p className="text-sm text-gray-800">{selectedUser.phone_login}</p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <StatusBadge
                  status={selectedUser.active === 'Y' ? 'actif' : 'inactif'}
                  statusLabels={userStatusLabels}
                  statusColors={userStatusColors}
                />
              </div>
              <p className="text-xs text-gray-400 pt-2">
                Dernière connexion : {selectedUser.last_login} — IP : {selectedUser.ip}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Modale d'édition */}
      <Modal isOpen={!!editingUser} onClose={() => setEditingUser(null)}>
        {editingUser && (
          <UserEditForm
            user={editingUser}
            onSuccess={() => { setEditingUser(null); loadUsers(); }}
            onCancel={() => setEditingUser(null)}
          />
        )}
      </Modal>

      {/* Modale de confirmation (soft delete) */}
      <ConfirmDeleteModal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        itemLabel={userToDelete ? `l'utilisateur "${userToDelete.full_name}"` : ''}
        onConfirm={confirmSoftDelete}
      />
    </>
  );
}