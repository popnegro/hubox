"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage, type Message } from "./ChatMessage";
import { Send } from "lucide-react";

const initialMessages: Message[] = [
    {
        role: "assistant",
        content: "Hola, soy tu copiloto de IA. Estoy aquí para ayudarte a analizar datos, generar reportes o responder preguntas sobre la performance de Customer Experience. ¿En qué puedo ayudarte hoy?"
    }
]

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
        const assistantMessage: Message = {
            role: "assistant",
            content: `Esta es una respuesta simulada para tu pregunta: "${currentInput}". En una implementación real, me conectaría a la API de OpenAI para generar una respuesta basada en tu consulta y los datos del concesionario.`
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-full max-h-[calc(100vh-10rem)] flex-col">
      <div className="flex-1 space-y-8 overflow-y-auto rounded-xl2 border border-line bg-surface p-6 shadow-card">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {isLoading && <ChatMessage message={{role: 'assistant', content: "Pensando..."}} />}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                }
            }}
            placeholder="Ej: ¿Cuál es la sucursal con el NPS más bajo este mes?"
            className="w-full resize-none rounded-lg border border-line bg-surface p-4 pr-14 text-ink shadow-sm focus:border-lorenzo focus:ring-lorenzo"
            rows={2}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-lorenzo text-white transition-colors hover:bg-lorenzo-light disabled:bg-lorenzo/50"
            disabled={isLoading || !input.trim()}
            aria-label="Enviar mensaje"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
