import { useOutletContext } from 'react-router-dom';
import RecordingsList from './Recordings/RecordingsList';
import RecordingsSettings from './Recordings/RecordingsSettings';

export default function Enregistrement() {
  const { activeTab } = useOutletContext();

  return (
    <div className="p-4">
      {activeTab === 'list' && <RecordingsList />}
      {activeTab === 'settings' && <RecordingsSettings />}
    </div>
  );
}