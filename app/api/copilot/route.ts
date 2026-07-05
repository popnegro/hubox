import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Cargamos la API Key desde las variables de entorno.
// El usuario debe crear una API Key en Google AI Studio y agregarla
// al archivo .env.local como GOOGLE_API_KEY="tu_api_key"
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { detalle, prioridad, riesgo } = await request.json();

    if (!process.env.GOOGLE_API_KEY) {
        return NextResponse.json(
            { error: 'La API Key de Google no está configurada.' },
            { status: 500 }
        );
    }

    if (!detalle || !prioridad || !riesgo) {
      return NextResponse.json(
        { error: 'Faltan los parámetros: detalle, prioridad, riesgo' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Eres un asistente experto en Customer Experience para un concesionario de autos.
      Analiza el siguiente reclamo de un cliente y devuelve un objeto JSON con la siguiente estructura:
      {
        "resumen": "Un resumen conciso del caso en una sola frase.",
        "sentimiento": "El sentimiento del cliente (Positivo, Negativo, Mixto, Neutro).",
        "probabilidadAbandono": "Un número del 0 al 100 representando la probabilidad de que el cliente abandone la marca.",
        "accionSugerida": "Una acción concreta y breve para el equipo de postventa.",
        "tiempoRecomendado": "El tiempo de respuesta recomendado ('< 4 horas', '< 24 horas', '< 72 horas')."
      }

      El reclamo tiene una prioridad "${prioridad}" y un riesgo de abandono estimado como "${riesgo}".
      Usa esa información para guiar tu análisis y sugerencias.
      
      Detalle del reclamo: "${detalle}"

      Responde únicamente con el objeto JSON, sin texto adicional, ni markdown.
    `;
    
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
        safetySettings,
    });
    
    const response = result.response;
    const text = response.text();
    // Clean potential markdown ```json ... ```
    const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const analysis = JSON.parse(jsonText);

    return NextResponse.json(analysis);

  } catch (error) {
    console.error('Error en la API del Copiloto:', error);
    let errorMessage = 'Error desconocido';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { error: 'No se pudo contactar a la IA de Google', details: errorMessage },
      { status: 500 }
    );
  }
}
