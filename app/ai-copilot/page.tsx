import { Topbar } from "@/components/layout/Topbar";
import { Chat } from "@/components/ai-copilot/Chat";

export default function AiCopilotPage() {
  return (
    <>
      <Topbar
        title="AI Copilot"
        subtitle="Chat interactivo para análisis de datos y reportes"
      />
      <main className="flex-1 p-6">
        <div className="mx-auto h-full max-w-3xl">
          <Chat />
        </div>
      </main>
    </>
  );
}
