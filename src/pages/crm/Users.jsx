import { useOutletContext } from 'react-router-dom';
import UsersList from './Users/UserList';
import AddAgent from './Users/AddAgent';
import AddSupUser from './Users/AddSupUser';
import Groups from './Users/Groups';

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