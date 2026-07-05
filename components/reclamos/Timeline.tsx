import type { Reclamo } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

export function Timeline({ timeline }: { timeline: Reclamo['timeline'] }) {
  return (
    <div className="rounded-xl2 border border-line bg-surface p-6 shadow-card">
        <h2 className="mb-4 text-lg font-semibold text-ink">Timeline del caso</h2>
        <ol className="space-y-4 border-l-2 border-line pl-4">
            {timeline.map((t, i) => (
            <li key={i} className="relative">
                <span className="absolute -left-[9px] top-1.5 h-3 w-3 rounded-full bg-lorenzo ring-4 ring-surface" />
                <p className="font-medium text-ink">{t.evento}</p>
                <p className="text-xs text-muted">{formatDateTime(t.fecha)}</p>
            </li>
            ))}
        </ol>
    </div>
  );
}
