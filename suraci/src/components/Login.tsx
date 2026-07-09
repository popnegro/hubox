import React, { useState } from 'react';
import { Lock, Mail, Shield, AlertCircle, ArrowLeft, Key } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLoginSuccess: (role: string) => void;
  onBackToLanding: () => void;
}

export default function Login({ onLoginSuccess, onBackToLanding }: LoginProps) {
  const [email, setEmail] = useState('director@suraci.com.ar');
  const [password, setPassword] = useState('••••••••');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Por favor ingrese su correo institucional.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess('executive');
    }, 800);
  };

  const handleQuickLogin = (role: string) => {
    setLoading(true);
    if (role === 'executive') {
      setEmail('director@suraci.com.ar');
    } else if (role === 'inspector') {
      setEmail('auditor.zonal@suraci.com');
    } else {
      setEmail('franquiciado.palermo@suraci.com');
    }
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(role);
    }, 600);
  };

  return (
    <div id="login-page" className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-slate-200">
      <div className="absolute top-6 left-6">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={16} /> Volver a la Landing Comercial
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-slate-900 text-white p-3 rounded-xl flex items-center justify-center font-bold tracking-tight text-lg shadow-sm">
            <span className="font-display tracking-widest px-1">S</span>
          </div>
        </div>
        <h2 className="text-center text-3xl font-display font-bold text-slate-900 tracking-tight">
          Ingresar a Suraci OS
        </h2>
        <p className="mt-2 text-center text-xs text-slate-500">
          La plataforma corporativa para la estandarización de franquicias
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-8 px-4 shadow-xl shadow-slate-100 rounded-2xl border border-slate-100 sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-lg flex items-start gap-2 text-xs">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Correo Institucional
              </label>
              <div className="mt-2.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                  placeholder="ejemplo@suraci.com.ar"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Contraseña corporativa
              </label>
              <div className="mt-2.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600">
                  Recordar sesión
                </label>
              </div>

              <div className="text-xs">
                <a href="#recuperar" className="font-semibold text-blue-700 hover:text-blue-800 transition-colors">
                  ¿Olvidó sus claves?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                id="btn-submit-login"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all disabled:opacity-50"
              >
                {loading ? 'Validando Credenciales...' : 'Ingresar Seguro'}
              </button>
            </div>
          </form>

          {/* Quick Demonstrator login section */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <div className="relative flex justify-center text-xs uppercase tracking-wider mb-4">
              <span className="bg-white px-3 text-slate-400 font-semibold text-[10px]">Demostración rápida</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={() => handleQuickLogin('executive')}
                type="button"
                className="flex items-center justify-between px-3.5 py-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 rounded-lg text-xs font-semibold text-slate-700 transition-colors text-left"
              >
                <span className="flex items-center gap-2"><Shield size={14} className="text-blue-700" /> Rol CEO / Director</span>
                <span className="text-[10px] text-slate-400 font-mono">director@suraci.com.ar</span>
              </button>
              <button
                onClick={() => handleQuickLogin('inspector')}
                type="button"
                className="flex items-center justify-between px-3.5 py-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 rounded-lg text-xs font-semibold text-slate-700 transition-colors text-left"
              >
                <span className="flex items-center gap-2"><Shield size={14} className="text-emerald-700" /> Rol Auditor de Red</span>
                <span className="text-[10px] text-slate-400 font-mono">auditor.zonal@suraci.com</span>
              </button>
              <button
                onClick={() => handleQuickLogin('franchisee')}
                type="button"
                className="flex items-center justify-between px-3.5 py-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 rounded-lg text-xs font-semibold text-slate-700 transition-colors text-left"
              >
                <span className="flex items-center gap-2"><Shield size={14} className="text-indigo-700" /> Rol Franquiciado</span>
                <span className="text-[10px] text-slate-400 font-mono">franquiciado.palermo@...</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
