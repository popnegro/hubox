import { AUDITORIAS } from "@/lib/data";
import { Topbar } from "@/components/layout/Topbar";
import { AuditHeader } from "@/components/auditorias/AuditHeader";
import { Checklist } from "@/components/auditorias/Checklist";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return AUDITORIAS.map((audit) => ({
    id: audit.id,
  }));
}

export default async function AuditoriaDetailPage(
  props: {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }
) {
  const audit = AUDITORIAS.find((a) => a.id === props.params.id);

  if (!audit) {
    notFound();
  }

  return (
    <>
      <Topbar
        title={audit.id}
        breadcrumbs={[
            { label: "Auditorías", href: "/auditorias" },
        ]}
      />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
            <Link href="/auditorias" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
                <ArrowLeft className="h-4 w-4" />
                Volver al listado
            </Link>
            <div className="space-y-6">
                <AuditHeader audit={audit} />
                <Checklist items={audit.checklist} />
            </div>
        </div>
      </main>
    </>
  );
}
