"use client";

import { useState } from "react";
import { Wand2, Loader2, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { analizarReclamoAction, type Analysis } from "@/components/reclamos/actions";

interface CopilotoIAProps {
  claimText: string;
}

export function CopilotoIA({ claimText }: CopilotoIAProps) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const result = await analizarReclamoAction(claimText);

    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setAnalysis(result.data);
    }

    setIsLoading(false);
  };

  return (
    <Card className="bg-lorenzo-50 border-lorenzo-200 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Wand2 className="h-6 w-6 text-lorenzo-500" />
          <h3 className="text-lg font-bold text-lorenzo-800">Copiloto IA</h3>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-lg bg-lorenzo px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-lorenzo/90 disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analizando...
            </>
          ) : "Analizar Reclamo"}
        </button>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-md border border-signal-critical/50 bg-signal-critical/10 p-3 text-sm text-signal-critical">
          <AlertTriangle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {analysis && (
        <div className="mt-4 space-y-4 text-sm text-lorenzo-900">
          <div>
            <h4 className="font-semibold">Resumen del caso:</h4>
            <p>{analysis.resumen}</p>
          </div>
          <div>
            <h4 className="font-semibold">Siguiente acción recomendada:</h4>
            <p>{analysis.sugerencia}</p>
          </div>
        </div>
      )}
    </Card>
  );
}