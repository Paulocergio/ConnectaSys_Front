"use client";

import {
  Plus,
  Search,
  X,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Users,
  Eye,
  Menu,
} from "lucide-react";
import { useState, useEffect, Fragment } from "react";

export default function Table({
  columns = [],
  data = [],
  title = "Usuários",
  showHeader = true,
  emptyText = "Nenhum dado encontrado",
  loading = false,
  onRowClick,
  onAddClick,
  children,
}) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState([...data]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set());

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    applyFilters();
  }, [data, filterText]);

  const applyFilters = () => {
    let result = [...data];
    if (filterText.trim()) {
      const lower = filterText.toLowerCase();
      result = result.filter((item) =>
        Object.keys(item).some(
          (key) =>
            (typeof item[key] === "string" || typeof item[key] === "number") &&
            String(item[key]).toLowerCase().includes(lower)
        )
      );
    }
    setFilteredData(result);
  };

  const handleSort = (column) => {
    if (column.sortable === false) return;
    if (sortColumn === column.key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column.key);
      setSortDirection("asc");
    }
  };

  const toggleRowExpansion = (rowIndex) => {
    const newExpanded = new Set(expandedRows);
    newExpanded.has(rowIndex) ? newExpanded.delete(rowIndex) : newExpanded.add(rowIndex);
    setExpandedRows(newExpanded);
  };

  const sortedData = [...filteredData];
  if (sortColumn) {
    sortedData.sort((a, b) => {
      const va = a[sortColumn];
      const vb = b[sortColumn];
      if (typeof va === "string") {
        return sortDirection === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return sortDirection === "asc" ? va - vb : vb - va;
    });
  }

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getPaginationRange = () => {
    const range = [];
    const showPages = isMobile ? 3 : 5;
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

  const primaryColumns = columns.filter((col) => col.priority === "high" || col.primary);
  const secondaryColumns = columns.filter((col) => !col.primary && col.priority !== "high");
  const visibleColumns = isMobile
    ? primaryColumns.length > 0
      ? primaryColumns.slice(0, 2)
      : columns.slice(0, 2)
    : columns;

  const renderMobileCard = (row, index) => (
    <div key={row.id || index} className="bg-white rounded-xl shadow-sm border border-slate-200 mb-3 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            {visibleColumns.slice(0, 2).map((col, idx) => (
              <div key={col.key} className={idx === 0 ? "mb-1" : ""}>
                {idx === 0 ? (
                  <div className="font-semibold text-slate-900 text-base truncate">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </div>
                ) : (
                  <div className="text-sm text-slate-600 truncate">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-3">
            {secondaryColumns.length > 0 && (
              <button
                onClick={() => toggleRowExpansion(index)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <Eye size={16} />
              </button>
            )}
            {onRowClick && (
              <button
                onClick={() => onRowClick(row)}
                className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {expandedRows.has(index) && secondaryColumns.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-200">
            <div className="grid grid-cols-1 gap-2 text-sm">
              {secondaryColumns.map((col) => (
                <div key={col.key} className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">{col.title}:</span>
                  <span className="text-slate-700 text-right">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto py-4 sm:py-6 lg:py-10 px-3 sm:px-4 lg:px-6">
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4 lg:gap-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 flex items-center gap-2 lg:gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
              <Users size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <span className="truncate">{title}</span>
          </h2>
          {/* 🔧 Botões mais discretos */}
          <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                <Search size={14} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="pl-8 pr-7 py-1.5 w-full sm:w-52 bg-slate-100 border border-slate-200 rounded-md text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 focus:bg-white transition"
              />
              {filterText && (
                <button
                  onClick={() => setFilterText("")}
                  className="absolute inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>
            <button
              onClick={() => onAddClick && onAddClick()}
              className="relative flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:scale-95 transform transition-all duration-200 ease-in-out group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <Plus size={16} className="text-white relative z-10 group-hover:rotate-90 transition-transform duration-200" />
              <span className="hidden sm:inline relative z-10">Adicionar</span>
              <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-75"></div>
            </button>
          </div>
        </div>
        {children && <div className="mt-4 lg:mt-6">{children}</div>}
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-12 lg:p-16 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-slate-500">Carregando...</span>
          </div>
        </div>
      ) : paginatedData.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-12 lg:p-16 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-slate-100 rounded-full">
              <Search size={24} className="text-slate-400" />
            </div>
            <span className="text-slate-500 font-medium">{emptyText}</span>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile Cards View */}
          {isMobile ? (
            <div className="space-y-3">
              {paginatedData.map((row, index) => renderMobileCard(row, index))}
            </div>
          ) : (
            /* Desktop Table View */
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-slate-700">
                  {showHeader && (
                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                      <tr>
                        {columns.map((col) => (
                          <th
                            key={col.key}
                            onClick={() => col.sortable !== false && handleSort(col)}
                            className={`px-3 sm:px-4 lg:px-6 py-4 lg:py-5 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap ${col.sortable !== false
                              ? "cursor-pointer hover:bg-slate-200/50 transition-colors duration-200"
                              : ""
                              }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-slate-700">{col.title}</span>
                              {col.sortable !== false && (
                                <div className="flex flex-col">
                                  {sortColumn === col.key ? (
                                    sortDirection === "asc" ? (
                                      <ArrowUp size={14} className="text-blue-600" />
                                    ) : (
                                      <ArrowDown size={14} className="text-blue-600" />
                                    )
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
                    {paginatedData.map((row, i) => (
                      <Fragment key={row.id || i}>
                        <tr
                          className={`hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-slate-50/50 transition-all duration-200 ${onRowClick ? "cursor-pointer" : ""
                            } group`}
                          onClick={() => onRowClick?.(row)}
                        >
                          {columns.map((col) => (
                            <td
                              key={col.key}
                              className="px-3 sm:px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap group-hover:text-slate-800 transition-colors"
                            >
                              {col.render ? col.render(row[col.key], row) : row[col.key]}
                            </td>
                          ))}
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          {/* Results Info */}
          <div className="text-sm text-slate-600">
            <span className="font-medium">Mostrar</span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="ml-2 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {[5, 10, 15, 20, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>{" "}
            de <span className="text-blue-600 font-bold">{filteredData.length}</span> resultados
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-full text-sm ${currentPage === 1
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
            >
              ‹
            </button>

            {getPaginationRange().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${currentPage === pageNum
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "text-slate-600 hover:text-blue-600 hover:bg-blue-100"
                  }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-full text-sm ${currentPage === totalPages
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>

  );
}
