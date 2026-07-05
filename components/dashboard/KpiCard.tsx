import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export function KpiCard({
  label,
  value,
  delta,
  deltaTone = "good",
  icon: Icon,
  href,
}: {
  label: string;
  value: string;
  delta?: React.ReactNode;
  deltaTone?: "good" | "critical";
  icon: LucideIcon;
  href?: string;
}) {
  const content = (
    <Card
      className={cn(
        "p-5",
        href && "transition-colors hover:bg-canvas"
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>
        <Icon className="h-4 w-4 text-muted" strokeWidth={2} />
      </div>
      <p className="mt-3 text-4xl font-bold tracking-tight text-ink">{value}</p>
      {delta && (
        <p
          className={cn(
            "mt-1 text-xs font-medium",
            deltaTone === "good" ? "text-signal-good" : "text-signal-critical"
          )}
        >
          {delta}
        </p>
      )}
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
