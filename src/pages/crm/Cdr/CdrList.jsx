import { useState, useEffect, useCallback } from 'react';
import { PhoneCall, Euro, Building2, Smartphone } from 'lucide-react';
import { getCdrList } from '../../../api/cdr';
import { cdrColumns } from '../../../config/cdrColumns';
import Table from '../../../components/dashboard/Table';
import KPIWidget from '../../../components/dashboard/KPIWidget';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/ButtonCRM';
import PeriodFilter from '../../../components/dashboard/PeriodFilter';
import { getDefaultDates } from '../../../utils/dateUtils';
import { exportToExcel } from '../../../utils/exportExcel';
import { labelClass } from '../../../styles/formClasses';

const TYPE_OPTIONS = [
  { value: '', label: 'Tous' },
  { value: 'OUTBOUND', label: 'Sortant' },
  { value: 'INBOUND', label: 'Entrant' },
];

const cdrExportColumns = [
  { key: 'call_date', label: 'Date' },
  { key: 'destination', label: 'Destination' },
  { key: 'type_detected', label: 'Type' },
  { key: 'phone_number', label: 'Numéro appelé' },
  { key: 'length_in_sec', label: 'Durée (s)' },
  { key: 'prix', label: 'Prix (€)' },
];

export default function CdrList() {
  const [period, setPeriod] = useState('today');
  const [dates, setDates] = useState(getDefaultDates());
  const [type, setType] = useState('');
  const [sortKey, setSortKey] = useState('call_date');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fonction de requêtage encapsulée avec useCallback
  const fetchCdr = useCallback(
    async (sKey = sortKey, sOrder = sortOrder) => {
      setLoading(true);
      try {
        const res = await getCdrList({ period, ...dates, type, sort: sKey, order: sOrder });
        setResult(res);
      } catch (err) {
        console.error('Erreur lors du chargement des CDR:', err);
      } finally {
        setLoading(false);
      }
    },
    [period, dates, type, sortKey, sortOrder]
  );

  // Premier chargement sécurisé au montage (sans suppression d'avertissement eslint)
  useEffect(() => {
    let isMounted = true;

    getCdrList({ period, ...dates, type, sort: sortKey, order: sortOrder })
      .then((res) => {
        if (isMounted) {
          setResult(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des CDR:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [dates, period, sortKey, sortOrder, type]);

  const handleSort = (key) => {
    const newOrder = key === sortKey && sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortKey(key);
    setSortOrder(newOrder);
    fetchCdr(key, newOrder);
  };

  const handleExportExcel = () => {
    if (!result?.recordings?.length) return;
    exportToExcel(result.recordings, `cdr-${dates.startDate}-au-${dates.endDate}`, cdrExportColumns);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans font-semibold text-sm text-gray-900">Détails des appels (CDR)</h3>
          <span className="text-xs text-gray-400">{new Date().toLocaleString('fr-FR')}</span>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <PeriodFilter period={period} setPeriod={setPeriod} dates={dates} setDates={setDates} />

          <div className="w-40">
            <label htmlFor="type" className={labelClass}>Type</label>
            <Select id="type" value={type} onChange={setType} options={TYPE_OPTIONS} />
          </div>

          <Button type="button" variant="primary" onClick={() => fetchCdr()}>
            Appliquer
          </Button>

          <div className="ml-auto">
            <Button variant="warning" onClick={handleExportExcel} disabled={!result?.recordings?.length}>
              Exporter en Excel
            </Button>
          </div>
        </div>
      </div>

      {loading || !result ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-sm text-gray-400">
          Chargement...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPIWidget
              icon={<PhoneCall className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
              title="Appels lancés"
              badge="PÉRIODE"
              value={result.total_appels ?? 0}
              showPercent={false}
            />
            <KPIWidget
              icon={<Euro className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
              title="Prix total"
              badge="PÉRIODE"
              value={`${(result.total_prix ?? 0).toFixed(4)} €`}
              showPercent={false}
            />
            <KPIWidget
              icon={<Building2 className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
              title="Prix total fixe"
              badge="PÉRIODE"
              value={`${(result.total_prix_fixe ?? 0).toFixed(4)} €`}
              showPercent={false}
            />
            <KPIWidget
              icon={<Smartphone className="w-6 h-6 text-[#1EB394]" strokeWidth={2} />}
              title="Prix total mobile"
              badge="PÉRIODE"
              value={`${(result.total_prix_mobile ?? 0).toFixed(4)} €`}
              showPercent={false}
            />
          </div>

          <Table
            columns={cdrColumns}
            data={result.recordings || []}
            onRowClick={() => {}}
            itemLabel="appels"
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        </>
      )}
    </div>
  );
}