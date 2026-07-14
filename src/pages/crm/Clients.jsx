import { clientsTable } from '../../config/clientColumns';
import { getClients } from '../../api/clients';
import { useState, useEffect } from 'react';
import Table from '../../components/dashboard/Table';
import Modal from '../../components/common/Modal';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency } from '../../utils/formatter';
import { getAvatarColor, getInitials } from '../../utils/avatar';
import { getTimeAgo } from '../../utils/formatter';

function TableSkeleton({ rows = 6, columns = 5 }) {
    return (
        <div className="overflow-x-auto w-full rounded-xl shadow-md bg-white">
            <div className="bg-[#DDF4EF] h-10" />
            <div className="divide-y divide-gray-200">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex gap-4 px-4 py-3">
                        {Array.from({ length: columns }).map((_, j) => (
                            <div
                                key={j}
                                className="h-4 bg-gray-200 rounded animate-pulse flex-1"
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getClients().then((data) => {
            setClients(data);
            setLoading(false);
        });
    }, []);

    const handleRowClick = (client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    return (
        <div className="p-4">
            {loading ? (
                <TableSkeleton columns={clientsTable.columns.length} />
            ) : (
                <Table
                    data={clients}
                    columns={clientsTable.columns}
                    onRowClick={handleRowClick}
                />
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {selectedClient && (
                <div className="w-80">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${getAvatarColor(selectedClient.id)}`}>
                            {getInitials(`${selectedClient.prenom} ${selectedClient.nom}`)}
                        </span>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {selectedClient.prenom} {selectedClient.nom}
                            </h2>
                            <p className="text-sm text-gray-500">{selectedClient.societe}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                        <p className="text-xs text-gray-400 uppercase">Email</p>
                        <p className="text-sm text-gray-800">{selectedClient.email}</p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-400 uppercase">Téléphone</p>
                        <p className="text-sm text-gray-800">{selectedClient.telephone}</p>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                        <StatusBadge status={selectedClient.statut} />
                        <p className="text-lg font-semibold text-gray-900">
                            {formatCurrency(selectedClient.solde)}
                        </p>
                        </div>
                        <p className="text-xs text-gray-400 pt-2">
                            Client depuis le {selectedClient.date_creation} ({getTimeAgo(selectedClient.date_creation)})
                        </p>
                    </div>
                </div>
            )}
        </Modal>
    </div>
    );
}
