// src/components/common/ConfirmDeleteModal.jsx
import { useState } from 'react';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';
import Modal from './Modal';
import Button from './ButtonCRM';
import { verifyAdminPassword } from '../../api/auth';

// Modale de confirmation générique pour toute action de suppression critique.
// isOpen/onClose : contrôlés par le composant parent (liste concernée)
// itemLabel : ex "le carrier Orange Tunisie", affiché dans le message
// onConfirm : fonction async appelée UNIQUEMENT si le mot de passe est valide
export default function ConfirmDeleteModal({ isOpen, onClose, itemLabel, onConfirm }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [checking, setChecking] = useState(false);

  // Remet la modale à zéro en fermant, pour ne pas garder le mot de passe
  // tapé en mémoire si l'utilisateur rouvre la modale sur un autre élément
  const handleClose = () => {
    setPassword('');
    setError(null);
    onClose();
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setChecking(true);
    setError(null);

    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      setError('Mot de passe incorrect.');
      setChecking(false);
      return;
    }

    await onConfirm();
    setChecking(false);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="w-80">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-base font-bold text-gray-900">Confirmer la suppression</h2>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Cette action est irréversible. Pour confirmer la suppression de{' '}
          <span className="font-medium text-gray-700">{itemLabel}</span>, saisissez votre mot de passe administrateur.
        </p>

        <form onSubmit={handleConfirm}>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe admin"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && <p className="text-xs text-red-600 mt-2">{error}</p>}

          <div className="flex items-center gap-3 mt-5">
            <Button type="submit" variant="dangerSolid" disabled={!password || checking}>
              {checking ? 'Vérification...' : 'Supprimer'}
            </Button>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}