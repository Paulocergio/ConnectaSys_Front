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
    const startItem = ((currentPage - 1) * pageSize) + 1;
    const endItem = Math.min(currentPage * pageSize, sortedData.length);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                {title && (
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <span className="mr-3 p-2 bg-white rounded-lg shadow-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                            </svg>
                        </span>
                        {title}
                    </h3>
                )}
                
                <div className="relative w-full sm:w-72">
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
                        className="pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg w-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-xs"
                    />
                    {filterText && (
                        <button
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
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
                                        className={`px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}`}
                                    >
                                        <div className="flex items-center">
                                            {column.title}
                                            {column.sortable && (
                                                <span className="ml-2">
                                                    {sortColumn === column.key ? (
                                                        sortDirection === 'asc' ? (
                                                            <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
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
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <div className="relative">
                                            <div className="h-12 w-12 rounded-full border-4 border-blue-100"></div>
                                            <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Carregando dados...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.5 16.5v-13m0 0l-5 5m5-5l5 5m-5 8l5 5m-5-5l-5 5" />
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
                                    className={`${
                                        onRowClick ? 'cursor-pointer hover:bg-blue-50' : ''
                                    } ${striped && rowIndex % 2 === 1 ? 'bg-gray-50' : ''} 
                                    transition-colors duration-150`}
                                    onClick={() => onRowClick && onRowClick(row)}
                                >
                                    {columns.map((column) => (
                                        <td 
                                            key={`${rowIndex}-${column.key}`} 
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700"
                                        >
                                            <div className="flex items-center">
                                                {column.render ? column.render(row[column.key], row) : row[column.key]}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            <div className="px-6 py-4 bg-white border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500 flex items-center">
                    <span>Mostrando</span>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(parseInt(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="mx-2 border border-gray-200 rounded-md text-sm px-3 py-1 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
                    >
                        {[5, 10, 15, 25, 50].map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                    <span>itens por página</span>
                </div>
                
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                        {startItem}-{endItem} de {filteredData.length}
                    </span>
                    
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-md ${currentPage === 1 
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
                            className={`p-2 rounded-md ${currentPage === totalPages || totalPages === 0
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
        </div>
    );
}