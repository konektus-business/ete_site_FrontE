import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './ButtonCRM';

// Carte "accès restreint" générique
// Réutilisable pour n'importe quel module pas inclus dans l'abonnement du client.
export default function RestrictedAccess({
  title = 'Accès restreint',
  message = "Si vous souhaitez vous inscrire à cette option, veuillez contacter votre administrateur.",
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
            <Lock className="w-12 h-12 text-red-500" strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-500 text-sm mb-6">{message}</p>
        <Button variant="primary" onClick={() => navigate('/crm/dashboard')}>
          Retour au tableau de bord
        </Button>
      </div>
    </div>
  );
}