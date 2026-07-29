// src/components/dashboard/CampaignDonutChart.jsx
import { useEffect, useRef, useState } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip);

// fetchData : fonction async() => [{ label, value, color }, ...]
export default function CampaignDonutChart({ fetchData }) {
  const [items, setItems] = useState([]);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchData().then((data) => {
      setItems(data);
      if (!canvasRef.current) return;
      if (chartRef.current) chartRef.current.destroy();

      chartRef.current = new Chart(canvasRef.current, {
        type: 'doughnut',
        data: {
          labels: data.map((d) => d.label),
          datasets: [
            {
              data: data.map((d) => d.value),
              backgroundColor: data.map((d) => d.color),
              borderWidth: 0,
              cutout: '75%', // trou central large, comme la maquette (le total au centre)
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
        },
      });
    });

    return () => chartRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h3 className="font-sans font-semibold text-sm text-gray-900 mb-4">Répartition par campagne</h3>

      <div className="flex items-center justify-center relative h-[180px] mb-4">
        <canvas ref={canvasRef} />
        {/* Total affiché au centre du donut, en superposition (position absolute) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-bold text-2xl text-[#1E293B]">{total}</span>
          <span className="text-[10px] text-gray-400 uppercase">contacts</span>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-600">{item.label}</span>
            </div>
            <span className="font-medium text-gray-900">
              {item.value} <span className="text-gray-400">({total ? Math.round((item.value / total) * 100) : 0}%)</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}