import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Sparkles, Send, Bot, User, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export default function SuraciAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      sender: 'bot',
      text: '¡Hola! Soy Suraci AI, su asesor virtual experto en expansión de marcas y estandarización operativa. ¿En qué puedo asistirle hoy respecto a manuales, auditorías, requisitos de obra o cálculos de regalías?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    const query = (textOverride || inputVal).trim();
    if (!query) return;

    // Add user message
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate smart corporate response based on keywords
    setTimeout(() => {
      setIsTyping(false);
      let responseText = '';

      const lower = query.toLowerCase();

      if (lower.includes('manual') || lower.includes('proceso') || lower.includes('operación')) {
        responseText = 'De acuerdo con el **Manual de Operaciones y Procesos Diarios (v2.6)**, todos los locales deben iniciar la apertura de llaves exactamente **60 minutos antes** de levantar persianas. El check de temperaturas de heladeras de alimentos perecederos debe registrar valores de **2°C a 5°C** obligatoriamente.';
      } else if (lower.includes('obra') || lower.includes('apertura') || lower.includes('potencia') || lower.includes('requisito')) {
        responseText = 'Los requisitos técnicos mínimos aprobados por el departamento de arquitectura de **Suraci OS** para locales comerciales son: **Superficie mínima de 80 m² cubiertos**, fachada lineal mínima de 6 metros, y una acometida de potencia eléctrica trifásica estable de **35 kW instalados** para soportar hornos, cafeteras de 9 bar y sistemas de climatización simultáneos.';
      } else if (lower.includes('auditor') || lower.includes('control') || lower.includes('calidad') || lower.includes('bromatol')) {
        responseText = 'El protocolo de **Auditoría de Calidad Bromatológica** se ejecuta mediante inspecciones trimestrales no anunciadas. Cualquier desvío crítico reportado por el auditor zonal de Suraci activa una alerta automática en el Panel Ejecutivo, otorgando un plazo máximo de **48 horas hábiles** para asentar pruebas de subsanación técnica.';
      } else if (lower.includes('regal') || lower.includes('pago') || lower.includes('costo') || lower.includes('finan')) {
        responseText = 'La estructura de pagos y regalías de la red de franquicias de **Suraci OS** contempla una regalía mensual equivalente al **5% neto de las ventas declaradas** por sistema de facturación corporativo homologado, abonada del 1 al 10 de cada mes vencido.';
      } else if (lower.includes('expansion') || lower.includes('prospect') || lower.includes('crm') || lower.includes('lead')) {
        responseText = 'El embudo comercial de expansión de franquicias cuenta con 5 etapas mandatorias: **Calificación comercial, Reunión zonal, Evaluación técnica del local, Envío de contratos legales, y Firma final con entrega de llaves**. Se recomienda registrar cada nota en el CRM para conservar auditoría de los negociadores.';
      } else {
        responseText = 'Entiendo su consulta. Respecto a la administración de locales comerciales Suraci, le recomiendo verificar la pestaña de **Manuales de Procesos** para revisar recetas e imagen de marca oficiales, o consultar directamente al supervisor zonal asignado en su Panel de Franquiciado.';
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'm-init',
        sender: 'bot',
        text: 'Ecosistema de asistencia virtual restablecido. ¿Qué duda de operación o expansión comercial puedo evacuar para usted?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const PRESETS = [
    '¿Cuáles son los requisitos técnicos de un local?',
    '¿Qué dice el manual de apertura diaria?',
    '¿Cómo funciona el scoring de auditoría?',
    '¿A cuánto equivale el pago de regalías?'
  ];

  return (
    <div id="ai-chat-view" className="space-y-6 fade-in h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
        <div>
          <h1 className="text-xl font-display font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles size={18} className="text-blue-700 animate-pulse" /> Asistente de IA Suraci OS
          </h1>
          <p className="text-xs text-slate-500">Inteligencia Artificial generativa entrenada sobre el 100% de los manuales y contratos de la red.</p>
        </div>
        <button
          onClick={handleClearChat}
          className="text-slate-400 hover:text-red-600 p-2 rounded-lg transition-colors"
          title="Limpiar Conversación"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Main chat interface split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Left pane: Conversational feed */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
          {/* Scrollable message bubble field */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                    isBot ? 'bg-blue-50 text-blue-800 border-blue-100' : 'bg-slate-900 text-white border-slate-950'
                  }`}>
                    {isBot ? <Bot size={14} /> : <User size={14} />}
                  </div>

                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 ${
                    isBot ? 'bg-slate-50 text-slate-800 border border-slate-100' : 'bg-blue-700 text-white'
                  }`}>
                    {/* Parse simple markdown bold stars */}
                    <p className="font-sans">
                      {msg.text.split('**').map((part, index) => 
                        index % 2 === 1 ? <strong key={index} className={isBot ? 'text-slate-900 font-bold' : 'text-white font-bold'}>{part}</strong> : part
                      )}
                    </p>
                    <span className={`text-[9px] block text-right font-mono mt-1 ${isBot ? 'text-slate-400' : 'text-blue-200'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-800 border border-blue-100 flex items-center justify-center">
                  <Bot size={14} />
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-400 flex items-center gap-1.5 font-sans">
                  <span>Suraci AI está redactando respuesta</span>
                  <span className="flex gap-0.5 mt-1">
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Chat Form Input Bar */}
          <form onSubmit={(e) => handleSendMessage(e)} className="p-4 border-t border-slate-100 flex gap-2.5 bg-slate-50/50">
            <input
              type="text"
              placeholder="Escriba aquí su consulta sobre manuales, obras o expansión..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors disabled:opacity-40 shrink-0 flex items-center gap-1.5"
            >
              Consultar <Send size={13} />
            </button>
          </form>
        </div>

        {/* Right pane: Smart prompt presets */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 shadow-sm p-5 rounded-2xl flex flex-col justify-between h-full">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xs text-slate-400 uppercase tracking-widest">Preguntas frecuentes</h3>
            <p className="text-[11px] text-slate-500 font-medium">Haga clic en cualquiera de las consultas preparadas para simular una consulta inmediata al motor Suraci AI.</p>
            
            <div className="space-y-2 pt-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleSendMessage(undefined, preset)}
                  className="w-full text-left p-3 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/10 rounded-xl bg-white text-slate-700 text-xs font-semibold flex items-center justify-between group transition-all"
                >
                  <span className="truncate max-w-[200px]">{preset}</span>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl mt-6">
            <h4 className="font-bold text-[10px] text-blue-800 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Bot size={12} /> Nota de privacidad corporativa
            </h4>
            <p className="text-[9px] text-blue-900/80 leading-relaxed font-sans">
              La IA opera de forma local y privada dentro del entorno empresarial de Suraci OS. Toda la información comercial se encuentra cifrada bajo los términos del acuerdo de confidencialidad NDA.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
