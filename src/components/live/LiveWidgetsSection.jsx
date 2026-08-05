// src/components/live/LiveWidgetsSection.jsx
// Grille de widgets pour PanneauLive, réutilise KPIWidget (Dashboard) au lieu
// d'un composant dédié — même carte partout dans le CRM
import KPIWidget from '../dashboard/KPIWidget';

export default function LiveWidgetsSection({ config, data, history }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {config.map(({ key, icon: Icon, title, accentColor, getValue, format }) => {
        const rawValue = getValue(data);
        return (
          <KPIWidget
            key={key}
            icon={<Icon className="w-4 h-4" style={{ color: accentColor }} strokeWidth={2} />}
            title={title}
            value={format ? format(rawValue) : rawValue}
            sparklineData={history[key]}
            sparklineColor={accentColor}
          />
        );
      })}
    </div>
  );
}