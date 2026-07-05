import type { KanbanTask, KanbanStatus } from "@/lib/types";
import { KanbanCard } from "./KanbanCard";

interface KanbanColumnProps {
  title: KanbanStatus;
  tasks: KanbanTask[];
}

const statusColors: Record<KanbanStatus, string> = {
  "Por hacer": "bg-gray-400",
  "En progreso": "bg-blue-500",
  "Hecho": "bg-emerald-500",
};

export function KanbanColumn({ title, tasks }: KanbanColumnProps) {
  return (
    <div className="flex flex-col w-80 flex-shrink-0">
      <div className="flex items-center gap-2 mb-4 px-2">
        <span className={`h-2.5 w-2.5 rounded-full ${statusColors[title]}`} />
        <h2 className="font-semibold text-ink">{title}</h2>
        <span className="text-sm font-medium text-muted">{tasks.length}</span>
      </div>
      <div className="flex h-full flex-col gap-4 overflow-y-auto rounded-lg bg-canvas p-2">
        {tasks.map((task) => (
          <KanbanCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted">
            No hay tareas aquí.
          </div>
        )}
      </div>
    </div>
  );
}
