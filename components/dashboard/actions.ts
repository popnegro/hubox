"use server";

import { z } from "zod";

const AnalysisSchema = z.object({
  resumen: z.string(),
  sentimiento: z.string(),
  causaRaiz: z.string(),
  sugerencia: z.string(),
});

type Analysis = z.infer<typeof AnalysisSchema>;
 
 // Llama a un modelo local a través de la API de Ollama
 async function getAIAnalysis(claimText: string): Promise<Analysis> {
   console.log("Llamando a la API de Ollama para analizar:", claimText);
 
   const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434/api/chat";
   const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";
 
   const systemPrompt = `Eres un experto en Experiencia de Cliente (CX) para un concesionario de autos. Analiza el siguiente reclamo de un cliente.
 Devuelve tu análisis en un objeto JSON con la siguiente estructura: { "resumen": "...", "sentimiento": "...", "causaRaiz": "...", "sugerencia": "..." }
 - resumen: Un resumen conciso del problema del cliente.
 - sentimiento: El sentimiento del cliente (Positivo, Negativo, Neutral).
 - causaRaiz: La causa raíz más probable del problema.
 - sugerencia: La siguiente acción concreta y clara que debería tomar el equipo.`;
 
   try {
     const response = await fetch(OLLAMA_URL, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         model: OLLAMA_MODEL,
         messages: [
           { role: "system", content: systemPrompt },
           { role: "user", content: `Analiza el siguiente reclamo: "${claimText}"` },
         ],
         format: "json", // Le pedimos a Ollama que garantice una salida JSON
         stream: false,
       }),
     });
 
     if (!response.ok) {
       throw new Error(`Error en la API de Ollama: ${response.statusText}`);
     }
 
     const data = await response.json();
     const content = JSON.parse(data.message.content);
     // Validamos la respuesta de la IA contra nuestro esquema
     return AnalysisSchema.parse(content);
   } catch (error) {
     console.error("No se pudo conectar con Ollama:", error);
     throw new Error("El servicio de IA no está disponible. Verifica que Ollama esté en ejecución.");
   }
 }

const schema = z.object({
  claimText: z.string().min(10, "El texto del reclamo es muy corto."),
});

export async function analizarReclamoAction(claimText: string) {
  const validatedFields = schema.safeParse({ claimText });

  if (!validatedFields.success) {
    return { error: "Texto de reclamo inválido." };
  }

  try {
    const analysis = await getAIAnalysis(validatedFields.data.claimText);
    return { data: analysis };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "No se pudo obtener el análisis de la IA.";
    return { error: errorMessage };
  }
}