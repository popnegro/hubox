import type { ChecklistItem } from "@/lib/types";
import { Check, X, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

const AnswerIcon = ({ answer }: { answer: "si" | "no" | "na" }) => {
  if (answer === "si") {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-signal-good/10">
        <Check className="h-4 w-4 text-signal-good" />
      </div>
    );
  }
  if (answer === "no") {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-signal-critical/10">
        <X className="h-4 w-4 text-signal-critical" />
      </div>
    );
  }
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
      <Minus className="h-4 w-4 text-gray-500" />
    </div>
  );
};

export function Checklist({ items }: { items: ChecklistItem[] }) {
  return (
    <div className="overflow-hidden rounded-xl2 border border-line bg-surface shadow-card">
      <h2 className="border-b border-line px-6 py-4 text-lg font-semibold text-ink">
        Checklist de Auditoría
      </h2>
      <ul className="divide-y divide-line">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "p-6",
              item.respuesta === "no" && "bg-signal-critical/5"
            )}
          >
            <div className="flex items-start gap-4">
              <AnswerIcon answer={item.respuesta} />
              <div className="flex-1">
                <p className="font-medium text-ink">{item.pregunta}</p>
                {item.observaciones && (
                  <p className="mt-2 text-sm text-muted">{item.observaciones}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
