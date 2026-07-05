import { KANBAN_TASKS } from "@/lib/data";
import { Topbar } from "@/components/layout/Topbar";
import { KanbanColumn } from "@/components/action-center/KanbanColumn";
import type { KanbanStatus } from "@/lib/types";

export default function ActionCenterPage() {
  const tasks = KANBAN_TASKS;
  const statuses: KanbanStatus[] = ["Por hacer", "En progreso", "Hecho"];

  return (
    <>
      <Topbar
        title="Action Center"
        subtitle="Kanban de planes de acción generados por IA"
      />
      <main className="flex-1 overflow-x-auto p-6">
        <div className="flex h-full min-w-max gap-6">
          {statuses.map((status) => (
            <KanbanColumn
              key={status}
              title={status}
              tasks={tasks.filter((t) => t.status === status)}
            />
          ))}
        </div>
      </main>
    </>
  );
}
