"use client";

import { useMemo, useState, useEffect } from "react";
import type { Auditoria } from "@/lib/types";
import { Badge, puntajeTone } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Search, ArrowUp, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";

type SortDirection = "asc" | "desc";
type SortKey = keyof Auditoria | "";

export function AuditoriasTable({ auditorias }: { auditorias: Auditoria[] }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({
    key: "fecha",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const filteredAndSorted = useMemo(() => {
    let filteredAuditorias = auditorias.filter((a) => {
      const q = debouncedQuery.trim().toLowerCase();
      return (
        q === "" ||
        a.sucursal.toLowerCase().includes(q) ||
        a.auditor.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      );
    });

    if (sortConfig.key) {
      filteredAuditorias.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredAuditorias;
  }, [auditorias, debouncedQuery, sortConfig]);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const paginatedData = filteredAndSorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="ml-1 h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 h-3 w-3" />
    );
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 sm:w-72">
          <Search className="h-4 w-4 text-muted" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Buscar por ID, sucursal o auditor..."
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl2 border border-line bg-surface shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-canvas text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-medium">
                  <button onClick={() => requestSort("id")} className="flex items-center">
                    ID {getSortIcon("id")}
                  </button>
                </th>
                <th className="px-4 py-3 font-medium">
                  <button onClick={() => requestSort("sucursal")} className="flex items-center">
                    Sucursal {getSortIcon("sucursal")}
                  </button>
                </th>
                <th className="px-4 py-3 font-medium">
                  <button onClick={() => requestSort("auditor")} className="flex items-center">
                    Auditor {getSortIcon("auditor")}
                  </button>
                </th>
                <th className="px-4 py-3 font-medium">
                  <button onClick={() => requestSort("fecha")} className="flex items-center">
                    Fecha {getSortIcon("fecha")}
                  </button>
                </th>
                <th className="px-4 py-3 font-medium text-right">
                  <button onClick={() => requestSort("puntaje")} className="flex items-center justify-end w-full">
                    Puntaje {getSortIcon("puntaje")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => router.push(`/auditorias/${a.id}`)}
                  className="cursor-pointer border-b border-line last:border-0 hover:bg-canvas"
                >
                  <td className="px-4 py-3 font-medium text-ink">{a.id}</td>
                  <td className="px-4 py-3 text-ink/80">{a.sucursal}</td>
                  <td className="px-4 py-3 text-ink/80">{a.auditor}</td>
                  <td className="px-4 py-3 text-ink/70">{formatDate(a.fecha)}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge tone={puntajeTone(a.puntaje)}>{a.puntaje}%</Badge>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted">
                    No se encontraron auditorías con ese criterio.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-muted">
          Mostrando {paginatedData.length} de {filteredAndSorted.length} auditorías
        </p>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
