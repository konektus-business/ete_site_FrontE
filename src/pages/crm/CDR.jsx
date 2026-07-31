import { useOutletContext } from 'react-router-dom';
import CdrList from './Cdr/CdrList';
import CdrConfig from './Cdr/CdrConfig';

export default function CDR() {
  const { activeTab } = useOutletContext();

  return (
    <div className="p-4">
      {activeTab === 'list' && <CdrList />}
      {activeTab === 'config' && <CdrConfig />}
    </div>
  );
}