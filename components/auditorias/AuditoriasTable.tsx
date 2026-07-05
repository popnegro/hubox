"use client";

import { useMemo, useState } from "react";
import type { Auditoria } from "@/lib/types";
import { Badge, puntajeTone } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function AuditoriasTable({ auditorias }: { auditorias: Auditoria[] }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filtered = useMemo(() => {
    return auditorias.filter((a) => {
      return (
        query.trim() === "" ||
        a.sucursal.toLowerCase().includes(query.toLowerCase()) ||
        a.auditor.toLowerCase().includes(query.toLowerCase()) ||
        a.id.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [auditorias, query]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 sm:w-72">
          <Search className="h-4 w-4 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Sucursal</th>
                <th className="px-4 py-3 font-medium">Auditor</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium text-right">Puntaje</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
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
              {filtered.length === 0 && (
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

      <p className="mt-3 text-xs text-muted">
        Mostrando {filtered.length} de {auditorias.length} auditorías
      </p>
    </div>
  );
}
