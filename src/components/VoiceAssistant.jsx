import { Mic, Send, X } from "lucide-react";
import { useState } from "react";

const suggestions = [
  "Open my Aadhaar",
  "Show my reminders",
  "Share my degree certificate",
  "Who accessed my PAN?",
  "Add a life event",
  "Turn on elder mode",
];

export default function VoiceAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-300 transition hover:bg-indigo-700 dark:shadow-indigo-950"
        aria-label="Open voice assistant"
      >
        <Mic size={24} />
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-4 text-white">
            <div>
              <p className="text-sm text-indigo-100">DigiNest Voice</p>
              <h3 className="text-lg font-semibold">How can I help?</h3>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-white/15" aria-label="Close assistant">
              <X size={18} />
            </button>
          </div>
          <div className="space-y-3 p-5">
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Voice capture is mocked for the demo. Try a suggested command.
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button key={item} type="button" className="rounded-full bg-indigo-50 px-3 py-2 text-sm text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-200">
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 p-2 dark:border-slate-700">
              <input className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none dark:text-white" placeholder="Type a command" />
              <button className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-white" type="button" aria-label="Send command">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
