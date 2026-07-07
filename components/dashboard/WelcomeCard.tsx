"use client";

import { useState, useEffect } from "react";
import { X, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/Card";

const tips = [
  {
    title: "¡Filtra todo el dashboard!",
    description: "Haz clic en una sucursal en el gráfico de ranking para ver todos sus métricos.",
  },
  {
    title: "¡Analiza un reclamo en segundos!",
    description: "Ve a la sección de Reclamos y usa el Copiloto IA para entender cada caso al instante.",
  },
  {
    title: "¡Prioriza a tus clientes!",
    description: "El dashboard te muestra los clientes en riesgo crítico para que puedas actuar de inmediato.",
  },
  {
    title: "Ordena la tabla de reclamos",
    description: "Haz clic en los encabezados de la tabla de reclamos para ordenar por cualquier columna.",
  },
];

type Tip = typeof tips[number];

export function WelcomeCard() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);

  useEffect(() => {
    if (localStorage.getItem("welcomeCardPermanentlyDismissed") === "true") {
      return;
    }

    // Simplemente elige un consejo al azar de la lista
    const tipIndex = Math.floor(Math.random() * tips.length);
    const newTip = tips[tipIndex];

    // Opcional: si aún quieres evitar la repetición inmediata
    // const lastTipIndex = localStorage.getItem("welcomeCardLastTipIndex");
    // ... (lógica similar a la anterior pero sin sessionStorage)
    setSelectedTip(newTip);
    setIsVisible(true);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("welcomeCardPermanentlyDismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible || !selectedTip) {
    return null;
  }

  return (
    <Card className="relative border-lorenzo-200 bg-lorenzo-50 p-5">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Lightbulb className="h-6 w-6 text-lorenzo-500" />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-lorenzo-800">{selectedTip.title}</h3>
          <p className="mt-2 text-sm text-lorenzo-700">{selectedTip.description}</p>
          <button onClick={handleDismiss} className="mt-3 text-xs font-semibold text-lorenzo-600 hover:underline">Entendido, no volver a mostrar.</button>
        </div>
      </div>
    </Card>
  );
}