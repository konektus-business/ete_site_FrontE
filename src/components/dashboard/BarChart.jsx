// src/components/dashboard/BarChart.jsx
import { useEffect, useRef } from 'react';
import {
  Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend,
} from 'chart.js';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

// Usage simple (1 série) : <BarChart labels={...} data={...} color="#1EB394" />
// Usage multi-séries    : <BarChart labels={...} series={[{ label, data, color }, ...]} />
export default function BarChart({ labels, data, series, color = '#1EB394', height = 260 }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Normalise les deux façons d'appeler le composant vers un seul format interne
  const datasets = series
    ? series.map((s) => ({ label: s.label, data: s.data, backgroundColor: s.color, borderRadius: 6, maxBarThickness: 28 }))
    : [{ label: '', data, backgroundColor: color, borderRadius: 6, maxBarThickness: 32 }];

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          // La légende n'a d'intérêt qu'en multi-séries (sinon rien à distinguer)
          legend: series
            ? { position: 'bottom', labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, font: { size: 11 }, color: '#536175' } }
            : { display: false },
          tooltip: { intersect: false },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { size: 11 } } },
          y: { grid: { color: '#F1F5F9' }, ticks: { color: '#94A3B8', font: { size: 11 } } },
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels, data, series, color]);

  useEffect(() => () => chartRef.current?.destroy(), []);

  return (
    <div style={{ height }}>
      <canvas ref={canvasRef} />
    </div>
  );
}