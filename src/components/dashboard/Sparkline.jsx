import { useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

export default function Sparkline({ data = [], color = '#1EB394', height = 40 }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    // 1. Calcul des bornes Y pour gérer les séries de données plates (ex: [12, 12, 12])
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const isFlat = minVal === maxVal;

    const yMin = isFlat ? (minVal === 0 ? -1 : minVal * 0.9) : undefined;
    const yMax = isFlat ? (maxVal === 0 ? 1 : maxVal * 1.1) : undefined;

    const labels = data.map(() => '');

    // 2. Si le graphique existe déjà, on met à jour uniquement les données (plus fluide)
    if (chartRef.current) {
      chartRef.current.data.labels = labels;
      chartRef.current.data.datasets[0].data = data;
      chartRef.current.data.datasets[0].borderColor = color;

      // Mise à jour de l'axe Y si la série devient plate ou dynamique
      chartRef.current.options.scales.y.suggestedMin = yMin;
      chartRef.current.options.scales.y.suggestedMax = yMax;

      chartRef.current.update('none'); // 'none' désactive les animations de transition
      return;
    }

    // 3. Création initiale de l'instance Chart.js
    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data,
            borderColor: color,
            backgroundColor: 'transparent',
            pointRadius: 0,
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: { display: false },
          y: {
            display: false,
            suggestedMin: yMin,
            suggestedMax: yMax,
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [data, color]);

  return (
    <div className="relative w-full" style={{ height }}>
      <canvas ref={canvasRef} />
    </div>
  );
}