import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Reclamo } from "@/lib/types";

interface ReclamoCardProps {
  reclamo: Reclamo;
}

const priorityVariantMap: Record<Reclamo['prioridad'], "default" | "destructive" | "secondary" | "outline"> = {
  Crítica: "destructive",
  Alta: "default",
  Media: "secondary",
  Baja: "outline",
};

export function ReclamoCard({ reclamo }: ReclamoCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{reclamo.id}</CardTitle>
        <div className="flex items-center gap-2">
            <Badge variant={priorityVariantMap[reclamo.prioridad]}>{reclamo.prioridad}</Badge>
            <Badge variant="secondary">{reclamo.estado}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold">{reclamo.cliente.nombre}</div>
        <p className="text-xs text-muted-foreground">
          {reclamo.sucursal.nombre}
        </p>
        <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Fecha: {reclamo.fecha}</span>
        </div>
      </CardContent>
    </Card>
  );
}