import { RECLAMOS } from "@/lib/data";
import { Topbar } from "@/components/layout/Topbar";
import { ReclamoHeader } from "@/components/reclamos/ReclamoHeader";
import { IaAnalysis } from "@/components/reclamos/IaAnalysis";
import { Timeline } from "@/components/reclamos/Timeline";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Explicitly define the props type
interface ReclamoDetailPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ReclamoDetailPage({ params }: ReclamoDetailPageProps) {
  const reclamo = RECLAMOS.find((r) => r.id === params.id);

  if (!reclamo) {
    notFound();
  }

  return (
    <>
      <Topbar
        title={reclamo.id}
        breadcrumbs={[
            { label: "Customer Recovery", href: "/reclamos" },
        ]}
      />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-5xl">
            <Link href="/reclamos" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
                <ArrowLeft className="h-4 w-4" />
                Volver al listado
            </Link>
            
            <div className="space-y-6">
                <ReclamoHeader reclamo={reclamo} />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="space-y-6">
                        <div className="rounded-xl2 border border-line bg-surface p-6 shadow-card">
                            <h2 className="mb-2 text-lg font-semibold text-ink">Detalle del Reclamo</h2>
                            <p className="text-sm text-ink/90">{reclamo.detalle}</p>
                            <p className="mt-2 text-xs text-muted">
                                Origen: {reclamo.origen} · Satisfacción declarada: {reclamo.satisfaccion}/5
                            </p>
                        </div>
                        <Timeline timeline={reclamo.timeline} />
                    </div>
                    <div className="space-y-6">
                        <IaAnalysis analysis={reclamo.ia} />
                        <div className="rounded-xl2 border border-line bg-surface p-6 shadow-card">
                            <h2 className="mb-4 text-lg font-semibold text-ink">Acciones</h2>
                             <button className="w-full rounded-lg bg-lorenzo py-2.5 text-sm font-semibold text-white hover:bg-lorenzo-light">
                                Contactar al cliente
                            </button>
                            <button className="mt-2 w-full rounded-lg border border-line bg-canvas py-2.5 text-sm font-semibold text-ink hover:bg-line">
                                Crear Plan de Acción
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </>
  );
}
