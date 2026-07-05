"use client";

import type { IaAnalysis } from "@/lib/types";
import { Sparkles } from "lucide-react";

export function IaAnalysis({ analysis }: { analysis: IaAnalysis }) {

  return (
    <div className="rounded-xl2 border border-lorenzo/20 bg-lorenzo/5 p-6 shadow-card">
        <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-lorenzo">
            <Sparkles className="h-5 w-5" />
            Análisis del Copiloto IA
        </div>
        
        <div className="space-y-4">
            <div>
                <h3 className="font-semibold text-ink">Resumen del caso</h3>
                <p className="mt-1 text-sm text-ink/90">{analysis.resumen}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-surface p-4">
                    <p className="text-sm text-muted">Sentimiento</p>
                    <p className="mt-1 text-lg font-bold text-ink">{analysis.sentimiento}</p>
                </div>
                <div className="rounded-lg bg-surface p-4">
                    <p className="text-sm text-muted">Prob. de abandono</p>
                    <p className="mt-1 text-lg font-bold text-ink">{analysis.probabilidadAbandono}%</p>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-ink">Acción sugerida</h3>
                <p className="mt-1 text-sm text-ink/90">{analysis.accionSugerida}</p>
                <p className="mt-2 text-xs text-muted">Tiempo de respuesta recomendado: {analysis.tiempoRecomendado}</p>
            </div>
        </div>
    </div>
  );
}
