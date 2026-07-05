"use client";

import { useState, useEffect } from "react";
import type { Reclamo, IaAnalysis } from "@/lib/types";
import { Badge, riesgoTone, prioridadTone, estadoTone } from "@/components/ui/Badge";
import { formatDate, formatDateTime } from "@/lib/utils";
import { X, Sparkles, Clock, MapPin, Car } from "lucide-react";

export function ReclamoDetailPanel({
  reclamo,
  onClose,
}: {
  reclamo: Reclamo | null;
  onClose: () => void;
}) {
  const open = reclamo !== null;
  const [iaAnalysis, setIaAnalysis] = useState<IaAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (reclamo) {
      const fetchIaAnalysis = async () => {
        setIsLoading(true);
        setError(null);
        setIaAnalysis(null);

        try {
          const response = await fetch("/api/copilot", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              detalle: reclamo.detalle,
              prioridad: reclamo.prioridad,
              riesgo: reclamo.riesgo,
            }),
          });

          if (!response.ok) {
            throw new Error("Error al obtener el análisis de la IA.");
          }

          const data: IaAnalysis = await response.json();
          setIaAnalysis(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Ocurrió un error inesperado.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchIaAnalysis();
    }
  }, [reclamo]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-ink/30 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform overflow-y-auto bg-surface shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {reclamo && (
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between border-b border-line px-6 py-5">
              <div>
                <p className="text-xs font-medium text-muted">{reclamo.id}</p>
                <h2 className="mt-1 text-lg font-semibold text-ink">{reclamo.cliente}</h2>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge tone={prioridadTone(reclamo.prioridad)}>Prioridad {reclamo.prioridad}</Badge>
                  <Badge tone={riesgoTone(reclamo.riesgo)}>Riesgo {reclamo.riesgo}</Badge>
                  <Badge tone={estadoTone(reclamo.estado)}>{reclamo.estado}</Badge>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted hover:bg-canvas"
                aria-label="Cerrar panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 px-6 py-5">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-ink/80">
                  <Car className="h-4 w-4 text-muted" />
                  {reclamo.vehiculo} · {reclamo.patente}
                </div>
                <div className="flex items-center gap-2 text-ink/80">
                  <MapPin className="h-4 w-4 text-muted" />
                  {reclamo.sucursal}
                </div>
                <div className="flex items-center gap-2 text-ink/80">
                  <Clock className="h-4 w-4 text-muted" />
                  {formatDate(reclamo.fecha)}
                </div>
                <div className="text-ink/80">Responsable: {reclamo.responsable}</div>
              </div>

              <div>
                <p className="text-sm text-ink/90">{reclamo.detalle}</p>
                <p className="mt-1 text-xs text-muted">
                  Origen: {reclamo.origen} · Satisfacción declarada: {reclamo.satisfaccion}/5
                </p>
              </div>

              {/* Bloque IA */}
              <div className="min-h-[200px] rounded-xl2 border border-lorenzo/20 bg-lorenzo/5 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-lorenzo">
                  <Sparkles className={`h-4 w-4 ${isLoading ? "animate-pulse" : ""}`} />
                  {isLoading ? "Analizando con IA..." : "Análisis del Copiloto IA"}
                </div>

                {isLoading && (
                  <IaCopilotSkeleton />
                )}

                {error && (
                  <div className="flex h-40 items-center justify-center rounded-lg bg-red-500/10 text-center">
                    <p className="text-sm text-red-700">Error del Copiloto: {error}</p>
                  </div>
                )}

                {iaAnalysis && !isLoading && (
                  <>
                    <p className="text-sm text-ink/90">{iaAnalysis.resumen}</p>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-lg bg-surface px-3 py-2">
                        <p className="text-muted">Sentimiento</p>
                        <p className="font-medium text-ink">{iaAnalysis.sentimiento}</p>
                      </div>
                      <div className="rounded-lg bg-surface px-3 py-2">
                        <p className="text-muted">Prob. de abandono</p>
                        <p className="font-medium text-ink">{iaAnalysis.probabilidadAbandono}%</p>
                      </div>
                    </div>
                    <div className="mt-3 rounded-lg bg-surface px-3 py-2 text-xs">
                      <p className="text-muted">Acción sugerida</p>
                      <p className="mt-0.5 font-medium text-ink">{iaAnalysis.accionSugerida}</p>
                      <p className="mt-1 text-muted">Tiempo recomendado de respuesta: {iaAnalysis.tiempoRecomendado}</p>
                    </div>
                  </>
                )}
              </div>

              {/* Timeline */}
              <div>
                <p className="mb-3 text-sm font-semibold text-ink">Timeline</p>
                <ol className="space-y-3 border-l border-line pl-4">
                  {reclamo.timeline.map((t, i) => (
                    <li key={i} className="relative text-sm">
                      <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-lorenzo" />
                      <p className="text-ink/90">{t.evento}</p>
                      <p className="text-xs text-muted">{formatDateTime(t.fecha)}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="border-t border-line px-6 py-4">
              <button className="w-full rounded-lg bg-lorenzo py-2.5 text-sm font-semibold text-white hover:bg-lorenzo-light">
                Contactar al cliente
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function IaCopilotSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="space-y-2">
        <div className="h-3 rounded bg-gray-200/80"></div>
        <div className="h-3 w-5/6 rounded bg-gray-200/80"></div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="h-14 rounded-lg bg-gray-200/80"></div>
        <div className="h-14 rounded-lg bg-gray-200/80"></div>
      </div>
      <div className="mt-3 h-20 rounded-lg bg-gray-200/80"></div>
    </div>
  );

}

export default ReclamoDetailPanel;
