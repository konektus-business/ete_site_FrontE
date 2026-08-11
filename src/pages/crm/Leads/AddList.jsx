import { useState, useEffect, useMemo, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { createLeadList, updateLeadList, getCampaigns } from '../../../api/campaigns';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import Toast from '../../../components/common/Toast';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';

const initialForm = {
  list_id: '',
  list_name: '',
  campaign_id: '',
  list_description: '',
  active: 'Y',
};

const activeOptions = [
  { value: 'Y', label: 'Actif' },
  { value: 'N', label: 'Inactif' },
];

export default function AddList({ mode = 'add', initialData = null, onSuccess, onCancel }) {
  const context = useOutletContext() || {};
  const { setActiveTab } = context;

  const [form, setForm] = useState(initialForm);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  // Chargement sécurisé des campagnes avec protection contre le démontage
  useEffect(() => {
    let isMounted = true;

    getCampaigns()
      .then((data) => {
        if (isMounted) setCampaigns(data);
      })
      .catch(() => {
        if (isMounted) setError('Erreur lors du chargement des campagnes');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Synchronisation du formulaire selon le mode et les données initiales
  useEffect(() => {
    if (initialData && mode === 'edit') {
      setForm({
        list_id: initialData.list_id || '',
        list_name: initialData.list_name || '',
        campaign_id: initialData.campaign_id || '',
        list_description: initialData.list_description || '',
        active: initialData.active || 'Y',
      });
    } else {
      setForm(initialForm);
    }
  }, [initialData, mode]);

  // Nettoyage du minuteur lors du démontage du composant
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldChange = (name) => (value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = (callback) => {
    if (callback) {
      callback();
    } else if (setActiveTab) {
      setActiveTab('listes');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.list_id || !form.list_name || !form.campaign_id) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (mode === 'edit' && initialData) {
        await updateLeadList(initialData.campaign_id, initialData.list_id, form);
      } else {
        await createLeadList(form);
      }
      setForm(initialForm);
      setToast({ message: mode === 'edit' ? 'Liste mise à jour' : 'Liste créée', type: 'success' });

      timerRef.current = setTimeout(() => handleClose(onSuccess), 1000);
    } catch (err) {
      const errorMessage =
        err.message === 'exists'
          ? 'Cet ID de liste existe déjà.'
          : "Erreur lors de l'enregistrement de la liste.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Mémoïsation des options de campagnes
  const campaignOptions = useMemo(
    () => campaigns.map((c) => ({ value: c.campaign_id, label: c.campaign_name })),
    [campaigns]
  );

  // Libellé du bouton de soumission extrait pour éviter l'imbrication de ternaires
  const getSubmitButtonLabel = () => {
    if (loading) return 'Enregistrement...';
    if (mode === 'edit') return 'Mettre à jour';
    return 'Créer la liste';
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-sans font-semibold text-sm text-gray-900">
            {mode === 'edit' ? 'Modifier la liste' : 'Ajouter une liste de leads'}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {mode === 'edit'
              ? 'Mettre à jour les détails de la liste'
              : "Créer une nouvelle liste et l'affecter à une campagne"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div>
              <label htmlFor="list_id" className={labelClass}>
                ID Liste *
              </label>
              <input
                type="text"
                id="list_id"
                name="list_id"
                required
                value={form.list_id}
                onChange={handleChange}
                disabled={mode === 'edit'}
                className={`${inputClass} ${mode === 'edit' ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}`}
                placeholder="ex: 1001"
              />
            </div>

            <div>
              <label htmlFor="list_name" className={labelClass}>
                Nom *
              </label>
              <input
                type="text"
                id="list_name"
                name="list_name"
                required
                value={form.list_name}
                onChange={handleChange}
                className={inputClass}
                placeholder="ex: Prospects Janvier"
              />
            </div>

            <div>
              <label htmlFor="campaign_id" className={labelClass}>
                Campagne *
              </label>
              <Select
                id="campaign_id"
                value={form.campaign_id}
                onChange={handleFieldChange('campaign_id')}
                options={campaignOptions}
              />
            </div>

            <div>
              <label htmlFor="active" className={labelClass}>
                Statut *
              </label>
              <Select
                id="active"
                value={form.active}
                onChange={handleFieldChange('active')}
                options={activeOptions}
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="list_description" className={labelClass}>
              Description
            </label>
            <input
              type="text"
              id="list_description"
              name="list_description"
              value={form.list_description || ''}
              onChange={handleChange}
              className={inputClass}
              placeholder="Description optionnelle..."
            />
          </div>

          {error && <p className="text-xs text-red-600 mt-4">{error}</p>}

          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
            <Button type="submit" variant="primary" disabled={loading}>
              {getSubmitButtonLabel()}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleClose(onCancel)}
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}