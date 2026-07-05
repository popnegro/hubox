import { createClient } from "@supabase/supabase-js";
import type { Reclamo } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required.");
}

// Re-usamos los tipos que ya existen, pero los hacemos coincidir
// con lo que la API de Supabase espera. La tabla se llamará `reclamos`
// y la base de datos es `public` (el schema por defecto).
export const supabase = createClient<
  {
    public: {
      Tables: {
        reclamos: {
          Row: Reclamo; // El tipo de dato que se lee
          Insert: Omit<Reclamo, "id" | "timeline" | "ia"> & { ia: any; timeline: any }; // El tipo para insertar, ajustando JSON
          Update: Partial<Omit<Reclamo, "id" | "timeline" | "ia"> & { ia: any; timeline: any }>; // El tipo para actualizar
        };
      };
    };
  }
>(supabaseUrl, supabaseAnonKey);
