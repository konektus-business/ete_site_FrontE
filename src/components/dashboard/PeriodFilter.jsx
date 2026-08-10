import Select from '../common/Select';
import DateInput from '../common/DateInput';
import { periodOptions } from '../../config/periodOptions';
import { labelClass } from '../../styles/formClasses';

// Filtre de periode reutilisable : Select (Aujourd'hui/Hier/Semaine/Mois/Personnalisee)
// + les 2 champs de date, affiches uniquement si "Personnalisee" est selectionne.
// Les deux DateInput partagent rangeStart/rangeEnd pour surligner ensemble
// la periode choisie dans les deux calendriers (comme dans l'image de reference).
export default function PeriodFilter({ period, setPeriod, dates, setDates }) {
  const isCustom = period === 'custom';

  return (
    <>
      <div className="w-40">
        <label className={labelClass}>Periode</label>
        <Select value={period} onChange={setPeriod} options={periodOptions} />
      </div>

      {isCustom && (
        <>
          <div className="w-40">
            <label className={labelClass}>Date debut</label>
            <DateInput
              value={dates.startDate}
              onChange={(e) => setDates((prev) => ({ ...prev, startDate: e.target.value }))}
              rangeStart={dates.startDate}
              rangeEnd={dates.endDate}
            />
          </div>
          <div className="w-40">
            <label className={labelClass}>Date fin</label>
            <DateInput
              value={dates.endDate}
              onChange={(e) => setDates((prev) => ({ ...prev, endDate: e.target.value }))}
              rangeStart={dates.startDate}
              rangeEnd={dates.endDate}
            />
          </div>
        </>
      )}
    </>
  );
}