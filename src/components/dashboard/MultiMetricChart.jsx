import { useEffect, useRef } from 'react';
import {
  Chart, LineController, LineElement, PointElement,
  LinearScale, CategoryScale, Tooltip, Legend,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

// labels : ex ['08h','09h',...]
// series : [{ key, label, color, data }, ...] — uniquement les métriques à afficher
export default function MultiMetricChart({ labels, series, height = 320 }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    // Si aucune métrique n'est cochée, on ne dessine rien (évite un graphique vide moche)
    if (series.length === 0) return;

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: series.map((s) => ({
          label: s.label,
          data: s.data,
          borderColor: s.color,
          backgroundColor: 'transparent',
          tension: 0.35,
          pointRadius: 2,
          pointBackgroundColor: s.color,
          borderWidth: 2,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, font: { size: 11 }, color: '#536175' },
          },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { size: 11 } } },
          y: { grid: { color: '#F1F5F9' }, ticks: { color: '#94A3B8', font: { size: 11 } } },
        },
      },
    });

    // Recrée le graphique à chaque changement de séries (toggle checkbox)
    // ou de labels — pas besoin de re-fetch, juste de redessiner
  }, [labels, series]);

  useEffect(() => () => chartRef.current?.destroy(), []);

  if (series.length === 0) {
    return (
      <div style={{ height }} className="flex items-center justify-center text-xs text-gray-400">
        Sélectionne au moins une métrique à afficher
      </div>
    );
  }

  return (
    <div style={{ height }}>
      <canvas ref={canvasRef} />
    </div>
  );
}