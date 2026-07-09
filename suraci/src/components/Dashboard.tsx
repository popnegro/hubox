import React, { useState } from 'react';
import { Building, Store, MapPin, ClipboardCheck, GraduationCap, Ticket, BellRing, ChevronRight, TrendingUp, AlertTriangle, CheckCircle2, UserCheck, Search } from 'lucide-react';
import { GLOBAL_KPIs, MOCK_ALERTS, MOCK_BRANDS } from '../data';
import { motion } from 'motion/react';

interface DashboardProps {
  onNavigateTo: (page: string) => void;
}

export default function Dashboard({ onNavigateTo }: DashboardProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>('CABA');
  const [searchQuery, setSearchQuery] = useState('');

  const regionalData: Record<string, { locales: number; franchises: number; manager: string; activeBrands: string }> = {
    'CABA': { locales: 380, franchises: 210, manager: 'Lic. Martin Gomez', activeBrands: 'Suraci Café, Nails Studio, Boulangerie' },
    'Provincia de Buenos Aires': { locales: 290, franchises: 130, manager: 'Lic. Martin Gomez', activeBrands: 'Suraci Pizza, Boulangerie' },
    'Mendoza': { locales: 110, franchises: 65, manager: 'Ing. Lucas Suraci', activeBrands: 'Suraci Café, Fitness Club' },
    'Córdoba': { locales: 80, franchises: 45, manager: 'Cont. Sofia Diaz', activeBrands: 'Suraci Café, Nails Studio' },
    'Santa Fe': { locales: 40, franchises: 30, manager: 'Dra. Elena Rossi', activeBrands: 'Suraci Pizza, Nails Studio' }
  };

  // Filtered alerts
  const filteredAlerts = MOCK_ALERTS.filter(alert => 
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    alert.franchise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="dashboard-view" className="space-y-8 fade-in">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Panel Ejecutivo Regional</h1>
          <p className="text-slate-500 text-sm">Control unificado de expansión, auditorías y estandarización de franquicias.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Buscar alertas de hoy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 w-52"
            />
          </div>
          <span className="bg-blue-50 text-blue-800 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-blue-100">
            Modo Corporativo
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Marcas Activas</p>
              <h3 className="text-3xl font-display font-bold text-slate-900 mt-2">{GLOBAL_KPIs.brandsCount}</h3>
            </div>
            <div className="bg-slate-100 text-slate-800 p-2.5 rounded-xl">
              <Building size={16} />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 flex items-center gap-1.5">
            <span className="text-emerald-600 font-bold">✦ 5 Categorías</span> de industria activas
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Franquicias Totales</p>
              <h3 className="text-3xl font-display font-bold text-slate-900 mt-2">{GLOBAL_KPIs.franchisesCount}</h3>
            </div>
            <div className="bg-blue-50 text-blue-800 p-2.5 rounded-xl">
              <Store size={16} />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 flex items-center gap-1.5">
            <span className="text-emerald-600 font-bold">▲ +12%</span> crecimiento interanual
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Puntos de Venta</p>
              <h3 className="text-3xl font-display font-bold text-slate-900 mt-2">{GLOBAL_KPIs.locationsCount}</h3>
            </div>
            <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl">
              <MapPin size={16} />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 flex items-center gap-1.5">
            <span className="text-slate-500 font-bold">ARG, URY, PRY</span> expansión de Cono Sur
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Proyectos de Obra</p>
              <h3 className="text-3xl font-display font-bold text-slate-900 mt-2">{GLOBAL_KPIs.projectsCount}</h3>
            </div>
            <div className="bg-amber-50 text-amber-800 p-2.5 rounded-xl">
              <ClipboardCheck size={16} />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 flex items-center gap-1.5">
            <span className="text-amber-600 font-semibold">18 en etapa final</span> de apertura
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Map & Regional Analytics */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">Densidad Regional de Franquicias</h3>
                <p className="text-xs text-slate-400">Seleccione una provincia para ver el reporte de locales activos y líderes de zona.</p>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-1 rounded">Argentina OS</span>
            </div>

            {/* Interactive Region Selector Buttons & Map Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
              <div className="md:col-span-5 flex flex-col gap-2">
                {Object.keys(regionalData).map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`flex items-center justify-between p-3 rounded-lg text-xs font-medium border transition-all text-left ${
                      selectedRegion === region
                        ? 'bg-blue-50 text-blue-800 border-blue-200/80 shadow-sm font-semibold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{region}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono bg-white/80 text-slate-500 text-[10px] px-1.5 py-0.5 rounded border border-slate-100">
                        {regionalData[region].locales} locales
                      </span>
                      <ChevronRight size={14} className={selectedRegion === region ? 'text-blue-800' : 'text-slate-400'} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Vector SVG Representation of Argentina Map Focus */}
              <div className="md:col-span-7 bg-slate-50/50 rounded-xl border border-slate-200/40 p-4 flex items-center justify-center relative min-h-[250px]">
                <div className="absolute top-3 left-3 text-[10px] text-slate-400 font-mono">MAPA SENSORIAL</div>
                
                {/* SVG Visual map of core regions */}
                <svg viewBox="0 0 200 300" className="w-44 h-auto text-slate-300">
                  {/* CABA Point */}
                  <circle
                    cx="150"
                    cy="160"
                    r={selectedRegion === 'CABA' ? '12' : '8'}
                    className={`cursor-pointer transition-all ${selectedRegion === 'CABA' ? 'fill-blue-600 stroke-blue-200 stroke-[4px]' : 'fill-slate-400 hover:fill-slate-500'}`}
                    onClick={() => setSelectedRegion('CABA')}
                  />
                  {/* Buenos Aires Region */}
                  <path
                    d="M 120 140 Q 150 130 170 170 Q 140 210 110 170 Z"
                    className={`cursor-pointer transition-all ${selectedRegion === 'Provincia de Buenos Aires' ? 'fill-blue-700/85 stroke-blue-200 stroke-[2px]' : 'fill-slate-300 hover:fill-slate-400'}`}
                    onClick={() => setSelectedRegion('Provincia de Buenos Aires')}
                  />
                  {/* Mendoza Region */}
                  <path
                    d="M 40 130 L 70 140 L 60 180 L 30 170 Z"
                    className={`cursor-pointer transition-all ${selectedRegion === 'Mendoza' ? 'fill-blue-700/85 stroke-blue-200 stroke-[2px]' : 'fill-slate-300 hover:fill-slate-400'}`}
                    onClick={() => setSelectedRegion('Mendoza')}
                  />
                  {/* Córdoba Region */}
                  <path
                    d="M 80 100 L 110 110 L 100 150 L 70 140 Z"
                    className={`cursor-pointer transition-all ${selectedRegion === 'Córdoba' ? 'fill-blue-700/85 stroke-blue-200 stroke-[2px]' : 'fill-slate-300 hover:fill-slate-400'}`}
                    onClick={() => setSelectedRegion('Córdoba')}
                  />
                  {/* Santa Fe Region */}
                  <path
                    d="M 110 80 L 130 90 L 120 130 L 105 120 Z"
                    className={`cursor-pointer transition-all ${selectedRegion === 'Santa Fe' ? 'fill-blue-700/85 stroke-blue-200 stroke-[2px]' : 'fill-slate-300 hover:fill-slate-400'}`}
                    onClick={() => setSelectedRegion('Santa Fe')}
                  />
                </svg>

                {/* Map Legend */}
                <div className="absolute bottom-3 right-3 text-[10px] flex flex-col gap-1 bg-white p-2 border border-slate-100 rounded shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 block"></span>
                    <span className="text-slate-600 font-medium">Zona Seleccionada</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 block"></span>
                    <span className="text-slate-500">Otras Zonas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Details Card */}
          {selectedRegion && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Provincia</span>
                <span className="text-sm font-bold text-slate-800">{selectedRegion}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Locales Activos</span>
                <span className="text-sm font-mono font-bold text-slate-800">{regionalData[selectedRegion].locales}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Líder Zonal Suraci</span>
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1">
                  <UserCheck size={14} className="text-emerald-700" /> {regionalData[selectedRegion].manager}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Marcas Representadas</span>
                <span className="text-xs text-slate-600 line-clamp-1 mt-0.5">{regionalData[selectedRegion].activeBrands}</span>
              </div>
            </div>
          )}
        </div>

        {/* Live Alerts & Activity Logs */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <BellRing size={16} className="text-blue-600 animate-pulse" /> Alertas del Día
            </h3>
            <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              {filteredAlerts.length} hoy
            </span>
          </div>

          <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[380px]">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs font-medium">
                No se encontraron alertas para la búsqueda.
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border flex gap-3 transition-colors ${
                    alert.type === 'alert'
                      ? 'bg-red-50/50 border-red-100 hover:bg-red-50'
                      : alert.type === 'warning'
                      ? 'bg-amber-50/50 border-amber-100 hover:bg-amber-50'
                      : alert.type === 'success'
                      ? 'bg-emerald-50/50 border-emerald-100 hover:bg-emerald-50'
                      : 'bg-blue-50/30 border-blue-100 hover:bg-blue-50/50'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {alert.type === 'alert' && <AlertTriangle className="text-red-600" size={16} />}
                    {alert.type === 'warning' && <AlertTriangle className="text-amber-600" size={16} />}
                    {alert.type === 'success' && <CheckCircle2 className="text-emerald-600" size={16} />}
                    {alert.type === 'info' && <CheckCircle2 className="text-blue-600" size={16} />}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800 leading-snug">{alert.title}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{alert.franchise}</p>
                    <span className="text-[9px] text-slate-400 block font-mono mt-1">{alert.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => onNavigateTo('franchises')}
            className="w-full mt-4 text-center py-2.5 text-xs text-blue-700 font-semibold hover:text-blue-800 transition-colors flex items-center justify-center gap-1.5 border border-dashed border-slate-200 hover:border-slate-300 rounded-lg bg-slate-50/50"
          >
            Ver Todas las Sucursales Zonal <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Monthly expansion and detailed list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Core Growth Chart - Custom SVG */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <TrendingUp size={18} className="text-blue-600" /> Evolución de Aperturas
                </h3>
                <p className="text-xs text-slate-400">Total acumulado de locales comerciales inaugurados mes a mes.</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded border border-emerald-100">
                +45 Aperturas en Obra
              </span>
            </div>

            {/* Premium custom SVG representation of bar/line graph */}
            <div className="space-y-4 pt-4">
              <div className="flex items-end justify-between h-44 gap-3">
                {[
                  { month: 'Ene', value: 720, height: '40%' },
                  { month: 'Feb', value: 745, height: '45%' },
                  { month: 'Mar', value: 780, height: '53%' },
                  { month: 'Abr', value: 810, height: '62%' },
                  { month: 'May', value: 850, height: '75%' },
                  { month: 'Jun', value: 900, height: '90%' }
                ].map((item, index) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.value}
                    </div>
                    <div className="w-full bg-slate-100 rounded-t-md relative overflow-hidden transition-all duration-500 hover:bg-slate-200" style={{ height: item.height }}>
                      {/* Gradient fill */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-blue-600 opacity-85 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Active Brands list */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 mb-1">Marcas Líderes de la Red</h3>
            <p className="text-xs text-slate-400 mb-5">Principales firmas comerciales con mayor cantidad de contratos.</p>

            <div className="space-y-3">
              {MOCK_BRANDS.map((brand, i) => (
                <div key={brand.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{brand.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{brand.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-slate-800 block">{brand.totalLocations} locales</span>
                    <span className="text-[10px] text-slate-400 font-medium">{brand.activeFranchises} contratos</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
