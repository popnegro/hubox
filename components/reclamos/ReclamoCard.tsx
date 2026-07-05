import Link from "next/link";
import { Reclamo, Prioridad, Riesgo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

function getPriorityClass(priority: Prioridad) {
  switch (priority) {
    case "Alta":
      return "bg-red-100 text-red-800";
    case "Media":
      return "bg-yellow-100 text-yellow-800";
    case "Baja":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getRiskClass(risk: Riesgo) {
  switch (risk) {
    case "Crítico":
      return "border-red-500/50 bg-red-500/10 text-red-700";
    case "Moderado":
      return "border-yellow-500/50 bg-yellow-500/10 text-yellow-700";
    case "Bajo":
      return "border-green-500/50 bg-green-500/10 text-green-700";
    default:
      return "border-gray-500/50 bg-gray-500/10 text-gray-700";
  }
}

export function ReclamoCard({ reclamo }: { reclamo: Reclamo }) {
  return (
    <Link href={`/reclamos/${reclamo.id}`}>
      <div className="mb-4 rounded-lg border border-line bg-surface p-4 transition-all hover:shadow-md">
        <div className="flex items-start justify-between">
          <p className="text-sm font-semibold text-ink">{reclamo.id}</p>
          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                "text-xs font-medium",
                getPriorityClass(reclamo.prioridad)
              )}
            >
              {reclamo.prioridad}
            </Badge>
            <Badge
              className={cn(
                "border text-xs font-medium",
                getRiskClass(reclamo.riesgo)
              )}
            >
              {reclamo.riesgo}
            </Badge>
          </div>
        </div>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex">
            <p className="w-24 flex-shrink-0 text-muted">Cliente:</p>
            <p className="font-medium text-ink">{reclamo.cliente}</p>
          </div>
          <div className="flex">
            <p className="w-24 flex-shrink-0 text-muted">Sucursal:</p>
            <p className="font-medium text-ink">{reclamo.sucursal}</p>
          </div>
          <div className="flex">
            <p className="w-24 flex-shrink-0 text-muted">Fecha:</p>
            <p className="font-medium text-ink">
              {new Date(reclamo.fecha).toLocaleDateString("es-AR", {
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
