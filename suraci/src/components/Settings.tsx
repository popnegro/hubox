import React, { useState } from 'react';
import { User, Building, Shield, Palette, CheckCircle2, Save } from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings() {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'company' | 'roles'>('profile');
  
  // Profile form state
  const [profile, setProfile] = useState({
    name: 'Lic. Luis Grasso',
    email: 'grasso.luis@gmail.com',
    role: 'Socio Director / CEO',
    phone: '+54 9 11 4983-2033'
  });

  // Company settings state
  const [company, setCompany] = useState({
    cuit: '30-71458921-9',
    address: 'Av. Libertador 2450, Piso 12, Palermo, CABA',
    royaltyPercent: '5%',
    contractRenewalYears: '5'
  });

  const [toastMessage, setToastMessage] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Cambios guardados con éxito en la base de datos de Suraci OS.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Configuración global de la franquicia actualizada.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div id="settings-view" className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Configuración del Ecosistema</h1>
          <p className="text-slate-500 text-sm">Administre su cuenta, configure las variables fiscales corporativas de franquicia, y supervise permisos.</p>
        </div>
      </div>

      {toastMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2.5 text-xs font-semibold">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main split work pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Navigation tabs column */}
        <div className="lg:col-span-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
              activeSubTab === 'profile'
                ? 'bg-blue-50 text-blue-800 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <User size={15} /> Perfil Personal
          </button>
          
          <button
            onClick={() => setActiveSubTab('company')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
              activeSubTab === 'company'
                ? 'bg-blue-50 text-blue-800 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Building size={15} /> Empresa & Config. Global
          </button>

          <button
            onClick={() => setActiveSubTab('roles')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
              activeSubTab === 'roles'
                ? 'bg-blue-50 text-blue-800 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Shield size={15} /> Roles & Permisos Zonal
          </button>
        </div>

        {/* Content editor column */}
        <div className="lg:col-span-9 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Profile Editor */}
          {activeSubTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 mb-1">Mi Cuenta Corporativa</h3>
                <p className="text-xs text-slate-400">Actualice sus datos personales institucionales.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Correo Institucional</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Rol Asignado</label>
                  <input
                    type="text"
                    value={profile.role}
                    disabled
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs bg-slate-100 text-slate-500 focus:outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Teléfono Corporativo</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5"
              >
                <Save size={14} /> Guardar Ajustes de Cuenta
              </button>
            </form>
          )}

          {/* Company Editor */}
          {activeSubTab === 'company' && (
            <form onSubmit={handleSaveCompany} className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 mb-1">Estructura Global de la Franquicia</h3>
                <p className="text-xs text-slate-400">Configure los valores estandarizados aplicados de manera automática en el ecosistema Suraci.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Razón Social CUIT</label>
                  <input
                    type="text"
                    value={company.cuit}
                    onChange={(e) => setCompany({ ...company, cuit: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none font-medium font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Domicilio Fiscal</label>
                  <input
                    type="text"
                    value={company.address}
                    onChange={(e) => setCompany({ ...company, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Porcentaje de Regalías Mensual</label>
                  <input
                    type="text"
                    value={company.royaltyPercent}
                    onChange={(e) => setCompany({ ...company, royaltyPercent: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none font-bold text-blue-700 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Vigencia Estándar de Contrato (Años)</label>
                  <input
                    type="text"
                    value={company.contractRenewalYears}
                    onChange={(e) => setCompany({ ...company, contractRenewalYears: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none font-medium font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5"
              >
                <Save size={14} /> Actualizar Configuración Corporativa
              </button>
            </form>
          )}

          {/* Roles Overview */}
          {activeSubTab === 'roles' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 mb-1">Jerarquía de Roles de Usuario</h3>
                <p className="text-xs text-slate-400">Permisos autorizados configurados por el Administrador.</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">CEO / Socio Director (Nivel 1)</h4>
                    <p className="text-[10px] text-slate-500 mt-1 font-sans">Acceso irrestricto de lectura/escritura en todos los módulos (Dashboard, CRM, Fichas de Obra, Configuración global).</p>
                  </div>
                  <span className="text-[9px] bg-blue-50 text-blue-800 border border-blue-100 font-semibold px-2 py-0.5 rounded uppercase">Full Control</span>
                </div>

                <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Auditor / Inspector de Zona (Nivel 2)</h4>
                    <p className="text-[10px] text-slate-500 mt-1 font-sans">Permiso autorizado para planificar auditorías, calificar puntuaciones de compliance, registrar checklists e incidentes de soporte.</p>
                  </div>
                  <span className="text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-100 font-semibold px-2 py-0.5 rounded uppercase">Operativo</span>
                </div>

                <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Franquiciado / Socio Operador (Nivel 3)</h4>
                    <p className="text-[10px] text-slate-500 mt-1 font-sans">Acceso a visualización exclusiva de su propia ficha contractual de local, manuales inteligentes, cursos de la Universidad y Suraci AI.</p>
                  </div>
                  <span className="text-[9px] bg-slate-100 text-slate-600 border border-slate-200 font-semibold px-2 py-0.5 rounded uppercase">Lectura/Feedback</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
