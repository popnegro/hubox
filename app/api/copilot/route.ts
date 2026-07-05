import { NextResponse } from 'next/server';
import OpenAI from 'openai';
// Cargamos la API Key desde las variables de entorno para mayor seguridad.
// En desarrollo, la tomará del archivo .env.local.
// En producción (Vercel), se configura en la sección "Environment Variables" del proyecto.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { detalle, prioridad, riesgo } = await request.json();

    if (!detalle || !prioridad || !riesgo) {
      return NextResponse.json(
        { error: 'Faltan los parámetros: detalle, prioridad, riesgo' },
        { status: 400 }
      );
    }

    const systemPrompt = `
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
      Responde únicamente con el objeto JSON, sin texto adicional.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // O el modelo que prefieras
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Detalle del reclamo: "${detalle}"` },
      ],
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error en la API del Copiloto:', error);
    let errorMessage = 'Error desconocido';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { error: 'No se pudo contactar a la IA', details: errorMessage },
      { status: 500 }
    );
  }
}