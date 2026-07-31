import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

const Table = ({ data, columns, onRowClick, itemsPerPage: initialItemsPerPage = 12, itemLabel = 'résultats', minWidth, pageSizeOptions = [10, 12, 20, 50], sortKey, sortOrder, onSort }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [data, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <div className="overflow-x-auto w-full rounded-xl shadow-md overflow-hidden bg-white border border-emerald-100">
      <table className="w-full" style={minWidth ? { minWidth } : undefined}>
        <thead className="bg-[#DDF4EF] text-[#6C798B] font-bold text-[10px] uppercase text-left tracking-[0.5px] leading-none">
          <tr>
            {columns.map((column) => (
              <th className="px-4 py-3" key={column.key}>
                {column.sortable && onSort ? (
                  <button
                    onClick={() => onSort(column.key)}
                    className="flex items-center gap-1 uppercase hover:text-gray-800 transition-colors"
                  >
                    {column.label}
                    {sortKey === column.key && (sortOrder === 'ASC' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-emerald-100 text-left">
          {paginatedData.map((row) => (
            <tr className="hover:bg-emerald-50/40" key={row.id} onClick={() => onRowClick(row)}>
              {columns.map((column) => (
                <td
                  className="px-4 py-3"
                  key={column.key}
                  onClick={(column.key === 'select' || column.key === 'actions') ? (e) => e.stopPropagation() : undefined}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length > 0 && (
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-emerald-100">
          <span className="text-xs text-gray-500">
            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, data.length)} sur {data.length} {itemLabel}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-crmPrimary text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Afficher</span>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="appearance-none pl-3 pr-7 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {pageSizeOptions.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span>par page</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;