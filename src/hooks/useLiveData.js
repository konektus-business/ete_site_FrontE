import { useState, useEffect, useCallback, useRef } from 'react';
import { getLiveData } from '../api/live';

const HISTORY_LENGTH = 15; // Nombre de points affichés sur la sparkline

export function useLiveData(widgetsConfig = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState({});
  const widgetsRef = useRef(widgetsConfig);
  widgetsRef.current = widgetsConfig;

  const fetchData = useCallback(async () => {
    try {
      const result = await getLiveData();
      setData(result);

      setHistory((prev) => {
        const next = { ...prev };

        widgetsRef.current.forEach(({ key, getValue }) => {
          const rawVal = getValue(result);
          // Convertit en nombre si c'est une métrique temporelle ou numérique
          const numericVal = typeof rawVal === 'number' ? rawVal : 0;
          const currentArr = prev[key];

          if (!currentArr) {
            // 💡 PRE-REMPLISSAGE INITIAL :
            // Si c'est le 1er chargement, on génère 15 points réalistes autour de la valeur actuelle
            // pour que la courbe ait immédiatement du relief au lieu d'être un trait plat.
            const simulatedHistory = Array.from({ length: HISTORY_LENGTH }, (_, i) => {
              const variation = (Math.sin(i * 0.8) * 0.08) * numericVal; // +/- 8% de variation
              return Math.max(0, Math.round(numericVal + variation));
            });
            // Le dernier point est la vraie valeur actuelle
            simulatedHistory[HISTORY_LENGTH - 1] = numericVal;
            next[key] = simulatedHistory;
          } else {
            // En cours de route : on pousse la nouvelle valeur réelle
            next[key] = [...currentArr, numericVal].slice(-HISTORY_LENGTH);
          }
        });

        return next;
      });

      setLoading(false);
    } catch (err) {
      console.error('Erreur AJAX PanneauLive:', err);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, history, loading };
}