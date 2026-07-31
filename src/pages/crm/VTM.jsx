import { useOutletContext } from 'react-router-dom';
import RestrictedAccess from '../../components/common/RestrictedAccess';

export default function VTM() {
  const { activeTab } = useOutletContext();

  return (
    <div className="p-4">
      {activeTab === 'chat' && (
        <RestrictedAccess
          title="Chat non disponible"
          message="Si vous souhaitez activer la messagerie instantanée, veuillez contacter votre administrateur."
        />
      )}
      {activeTab === 'mail' && (
        <RestrictedAccess
          title="Messagerie non disponible"
          message="Si vous souhaitez activer l'intégration mail, veuillez contacter votre administrateur."
        />
      )}
      {activeTab === 'meet' && (
        <RestrictedAccess
          title="Visioconférence non disponible"
          message="Si vous souhaitez activer les réunions en ligne, veuillez contacter votre administrateur."
        />
      )}
    </div>
  );
}