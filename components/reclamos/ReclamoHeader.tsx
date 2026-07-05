import type { Reclamo } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Badge, prioridadTone, riesgoTone, estadoTone } from "@/components/ui/Badge";
import { User, Car, MapPin, Clock } from "lucide-react";

export function ReclamoHeader({ reclamo }: { reclamo: Reclamo }) {
  return (
    <div className="rounded-xl2 border border-line bg-surface p-6 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{reclamo.id}</p>
          <h1 className="mt-1 text-xl font-bold text-ink">{reclamo.cliente}</h1>
        </div>
        <div className="flex flex-wrap gap-1.5">
            <Badge tone={prioridadTone(reclamo.prioridad)}>Prioridad {reclamo.prioridad}</Badge>
            <Badge tone={riesgoTone(reclamo.riesgo)}>Riesgo {reclamo.riesgo}</Badge>
            <Badge tone={estadoTone(reclamo.estado)}>{reclamo.estado}</Badge>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lorenzo-100">
            <Car className="h-5 w-5 text-lorenzo-600" />
          </div>
          <div>
            <div className="text-xs text-muted">Vehículo</div>
            <div className="font-medium text-ink">{reclamo.vehiculo} · {reclamo.patente}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lorenzo-100">
            <MapPin className="h-5 w-5 text-lorenzo-600" />
          </div>
          <div>
            <div className="text-xs text-muted">Sucursal</div>
            <div className="font-medium text-ink">{reclamo.sucursal}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lorenzo-100">
            <Clock className="h-5 w-5 text-lorenzo-600" />
          </div>
          <div>
            <div className="text-xs text-muted">Fecha</div>
            <div className="font-medium text-ink">{formatDate(reclamo.fecha)}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lorenzo-100">
            <User className="h-5 w-5 text-lorenzo-600" />
          </div>
          <div>
            <div className="text-xs text-muted">Responsable</div>
            <div className="font-medium text-ink">{reclamo.responsable}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
