'use client';
import { useState, useEffect } from 'react';

export default function Table({
    columns = [],
    data = [],
    title,
    showHeader = true,
    emptyText = "Nenhum dado encontrado",
    loading = false,
    striped = false,
    onRowClick,
}) {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState([...data]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        setCurrentPage(1);
        if (!filterText.trim()) {
            setFilteredData([...data]);
        } else {
            const lowercasedFilter = filterText.toLowerCase();
            const filtered = data.filter(item => {
                return Object.keys(item).some(key =>
                    typeof item[key] === 'string' || typeof item[key] === 'number'
                        ? String(item[key]).toLowerCase().includes(lowercasedFilter)
                        : false
                );
            });
            setFilteredData(filtered);
        }
    }, [data, filterText]);

    const handleSort = (column) => {
        if (!column.sortable) return;

        if (sortColumn === column.key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column.key);
            setSortDirection('asc');
        }
    };

    const sortedData = [...filteredData];
    if (sortColumn) {
        sortedData.sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (typeof aValue === 'string') {
                return sortDirection === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }
        });
    }

    const totalPages = Math.ceil(sortedData.length / pageSize);
    const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {/* Header com título e filtro */}
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-100">
                {title && (
                    <h3 className="text-lg font-medium text-gray-800 flex items-center">
                        <span className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                            </svg>
                        </span>
                        {title}
                    </h3>
                )}
                <div className="relative w-full sm:w-64 md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg w-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    {filterText && (
                        <button
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            onClick={() => setFilterText('')}
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    {showHeader && (
                        <thead>
                            <tr className="bg-gray-50">
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        onClick={() => column.sortable && handleSort(column)}
                                        className={`px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                                    >
                                        <div className="flex items-center">
                                            {column.title}
                                            {column.sortable && (
                                                <span className="ml-1.5">
                                                    {sortColumn === column.key ? (
                                                        sortDirection === 'asc' ? (
                                                            <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        )
                                                    ) : (
                                                        <svg className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                                        </svg>
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    )}
                    <tbody className="bg-white">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-10 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <svg className="animate-spin h-8 w-8 text-blue-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="text-sm font-medium text-gray-500">Carregando dados...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-10 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.5 3.5v17M4.5 8.5h10M4.5 15.5h10" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 8.5L9.5 3.5l5 5M4.5 15.5l5 5 5-5" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-500">
                                            {filterText ? `Nenhum resultado encontrado para "${filterText}"` : emptyText}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, rowIndex) => (
                                <tr
                                    key={row.id || rowIndex}
                                    className={`${onRowClick ? 'cursor-pointer hover:bg-blue-50' : ''
                                        } ${striped && rowIndex % 2 === 1 ? 'bg-gray-50' : ''} 
                                    transition-colors duration-150`}
                                    onClick={() => onRowClick && onRowClick(row)}
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={`${rowIndex}-${column.key}`}
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700"
                                        >
                                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer com paginação */}
            <div className="px-6 py-3 bg-white border-t border-gray-100 flex items-center justify-end gap-4">
                <div className="text-sm text-gray-500 flex items-center space-x-2">
                    <span>Rows per page:</span>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(parseInt(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="border border-gray-200 rounded text-sm px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        {[5, 10, 15, 25].map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                    <span>↔</span>
                    <span>
                        {((currentPage - 1) * pageSize) + 1}–{Math.min(currentPage * pageSize, sortedData.length)} of {filteredData.length}
                    </span>
                </div>

                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`p-1.5 rounded ${currentPage === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className={`p-1.5 rounded ${currentPage === totalPages || totalPages === 0
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>

    );
}