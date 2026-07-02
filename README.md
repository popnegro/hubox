# CX Recovery & Quality Hub — MVP

Portfolio demo para el rol **Responsable de Calidad y CX (Grupo Lorenzo, Mendoza)**.
Plataforma de gestión de calidad y experiencia del cliente para un grupo automotriz.

## Qué incluye esta v0.1 (recortado a propósito)

El brief original pedía 8 módulos + IA real + Supabase + auth + ~500 registros,
listo "para producción", en una sola sesión. Eso no es un MVP, es un producto de
varios meses. Para poder **cerrarlo y desplegarlo hoy**, se priorizaron los dos
módulos que más valor demuestran para el rol del flyer:

1. **Executive Dashboard** — NPS, CSAT, reclamos abiertos, tiempo promedio de
   resolución, tendencia de 6 meses, ranking de sucursales y top clientes en
   riesgo crítico.
2. **Customer Recovery** — tabla de reclamos con filtros (estado, búsqueda),
   y panel lateral de detalle con timeline + un bloque de "Copiloto IA" que
   resume el caso, estima sentimiento, probabilidad de abandono y sugiere
   una acción (lógica determinística mock, no llamadas a un LLM real).

Los demás módulos del brief (Voice of Customer, Journey Analytics, Auditorías,
Action Center, Comparador de sucursales, AI Copilot conversacional) quedan
visibles en el sidebar marcados como "pronto" — para mostrar la visión completa
del producto sin fingir que ya están construidos.

## Decisiones técnicas (por qué quedó liviano)

- **Next.js 15 + App Router + TypeScript**, 100% componentes de servidor donde
  fue posible. Sin Supabase, sin auth, sin API routes: los datos son mock
  generados de forma determinística en `lib/data.ts` (42 reclamos, 8
  sucursales, tendencia de 6 meses). Cero variables de entorno → deploy en
  Vercel sin configuración.
- **Tailwind CSS** con paleta y tipografía propias (azul "Lorenzo" tomado del
  flyer) en lugar de instalar shadcn/ui completo: los 2-3 primitivos que se
  necesitan (`Card`, `Badge`) están escritos a mano en ~80 líneas totales.
- **Recharts** para los 2 gráficos (tendencia + ranking de sucursales) y
  **lucide-react** para iconos — las únicas dos dependencias de UI, ambas
  livianas y ya pedidas en el brief original.
- Sin Framer Motion: el panel lateral usa transiciones CSS de Tailwind
  (`translate-x` + `transition-transform`), igual de fluido y sin la
  dependencia.
- Fuente del sistema (no Google Fonts) para que el build no dependa de red
  externa y cargue más rápido.
- Build verificado localmente: `npm run build` compila sin errores, todas las
  páginas son estáticas (`○ Static`), ~209 kB de First Load JS en la página
  más pesada (la del dashboard con los gráficos).

## Cómo correrlo localmente

```bash
npm install
npm run dev       # http://localhost:3000
```

## Cómo desplegar en Vercel

**Opción A — Sin terminal (recomendado):**
1. Subí esta carpeta a un repo de GitHub (puede ser privado).
2. Entrá a [vercel.com/new](https://vercel.com/new) y seleccioná el repo.
3. Vercel detecta Next.js automáticamente — no hace falta tocar ningún
   "Environment Variable" ni "Build Command". Click en **Deploy**.
4. Listo, queda con una URL `https://tu-proyecto.vercel.app`.

**Opción B — Con Vercel CLI:**
```bash
npm install -g vercel
vercel        # sigue el wizard, usa la carpeta actual
vercel --prod # despliega a producción
```

## Próximos pasos sugeridos (fuera del alcance de esta sesión)

1. Conectar el bloque "Copiloto IA" a la API real de Claude (ya hay un patrón
   de integración documentado para esto) en lugar de la lógica mock.
2. Persistencia real de datos con Supabase (tabla `reclamos`, RLS por
   sucursal/rol).
3. Módulo de Auditorías de Calidad (checklist digital + score automático).
4. Action Center (kanban de planes de acción).
5. Autenticación (Supabase Auth o NextAuth) y roles (Responsable de Calidad,
   Jefe de Sucursal, Gerencia).

## Estructura

```
app/
  layout.tsx            shell con sidebar
  page.tsx               Executive Dashboard
  reclamos/page.tsx       Customer Recovery
components/
  layout/                Sidebar, Topbar
  ui/                     Card, Badge (primitivos propios)
  dashboard/              KpiCard, TrendChart, SucursalChart
  reclamos/               ReclamosTable, ReclamoDetailPanel
lib/
  types.ts                tipos del dominio
  data.ts                 datos mock deterministicos
  utils.ts                helpers (cn, formatDate)
```
