import type { KanbanTask } from "@/lib/types";
import { Badge, prioridadTone } from "@/components/ui/Badge";
import { Calendar, User, FileText, CheckCircle } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import Link from "next/link";

export function KanbanCard({ task }: { task: KanbanTask }) {
  const isDue = new Date(task.dueDate) < new Date();
  
  const sourceLink = task.sourceType === 'Reclamo' ? `/reclamos?id=${task.sourceId}` : `/auditorias/${task.sourceId}`;
  
  return (
    <div className="rounded-lg border border-line bg-surface p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-ink">{task.title}</h3>
        <Badge tone={prioridadTone(task.priority)}>{task.priority}</Badge>
      </div>
      <p className="mt-2 text-sm text-muted">{task.description}</p>
      
      <div className="mt-4 flex items-center justify-between text-xs text-muted">
        <div className={cn("flex items-center gap-1.5", isDue ? 'text-red-500 font-medium' : '')}>
          <Calendar className="h-3.5 w-3.5" />
          <span>Vence {formatDate(task.dueDate)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          <span>{task.owner}</span>
        </div>
      </div>
      
      <div className="mt-4 border-t border-line pt-3">
        <Link href={sourceLink} className="flex items-center gap-2 text-xs text-lorenzo-600 hover:underline">
          {task.sourceType === 'Reclamo' ? 
            <FileText className="h-3.5 w-3.5" /> : 
            <CheckCircle className="h-3.5 w-3.5" />
          }
          <span>Ver Origen: {task.sourceType} {task.sourceId}</span>
        </Link>
      </div>
    </div>
  );
}
