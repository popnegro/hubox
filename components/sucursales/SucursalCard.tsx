import type { SucursalKpi } from "@/lib/types";
import { Building2, TrendingUp, AlertTriangle, Smile, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

function npsTone(nps: number) {
  if (nps < 50) return "critical";
  if (nps < 70) return "warning";
  return "good";
}

export function SucursalCard({ kpi }: { kpi: SucursalKpi }) {
  return (
    <div className="rounded-xl2 border border-line bg-surface p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-ink">{kpi.sucursal}</h3>
        <Building2 className="h-5 w-5 text-muted" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted">
            <TrendingUp className="h-4 w-4" />
            <span>NPS</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-ink">{kpi.nps}</span>
            <Badge tone={npsTone(kpi.nps)}>
              {kpi.nps > 70 ? "Bueno" : kpi.nps > 50 ? "Mejorable" : "Crítico"}
            </Badge>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted">
            <AlertTriangle className="h-4 w-4" />
            <span>Reclamos</span>
          </div>
          <span className="text-2xl font-bold text-ink">{kpi.reclamos}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Smile className="h-4 w-4" />
            <span>Recuperados</span>
          </div>
          <span className="text-2xl font-bold text-ink">{kpi.recuperados}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Clock className="h-4 w-4" />
            <span>Tpo. Promedio</span>
          </div>
          <span className="text-2xl font-bold text-ink">{kpi.tiempoPromedioHoras}hs</span>
        </div>
      </div>
    </div>
  );
}
