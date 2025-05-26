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

  const getPaginationRange = () => {
    const range = [];
    const showPages = 5;
    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages, start + showPages - 1);
    
    if (end - start + 1 < showPages && start > 1) {
      start = Math.max(1, end - showPages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="w-full mx-auto py-4 sm:py-6 lg:py-10 px-3 sm:px-4 lg:px-6">
      {/* Header Section */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 flex items-center gap-2 lg:gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
              <Users size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            {title}
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                className="pl-10 pr-10 py-3 w-full sm:w-64 lg:w-72 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition-all duration-200"
              />
              {filterText && (
                <button
                  onClick={() => setFilterText('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            {/* Add Button */}
            <button
              onClick={() => onAddClick && onAddClick()}
              className="flex items-center gap-2 px-4 lg:px-6 py-3 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
              <span className="hidden sm:inline">Adicionar</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
        
        {children && (
          <div className="mt-4 lg:mt-6">
            {children}
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-slate-700">
            {showHeader && (
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                <tr>
                  {columns.map(col => (
                    <th
                      key={col.key}
                      onClick={() => col.sortable !== false && handleSort(col)}
                      className={`px-3 sm:px-4 lg:px-6 py-4 lg:py-5 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap ${
                        col.sortable !== false 
                          ? 'cursor-pointer hover:bg-slate-200/50 transition-colors duration-200' 
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-700">{col.title}</span>
                        {col.sortable !== false && (
                          <div className="flex flex-col">
                            {sortColumn === col.key ? (
                              sortDirection === 'asc' 
                                ? <ArrowUp size={14} className="text-blue-600" /> 
                                : <ArrowDown size={14} className="text-blue-600" />
                            ) : (
                              <div className="flex flex-col text-slate-300 group-hover:text-slate-400">
                                <ArrowUp size={10} />
                                <ArrowDown size={10} className="-mt-1" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-12 lg:py-16">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="text-slate-500">Carregando...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-12 lg:py-16">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 bg-slate-100 rounded-full">
                        <Search size={24} className="text-slate-400" />
                      </div>
                      <span className="text-slate-500 font-medium">{emptyText}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, i) => (
                  <Fragment key={row.id || i}>
                    <tr 
                      className={`hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-slate-50/50 transition-all duration-200 ${
                        onRowClick ? 'cursor-pointer' : ''
                      } group`} 
                      onClick={() => onRowClick?.(row)}
                    >
                      {columns.map(col => (
                        <td key={col.key} className="px-3 sm:px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap group-hover:text-slate-800 transition-colors">
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
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 lg:mt-8 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-6">
          {/* Results Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-medium">Mostrar</span>
              <select
                value={pageSize}
                onChange={e => { setPageSize(parseInt(e.target.value)); setCurrentPage(1); }}
                className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-blue-600 font-semibold bg-white shadow-sm transition-all duration-200"
              >
                {[5, 10, 15, 20, 25, 50].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <span className="font-medium">
              de <span className="text-blue-600 font-bold">{filteredData.length}</span> resultados
            </span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center lg:justify-end gap-1">
            <button 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 1 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              «
            </button>
            
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === 1 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1 mx-2">
              {getPaginationRange().map(pageNum => (
                <button 
                  key={pageNum} 
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 lg:px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === totalPages 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <ChevronRight size={16} />
            </button>
            
            <button 
              onClick={() => setCurrentPage(totalPages)} 
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === totalPages 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}