'use client';

import { useState, useEffect, Fragment } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Table as TableIcon,
  Filter,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Share,
  Download
} from 'lucide-react';
import ModalEditProject from '../Modals/ModalEditProject';

export default function Table({
  columns = [],
  data = [],
  title,
  showHeader = true,
  emptyText = "Nenhum dado encontrado",
  loading = false,
  striped = false,         // não usado mais
  onRowClick,
  renderExpandedRow
}) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState([...data]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [expandedRows, setExpandedRows] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [columnFilters, setColumnFilters] = useState({});
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
    applyFilters();
  }, [data, filterText, columnFilters]);

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
    Object.entries(columnFilters).forEach(([key, value]) => {
      if (value.trim()) {
        const lower = value.toLowerCase();
        result = result.filter(item =>
          String(item[key]).toLowerCase().includes(lower)
        );
      }
    });
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

  const toggleRowExpand = id =>
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));

  const toggleActionMenu = id =>
    setActionMenuOpen(prev => (prev === id ? null : id));

  const handleEdit = project => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  const handleSaveProject = updated => {
    console.log('Projeto atualizado:', updated);
    setIsModalOpen(false);
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

  const renderProgress = progress => {
    const val = parseInt(progress);
    let color = 'bg-blue-500';
    if (val >= 100) color = 'bg-green-500';
    else if (val >= 70) color = 'bg-blue-500';
    else if (val >= 40) color = 'bg-yellow-500';
    else color = 'bg-red-500';
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full`}
          style={{ width: progress }}
        />
      </div>
    );
  };

  const renderStatus = status => {
    let bg, text;
    switch (status) {
      case 'Concluído':
        bg = 'bg-green-100';
        text = 'text-green-800';
        break;
      case 'Em andamento':
        bg = 'bg-blue-100';
        text = 'text-blue-800';
        break;
      case 'Pendente':
        bg = 'bg-yellow-100';
        text = 'text-yellow-800';
        break;
      default:
        bg = 'bg-gray-100';
        text = 'text-gray-800';
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
        {status}
      </span>
    );
  };

  const getProjectDetails = project => ({
    description: 'Descrição detalhada do projeto ' + project.name,
    startDate: '01/01/2023',
    endDate: '31/12/2023',
    manager: 'João Silva',
    team: ['Ana Costa', 'Carlos Oliveira', 'Mariana Santos'],
    budget: 'R$ 50.000,00',
    tasks: [
      { name: 'Planejamento', status: 'Concluído', deadline: '15/01/2023' },
      { name: 'Desenvolvimento', status: 'Em andamento', deadline: '30/07/2023' },
      { name: 'Testes', status: 'Pendente', deadline: '31/10/2023' },
      { name: 'Implementação', status: 'Pendente', deadline: '15/12/2023' }
    ]
  });

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-200 bg-white">
        {title && (
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="mr-2 text-indigo-600">
              <TableIcon size={20} />
            </span>
            {title}
          </h3>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg border ${
              showFilters
                ? 'bg-white border-indigo-200 text-indigo-600'
                : 'border-gray-200 text-gray-600'
            }`}
          >
            <Filter size={18} />
          </button>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar..."
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
              className="pl-10 pr-10 py-2 bg-white border border-gray-200 rounded-lg w-full text-gray-800 placeholder-gray-400 focus:outline-none transition-all duration-200"
            />
            {filterText && (
              <button
                onClick={() => setFilterText('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FILTROS */}
      {showFilters && (
        <div className="px-6 py-3 bg-white border-b border-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {columns.map(col => (
            <div key={col.key} className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">{col.title}</label>
              <input
                type="text"
                placeholder={`Filtrar ${col.title.toLowerCase()}...`}
                value={columnFilters[col.key] || ''}
                onChange={e =>
                  setColumnFilters(prev => ({
                    ...prev,
                    [col.key]: e.target.value
                  }))
                }
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              />
            </div>
          ))}
        </div>
      )}

      {/* TABELA */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {showHeader && (
            <thead>
              <tr className="bg-white">
                <th className="w-10 px-3 py-3.5"></th>
                {columns.map(col => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable !== false && handleSort(col)}
                    className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center">
                      {col.title}
                      {col.sortable !== false && (
                        <span className="ml-1.5">
                          {sortColumn === col.key ? (
                            sortDirection === 'asc' ? (
                              <ArrowUp size={16} className="text-indigo-500" />
                            ) : (
                              <ArrowDown size={16} className="text-indigo-500" />
                            )
                          ) : (
                            <div className="text-gray-300 h-4 w-4 flex flex-col items-center justify-center">
                              <ArrowUp size={12} strokeWidth={1.5} />
                              <ArrowDown
                                size={12}
                                strokeWidth={1.5}
                                style={{ marginTop: '-4px' }}
                              />
                            </div>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-10 text-center">
                  {/* ... spinner ... */}
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-10 text-center">
                  {/* ... empty ... */}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, i) => (
                <Fragment key={row.id || i}>
                  <tr
                    className={`${onRowClick ? 'cursor-pointer' : ''}`}
                    onClick={e => {
                      if (
                        e.target.closest('button[data-expand]') ||
                        e.target.closest('div[data-actions]')
                      )
                        return;
                      onRowClick && onRowClick(row);
                    }}
                  >
                    <td className="w-10 py-4 pl-6 pr-3">
                      <button
                        data-expand="true"
                        onClick={() => toggleRowExpand(row.id || i)}
                        className="p-1 rounded-full text-gray-400"
                      >
                        {expandedRows[row.id || i] ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                    </td>
                    {columns.map(col => (
                      <td
                        key={`${i}-${col.key}`}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700"
                      >
                        {col.key === 'progress'
                          ? renderProgress(row[col.key])
                          : col.key === 'status'
                          ? renderStatus(row[col.key])
                          : col.key === 'actions'
                          ? (
                              <div data-actions="true" className="relative">
                                {/* ... action buttons ... */}
                              </div>
                            )
                          : col.render
                          ? col.render(row[col.key], row)
                          : row[col.key]}
                      </td>
                    ))}
                  </tr>

                  {renderExpandedRow && expandedRows[row.id || i] && (
                    <tr className="bg-white border-b border-gray-200">
                      <td colSpan={columns.length + 1} className="px-6 py-4">
                        {renderExpandedRow(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>


      <div className="px-6 py-4 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500 flex items-center space-x-2">
          <span>Linhas por página:</span>
          <select value={pageSize} onChange={e => { setPageSize(parseInt(e.target.value)); setCurrentPage(1); }} className="border border-gray-200 rounded text-sm px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500">
            {[5, 10, 15, 25, 50].map(size => <option key={size} value={size}>{size}</option>)}
          </select>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-4">
            {filteredData.length > 0
              ? `${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, sortedData.length)} de ${filteredData.length}`
              : '0 resultados'}
          </span>
          <div className="flex items-center space-x-1">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className={`p-1.5 rounded ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 17l-5-5 5-5M17 17l-5-5 5-5" /></svg>
            </button>
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`p-1.5 rounded ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}><ChevronLeft size={20} /></button>
            <div className="hidden sm:flex items-center">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let num;
                if (totalPages <= 5) num = i + 1;
                else if (currentPage <= 3) num = i + 1;
                else if (currentPage >= totalPages - 2) num = totalPages - 4 + i;
                else num = currentPage - 2 + i;
                return num > 0 && num <= totalPages ? (
                  <button key={num} onClick={() => setCurrentPage(num)} className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${currentPage === num ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{num}</button>
                ) : null;
              })}
            </div>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className={`p-1.5 rounded ${(currentPage === totalPages || totalPages === 0) ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}><ChevronRight size={20} /></button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages || totalPages === 0} className={`p-1.5 rounded ${(currentPage === totalPages || totalPages === 0) ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 17l5-5-5-5M7 17l5-5-5-5" /></svg>
            </button>
          </div>
        </div>
      </div>
      <ModalEditProject isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} project={selectedProject} onSave={handleSaveProject} />
    </div>
  );
}
