import { useState, useEffect, useMemo } from 'react';
import { Search, RotateCcw, AlertCircle } from 'lucide-react';
import { getCampaigns, getCampaignLists, getCampaignStatuses } from '../../../api/campaigns';
import { searchLeads } from '../../../api/leads';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import StatusBadge from '../../../components/common/StatusBadge';
import Modal from '../../../components/common/Modal';
import { recordingStatusLabels, recordingStatusColors } from '../../../utils/statusConstants';
import { formInputClass as inputClass, labelClass } from '../../../styles/formClasses';

export default function LeadSearch() {
  const [campaigns, setCampaigns] = useState([]);
  const [lists, setLists] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [campaignId, setCampaignId] = useState('');
  const [listId, setListId] = useState('');
  const [status, setStatus] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewedLead, setViewedLead] = useState(null);

  // Chargement sécurisé des campagnes au montage
  useEffect(() => {
    let isMounted = true;

    getCampaigns()
      .then((data) => {
        if (isMounted) setCampaigns(data || []);
      })
      .catch(() => {
        if (isMounted) setError('Erreur lors du chargement des campagnes.');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Gestion de la sélection de campagne avec chargement combiné des dépendances
  const handleCampaignChange = (id) => {
    setCampaignId(id);
    setListId('');
    setStatus('');

    if (id) {
      Promise.all([getCampaignLists(id), getCampaignStatuses(id)])
        .then(([listsData, statusesData]) => {
          setLists(listsData || []);
          setStatuses(statusesData || []);
        })
        .catch(() => {
          setError('Erreur lors du chargement des listes et statuts.');
        });
    } else {
      setLists([]);
      setStatuses([]);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await searchLeads({ campaign_id: campaignId, list_id: listId, status, phone, name });
      setResults(res?.leads || []);
    } catch {
      setError('Erreur lors de la recherche des leads.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCampaignId('');
    setListId('');
    setStatus('');
    setPhone('');
    setName('');
    setResults(null);
    setLists([]);
    setStatuses([]);
    setError(null);
  };

  // Mémoïsation des tableaux d'options pour optimiser les re-rendus
  const campaignOptions = useMemo(
    () => [{ value: '', label: '-- Choisir --' }, ...campaigns.map((c) => ({ value: c.campaign_id, label: c.campaign_name }))],
    [campaigns]
  );

  const listOptions = useMemo(
    () => [{ value: '', label: 'Toutes les listes' }, ...lists.map((l) => ({ value: l.list_id, label: l.list_name }))],
    [lists]
  );

  const statusOptions = useMemo(
    () => [{ value: '', label: 'Toutes' }, ...statuses.map((s) => ({ value: s.status, label: `${s.status_name} (${s.status})` }))],
    [statuses]
  );

  // Rendu modulaire des résultats sans ternaires imbriquées
  const renderResultsContent = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-sm text-gray-400">
          Recherche en cours...
        </div>
      );
    }

    if (!results) return null;

    if (results.length === 0) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-sm text-gray-400">
          Aucun résultat trouvé.
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-md border border-emerald-100 overflow-hidden">
        <div className="px-5 py-3 text-xs text-gray-500 border-b border-emerald-100">
          {results.length} résultat(s) trouvé(s)
        </div>
        <div className="divide-y divide-emerald-100">
          {results.map((l) => (
  <button
    type="button"
    key={l.lead_id}
    onClick={() => setViewedLead(l)}
    className="w-full flex items-center justify-between px-5 py-3 hover:bg-emerald-50/40 cursor-pointer focus:outline-none focus:bg-emerald-50/60 text-left"
  >
    <div className="flex items-center gap-4 text-xs">
      <span className="font-mono text-gray-500">#{l.lead_id}</span>
      <span className="font-medium text-gray-900">{l.first_name} {l.last_name}</span>
      <span className="font-mono text-gray-600">{l.phone_number}</span>
      <span className="text-gray-500">{l.list_name}</span>
      <span className="text-gray-500">{l.agent}</span>
    </div>
    <StatusBadge
      status={l.status || 'NI'}
      statusLabels={recordingStatusLabels}
      statusColors={recordingStatusColors}
    />
  </button>
))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
        <h3 className="font-sans font-semibold text-sm text-gray-900">Recherche avancée de leads</h3>

        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-50 text-red-700 border border-red-100 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="campaignId" className={labelClass}>
              Campagne
            </label>
            <Select
              id="campaignId"
              value={campaignId}
              onChange={handleCampaignChange}
              options={campaignOptions}
            />
          </div>

          <div>
            <label htmlFor="listId" className={labelClass}>
              Listes
            </label>
            <Select
              id="listId"
              value={listId}
              onChange={setListId}
              options={listOptions}
            />
          </div>

          <div>
            <label htmlFor="status" className={labelClass}>
              Qualification
            </label>
            <Select
              id="status"
              value={status}
              onChange={setStatus}
              options={statusOptions}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Téléphone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              placeholder="ex: 0612345678"
            />
          </div>

          <div>
            <label htmlFor="name" className={labelClass}>
              Nom client
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Nom ou prénom"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={handleSearch} className="flex items-center gap-1.5">
            <Search className="w-4 h-4" /> Rechercher
          </Button>
          <Button variant="secondary" onClick={handleReset} className="flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4" /> Réinitialiser
          </Button>
        </div>
      </div>

      {renderResultsContent()}

      <Modal isOpen={!!viewedLead} onClose={() => setViewedLead(null)}>
        {viewedLead && (
          <div className="w-96">
            <h2 className="text-base font-bold text-gray-900 mb-4">Fiche lead #{viewedLead.lead_id}</h2>
            <div className="divide-y divide-gray-100 text-sm">
              {Object.entries(viewedLead).map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5">
                  <span className="text-gray-400">{k}</span>
                  <span className="text-gray-800 font-medium">{v || '-'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}