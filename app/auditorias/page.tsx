import { AUDITORIAS } from "@/lib/data";
import { Topbar } from "@/components/layout/Topbar";
import { AuditoriasTable } from "@/components/auditorias/AuditoriasTable";

export default function AuditoriasPage() {
  const auditorias = AUDITORIAS;

  return (
    <>
      <Topbar
        title="Auditorías de Calidad"
        subtitle="Checklist digital y score automático de performance"
      />
      <main className="flex-1 p-6">
        <AuditoriasTable auditorias={auditorias} />
      </main>
    </>
  );
}
