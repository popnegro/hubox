import React, { useState } from 'react';
import { LayoutDashboard, Users, Store, BookOpen, GraduationCap, MessageSquare, Settings as SettingsIcon, LogOut, Menu, X, Bell, User } from 'lucide-react';
import { motion } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigateTo: (page: string) => void;
  onLogout: () => void;
  userRole: string;
}

export default function Layout({ children, activePage, onNavigateTo, onLogout, userRole }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', name: 'Dashboard Ejecutivo', icon: LayoutDashboard, roles: ['executive', 'inspector'] },
    { id: 'crm', name: 'CRM Comercial', icon: Users, roles: ['executive'] },
    { id: 'franchises', name: 'Gestión Franquicias', icon: Store, roles: ['executive', 'inspector', 'franchisee'] },
    { id: 'manuals', name: 'Manuales Procesos', icon: BookOpen, roles: ['executive', 'inspector', 'franchisee'] },
    { id: 'university', name: 'Universidad Suraci', icon: GraduationCap, roles: ['executive', 'inspector', 'franchisee'] },
    { id: 'ai', name: 'Suraci AI Chat', icon: MessageSquare, roles: ['executive', 'inspector', 'franchisee'] },
    { id: 'settings', name: 'Configuración', icon: SettingsIcon, roles: ['executive', 'inspector', 'franchisee'] }
  ];

  // Filter nav items based on roles
  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  const getRoleLabel = () => {
    if (userRole === 'executive') return 'Socio Director / CEO';
    if (userRole === 'inspector') return 'Auditor de Red';
    return 'Socio Franquiciado';
  };

  const getRoleBadgeColor = () => {
    if (userRole === 'executive') return 'bg-blue-50 text-blue-800 border-blue-100';
    if (userRole === 'inspector') return 'bg-emerald-50 text-emerald-800 border-emerald-100';
    return 'bg-indigo-50 text-indigo-800 border-indigo-100';
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col md:flex-row font-sans selection:bg-slate-200">
      
      {/* Mobile Header Bar */}
      <header className="md:hidden h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between z-40 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center font-bold font-display italic">
            S
          </div>
          <span className="font-display font-bold text-base text-slate-900 tracking-tight uppercase">Suraci <span className="text-blue-600 font-normal">OS</span></span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-600 focus:outline-none p-1.5 bg-slate-100 rounded-lg"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Sidebar - Desktop & Mobile Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0A0A0B] text-slate-300 border-r border-slate-900/60 transform md:transform-none md:static transition-transform duration-300 ease-in-out flex flex-col justify-between
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Top Header branding */}
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs italic shrink-0">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base tracking-tight text-white uppercase">Suraci OS</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Franchise Suite</span>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links list */}
          <nav className="space-y-1">
            {filteredNavItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigateTo(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-white font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <IconComp size={15} className={isActive ? 'text-blue-500' : 'text-slate-400'} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User context footer */}
        <div className="p-6 border-t border-slate-900 space-y-4 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold text-xs uppercase shrink-0">
              <User size={14} className="text-slate-300" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Lic. Luis Grasso</p>
              <span className="text-[10px] text-slate-400 block truncate mt-0.5">{getRoleLabel()}</span>
            </div>
          </div>

          <button
            onClick={onLogout}
            id="btn-sidebar-logout"
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-colors flex items-center gap-3"
          >
            <LogOut size={13} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Body container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#F3F4F6]">
        
        {/* Top Desktop Bar */}
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200 px-8 items-center justify-between z-30 shrink-0 sticky top-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 font-mono">ESTADO DEL SISTEMA:</span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> ONLINE v1.0
            </span>
          </div>

          <div className="flex items-center gap-4 relative">
            {/* Quick Demo Role selection indicator */}
            <div className="text-xs flex items-center gap-2 border border-slate-200 rounded-lg p-1 px-2.5 bg-slate-50/50">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Rol Demo:</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getRoleBadgeColor()}`}>
                {userRole === 'executive' ? 'CEO / Director' : userRole === 'inspector' ? 'Auditor' : 'Franquiciado'}
              </span>
            </div>

            {/* Notification triggers */}
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="text-slate-400 hover:text-slate-800 relative p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            {/* Notification popup modal drawer */}
            {isNotifOpen && (
              <div className="absolute top-10 right-0 w-80 bg-white rounded-xl border border-slate-200/80 shadow-xl p-4 space-y-3 z-50 text-slate-800 font-sans">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-900">Notificaciones Recientes</span>
                  <button onClick={() => setIsNotifOpen(false)} className="text-[10px] text-blue-700 font-bold hover:underline">Limpiar</button>
                </div>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  <div className="p-2 hover:bg-slate-50 rounded text-xs">
                    <p className="font-semibold text-slate-800">Alerta Bromatológica</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Control crítico pendiente en Palermo Soho.</p>
                  </div>
                  <div className="p-2 hover:bg-slate-50 rounded text-xs border-t border-slate-50">
                    <p className="font-semibold text-slate-800">Inversor Mendoza calificado</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Nuevo borrador de contrato legal enviado.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content canvas with responsive paddings */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
