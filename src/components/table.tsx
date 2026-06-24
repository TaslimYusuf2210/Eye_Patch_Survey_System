import { useState, useMemo, useEffect } from "react";

export interface TableColumn {
  name: string;
  key: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface tableProps<T extends Record<string, any>> {
  columns: TableColumn[];
  data: T[];
  onView?: (data: T) => void;
  onEdit?: (data: T) => void;
  onDelete?: (id: number) => void;
  actions?: ("view" | "edit" | "delete")[];
  loading?: boolean;
  emptyMessage?: string | React.ReactNode;
  searchable?: boolean;
  sortable?: boolean;
  pageSize?: number;
  selectable?: boolean;
  selectedRowIds?: (string | number)[];
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  rowKey?: string;
  responsive?: boolean;
  totalItems?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

// ─────────────────────────────────────────────────────────
//  Pagination helper
// ─────────────────────────────────────────────────────────
function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("ellipsis");

  pages.push(total);
  return pages;
}

function Table<T extends Record<string, any>>({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  actions = ["view", "edit", "delete"],
  loading = false,
  emptyMessage = "No data available",
  searchable = false,
  sortable = false,
  pageSize = 10,
  selectable = false,
  selectedRowIds: controlledSelectedIds,
  onSelectionChange,
  rowKey = "id",
  responsive = false,
  totalItems,
  currentPage: controlledPage,
  onPageChange,
}: tableProps<T>) {
  // ── State ──
  const [actionOpen, setActionOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [internalPage, setInternalPage] = useState(1);
  const [internalSelectedIds, setInternalSelectedIds] = useState<(string | number)[]>([]);

  const selectedIds = controlledSelectedIds ?? internalSelectedIds;
  const currentPage = controlledPage ?? internalPage;
  const setCurrentPage = (page: number) => {
    if (controlledPage !== undefined) {
      onPageChange?.(page);
    } else {
      setInternalPage(page);
    }
  };

  // Reset internal page when filters change (only in uncontrolled mode)
  useEffect(() => {
    if (controlledPage === undefined) {
      setInternalPage(1);
    }
  }, [searchQuery, sortKey, sortDirection, controlledPage]);

  // ── Derived data ──
  const filteredData = useMemo(() => {
    let result = data;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(query)
        )
      );
    }

    if (sortKey) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortKey as keyof T];
        const bVal = b[sortKey as keyof T];
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchQuery, sortKey, sortDirection]);

  const itemCount = totalItems ?? filteredData.length;
  const totalPages = Math.max(1, Math.ceil(itemCount / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, safePage, pageSize]);

  const hasActions =
    actions.length > 0 && (Boolean(onView) || Boolean(onEdit) || Boolean(onDelete));

  // ── Helpers ──
  const getRowId = (row: T, index: number): string | number =>
    rowKey in row ? (row[rowKey] as string | number) : index;

  const isSelected = (row: T, index: number): boolean =>
    selectedIds.includes(getRowId(row, index));

  const toggleRow = (row: T, index: number) => {
    const id = getRowId(row, index);
    const next = selectedIds.includes(id)
      ? selectedIds.filter((sid) => sid !== id)
      : [...selectedIds, id];
    if (!controlledSelectedIds) setInternalSelectedIds(next);
    onSelectionChange?.(next);
  };

  const toggleAllPage = () => {
    const pageIds = paginatedData.map((row, idx) => getRowId(row, idx));
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    const next = allSelected
      ? selectedIds.filter((id) => !pageIds.includes(id))
      : [...new Set([...selectedIds, ...pageIds])];
    if (!controlledSelectedIds) setInternalSelectedIds(next);
    onSelectionChange?.(next);
  };

  const isAllPageSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row, idx) => isSelected(row, idx));

  const handleSort = (key: string) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleAction = (rowIndex: number) => {
    setActionOpen(true);
    setActiveRow(rowIndex);
  };

  // ── Render: empty state ──
  const renderEmptyState = (colSpan: number) => (
    <td
      colSpan={colSpan}
      className="px-6 py-16 text-center text-sm text-gray-500 dark:text-slate-400"
    >
      {typeof emptyMessage === "string" ? (
        <div className="flex flex-col items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300 dark:text-slate-600"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="12" y1="10" x2="12" y2="16" />
          </svg>
          <span>{emptyMessage}</span>
        </div>
      ) : (
        emptyMessage
      )}
    </td>
  );

  // ── Render: empty card state (responsive) ──
  const renderCardEmptyState = () => (
    <div className="flex flex-col items-center gap-2 py-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-300 dark:text-slate-600"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="12" y1="10" x2="12" y2="16" />
      </svg>
      <span className="text-sm text-gray-500 dark:text-slate-400">
        {typeof emptyMessage === "string" ? emptyMessage : "No data available"}
      </span>
    </div>
  );

  // ── Render: skeleton (used by both views) ──
  const renderSkeletonRows = () =>
    Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex gap-4 animate-pulse">
        {selectable && <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-4 shrink-0" />}
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-8 shrink-0" />
        {columns.map((col) => (
          <div key={col.key} className="h-4 bg-gray-200 dark:bg-slate-700 rounded flex-1" />
        ))}
        {hasActions && <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-16 shrink-0" />}
      </div>
    ));

  const renderSkeletonCards = () =>
    Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse bg-white dark:bg-slate-950 rounded-lg border border-gray-200 dark:border-slate-800 p-4 space-y-3"
      >
        {columns.map((col) => (
          <div key={col.key} className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
        ))}
      </div>
    ));

  // ── Render: pagination bar ──
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const startItem = (safePage - 1) * pageSize + 1;
    const endItem = Math.min(safePage * pageSize, filteredData.length);
    const pages = getPageNumbers(safePage, totalPages);

    const btnBase =
      "inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer";

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-200 dark:border-slate-800">
        <span className="text-sm text-gray-500 dark:text-slate-400">
          Showing {startItem}–{endItem} of {filteredData.length}
        </span>

        <div className="flex items-center gap-1">
          {/* Prev */}
          <button
            disabled={safePage === 1}
            onClick={() => setCurrentPage(safePage - 1)}
            className={`${btnBase} ${
              safePage === 1
                ? "text-gray-300 dark:text-slate-600 cursor-not-allowed"
                : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          {pages.map((p, i) =>
            p === "ellipsis" ? (
              <span key={`e${i}`} className="px-2 text-sm text-gray-400 dark:text-slate-500">
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`${btnBase} min-w-9 ${
                  p === safePage
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                {p}
              </button>
            )
          )}

          {/* Next */}
          <button
            disabled={safePage === totalPages}
            onClick={() => setCurrentPage(safePage + 1)}
            className={`${btnBase} ${
              safePage === totalPages
                ? "text-gray-300 dark:text-slate-600 cursor-not-allowed"
                : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>
    );
  };

  // ── Render: action dropdown ──
  const renderActionDropdown = (row: T, rowIndex: number) => (
    <div className="relative inline-block">
      <button
        onClick={() => handleAction(rowIndex)}
        className="text-gray-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 5.92A.96.96 0 1 0 12 4a.96.96 0 0 0 0 1.92m0 7.04a.96.96 0 1 0 0-1.92a.96.96 0 0 0 0 1.92M12 20a.96.96 0 1 0 0-1.92a.96.96 0 0 0 0 1.92" />
        </svg>
      </button>

      {actionOpen && activeRow === rowIndex && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setActionOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 w-40 rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg py-1">
            {actions.includes("view") && onView && (
              <button
                onClick={() => { onView(row); setActionOpen(false); }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                View
              </button>
            )}
            {actions.includes("edit") && onEdit && (
              <button
                onClick={() => { onEdit(row); setActionOpen(false); }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                Edit
              </button>
            )}

            {actions.includes("delete") && onDelete && (actions.includes("view") || actions.includes("edit")) && (onView || onEdit) && (
              <div className="my-1 border-t border-gray-100 dark:border-slate-800" />
            )}

            {actions.includes("delete") && onDelete && (
              <button
                onClick={() => { onDelete(rowIndex); setActionOpen(false); }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                Delete
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );

  // ── Render: inline action buttons (for card view) ──
  const renderCardActions = (row: T, rowIndex: number) => (
    <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-slate-800">
      {actions.includes("view") && onView && (
        <button
          onClick={() => onView(row)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
          View
        </button>
      )}
      {actions.includes("edit") && onEdit && (
        <button
          onClick={() => onEdit(row)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400 rounded-md hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
          Edit
        </button>
      )}
      {actions.includes("delete") && onDelete && (
        <button
          onClick={() => onDelete(rowIndex)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
          Delete
        </button>
      )}
    </div>
  );

  // ── Table column count for colSpan ──
  const colSpan = (selectable ? 1 : 0) + 1 + columns.length + (hasActions ? 1 : 0);

  // ── Determine active view: table vs cards ──
  const showCards = responsive;

  // ═══════════════════════════════════════════════════════
  //  MAIN RENDER
  // ═══════════════════════════════════════════════════════
  return (
    <div className="w-full rounded-lg border border-gray-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950 overflow-hidden">
      {/* ── Search Bar ── */}
      {searchable && (
        <div className="p-4 border-b border-gray-200 dark:border-slate-800">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* ── Loading Skeleton (table) ── */}
      {loading && (
        <div className="p-6 space-y-4 hidden md:block">
          {renderSkeletonRows()}
        </div>
      )}

      {/* ── Loading Skeleton (cards) ── */}
      {loading && showCards && (
        <div className="p-4 space-y-4 block md:hidden">
          {renderSkeletonCards()}
        </div>
      )}

      {/* ── TABLE VIEW (md+) ── */}
      {!loading && (
        <div className={`w-full overflow-x-auto ${showCards ? "hidden md:block" : ""}`}>
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
              <tr>
                {/* Select-all checkbox */}
                {selectable && (
                  <th className="px-6 py-4 w-10">
                    <input
                      type="checkbox"
                      checked={isAllPageSelected}
                      onChange={toggleAllPage}
                      className="rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </th>
                )}
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-slate-200 uppercase tracking-wider">
                  S/N
                </th>
                {columns.map((header) => (
                  <th
                    key={header.key}
                    onClick={() => handleSort(header.key)}
                    className={`px-6 py-4 text-sm font-semibold text-gray-700 dark:text-slate-200 uppercase tracking-wider ${
                      sortable
                        ? "cursor-pointer hover:text-gray-900 dark:hover:text-white select-none"
                        : ""
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {header.name}
                      {sortable && sortKey === header.key && (
                        <span className="text-[10px] leading-none">
                          {sortDirection === "asc" ? "\u25B2" : "\u25BC"}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
                {hasActions && (
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-slate-200 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
              {paginatedData.length === 0 ? (
                <tr>{renderEmptyState(colSpan)}</tr>
              ) : (
                paginatedData.map((row, pageIdx) => {
                  const globalIdx = (safePage - 1) * pageSize + pageIdx;
                  return (
                    <tr
                      key={getRowId(row, globalIdx)}
                      className={`hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors ${
                        isSelected(row, globalIdx)
                          ? "bg-blue-50/50 dark:bg-blue-950/20"
                          : ""
                      }`}
                    >
                      {selectable && (
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={isSelected(row, globalIdx)}
                            onChange={() => toggleRow(row, globalIdx)}
                            className="rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                      )}
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                        {globalIdx + 1}
                      </td>
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300"
                        >
                          {col.render
                            ? col.render(row[col.key as keyof T], row)
                            : (row[col.key as keyof T] ?? "-")}
                        </td>
                      ))}
                      {hasActions && (
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {renderActionDropdown(row, pageIdx)}
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── CARD VIEW (mobile, <md) ── */}
      {showCards && !loading && (
        <div className="block md:hidden">
          {paginatedData.length === 0 ? (
            renderCardEmptyState()
          ) : (
            <div className="p-4 space-y-3">
              {paginatedData.map((row, pageIdx) => {
                const globalIdx = (safePage - 1) * pageSize + pageIdx;
                return (
                  <div
                    key={getRowId(row, globalIdx)}
                    className={`bg-white dark:bg-slate-950 rounded-lg border border-gray-200 dark:border-slate-800 p-4 space-y-2 ${
                      isSelected(row, globalIdx)
                        ? "ring-2 ring-blue-500/40"
                        : ""
                    }`}
                  >
                    {/* Card header: checkbox + row number */}
                    <div className="flex items-center justify-between">
                      {selectable && (
                        <input
                          type="checkbox"
                          checked={isSelected(row, globalIdx)}
                          onChange={() => toggleRow(row, globalIdx)}
                          className="rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      )}
                      <span className="text-xs font-medium text-gray-400 dark:text-slate-500">
                        #{globalIdx + 1}
                      </span>
                    </div>

                    {/* Card body: column values */}
                    {columns.map((col) => (
                      <div key={col.key} className="flex items-center justify-between gap-4">
                        <span className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
                          {col.name}
                        </span>
                        <span className="text-sm text-gray-700 dark:text-slate-200 text-right truncate">
                          {col.render
                            ? col.render(row[col.key as keyof T], row)
                            : (row[col.key as keyof T] ?? "-")}
                        </span>
                      </div>
                    ))}

                    {/* Card actions */}
                    {hasActions && renderCardActions(row, pageIdx)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Pagination ── */}
      {renderPagination()}
    </div>
  );
}

export default Table;
