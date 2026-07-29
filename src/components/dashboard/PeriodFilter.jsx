import Select from '../common/Select';
import { periodOptions } from '../../config/periodOptions';
import { filterInputClass as inputClass, labelClass } from '../../styles/formClasses';

// Filtre de période réutilisable : Select (Aujourd'hui/Hier/Semaine/Mois/Personnalisée)
// + les 2 champs de date, affichés uniquement si "Personnalisée" est sélectionné.
export default function PeriodFilter({ period, setPeriod, dates, setDates }) {
  const isCustom = period === 'custom';

  return (
    <>
      <div className="w-40">
        <label className={labelClass}>Période</label>
        <Select value={period} onChange={setPeriod} options={periodOptions} />
      </div>

      {isCustom && (
        <>
          <div className="w-40">
            <label className={labelClass}>Date début</label>
            <input
              type="date"
              value={dates.startDate}
              onChange={(e) => setDates((prev) => ({ ...prev, startDate: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div className="w-40">
            <label className={labelClass}>Date fin</label>
            <input
              type="date"
              value={dates.endDate}
              onChange={(e) => setDates((prev) => ({ ...prev, endDate: e.target.value }))}
              className={inputClass}
            />
          </div>
        </>
      )}
    </>
  );
}