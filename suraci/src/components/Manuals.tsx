import React, { useState } from 'react';
import { MOCK_MANUALS } from '../data';
import { Manual } from '../types';
import { Search, BookOpen, Clock, Tag, ChevronRight, FileText, CheckCircle2, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';

export default function Manuals() {
  const [manuals] = useState<Manual[]>(MOCK_MANUALS);
  const [selectedManualId, setSelectedManualId] = useState<string>(MOCK_MANUALS[0].id);
  const [activePageIdx, setActivePageIdx] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [readPages, setReadPages] = useState<Record<string, boolean>>({});

  const selectedManual = manuals.find(m => m.id === selectedManualId) || manuals[0];

  // Filters
  const filteredManuals = manuals.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || m.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handlePageChange = (idx: number) => {
    setActivePageIdx(idx);
  };

  const handleMarkAsRead = (manualId: string, pageIdx: number) => {
    const key = `${manualId}-${pageIdx}`;
    setReadPages(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const CATEGORY_NAMES: Record<Manual['category'], string> = {
    operation: 'Operaciones',
    marketing: 'Marca & POP',
    expansion: 'Expansión & Obra',
    administration: 'Finanzas & Admin',
    hygiene: 'Calidad & BPM'
  };

  const CATEGORY_STYLES: Record<Manual['category'], string> = {
    operation: 'bg-blue-50 text-blue-800 border-blue-100',
    marketing: 'bg-purple-50 text-purple-800 border-purple-100',
    expansion: 'bg-slate-100 text-slate-800 border-slate-200',
    administration: 'bg-amber-50 text-amber-800 border-amber-100',
    hygiene: 'bg-emerald-50 text-emerald-800 border-emerald-100'
  };

  return (
    <div id="manuals-view" className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Manuales de Procesos Inteligentes</h1>
          <p className="text-slate-500 text-sm">Biblioteca corporativa oficial de normas de calidad, arquitectura, recetas y pautas de franquicias.</p>
        </div>
      </div>

      {/* Main Workspace split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Manuals search and selecting list */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm text-slate-800">Directorio de Manuales</h3>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Buscar en títulos de manuales..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none"
              />
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Categoría:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="py-1 px-2 border border-slate-200 rounded text-xs bg-white focus:outline-none flex-1"
              >
                <option value="all">Ver todas</option>
                <option value="operation">Operaciones</option>
                <option value="marketing">Marca & POP</option>
                <option value="expansion">Expansión</option>
                <option value="administration">Administración</option>
              </select>
            </div>
          </div>

          <div className="space-y-3.5 max-h-[450px] overflow-y-auto pr-1">
            {filteredManuals.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs font-medium">
                No se encontraron manuales con ese criterio de búsqueda.
              </div>
            ) : (
              filteredManuals.map((m) => {
                const isSelected = m.id === selectedManualId;
                return (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedManualId(m.id);
                      setActivePageIdx(0);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/10 shadow-sm'
                        : 'border-slate-100 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${CATEGORY_STYLES[m.category]}`}>
                        {CATEGORY_NAMES[m.category]}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1"><Clock size={10} /> {m.lastUpdated}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 leading-snug">{m.title}</h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-normal font-sans">{m.summary}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right column: Document interactive reader */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
          
          {/* Internal Reader index sidebar */}
          <div className="md:col-span-3 border-r border-slate-100 bg-slate-50/40 p-4 space-y-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capítulos</h4>
            <div className="space-y-1.5">
              {selectedManual.pages.map((page, index) => {
                const isPageRead = readPages[`${selectedManual.id}-${index}`];
                return (
                  <button
                    key={page.title}
                    onClick={() => handlePageChange(index)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      activePageIdx === index
                        ? 'bg-blue-50 text-blue-800 font-bold'
                        : 'text-slate-600 hover:bg-slate-100/60'
                    }`}
                  >
                    <span className="truncate">{page.title}</span>
                    {isPageRead && (
                      <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Markdown-style reading sheet */}
          <div className="md:col-span-9 p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Reader Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${CATEGORY_STYLES[selectedManual.category]}`}>
                    {CATEGORY_NAMES[selectedManual.category]}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-medium">Capítulo {activePageIdx + 1} de {selectedManual.pages.length}</span>
                </div>
                <h2 className="text-lg font-display font-bold text-slate-900">{selectedManual.pages[activePageIdx]?.title}</h2>
              </div>

              {/* Reader body */}
              <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-4 prose prose-slate">
                {selectedManual.pages[activePageIdx]?.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('###')) {
                    return <h3 key={idx} className="font-bold text-sm text-slate-800 mt-5 mb-2 font-display">{paragraph.replace('###', '').trim()}</h3>;
                  }
                  if (paragraph.startsWith('-')) {
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-1">
                        {paragraph.split('\n').map((item, subIdx) => (
                          <li key={subIdx}>{item.replace('-', '').trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.match(/^\d+\./)) {
                    return (
                      <ol key={idx} className="list-decimal pl-5 space-y-1">
                        {paragraph.split('\n').map((item, subIdx) => (
                          <li key={subIdx}>{item.replace(/^\d+\./, '').trim()}</li>
                        ))}
                      </ol>
                    );
                  }
                  // Normal paragraph support markdown bold with **
                  const parts = paragraph.split('**');
                  return (
                    <p key={idx}>
                      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="text-slate-900 font-semibold">{part}</strong> : part))}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Reader Footer Controls */}
            <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[10px] text-slate-400">
                Último cambio realizado el {selectedManual.lastUpdated} por Suraci Calidad
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => handleMarkAsRead(selectedManual.id, activePageIdx)}
                  className={`text-xs px-3.5 py-2 rounded-lg border font-semibold transition-all flex items-center gap-1.5 w-full sm:w-auto justify-center ${
                    readPages[`${selectedManual.id}-${activePageIdx}`]
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Bookmark size={14} /> 
                  {readPages[`${selectedManual.id}-${activePageIdx}`] ? 'Capítulo Leído' : 'Marcar como Leído'}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
