export type Prioridad = "Alta" | "Media" | "Baja";
export type Riesgo = "Crítico" | "Moderado" | "Bajo";
export type Estado = "Nuevo" | "En curso" | "Esperando cliente" | "Resuelto";
export type Origen =
  | "WhatsApp"
  | "Google Reviews"
  | "Email"
  | "Encuesta NPS"
  | "Llamada"
  | "Presencial";

export interface IaAnalysis {
  resumen: string;
  sentimiento: "Negativo" | "Mixto" | "Neutro" | "Positivo";
  probabilidadAbandono: number; // 0-100
  accionSugerida: string;
  tiempoRecomendado: string;
}

export interface Reclamo {
  id: string;
  cliente: string;
  vehiculo: string;
  patente: string;
  sucursal: string;
  area: string;
  estado: Estado;
  responsable: string;
  fecha: string; // ISO
  prioridad: Prioridad;
  riesgo: Riesgo;
  origen: Origen;
  ultimaInteraccion: string; // ISO
  satisfaccion: number; // 1-5
  detalle: string;
  ia: IaAnalysis;
  timeline: { fecha: string; evento: string }[];
}

export interface SucursalKpi {
  sucursal: string;
  nps: number;
  reclamos: number;
  tiempoPromedioHoras: number;
  recuperados: number;
}

export interface TrendPoint {
  mes: string;
  nps: number;
  csat: number;
}

export interface ChecklistItem {
  id: number;
  pregunta: string;
  respuesta: "si" | "no" | "na";
  observaciones: string;
}

export interface Auditoria {
  id: string;
  fecha: string; // ISO
  auditor: string;
  sucursal: string;
  checklist: ChecklistItem[];
  puntaje: number;
}

export type KanbanStatus = "Por hacer" | "En progreso" | "Hecho";

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  status: KanbanStatus;
  dueDate: string; // ISO
  owner: string;
  sourceId: string; // ID of Reclamo or Auditoria
  sourceType: "Reclamo" | "Auditoría";
  priority: "Alta" | "Media" | "Baja";
}
