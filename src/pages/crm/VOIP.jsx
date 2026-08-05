import { useOutletContext } from 'react-router-dom';
import RestrictedAccess from '../../components/common/RestrictedAccess';

export default function VOIP() {
  const { activeTab } = useOutletContext();

  return (
    <div className="p-4">
      {activeTab === 'console' && (
        <RestrictedAccess
          title="Console non disponible"
          message="Si vous souhaitez activer la messagerie instantanée, veuillez contacter votre administrateur."
        />
      )}
      {activeTab === 'iptables' && (
        <RestrictedAccess
          title="IpTables non disponible"
          message="Si vous souhaitez activer l'intégration mail, veuillez contacter votre administrateur."
        />
      )}
      {activeTab === 'munin' && (
        <RestrictedAccess
          title="Munin non disponible"
          message="Si vous souhaitez activer les réunions en ligne, veuillez contacter votre administrateur."
        />
      )}
      {activeTab === 'sip' && (
        <RestrictedAccess
          title="SIP non disponible"
          message="Si vous souhaitez activer les réunions en ligne, veuillez contacter votre administrateur."
        />
      )}
    </div>
  );
}