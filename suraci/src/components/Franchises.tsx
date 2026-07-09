import React, { useState } from 'react';
import { MOCK_FRANCHISES } from '../data';
import { Franchise } from '../types';
import { Search, Filter, Shield, Plus, ChevronRight, Award, MapPin, CheckSquare, Settings } from 'lucide-react';
import FranchiseProfile from './FranchiseProfile';

export default function Franchises() {
  const [franchises, setFranchises] = useState<Franchise[]>(MOCK_FRANCHISES);
  const [selectedFranchiseId, setSelectedFranchiseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [brandFilter, setBrandFilter] = useState<string>('all');

  // Filtered List
  const filtered = franchises.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
    const matchesBrand = brandFilter === 'all' || f.brandName === brandFilter;

    return matchesSearch && matchesStatus && matchesBrand;
  });

  const selectedFranchise = franchises.find(f => f.id === selectedFranchiseId);

  const handleUpdateFranchise = (updated: Franchise) => {
    setFranchises(franchises.map(f => f.id === updated.id ? updated : f));
  };

  if (selectedFranchise) {
    return (
      <FranchiseProfile
        franchise={selectedFranchise}
        onBack={() => setSelectedFranchiseId(null)}
        onUpdateFranchise={handleUpdateFranchise}
      />
    );
  }

  return (
    <div id="franchises-view" className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Gestión Operativa de Franquicias</h1>
          <p className="text-slate-500 text-sm">Control de estandarización, cronogramas de obras, checklist técnico de aperturas y auditorías.</p>
        </div>
      </div>

      {/* Filter workspace */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Buscar franquicia por local, propietario o ciudad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1.5 flex-1 md:flex-initial">
              <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">Marca:</span>
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="py-1.5 px-2.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none"
              >
                <option value="all">Todas las firmas</option>
                <option value="Suraci Café">Suraci Café</option>
                <option value="Suraci Pizza & Birra">Suraci Pizza & Birra</option>
                <option value="Le Ble Boulangerie">Le Ble Boulangerie</option>
                <option value="Nails & Hair Studio">Nails & Hair Studio</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 flex-1 md:flex-initial">
              <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">Estado:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-1.5 px-2.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="warning">Con Observaciones</option>
                <option value="pending">Obra / Pendientes</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Franchises List Table representation */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Local / Sucursal</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Propietario / Operador</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ubicación</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Compliance Score</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado de Obra</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-400 text-xs font-medium">
                    No se encontraron franquicias con las condiciones especificadas.
                  </td>
                </tr>
              ) : (
                filtered.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">{f.name}</span>
                        <span className="text-[10px] text-blue-700 font-semibold mt-0.5">{f.brandName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-slate-700 font-medium">
                      {f.owner}
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {f.location}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-slate-800">{f.complianceScore}%</span>
                        <div className="w-16 bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${
                            f.complianceScore > 85 ? 'bg-emerald-600' :
                            f.complianceScore > 70 ? 'bg-amber-500' : 'bg-red-500'
                          }`} style={{ width: `${f.complianceScore}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-xs">
                        <CheckSquare size={13} className="text-blue-700" />
                        <span className="font-medium text-slate-600">{f.checklistProgress}% completado</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedFranchiseId(f.id)}
                        className="text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors inline-flex items-center gap-0.5 hover:underline"
                      >
                        Ver Perfil Completo <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
