import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Bot, Loader2, SendHorizonal, Sparkles } from "lucide-react";
import { Kicker } from "@jpglabs/cartesian-ui";
import { portfolioApiBaseUrl } from "../lib/portfolio-api";

type OperatorAssistantProps = {
  accessToken: string;
  role: string;
};

export default function OperatorAssistant({ accessToken, role }: OperatorAssistantProps) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${portfolioApiBaseUrl}/api/chat`,
      headers: {
        "x-jpg-frontend-token": accessToken,
      },
    }),
  });

  const isWorking = status === "submitted" || status === "streaming";

  return (
    <div className="min-h-screen bg-[#050505] p-8 text-white">
      <header className="mb-8 rounded-[32px] border border-white/5 bg-white/[0.02] p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Kicker color="accent" spacing="wide">AI SDK Frontend</Kicker>
            <h1 className="mt-3 flex items-center gap-3 text-3xl font-black tracking-tighter">
              <Bot className="text-red-500" />
              Operator Assistant
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-400">
              Conversational and agentic surface for Pi operations, maintenance diagnostics, CRUD
              assistance, and internal execution support.
            </p>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4">
            <Kicker color="accent">Authenticated role</Kicker>
            <p className="mt-2 text-lg font-black text-white">{role}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[32px] border border-white/5 bg-white/[0.02] p-6">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-white/10 bg-black/20 p-8 text-gray-400">
                Ask for Pi diagnostics, maintenance actions, CRUD support, or an execution plan.
              </div>
            ) : null}

            {messages.map((message) => (
              <article
                key={message.id}
                className={`rounded-[28px] border p-5 ${
                  message.role === "user"
                    ? "border-red-500/20 bg-red-500/10"
                    : "border-white/5 bg-black/30"
                }`}
              >
                <Kicker>{message.role}</Kicker>
                <div className="mt-3 space-y-3 text-sm leading-7 text-gray-200">
                  {(message.parts ?? []).map((part, index) => {
                    if (part.type === "text") {
                      return <p key={`${message.id}-${index}`}>{part.text}</p>;
                    }

                    return null;
                  })}
                </div>
              </article>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              const nextMessage = input.trim();

              if (!nextMessage || isWorking) {
                return;
              }

              sendMessage({ text: nextMessage });
              setInput("");
            }}
            className="mt-6 flex flex-col gap-3 rounded-[28px] border border-white/5 bg-black/30 p-4"
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={4}
              placeholder="Ask for runtime checks, infra sequencing, CRUD guidance, or Pi maintenance actions."
              className="w-full resize-none rounded-2xl border border-white/10 bg-[#0b0d12] px-4 py-4 text-sm text-white outline-none transition-all focus:border-red-500/40"
            />

            <div className="flex items-center justify-between gap-4">
              <Kicker color="faint">
                {isWorking ? "Streaming response" : "Ready"}
              </Kicker>

              <button
                type="submit"
                disabled={isWorking || !input.trim()}
                className="inline-flex items-center gap-3 rounded-2xl bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.24em] text-white transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isWorking ? <Loader2 size={16} className="animate-spin" /> : <SendHorizonal size={16} />}
                Send
              </button>
            </div>
          </form>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[32px] border border-white/5 bg-white/[0.02] p-6">
            <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-white">
              <Sparkles size={16} className="text-red-500" />
              Suggested prompts
            </h2>
            <div className="mt-5 space-y-3">
              {[
                "Summarize the current Pi runtime health and point out risks.",
                "Plan the next safe maintenance actions for the Pi dashboard lane.",
                "Help me reason about a CRUD flow for portfolio data updates.",
                "Turn the current infra blockers into a clear action list.",
              ].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setInput(prompt)}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-left text-sm text-gray-300 transition-all hover:border-red-500/30 hover:bg-white/[0.04]"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
