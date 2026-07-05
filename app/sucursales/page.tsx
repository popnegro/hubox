import { SUCURSAL_KPIS } from "@/lib/data";
import { Topbar } from "@/components/layout/Topbar";
import { SucursalCard } from "@/components/sucursales/SucursalCard";

export default function SucursalesPage() {
  const kpis = SUCURSAL_KPIS;

  return (
    <>
      <Topbar
        title="Sucursales"
        subtitle="Vista comparativa de performance por sucursal"
      />
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <SucursalCard key={kpi.sucursal} kpi={kpi} />
          ))}
        </div>
      </main>
    </>
  );
}
