import { supabase } from "@/lib/supabase";
import { Topbar } from "@/components/layout/Topbar";
import { ReclamosTable } from "@/components/reclamos/ReclamosTable";

// Forzamos el renderizado dinámico para que los datos se recarguen
// en cada visita a la página.
export const revalidate = 0;

export default async function ReclamosPage() {
  // 1. Leemos los reclamos de Supabase
  const { data: reclamos, error } = await supabase
    .from("reclamos")
    .select("*")
    .order("fecha", { ascending: false });

  // Manejo básico de errores
  if (error) {
    console.error("Error fetching reclamos:", error);
    // Aquí podrías renderizar un estado de error
  }

  // 2. Pasamos los datos a la tabla, que es un Client Component.
  // Si no hay datos, pasamos un array vacío.
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
