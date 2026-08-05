import { useState, useEffect } from 'react';
import { Search, RotateCcw } from 'lucide-react';
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
  const [viewedLead, setViewedLead] = useState(null);

  useEffect(() => { getCampaigns().then(setCampaigns); }, []);

  const handleCampaignChange = (id) => {
    setCampaignId(id); setListId(''); setStatus('');
    if (id) { getCampaignLists(id).then(setLists); getCampaignStatuses(id).then(setStatuses); }
    else { setLists([]); setStatuses([]); }
  };

  const handleSearch = () => {
    setLoading(true);
    searchLeads({ campaign_id: campaignId, list_id: listId, status, phone, name }).then((res) => { setResults(res.leads); setLoading(false); });
  };

  const handleReset = () => { setCampaignId(''); setListId(''); setStatus(''); setPhone(''); setName(''); setResults(null); setLists([]); setStatuses([]); };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
        <h3 className="font-sans font-semibold text-sm text-gray-900">Recherche avancée de leads</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Campagne</label>
            <Select value={campaignId} onChange={handleCampaignChange} options={[{ value: '', label: '-- Choisir --' }, ...campaigns.map((c) => ({ value: c.campaign_id, label: c.campaign_name }))]} />
          </div>
          <div>
            <label className={labelClass}>Liste</label>
            <Select value={listId} onChange={setListId} options={[{ value: '', label: 'Toutes les listes' }, ...lists.map((l) => ({ value: l.list_id, label: l.list_name }))]} />
          </div>
          <div>
            <label className={labelClass}>Qualification</label>
            <Select value={status} onChange={setStatus} options={[{ value: '', label: 'Toutes' }, ...statuses.map((s) => ({ value: s.status, label: `${s.status_name} (${s.status})` }))]} />
          </div>
          <div>
            <label className={labelClass}>Téléphone</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="ex: 0612345678" />
          </div>
          <div>
            <label className={labelClass}>Nom client</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Nom ou prénom" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={handleSearch} className="flex items-center gap-1.5"><Search className="w-4 h-4" /> Rechercher</Button>
          <Button variant="secondary" onClick={handleReset} className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4" /> Réinitialiser</Button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-sm text-gray-400">Recherche...</div>
      ) : results && (
        <div className="bg-white rounded-xl shadow-md border border-emerald-100 overflow-hidden">
          <div className="px-5 py-3 text-xs text-gray-500 border-b border-emerald-100">{results.length} résultat(s) trouvé(s)</div>
          {results.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-400">Aucun résultat.</div>
          ) : (
            <div className="divide-y divide-emerald-100">
              {results.map((l) => (
                <div key={l.lead_id} className="flex items-center justify-between px-5 py-3 hover:bg-emerald-50/40 cursor-pointer" onClick={() => setViewedLead(l)}>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="font-mono text-gray-500">#{l.lead_id}</span>
                    <span className="font-medium text-gray-900">{l.first_name} {l.last_name}</span>
                    <span className="font-mono text-gray-600">{l.phone_number}</span>
                    <span className="text-gray-500">{l.list_name}</span>
                    <span className="text-gray-500">{l.agent}</span>
                  </div>
                  <StatusBadge status={l.status || 'NI'} statusLabels={recordingStatusLabels} statusColors={recordingStatusColors} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal isOpen={!!viewedLead} onClose={() => setViewedLead(null)}>
        {viewedLead && (
          <div className="w-96">
            <h2 className="text-base font-bold text-gray-900 mb-4">Fiche lead #{viewedLead.lead_id}</h2>
            <div className="divide-y divide-gray-100 text-sm">
              {Object.entries(viewedLead).map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5"><span className="text-gray-400">{k}</span><span className="text-gray-800 font-medium">{v || '-'}</span></div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}