import { useOutletContext } from 'react-router-dom';
import UsersList from './Users/UserList';
import AddAgent from './Users/AddAgent';
import AddSupUser from './Users/AddSupUser';
import Groups from './Users/Groups';

export default function Users() {
  const { activeTab, setActiveTab } = useOutletContext();

  const handleDone = () => setActiveTab('list');

  return (
    <div className="p-4">
      {activeTab === 'list' && <UsersList />}
      {activeTab === 'addAgent' && <AddAgent onSuccess={handleDone} />}
      {activeTab === 'addSupUser' && <AddSupUser onSuccess={handleDone} />}
      {activeTab === 'groups' && <Groups />}
    </div>
  );
}