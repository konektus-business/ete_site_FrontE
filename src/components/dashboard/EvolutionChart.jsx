import { useEffect, useRef, useState } from 'react';
import {
  Chart, LineController, LineElement, PointElement,
  LinearScale, CategoryScale, Tooltip, Filler,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

const periods = [
  { value: '7j', label: '7 jours' },
  { value: '30j', label: '30 jours' },
  { value: '6mois', label: '6 mois' },
];

// title : titre de la carte (ex: "Évolution des appels")
// fetchData : fonction async(period) => { labels, actuel, precedent }
export default function EvolutionChart({ title, fetchData }) {
  const [period, setPeriod] = useState('7j');
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchData(period).then((data) => {
      if (!isMounted || !canvasRef.current) return;

      if (chartRef.current) chartRef.current.destroy();

      chartRef.current = new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Période actuelle',
              data: data.actuel,
              borderColor: '#1EB394',
              backgroundColor: 'rgba(30, 179, 148, 0.08)',
              fill: true,
              tension: 0.4,
              pointRadius: 0,
              borderWidth: 2,
            },
            {
              label: 'Période précédente',
              data: data.precedent,
              borderColor: '#CBD5E1',
              backgroundColor: 'transparent',
              borderDash: [4, 4], // ligne pointillée, comme la maquette
              tension: 0.4,
              pointRadius: 0,
              borderWidth: 1.5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }, // on affichera notre propre légende en dessous
            tooltip: { mode: 'index', intersect: false },
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { size: 11 } } },
            y: { grid: { color: '#F1F5F9' }, ticks: { color: '#94A3B8', font: { size: 11 } } },
          },
        },
      });
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  // Nettoyage final au démontage du composant
  useEffect(() => () => chartRef.current?.destroy(), []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-sans font-semibold text-sm text-gray-900">{title}</h3>
        <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                period === p.value
                  ? 'bg-crmPrimary text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[260px] relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
            Chargement...
          </div>
        )}
        <canvas ref={canvasRef} />
      </div>

      {/* Légende manuelle, pour matcher le style sobre de la maquette */}
      <div className="flex items-center gap-5 mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1EB394]" /> Période actuelle
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" /> Période précédente
        </div>
      </div>
    </div>
  );
}