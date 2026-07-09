import React, { useState } from 'react';
import { Franchise, ChecklistItem, TicketItem, DocumentItem } from '../types';
import { ArrowLeft, User, Phone, Mail, Award, Calendar, DollarSign, CheckCircle2, Circle, Clock, FileText, AlertTriangle, Plus, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface FranchiseProfileProps {
  franchise: Franchise;
  onBack: () => void;
  onUpdateFranchise: (updated: Franchise) => void;
}

export default function FranchiseProfile({ franchise, onBack, onUpdateFranchise }: FranchiseProfileProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'documents' | 'tickets' | 'timeline'>('info');
  
  // Local Ticket submit form
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketCat, setTicketCat] = useState<'operations' | 'marketing' | 'infrastructure' | 'legal'>('operations');
  const [ticketPriority, setTicketPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Checklist toggles
  const handleToggleChecklistItem = (itemId: string) => {
    const updatedChecklist = franchise.checklist.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    
    const completedCount = updatedChecklist.filter(item => item.completed).length;
    const progress = Math.round((completedCount / updatedChecklist.length) * 100);

    const updated: Franchise = {
      ...franchise,
      checklist: updatedChecklist,
      checklistProgress: progress,
      // Adjust compliance score slightly based on checklist progress
      complianceScore: progress > 0 ? Math.min(100, Math.round(50 + (progress / 2))) : franchise.complianceScore
    };

    onUpdateFranchise(updated);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTitle.trim()) return;

    const newTicket: TicketItem = {
      id: `tk-${Date.now()}`,
      code: `TK-${Math.floor(4000 + Math.random() * 1000)}`,
      title: ticketTitle,
      category: ticketCat,
      priority: ticketPriority,
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0],
      franchiseName: franchise.name
    };

    const updated: Franchise = {
      ...franchise,
      tickets: [newTicket, ...franchise.tickets]
    };

    onUpdateFranchise(updated);
    setTicketTitle('');
  };

  return (
    <div id="franchise-profile-view" className="space-y-6 fade-in">
      {/* Back navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={16} /> Volver a la Lista de Franquicias
      </button>

      {/* Main Profile Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="bg-blue-700 text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded">
              {franchise.brandName}
            </span>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
              franchise.status === 'active' ? 'bg-emerald-800/80 text-emerald-100' :
              franchise.status === 'warning' ? 'bg-amber-800/80 text-amber-100' : 'bg-red-800/80 text-red-100'
            }`}>
              {franchise.status === 'active' ? 'Activo' : franchise.status === 'warning' ? 'Bajo Alerta' : 'Pendiente Obra'}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-display font-bold tracking-tight">{franchise.name}</h1>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><User size={14} /> Propietario: {franchise.owner}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> Alta: {franchise.startYear}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> Compliance: {franchise.complianceScore}%</span>
          </div>
        </div>

        {/* Sales / Budget KPI Box */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 min-w-[200px] relative z-10">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Ventas Facturadas (Mes)</p>
          <h3 className="text-xl font-mono font-bold mt-1.5 text-white">
            {franchise.monthlySales > 0 ? `$${franchise.monthlySales.toLocaleString('es-AR')} ARS` : 'Sin Operar (En Obra)'}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <DollarSign size={10} /> Regalías: 5% del neto
          </p>
        </div>
      </div>

      {/* KPI indicators row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Compliance Index</p>
          <p className="text-xl font-bold text-slate-900 mt-1">{franchise.complianceScore}/100</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className={`h-full rounded-full ${franchise.complianceScore > 85 ? 'bg-emerald-600' : 'bg-amber-500'}`} style={{ width: `${franchise.complianceScore}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Pautas de Operaciones</p>
          <p className="text-xl font-bold text-slate-900 mt-1">{franchise.checklistProgress}% completado</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${franchise.checklistProgress}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Documentos Subidos</p>
          <p className="text-xl font-bold text-slate-900 mt-1">{franchise.documents.length} archivos</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Legales, planos y auditorías</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Tickets de Soporte</p>
          <p className="text-xl font-bold text-slate-900 mt-1">
            {franchise.tickets.filter(t => t.status !== 'resolved').length} abiertos
          </p>
          <span className="text-[10px] text-slate-400 mt-1 block">{franchise.tickets.filter(t => t.status === 'resolved').length} ya resueltos</span>
        </div>
      </div>

      {/* Profile Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Checklist (Direct functional tasks) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">Pasos de Estandarización y Obra</h3>
              <p className="text-xs text-slate-400">Verifique los procesos obligatorios cumplidos en este local comercial.</p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded font-mono">
              {franchise.checklist.filter(c => c.completed).length}/{franchise.checklist.length}
            </span>
          </div>

          <div className="space-y-3">
            {franchise.checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => handleToggleChecklistItem(item.id)}
                className="flex items-start justify-between p-3.5 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    {item.completed ? (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    ) : (
                      <Circle size={16} className="text-slate-300" />
                    )}
                  </div>
                  <div>
                    <p className={`text-xs ${item.completed ? 'line-through text-slate-400' : 'text-slate-800 font-bold'}`}>
                      {item.task}
                    </p>
                    <span className="text-[10px] text-slate-400 block mt-1 font-medium">Asignado: {item.assignee}</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-400 shrink-0">Límite: {item.dueDate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Interactive Tabs (Documents, Tickets, Timeline) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Tab buttons */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {(['info', 'documents', 'tickets', 'timeline'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-blue-700 text-blue-700 bg-white font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {tab === 'info' && 'Contacto'}
                {tab === 'documents' && 'Documentos'}
                {tab === 'tickets' && 'Tickets'}
                {tab === 'timeline' && 'Cronología'}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Contact Info Tab */}
            {activeTab === 'info' && (
              <div className="space-y-4 fade-in">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-2">Contacto del Franquiciado</h4>
                
                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-lg">
                    <User size={16} className="text-slate-400" />
                    <div>
                      <p className="font-bold">{franchise.owner}</p>
                      <p className="text-[10px] text-slate-400">Inversor / Socio Operador</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-lg">
                    <Mail size={16} className="text-slate-400" />
                    <div>
                      <p className="font-semibold">{franchise.ownerEmail}</p>
                      <p className="text-[10px] text-slate-400">Email institucional de sucursal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-lg">
                    <Phone size={16} className="text-slate-400" />
                    <div>
                      <p className="font-semibold">{franchise.ownerPhone}</p>
                      <p className="text-[10px] text-slate-400">Teléfono móvil directo</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-4 fade-in">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest">Documentación Oficial</h4>
                <div className="space-y-2.5">
                  {franchise.documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText size={16} className="text-blue-700 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">{doc.name}</p>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{doc.size} • {doc.uploadedAt}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`Descargando el documento corporativo: ${doc.name}`)}
                        className="text-[10px] text-blue-700 font-bold hover:underline shrink-0"
                      >
                        Descargar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Support Tickets Tab */}
            {activeTab === 'tickets' && (
              <div className="space-y-4 fade-in">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest">Tickets de Soporte</h4>
                  <span className="text-[10px] bg-red-50 text-red-700 px-1.5 py-0.5 rounded font-bold font-mono">
                    TK Abiertos: {franchise.tickets.filter(t => t.status !== 'resolved').length}
                  </span>
                </div>

                {/* Submit New Ticket Form */}
                <form onSubmit={handleCreateTicket} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Abrir Ticket Zonal</p>
                  
                  <input
                    type="text"
                    placeholder="Título de la falla o requerimiento..."
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded text-xs bg-white focus:outline-none"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={ticketCat}
                      onChange={(e) => setTicketCat(e.target.value as any)}
                      className="py-1 px-1.5 border border-slate-200 rounded text-[10px] bg-white"
                    >
                      <option value="operations">Operaciones</option>
                      <option value="infrastructure">Infraestructura</option>
                      <option value="marketing">Marketing</option>
                      <option value="legal">Legal</option>
                    </select>

                    <select
                      value={ticketPriority}
                      onChange={(e) => setTicketPriority(e.target.value as any)}
                      className="py-1 px-1.5 border border-slate-200 rounded text-[10px] bg-white font-semibold"
                    >
                      <option value="low">Baja prioridad</option>
                      <option value="medium">Media prioridad</option>
                      <option value="high">Alta prioridad</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-1.5 rounded text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus size={12} /> Registrar Ticket
                  </button>
                </form>

                {/* Tickets list */}
                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {franchise.tickets.map(tk => (
                    <div key={tk.id} className="p-3 bg-white border border-slate-100 rounded-lg flex gap-2 justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] text-slate-400 font-mono font-bold">{tk.code}</span>
                          <span className={`text-[8px] font-bold px-1 rounded uppercase ${
                            tk.priority === 'high' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'
                          }`}>{tk.priority}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-800">{tk.title}</p>
                        <span className="text-[9px] text-slate-400 block">{tk.createdAt} • cat: {tk.category}</span>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        tk.status === 'open' ? 'bg-red-50 text-red-700 border border-red-100' :
                        tk.status === 'in_progress' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        'bg-slate-50 text-slate-500'
                      }`}>{tk.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline / Audit history */}
            {activeTab === 'timeline' && (
              <div className="space-y-4 fade-in">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest">Cronología de Auditorías y Eventos</h4>
                <div className="border-l border-slate-100 ml-2.5 pl-4 space-y-4 relative">
                  {franchise.timeline.map(event => (
                    <div key={event.id} className="relative">
                      {/* Event dot */}
                      <span className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${
                        event.status === 'completed' ? 'bg-emerald-600' :
                        event.status === 'alert' ? 'bg-red-600 animate-pulse' : 'bg-slate-400'
                      }`}></span>

                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-slate-400">{event.date}</span>
                        <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          {event.title}
                        </p>
                        <p className="text-xs text-slate-500 leading-normal">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
