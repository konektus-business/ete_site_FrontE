import { useOutletContext } from 'react-router-dom';
import RestrictedAccess from '../../components/common/RestrictedAccess';

export default function Integration() {
  const { activeTab } = useOutletContext();

  return (
    <div className="p-4">
      {activeTab === 'messenger' && (
        <RestrictedAccess
          title="Messenger non disponible"
          message="Si vous souhaitez activer la messagerie instantanée, veuillez contacter votre administrateur."
        />
      )}
      {activeTab === 'telegram' && (
        <RestrictedAccess
          title="Telegram non disponible"
          message="Si vous souhaitez activer l'intégration mail, veuillez contacter votre administrateur."
        />
      )}
      {activeTab === 'whatsapp' && (
        <RestrictedAccess
          title="Whatsapp non disponible"
          message="Si vous souhaitez activer les réunions en ligne, veuillez contacter votre administrateur."
        />
      )}
    </div>
  );
}