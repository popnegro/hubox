import { RECLAMOS } from "@/lib/data";
import { Topbar } from "@/components/layout/Topbar";
import { ReclamosTable } from "@/components/reclamos/ReclamosTable";

export default async function ReclamosPage() {
  const reclamos = RECLAMOS;

  return (
    <>
      <Topbar
        title="Customer Recovery"
        subtitle="Gestión de reclamos con priorización asistida por IA"
      />
      <main className="flex-1 p-6">
        <ReclamosTable reclamos={reclamos ?? []} />
      </main>
    </>
  );
}
