import { useOutletContext } from 'react-router-dom';
import UsersList from './Users/UserList';
import AddAgent from './users/AddAgent';
import AddSupUser from './users/AddSupUser';
import Groups from './users/Groups';

export default function Users() {
  const { activeTab } = useOutletContext();

  return (
    <div className="p-4">
      {activeTab === 'list' && <UsersList />}
      {activeTab === 'addAgent' && <AddAgent />}
      {activeTab === 'addSupUser' && <AddSupUser />}
      {activeTab === 'groups' && <Groups />}
    </div>
  );
}