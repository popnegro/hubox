import { cn } from "@/lib/utils";
import { User, Sparkles } from "lucide-react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex items-start gap-4", isUser ? "" : "bg-canvas/50 rounded-lg p-4")}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
        isUser ? "bg-lorenzo-100 text-lorenzo-600" : "bg-lorenzo text-white"
      )}>
        {isUser ? <User className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </div>
      <div className="flex-1 space-y-2 pt-1">
        <p className="font-semibold text-ink">{isUser ? "Tú" : "AI Copilot"}</p>
        <p className="leading-relaxed text-ink/90">{message.content}</p>
      </div>
    </div>
  );
}
