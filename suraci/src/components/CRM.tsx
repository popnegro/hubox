import React, { useState } from 'react';
import { Plus, Search, Filter, Mail, Phone, MapPin, DollarSign, Calendar, FileText, ChevronRight, CheckCircle2, RefreshCw, Sparkles, Send } from 'lucide-react';
import { MOCK_PROSPECTS } from '../data';
import { Prospect } from '../types';
import { motion } from 'motion/react';

export default function CRM() {
  const [prospects, setProspects] = useState<Prospect[]>(MOCK_PROSPECTS);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(MOCK_PROSPECTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  
  // New Lead form state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    brandInterest: 'Suraci Café',
    investmentBudget: '',
    company: ''
  });
  const [formError, setFormError] = useState('');

  // Note text state
  const [newNoteText, setNewNoteText] = useState('');

  // Stages definition
  const STAGES: { id: Prospect['stage']; name: string; color: string }[] = [
    { id: 'qualification', name: 'Calificación', color: 'bg-slate-100 text-slate-800 border-slate-200' },
    { id: 'meeting', name: 'Reunión Zonal', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    { id: 'evaluation', name: 'Evaluación Técnica', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { id: 'contract', name: 'Contrato Legal', color: 'bg-purple-50 text-purple-800 border-purple-200' },
    { id: 'won', name: 'Ganado / Firma', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
  ];

  // Filters
  const filteredProspects = prospects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.brandInterest.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'all' || p.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const handleStageChange = (prospectId: string, newStage: Prospect['stage']) => {
    const updated = prospects.map(p => {
      if (p.id === prospectId) {
        const u = { ...p, stage: newStage };
        if (selectedProspect && selectedProspect.id === prospectId) {
          setSelectedProspect(u);
        }
        return u;
      }
      return p;
    });
    setProspects(updated);
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!newLead.name || !newLead.email || !newLead.investmentBudget) {
      setFormError('Por favor complete Nombre, Correo e Inversión de Presupuesto.');
      return;
    }

    const created: Prospect = {
      id: `p-${Date.now()}`,
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone || '+54 9 11 0000-0000',
      city: newLead.city || 'Buenos Aires',
      brandInterest: newLead.brandInterest,
      investmentBudget: newLead.investmentBudget,
      stage: 'qualification',
      status: 'active',
      company: newLead.company || 'Particular',
      notes: [{ id: 'n-new', author: 'Sistema Suraci OS', date: new Date().toISOString().split('T')[0], text: 'Lead ingresado a través del portal de expansión comercial.' }],
      activities: [{ id: 'act-new', type: 'call', title: 'Primera llamada de contacto comercial', date: new Date().toISOString().split('T')[0], completed: false }]
    };

    setProspects([created, ...prospects]);
    setSelectedProspect(created);
    setIsAddOpen(false);
    setNewLead({ name: '', email: '', phone: '', city: '', brandInterest: 'Suraci Café', investmentBudget: '', company: '' });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedProspect) return;

    const newNote = {
      id: `n-${Date.now()}`,
      author: 'CEO / Director',
      date: new Date().toISOString().split('T')[0],
      text: newNoteText
    };

    const updatedProspect = {
      ...selectedProspect,
      notes: [newNote, ...selectedProspect.notes]
    };

    setProspects(prospects.map(p => p.id === selectedProspect.id ? updatedProspect : p));
    setSelectedProspect(updatedProspect);
    setNewNoteText('');
  };

  const toggleActivity = (activityId: string) => {
    if (!selectedProspect) return;
    const updatedActivities = selectedProspect.activities.map(act => 
      act.id === activityId ? { ...act, completed: !act.completed } : act
    );
    const updatedProspect = { ...selectedProspect, activities: updatedActivities };
    setProspects(prospects.map(p => p.id === selectedProspect.id ? updatedProspect : p));
    setSelectedProspect(updatedProspect);
  };

  return (
    <div id="crm-view" className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">CRM Expansión Comercial</h1>
          <p className="text-slate-500 text-sm">Seguimiento inteligente del embudo de ventas para nuevos franquiciados e inversores.</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          id="btn-add-prospect"
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all shadow-sm flex items-center gap-2 self-start"
        >
          <Plus size={16} /> Registrar Inversor
        </button>
      </div>

      {/* Main CRM split pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Pipeline List & Search */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Buscar inversores por nombre, marca, ciudad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Estado:</span>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="py-1.5 px-2.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">Todas las Etapas</option>
                <option value="qualification">Calificación</option>
                <option value="meeting">Reunión Zonal</option>
                <option value="evaluation">Evaluación Técnica</option>
                <option value="contract">Contrato Legal</option>
                <option value="won">Ganado</option>
              </select>
            </div>
          </div>

          {/* Prospects List */}
          <div className="space-y-3.5 max-h-[550px] overflow-y-auto pr-1">
            {filteredProspects.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs font-medium border border-dashed border-slate-100 rounded-xl">
                No se encontraron inversores registrados bajo estas pautas.
              </div>
            ) : (
              filteredProspects.map((p) => {
                const currentStage = STAGES.find(s => s.id === p.stage);
                const isSelected = selectedProspect?.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProspect(p)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/10 shadow-sm'
                        : 'border-slate-100 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2.5">
                      <div>
                        <h3 className="font-bold text-slate-900 text-xs">{p.name}</h3>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{p.company}</p>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${currentStage?.color}`}>
                        {currentStage?.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-slate-400" />
                        <span>{p.city}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign size={12} className="text-slate-400" />
                        <span className="font-mono font-medium">{p.investmentBudget}</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                        <Sparkles size={12} className="text-blue-700" />
                        <span className="font-semibold text-slate-700">{p.brandInterest}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Detail & Action Pane */}
        <div className="lg:col-span-5 space-y-6">
          {selectedProspect ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              {/* Client Profile Card Header */}
              <div className="border-b border-slate-100 pb-5">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 leading-tight">{selectedProspect.name}</h2>
                    <p className="text-xs text-slate-500 mt-1">{selectedProspect.company}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 items-end">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Cambiar Etapa</span>
                    <select
                      value={selectedProspect.stage}
                      onChange={(e) => handleStageChange(selectedProspect.id, e.target.value as Prospect['stage'])}
                      className="py-1 px-2 border border-slate-200 rounded text-[11px] bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                    >
                      {STAGES.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs text-slate-600">
                  <div className="flex items-center gap-2 p-2 bg-slate-50/50 rounded-lg">
                    <Mail size={14} className="text-slate-400" />
                    <span className="truncate">{selectedProspect.email}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50/50 rounded-lg">
                    <Phone size={14} className="text-slate-400" />
                    <span>{selectedProspect.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Activities Check list */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Actividades de Seguimiento</h3>
                <div className="space-y-2">
                  {selectedProspect.activities.map((act) => (
                    <div
                      key={act.id}
                      onClick={() => toggleActivity(act.id)}
                      className="flex items-center justify-between p-2.5 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={act.completed}
                          onChange={() => {}} // toggled on container div click
                          className="h-3.5 w-3.5 text-blue-600 border-slate-300 rounded"
                        />
                        <span className={`text-xs ${act.completed ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                          {act.title}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400">{act.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CRM Interactive notes list */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Historial de Notas</h3>
                <form onSubmit={handleAddNote} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Escribir nota del avance comercial..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </form>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {selectedProspect.notes.map((note) => (
                    <div key={note.id} className="p-3 bg-slate-50/80 rounded-lg border border-slate-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-slate-700">{note.author}</span>
                        <span className="text-[9px] text-slate-400 font-mono">{note.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 text-center py-16 text-slate-400 text-xs">
              Seleccione un inversor de la lista para ver su perfil de negociación corporativo.
            </div>
          )}
        </div>

      </div>

      {/* Modal Add Lead */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 max-w-md w-full p-6 shadow-2xl relative fade-in">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-2">Registrar Nuevo Inversor</h2>
            <p className="text-xs text-slate-400 mb-6">Complete los datos clave para iniciar el embudo de expansión Suraci.</p>

            <form onSubmit={handleAddLead} className="space-y-4">
              {formError && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Nombre y Apellido</label>
                <input
                  type="text"
                  placeholder="Carlos Menéndez"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="carlos@empresa.com"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Teléfono</label>
                  <input
                    type="text"
                    placeholder="+54 9 261 555-5555"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Ciudad Base</label>
                  <input
                    type="text"
                    placeholder="Mendoza"
                    value={newLead.city}
                    onChange={(e) => setNewLead({ ...newLead, city: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Presupuesto Estimado</label>
                  <input
                    type="text"
                    placeholder="USD 85.000"
                    value={newLead.investmentBudget}
                    onChange={(e) => setNewLead({ ...newLead, investmentBudget: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Marca de Interés</label>
                  <select
                    value={newLead.brandInterest}
                    onChange={(e) => setNewLead({ ...newLead, brandInterest: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  >
                    <option value="Suraci Café">Suraci Café</option>
                    <option value="Suraci Pizza & Birra">Suraci Pizza & Birra</option>
                    <option value="Le Ble Boulangerie">Le Ble Boulangerie</option>
                    <option value="Nails & Hair Studio">Nails & Hair Studio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Empresa / Grupo</label>
                  <input
                    type="text"
                    placeholder="Inversiones S.A."
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  id="btn-confirm-add-prospect"
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
                >
                  Registrar Inversor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
