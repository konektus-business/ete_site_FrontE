// src/utils/exportExcel.js
import * as XLSX from 'xlsx';

// Exporte un tableau d'objets JS (ex: data.rows) vers un fichier .xlsx téléchargé
// columns : optionnel, pour ne garder que certaines clés dans un ordre précis
export const exportToExcel = (rows, filename = 'export', columns = null) => {
  const cleanedRows = columns
    ? rows.map((row) => {
        const filtered = {};
        columns.forEach(({ key, label }) => {
          filtered[label] = row[key];
        });
        return filtered;
      })
    : rows;

  const worksheet = XLSX.utils.json_to_sheet(cleanedRows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Données');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};