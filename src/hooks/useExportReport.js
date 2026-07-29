
import { useCallback } from 'react';
import html2canvas from 'html2canvas';
import { exportToExcel } from '../utils/exportExcel';

// Hook réutilisable pour exporter une zone du DOM (via captureRef) en PNG,
// et un tableau de données en Excel. Centralise la logique commune à
// toutes les pages de rapports (RHStats, StatusStats, futures pages...).
export function useExportReport(captureRef) {
  const exportExcel = useCallback((rows, columns, filename) => {
    if (!rows) return;
    exportToExcel(rows, filename, columns);
  }, []);

  const exportPng = useCallback(async (filename) => {
    if (!captureRef.current) return;

    await document.fonts.ready; // attend le chargement des polices web

    const canvas = await html2canvas(captureRef.current, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      // onclone : s'applique sur une COPIE du DOM juste avant la capture.
      // On force une police système fiable (métriques stables, bien
      // supportée par html2canvas) pour éviter les chiffres "coupés"
      // observés avec la police custom Plus Jakarta Sans.
      onclone: (clonedDoc) => {
        clonedDoc.body.style.fontFamily = 'Arial, Helvetica, sans-serif';
      },
    });

    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [captureRef]);

  return { exportExcel, exportPng };
}