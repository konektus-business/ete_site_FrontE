// src/components/dashboard/Sparkline.jsx
import { useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js';

// On enregistre uniquement les modules Chart.js dont on a besoin
// (line chart) : ça réduit la taille du bundle par rapport à un
// import global de "chart.js/auto"
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

// data : tableau de nombres, ex: [2, 5, 3, 7]
// color : couleur de la ligne (par défaut le vert de la charte crmPrimary)
export default function Sparkline({ data = [], color = '#1EB394', height = 40 }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null); // garde une référence à l'instance Chart.js en cours

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    // Si un graphique existe déjà sur ce canvas (re-render), on le détruit
    // avant d'en recréer un nouveau, sinon Chart.js accumule les instances
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: data.map(() => ''), // pas de labels visibles, juste la forme de la courbe
        datasets: [
          {
            data,
            borderColor: color,
            backgroundColor: 'transparent',
            pointRadius: 0,
            borderWidth: 2,
            tension: 0.4, // arrondit la courbe, comme dans le PHP legacy
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      },
    });

    // Nettoyage : détruit le graphique quand le composant est démonté
    // (évite les fuites mémoire si on quitte la page dashboard)
    return () => {
      chartRef.current?.destroy();
    };
  }, [data, color]);

  return (
    <div style={{ height }}>
      <canvas ref={canvasRef} />
    </div>
  );
}