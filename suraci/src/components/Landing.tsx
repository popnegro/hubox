import React from 'react';
import { ArrowRight, Shield, Zap, TrendingUp, Users, BookOpen, MessageSquare, Briefcase, Award, Globe, Building } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingProps {
  onEnterApp: () => void;
}

export default function Landing({ onEnterApp }: LandingProps) {
  return (
    <div id="landing-page" className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-200 selection:text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-2 rounded-lg flex items-center justify-center font-bold tracking-tight">
              <span className="font-display text-sm tracking-wider">S</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">Suraci<span className="text-blue-700 font-normal">OS</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#beneficios" className="hover:text-slate-900 transition-colors">Beneficios</a>
            <a href="#modulos" className="hover:text-slate-900 transition-colors">Módulos</a>
            <a href="#soluciones" className="hover:text-slate-900 transition-colors">Expansión</a>
          </nav>
          <div>
            <button
              onClick={onEnterApp}
              id="btn-landing-login"
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02]"
            >
              Ingresar al Sistema <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-6 border border-slate-200/60"
            >
              <Award size={14} className="text-blue-700" />
              <span>PRESENTANDO EL NUEVO SURACI OS v1.0</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-slate-900 tracking-tight leading-[1.1] mb-6"
            >
              La plataforma que conecta, estandariza y acelera <span className="text-blue-800">el crecimiento de cada franquicia</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-600 mb-10 leading-relaxed font-sans"
            >
              El sistema operativo empresarial definitivo para franquiciadores y franquiciados. Centralice la expansión, audite procesos clave, capacite a su staff y estandarice la excelencia operativa en toda su red de locales.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={onEnterApp}
                id="btn-hero-start"
                className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3.5 rounded-lg transition-all shadow-md hover:shadow-blue-200/80 flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                Comenzar Demo En Vivo <ArrowRight size={18} />
              </button>
              <a
                href="#modulos"
                className="w-full sm:w-auto bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold px-8 py-3.5 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                Ver Módulos Clave
              </a>
            </motion.div>
          </div>

          {/* Interactive Preview Mockup Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 border border-slate-200/80 rounded-2xl p-4 bg-white shadow-2xl shadow-slate-200 max-w-5xl mx-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
              </div>
              <div className="bg-slate-50 text-[11px] font-mono text-slate-500 px-4 py-1 rounded border border-slate-100">
                https://suraci-os.com/dashboard
              </div>
              <div className="w-12"></div>
            </div>
            <div className="aspect-[16/9] bg-slate-900 rounded-lg overflow-hidden flex flex-col relative text-white font-mono p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-slate-300 font-semibold font-sans">Panel General Suraci OS</span>
                </div>
                <div className="text-[11px] text-slate-500">Actualizado hace instantes</div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/50">
                  <div className="text-[10px] text-slate-400 font-sans">MARCAS ACTIVAS</div>
                  <div className="text-2xl font-bold font-sans text-white mt-1">130</div>
                  <div className="text-[10px] text-green-400 mt-1 font-sans">✦ Red de Expansión</div>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/50">
                  <div className="text-[10px] text-slate-400 font-sans">FRANQUICIAS TOTALES</div>
                  <div className="text-2xl font-bold font-sans text-white mt-1">480</div>
                  <div className="text-[10px] text-green-400 mt-1 font-sans">▲ +12% vs año anterior</div>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/50">
                  <div className="text-[10px] text-slate-400 font-sans">LOCALES EN OPERACIÓN</div>
                  <div className="text-2xl font-bold font-sans text-white mt-1">900</div>
                  <div className="text-[10px] text-slate-300 mt-1 font-sans">Argentina, Uruguay & Paraguay</div>
                </div>
              </div>
              <div className="flex-1 bg-slate-800/40 border border-slate-700/30 rounded-lg p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] text-slate-400 font-sans">ACTIVIDAD DE EXPANSIÓN COMERCIAL</span>
                  <span className="text-[10px] text-blue-400 font-sans">45 Proyectos Activos</span>
                </div>
                {/* Simulated Chart Bars */}
                <div className="flex items-end gap-3 h-28 pt-2">
                  <div className="bg-blue-800/30 h-[20%] w-full rounded"></div>
                  <div className="bg-blue-800/40 h-[35%] w-full rounded"></div>
                  <div className="bg-blue-800/50 h-[50%] w-full rounded"></div>
                  <div className="bg-blue-700 h-[75%] w-full rounded relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-sans text-[9px] px-1.5 py-0.5 rounded font-bold">Récord</div>
                  </div>
                  <div className="bg-blue-800/60 h-[65%] w-full rounded"></div>
                  <div className="bg-blue-500 h-[90%] w-full rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">La Diferencia Suraci</h2>
            <p className="text-3xl font-display font-bold text-slate-900 tracking-tight">Estandarizar es el único camino para crecer sin perder calidad</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-xl border border-slate-200/60 hover:border-slate-300/80 transition-all">
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Expansión Acelerada</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gestione prospectos inversores con un CRM estructurado para franquicias. Controle el pipeline desde el primer interés hasta la firma de contrato y entrega de llaves.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-xl border border-slate-200/60 hover:border-slate-300/80 transition-all">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Control de Calidad</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Planifique auditorías operativas, registre desvíos bromatológicos e higiénicos, y asigne tareas correctivas con fechas límite a cada responsable de sucursal.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-xl border border-slate-200/60 hover:border-slate-300/80 transition-all">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center mb-6">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Evolución Comercial</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Visualice KPIs consolidados de ventas, alertas de compliance, deudas y tickets pendientes de soporte de infraestructura a través de un panel unificado para CEOs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="modulos" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">Modular, Seguro y Escalable</h2>
            <p className="text-3xl font-display font-bold text-slate-900 tracking-tight">Todo el ecosistema de su marca en un solo lugar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                  <Building size={20} />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Dashboard Ejecutivo</h4>
                <p className="text-xs text-slate-500 leading-relaxed">KPIs consolidados de marcas, locales activos, scoring de auditorías y alertas del día.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
                  <Users size={20} />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">CRM de Ventas</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Embudo comercial para captar nuevos franquiciados, programar llamadas y contratos.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                  <Briefcase size={20} />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Gestión Operativa</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Seguimiento de obras de adecuación, cronogramas de aperturas y checklist técnico.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                  <BookOpen size={20} />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Manuales Inteligentes</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Repositorio interactivo de procesos, normas bromatológicas y pautas de marketing.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <Award size={20} />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Universidad Suraci</h4>
                <p className="text-xs text-slate-500 leading-relaxed">E-learning oficial para el staff de barra, mozos e inducción general con autoevaluación.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-700 flex items-center justify-center mb-4">
                  <MessageSquare size={20} />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Suraci AI</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Asistente de Inteligencia Artificial que responde consultas sobre manuales y expansión.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                  <Globe size={20} />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Fichas de Franquicia</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Documentos contractuales, planos, tickets de soporte y score de compliance integrado.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                  <Shield size={20} />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Configuración & Roles</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Control estricto de permisos para directores de marcas, inspectores y franquiciados.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">¿Listo para expandir su marca de manera profesional?</h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Estandarice operaciones, mantenga la excelencia de su firma comercial y acceda a reportes gerenciales en tiempo real.
          </p>
          <button
            onClick={onEnterApp}
            id="btn-cta-start"
            className="bg-white text-slate-950 font-bold px-8 py-4 rounded-lg transition-all hover:bg-slate-100 shadow-xl inline-flex items-center gap-2 hover:scale-105"
          >
            Acceder a Suraci OS <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white w-7 h-7 rounded flex items-center justify-center font-bold text-xs">S</div>
            <span className="font-display font-semibold text-sm tracking-tight text-slate-800">Suraci OS © 2026</span>
          </div>
          <div className="text-xs text-slate-400">
            La plataforma definitiva para la expansión y estandarización de franquicias corporativas.
          </div>
        </div>
      </footer>
    </div>
  );
}
