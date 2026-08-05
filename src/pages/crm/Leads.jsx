import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import LeadsList from './Leads/LeadsList';
import AddList from './Leads/AddList';
import LeadSearch from './Leads/LeadSearch';
import LeadsImport from './Leads/LeadsImport';
import DncManager from './Leads/DncManager';
import ExportTemplates from './Leads/ExportTemplates';
import LeadsMatching from './Leads/LeadsMatching';

export default function Leads() {
  const { activeTab } = useOutletContext();
  const [formMode, setFormMode] = useState('add');
  const [selectedList, setSelectedList] = useState(null);

  const handleEdit = (list) => {
    setSelectedList(list);
    setFormMode('edit');
  };

  const handleDone = () => {
    setFormMode('add');
    setSelectedList(null);
  };

  return (
    <div className="p-4">
      {activeTab === 'listes' && (
        formMode === 'edit' ? (
          <AddList
            mode="edit"
            initialData={selectedList}
            onSuccess={handleDone}
            onCancel={handleDone}
          />
        ) : (
          <LeadsList onEdit={handleEdit} />
        )
      )}

      {activeTab === 'addList' && <AddList />}

      {activeTab === 'recherche' && <LeadSearch />}
      {activeTab === 'import' && <LeadsImport />}
      {activeTab === 'dnc' && <DncManager />}
      {activeTab === 'modeles' && <ExportTemplates />}
      {activeTab === 'matching' && <LeadsMatching />}
    </div>
  );
}