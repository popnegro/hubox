"use client";

import { useMemo, useState, useEffect } from "react";
import type { Reclamo } from "@/lib/types";
import { Badge, riesgoTone, prioridadTone, estadoTone } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Search, ArrowUp, ArrowDown, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReclamoCard } from "./ReclamoCard";

type SortDirection = "asc" | "desc";
type SortKey = keyof Reclamo | "";

export function ReclamosTable({ reclamos }: { reclamos: Reclamo[] }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [estadoFiltro, setEstadoFiltro] = useState<string>("Todos");
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({
    key: "fecha",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const ITEMS_PER_PAGE = 10;
  const estados = ["Todos", "Nuevo", "En curso", "Esperando cliente", "Resuelto"];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const filteredAndSorted = useMemo(() => {
    let filteredReclamos = reclamos.filter((r) => {
      const q = debouncedQuery.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        r.cliente.toLowerCase().includes(q) ||
        r.patente.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q);
      const matchesEstado = estadoFiltro === "Todos" || r.estado === estadoFiltro;
      return matchesQuery && matchesEstado;
    });

    if (sortConfig.key) {
      filteredReclamos.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredReclamos;
  }, [reclamos, debouncedQuery, estadoFiltro, sortConfig]);

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
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="ml-1 h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 h-3 w-3" />
    );
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-grow items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 sm:w-72">
          <Search className="h-4 w-4 text-muted" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Buscar cliente, patente o ID…"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
        </div>
        
        <div className="relative sm:hidden">
          <button
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
          >
            <span>Filtrar por estado: {estadoFiltro}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isFilterMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          {isFilterMenuOpen && (
            <div className="absolute top-full right-0 z-10 mt-1 w-full rounded-lg border border-line bg-surface shadow-lg">
              {estados.map((e) => (
                <button
                  key={e}
                  onClick={() => {
                    setEstadoFiltro(e);
                    setCurrentPage(1);
                    setIsFilterMenuOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    estadoFiltro === e ? 'bg-lorenzo/10 text-lorenzo' : 'text-ink hover:bg-canvas'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden gap-1.5 overflow-x-auto sm:flex">
          {estados.map((e) => (
            <button
              key={e}
              onClick={() => {
                setEstadoFiltro(e);
                setCurrentPage(1);
              }}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                estadoFiltro === e
                  ? "bg-lorenzo text-white"
                  : "bg-canvas text-muted hover:bg-line"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>
      
      <div className="hidden lg:block">
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
                    <button onClick={() => requestSort("cliente")} className="flex items-center">
                      Cliente {getSortIcon("cliente")}
                    </button>
                  </th>
                  <th className="px-4 py-3 font-medium">
                    <button onClick={() => requestSort("sucursal")} className="flex items-center">
                      Sucursal {getSortIcon("sucursal")}
                    </button>
                  </th>
                  <th className="px-4 py-3 font-medium">
                    <button onClick={() => requestSort("prioridad")} className="flex items-center">
                      Prioridad {getSortIcon("prioridad")}
                    </button>
                  </th>
                  <th className="px-4 py-3 font-medium">
                    <button onClick={() => requestSort("riesgo")} className="flex items-center">
                      Riesgo {getSortIcon("riesgo")}
                    </button>
                  </th>
                  <th className="px-4 py-3 font-medium">
                    <button onClick={() => requestSort("estado")} className="flex items-center">
                      Estado {getSortIcon("estado")}
                    </button>
                  </th>
                  <th className="px-4 py-3 font-medium">
                    <button onClick={() => requestSort("fecha")} className="flex items-center">
                      Fecha {getSortIcon("fecha")}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => router.push(`/reclamos/${r.id}`)}
                    className="cursor-pointer border-b border-line last:border-0 hover:bg-canvas"
                  >
                    <td className="px-4 py-3 font-medium text-ink">{r.id}</td>
                    <td className="px-4 py-3 text-ink">
                      <div>{r.cliente}</div>
                      <div className="text-xs text-muted">{r.vehiculo} · {r.patente}</div>
                    </td>
                    <td className="px-4 py-3 text-ink/80">{r.sucursal}</td>
                    <td className="px-4 py-3">
                      <Badge tone={prioridadTone(r.prioridad)}>{r.prioridad}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={riesgoTone(r.riesgo)}>{r.riesgo}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={estadoTone(r.estado)}>{r.estado}</Badge>
                    </td>
                    <td className="px-4 py-3 text-ink/70">{formatDate(r.fecha)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="lg:hidden">
        {paginatedData.map((r) => (
          <ReclamoCard key={r.id} reclamo={r} />
        ))}
      </div>
      
      {(paginatedData.length === 0) && (
        <div className="w-full px-4 py-12 text-center text-sm text-muted rounded-xl2 border border-line bg-surface shadow-card lg:border-none lg:shadow-none lg:bg-transparent">
          No se encontraron reclamos con ese criterio.
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-muted">
          Mostrando {paginatedData.length} de {filteredAndSorted.length} reclamos
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
            disabled={currentPage === totalPages || totalPages === 0}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
