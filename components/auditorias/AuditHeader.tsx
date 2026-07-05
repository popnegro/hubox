import type { Auditoria } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Badge, puntajeTone } from "@/components/ui/Badge";
import { Building, Calendar, User, Star } from "lucide-react";

export function AuditHeader({ audit }: { audit: Auditoria }) {
  return (
    <div className="rounded-xl2 border border-line bg-surface p-6 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Auditoría #{audit.id}</h1>
          <p className="mt-1 text-sm text-muted">
            Detalles de la auditoría de calidad.
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-lg bg-canvas px-4 py-2">
            <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="font-semibold text-ink">{audit.puntaje}%</span>
            </div>
            <Badge tone={puntajeTone(audit.puntaje)}>
                {audit.puntaje > 80 ? "Excelente" : audit.puntaje > 50 ? "Aceptable" : "Deficiente"}
            </Badge>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lorenzo-100">
            <Building className="h-5 w-5 text-lorenzo-600" />
          </div>
          <div>
            <div className="text-xs text-muted">Sucursal</div>
            <div className="font-medium text-ink">{audit.sucursal}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lorenzo-100">
            <User className="h-5 w-5 text-lorenzo-600" />
          </div>
          <div>
            <div className="text-xs text-muted">Auditor</div>
            <div className="font-medium text-ink">{audit.auditor}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lorenzo-100">
            <Calendar className="h-5 w-5 text-lorenzo-600" />
          </div>
          <div>
            <div className="text-xs text-muted">Fecha</div>
            <div className="font-medium text-ink">{formatDate(audit.fecha)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
