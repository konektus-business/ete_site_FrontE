import { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Trash2, Plus, Ban, PhoneOff, AlertCircle, X } from 'lucide-react';
import { getDncList, addDncNumber, deleteDncNumber } from '../../../api/leads';
import Button from '../../../components/common/ButtonCRM';
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';

export default function DncManager() {
  const [numbers, setNumbers] = useState([]);
  const [phone, setPhone] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  // Fonction de chargement stabilisée pour la réutilisation après ajout/suppression
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getDncList();
      setNumbers(list || []);
    } catch {
      setError('Erreur lors du chargement de la liste DNC.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Chargement initial sécurisé avec vérification du montage du composant
  useEffect(() => {
    let isMounted = true;

    getDncList()
      .then((list) => {
        if (isMounted) {
          setNumbers(list || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Erreur lors du chargement de la liste DNC.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const cleanPhone = phone.trim();

    if (!cleanPhone) {
      setError('Veuillez entrer un numéro de téléphone.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await addDncNumber(cleanPhone);
      setPhone('');
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Ce numéro existe déjà ou est invalide.');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteDncNumber(toDelete);
      setToDelete(null);
      await load();
    } catch {
      setError('Erreur lors de la suppression du numéro.');
    }
  };

  // Mémoïsation du filtrage pour éviter les recalculs inutiles à chaque re-rendu
  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return numbers;
    return numbers.filter((n) => n.toLowerCase().includes(query));
  }, [numbers, search]);

  // Fonction de rendu de la liste évitant l'imbrication de ternaires
  const renderListContent = () => {
    if (loading) {
      return (
        <div className="p-8 text-center text-xs text-gray-400">
          Chargement de la liste DNC...
        </div>
      );
    }

    if (filtered.length === 0) {
      return (
        <div className="p-10 border border-dashed border-gray-200 rounded-xl text-center">
          <PhoneOff className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs font-medium text-gray-600">
            {search ? 'Aucun numéro ne correspond à votre recherche.' : 'Aucun numéro dans la liste DNC.'}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {search ? 'Essayez de modifier la saisie.' : 'Utilisez le champ ci-dessus pour en enregistrer un.'}
          </p>
        </div>
      );
    }

    return (
      <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100 bg-white">
        {filtered.map((num) => (
          <div
            key={num}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-red-50 text-red-600">
                <Ban className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-mono font-semibold text-gray-800 tracking-wider">
                {num}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setToDelete(num)}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
              title="Retirer de la liste"
              aria-label={`Retirer le numéro ${num} de la liste`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* En-tête avec compteur */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="font-sans font-semibold text-sm text-gray-900">
              Liste d'opposition DNC (Do Not Call)
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[11px] font-semibold border border-red-100">
              {numbers.length} {numbers.length > 1 ? 'numéros' : 'numéro'}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Les numéros figurant dans cette liste sont automatiquement exclus des campagnes d'appels.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Banner d'erreur */}
        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-50 text-red-700 border border-red-100 text-xs font-medium flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              aria-label="Fermer le message d'erreur"
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Formulaire d'ajout rapide */}
        <form onSubmit={handleAdd} className="bg-gray-50/60 p-4 rounded-xl border border-gray-100">
          <label htmlFor="phone" className={`${labelClass} mb-2 block`}>
            Ajouter un numéro à la liste noire
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="ex: +33612345678 ou 0612345678"
                className={`${inputClass} pr-8`}
              />
              {phone && (
                <button
                  type="button"
                  onClick={() => setPhone('')}
                  aria-label="Effacer le champ de téléphone"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              className="flex items-center justify-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              {submitting ? 'Ajout...' : 'Ajouter au DNC'}
            </Button>
          </div>
        </form>

        {/* Barre de recherche et Liste */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un numéro..."
                className="w-full h-[38px] pl-9 pr-8 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Effacer la recherche"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {search && (
              <span className="text-xs text-gray-400">
                {filtered.length} résultat(s)
              </span>
            )}
          </div>

          {/* Affichage des états via helper */}
          {renderListContent()}
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      <ConfirmDeleteModal
        isOpen={!!toDelete}
        onClose={() => setToDelete(null)}
        itemLabel={`le numéro ${toDelete}`}
        onConfirm={confirmDelete}
      />
    </div>
  );
}