'use client';

import { useState, useEffect, Fragment } from 'react';
import { Plus, Search, X, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Users } from 'lucide-react';

export default function Table({
  columns = [],
  data = [],
  title = "Usuários",
  showHeader = true,
  emptyText = "Nenhum dado encontrado",
  loading = false,
  onRowClick,
  onAddClick,
  children
}) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState([...data]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
    applyFilters();
  }, [data, filterText]);

  const applyFilters = () => {
    let result = [...data];
    if (filterText.trim()) {
      const lower = filterText.toLowerCase();
      result = result.filter(item =>
        Object.keys(item).some(key =>
          (typeof item[key] === 'string' || typeof item[key] === 'number') &&
          String(item[key]).toLowerCase().includes(lower)
        )
      );
    }
    setFilteredData(result);
  };

  const handleSort = column => {
    if (column.sortable === false) return;
    if (sortColumn === column.key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column.key);
      setSortDirection('asc');
    }
  };

  const sortedData = [...filteredData];
  if (sortColumn) {
    sortedData.sort((a, b) => {
      const va = a[sortColumn];
      const vb = b[sortColumn];
      if (typeof va === 'string') {
        return sortDirection === 'asc'
          ? va.localeCompare(vb)
          : vb.localeCompare(va);
      }
      return sortDirection === 'asc' ? va - vb : vb - va;
    });
  }

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4">
      <div className="mb-6 flex items-start justify-between">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <Users size={24} className="text-blue-600" />
          {title}
        </h2>
        
        <div className="flex flex-col gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
              className="pl-10 pr-10 py-2.5 w-64 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {filterText && (
              <button
                onClick={() => setFilterText('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <button
            onClick={() => onAddClick && onAddClick()}
            className="flex items-center gap-2 px-4 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors self-end"
          >
            <Plus size={16} />
            Adicionar
          </button>
        </div>
      </div>

      {children && (
        <div className="mb-4">
          {children}
        </div>
      )}

      <div className="overflow-auto rounded-xl border border-slate-200 shadow-sm bg-white min-w-[900px]">
        <table className="min-w-full text-sm text-slate-700">
          {showHeader && (
            <thead className="bg-slate-50">
              <tr>
                {columns.map(col => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable !== false && handleSort(col)}
                    className={`px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider ${col.sortable !== false ? 'cursor-pointer hover:text-slate-800' : ''
                      }`}
                  >
                    <div className="flex items-center gap-1">
                      {col.title}
                      {col.sortable !== false && (
                        sortColumn === col.key ? (
                          sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
                        ) : (
                          <span className="text-slate-300">
                            <ArrowUp size={10} />
                            <ArrowDown size={10} style={{ marginTop: '-4px' }} />
                          </span>
                        )
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          )}
        <tbody>

            {loading ? (
              <tr><td colSpan={columns.length} className="text-center py-10">Carregando...</td></tr>
            ) : paginatedData.length === 0 ? (
              <tr><td colSpan={columns.length} className="text-center py-10 text-slate-400">{emptyText}</td></tr>
            ) : (
              paginatedData.map((row, i) => (
                <Fragment key={row.id || i}>
                  <tr className="hover:bg-slate-50 transition" onClick={() => onRowClick?.(row)}>
                    {columns.map(col => (
                      <td key={col.key} className="px-4 py-3">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm gap-4">
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <span>Mostrar</span>
          <select
            value={pageSize}
            onChange={e => { setPageSize(parseInt(e.target.value)); setCurrentPage(1); }}
            className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-600 font-semibold"
          >
            {[5, 10, 15, 20].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span>de {filteredData.length} resultados</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
            className={`px-2 py-1 rounded ${currentPage === 1 ? 'text-slate-300' : 'text-blue-600 hover:bg-blue-100'}`}>«</button>
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
            className={`px-2 py-1 rounded ${currentPage === 1 ? 'text-slate-300' : 'text-blue-600 hover:bg-blue-100'}`}><ChevronLeft size={16} /></button>
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button key={pageNum} onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded font-medium transition ${currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-600 hover:bg-blue-100'
                  }`}
              >{pageNum}</button>
            );
          })}
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded ${currentPage === totalPages ? 'text-slate-300' : 'text-blue-600 hover:bg-blue-100'}`}><ChevronRight size={16} /></button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded ${currentPage === totalPages ? 'text-slate-300' : 'text-blue-600 hover:bg-blue-100'}`}>»</button>
        </div>
      </div>
    </div>
  );
}