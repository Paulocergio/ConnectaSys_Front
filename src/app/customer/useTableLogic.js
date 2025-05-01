'use client';
import { useState, useEffect, useMemo } from 'react';

export default function useTableLogic(initialData, initialPageSize = 5) {
    const [data, setData] = useState(initialData);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterText, setFilterText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterText, pageSize]);

    const filteredData = useMemo(() => {
        if (!filterText.trim()) return data;
        const lowercasedFilter = filterText.toLowerCase();
        return data.filter(item =>
            Object.values(item).some(value =>
                ['string', 'number'].includes(typeof value) &&
                String(value).toLowerCase().includes(lowercasedFilter)
            )
        );
    }, [data, filterText]);

    const sortedData = useMemo(() => {
        if (!sortColumn) return filteredData;
        return [...filteredData].sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];
            return typeof aValue === 'string'
                ? sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
                : sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        });
    }, [filteredData, sortColumn, sortDirection]);

    const totalPages = Math.ceil(sortedData.length / pageSize);
    const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleSort = (column) => {
        if (!column.sortable) return;
        setSortDirection(prev => (sortColumn === column.key && prev === 'asc' ? 'desc' : 'asc'));
        setSortColumn(column.key);
    };

    return {
        paginatedData,
        totalPages,
        currentPage,
        pageSize,
        filterText,
        setFilterText,
        setPageSize,
        setCurrentPage,
        handleSort,
        sortColumn,
        sortDirection,
        setData,
    };
}
