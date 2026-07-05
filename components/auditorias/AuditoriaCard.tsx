import Link from "next/link";
import { Auditoria } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AuditoriaCard({ auditoria }: { auditoria: Auditoria }) {
  const getPuntajeClass = (puntaje: number) => {
    if (puntaje < 70) return "text-red-600";
    if (puntaje < 90) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <Link href={`/auditorias/${auditoria.id}`}>
      <div className="mb-4 rounded-lg border border-line bg-surface p-4 transition-all hover:shadow-md">
        <div className="flex items-start justify-between">
          <p className="text-sm font-semibold text-ink">{auditoria.id}</p>
          <p
            className={cn(
              "text-lg font-bold",
              getPuntajeClass(auditoria.puntaje)
            )}
          >
            {auditoria.puntaje}%
          </p>
        </div>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex">
            <p className="w-24 flex-shrink-0 text-muted">Sucursal:</p>
            <p className="font-medium text-ink">{auditoria.sucursal}</p>
          </div>
          <div className="flex">
            <p className="w-24 flex-shrink-0 text-muted">Auditor:</p>
            <p className="font-medium text-ink">{auditoria.auditor}</p>
          </div>
          <div className="flex">
            <p className="w-24 flex-shrink-0 text-muted">Fecha:</p>
            <p className="font-medium text-ink">
              {new Date(auditoria.fecha).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
