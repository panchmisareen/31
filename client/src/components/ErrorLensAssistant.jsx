import React, { useState } from 'react';
import { Sparkles, Terminal, Bug, HelpCircle, CheckCircle, ArrowRight, Lightbulb, Code2 } from 'lucide-react';

export default function ErrorLensAssistant({ setActiveTab }) {
  const [mode, setMode] = useState('debugger'); // 'debugger' | 'doubts'
  
  // Debugger inputs
  const [errorMessage, setErrorMessage] = useState('TypeError: Cannot read properties of undefined (reading "map")');
  const [codeSnippet, setCodeSnippet] = useState(`function EventList({ events }) {\n  return (\n    <ul>\n      {events.items.map(e => (\n        <li key={e.id}>{e.title}</li>\n      ))}\n    </ul>\n  );\n}`);
  const [language, setLanguage] = useState('javascript');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  // Platform doubt inputs
  const [userQuery, setUserQuery] = useState('');
  const [doubtResponse, setDoubtResponse] = useState(null);
  const [isAsking, setIsAsking] = useState(false);

  const handleDiagnose = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setDiagnosis(null);
    try {
      const res = await fetch('/api/ai/debug-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          errorMessage,
          codeSnippet,
          language
        })
      });
      const data = await res.json();
      setDiagnosis(data);
    } catch (err) {
      alert('ErrorLens failed: ' + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAskDoubt = async (e) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    setIsAsking(true);
    setDoubtResponse(null);
    try {
      const res = await fetch('/api/ai/ask-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userQuery })
      });
      const data = await res.json();
      setDoubtResponse(data);
    } catch (err) {
      alert('Doubt resolution failed: ' + err.message);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/60 to-indigo-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold px-3 py-1 rounded-full">
            <Bug className="w-3.5 h-3.5 text-rose-400" />
            <span>Problem Statement 3: ErrorLens AI Tutor</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-outfit">
            ErrorLens: Explain Programming Errors & Navigate EventHub
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Beginner developers often copy-paste errors blindly. <strong>ErrorLens</strong> acts as an AI debugging mentor: it diagnoses the root cause, offers guiding hints, provides minimal test solutions, and tests your understanding with follow-up conceptual checks!
          </p>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl w-fit">
        <button
          onClick={() => setMode('debugger')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
            mode === 'debugger' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bug className="w-4 h-4" />
          Code Error Debugger & Tutor
        </button>
        <button
          onClick={() => setMode('doubts')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
            mode === 'doubts' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Platform Guide & Doubts Assistant
        </button>
      </div>

      {/* MODE 1: CODE ERROR DEBUGGER */}
      {mode === 'debugger' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-rose-400" />
              Paste Compiler / Runtime Error & Code
            </h3>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              >
                <option value="javascript">JavaScript / TypeScript</option>
                <option value="python">Python</option>
                <option value="rust">Rust</option>
                <option value="sql">SQL</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Error Message *</label>
              <input
                type="text"
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
                placeholder="e.g. TypeError: Cannot read properties of undefined..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-rose-300 font-mono focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Code Snippet *</label>
              <textarea
                rows={8}
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              onClick={handleDiagnose}
              disabled={isAnalyzing}
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              {isAnalyzing ? 'ErrorLens AI Analyzing Code...' : '⚡ Diagnose Error & Teach Solution'}
            </button>
          </div>

          {/* AI Pedagogical Tutor Output */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  ErrorLens Pedagogical Diagnosis
                </h3>
                {diagnosis && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    Pedagogical Solution
                  </span>
                )}
              </div>

              {!diagnosis ? (
                <div className="py-20 text-center text-slate-400 space-y-3">
                  <Code2 className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-xs">
                    Click <span className="text-rose-400 font-bold">"Diagnose Error & Teach Solution"</span> to see root cause analysis, pedagogical hints, and follow-up checks.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-4 text-xs">
                  {/* Root Cause */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-rose-400">Root Cause:</span>
                    <p className="text-slate-200 leading-relaxed font-medium">{diagnosis.rootCause}</p>
                  </div>

                  {/* Pedagogical Hint */}
                  <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" /> Guiding Hint Before Fix:
                    </span>
                    <p className="text-amber-200 leading-relaxed">{diagnosis.pedagogicalHint}</p>
                  </div>

                  {/* Corrected Code */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-400">Corrected Code:</span>
                    <pre className="text-emerald-300 font-mono text-[11px] overflow-x-auto p-2 bg-slate-900 rounded-lg">
                      {diagnosis.correctedCode}
                    </pre>
                    <p className="text-[11px] text-slate-400 mt-1">{diagnosis.explanationOfFix}</p>
                  </div>

                  {/* Follow-up check question */}
                  {diagnosis.followUpCheck && (
                    <div className="bg-indigo-950/40 border border-indigo-500/30 p-3.5 rounded-xl text-xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-indigo-300">Understanding Check Question:</span>
                      <p className="text-slate-300 italic">{diagnosis.followUpCheck}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: PLATFORM GUIDE & DOUBTS */}
      {mode === 'doubts' && (
        <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-bold text-white font-outfit">
              Ask EventHub Platform Assistant
            </h3>
            <p className="text-xs text-slate-400">
              Have questions about tickets, refunds, submitting event ideas, or finding cybersecurity lectures?
            </p>
          </div>

          <form onSubmit={handleAskDoubt} className="flex gap-2">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="e.g. How do I get my hackathon ticket or watch finance lectures?"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isAsking}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
            >
              {isAsking ? 'Thinking...' : 'Ask AI'}
            </button>
          </form>

          {/* Quick preset queries */}
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="text-slate-500 text-[11px]">Popular Doubts:</span>
            <button
              onClick={() => {
                setUserQuery('How do I download my ticket and pass?');
              }}
              className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-indigo-300 rounded-lg border border-slate-800 text-[11px]"
            >
              🎟️ How do I download my ticket?
            </button>
            <button
              onClick={() => {
                setUserQuery('Where can I watch guest lectures on personal finance?');
              }}
              className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-cyan-300 rounded-lg border border-slate-800 text-[11px]"
            >
              💰 Where are personal finance lectures?
            </button>
          </div>

          {doubtResponse && (
            <div className="bg-slate-950 border border-indigo-500/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>EventHub AI Assistant</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{doubtResponse.answer}</p>
              {doubtResponse.relevantTab && (
                <button
                  onClick={() => setActiveTab(doubtResponse.relevantTab)}
                  className="px-3.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg text-xs font-bold border border-indigo-500/30 flex items-center gap-1.5 transition"
                >
                  <span>Go to {doubtResponse.relevantTab} Section</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
