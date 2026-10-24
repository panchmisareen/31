import React, { useState } from 'react';
import { X, Sparkles, Lightbulb, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

export default function SubmitIdeaModal({ onClose, onSubmit, currentUser }) {
  const [title, setTitle] = useState('');
  const [concept, setConcept] = useState('');
  const [targetAudience, setTargetAudience] = useState('All B.Tech & Computer Applications Students');
  const [estimatedBudget, setEstimatedBudget] = useState('₹25,000');
  const [proposedDates, setProposedDates] = useState('Next Month (Weekend)');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiPreview, setAiPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick preset inspirations
  const loadPreset = (presetType) => {
    if (presetType === 'ai-hack') {
      setTitle('Agentic AI 24h Hackathon');
      setConcept('Teams build autonomous multi-agent systems using open-weight models to solve university administrative workflows and campus logistics.');
      setTargetAudience('CSE, AI, and Software Engineering Students (approx. 200 participants)');
      setEstimatedBudget('₹30,000');
    } else if (presetType === 'gaming') {
      setTitle('Campus Esports & Game Development Conclave');
      setConcept('Two-part event: Day 1 workshops on Unreal Engine & Unity asset pipelines with Cloudinary video previews; Day 2 collegiate LAN tournament.');
      setTargetAudience('Campus gamers and aspiring game developers');
      setEstimatedBudget('₹40,000');
    }
  };

  const handleAiPolish = async () => {
    if (!title || !concept) {
      alert('Please enter at least a title and a brief concept first!');
      return;
    }
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai/enhance-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          concept,
          targetAudience,
          estimatedBudget,
          proposedDates
        })
      });
      const data = await res.json();
      setAiPreview(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !concept) return;
    setIsSubmitting(true);
    await onSubmit({
      title,
      concept,
      targetAudience,
      estimatedBudget,
      proposedDates,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        role: currentUser.role
      }
    });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Propose Campus Event Idea</h3>
              <p className="text-xs text-slate-400">Submit an event concept for faculty approval & sponsorship</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Quick presets */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Try an idea:</span>
            <button
              type="button"
              onClick={() => loadPreset('ai-hack')}
              className="bg-slate-800 hover:bg-slate-700 text-indigo-300 px-2.5 py-1 rounded-lg border border-slate-700 transition"
            >
              🤖 Agentic AI Hackathon
            </button>
            <button
              type="button"
              onClick={() => loadPreset('gaming')}
              className="bg-slate-800 hover:bg-slate-700 text-purple-300 px-2.5 py-1 rounded-lg border border-slate-700 transition"
            >
              🎮 Esports & Game Dev
            </button>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. PromptForge: 24-Hour AI Short Film Sprint"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Concept, Theme & Why Students Want This *
            </label>
            <textarea
              required
              rows={3}
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Explain the event format, technical or creative challenges, and why it benefits our campus community..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Target Audience</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Estimated Budget</label>
              <input
                type="text"
                value={estimatedBudget}
                onChange={(e) => setEstimatedBudget(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Proposed Dates</label>
              <input
                type="text"
                value={proposedDates}
                onChange={(e) => setProposedDates(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* AI Pre-Evaluation Trigger */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleAiPolish}
              disabled={isAnalyzing}
              className="w-full py-2.5 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 hover:from-indigo-800/80 hover:to-purple-800/80 border border-indigo-500/40 text-indigo-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              {isAnalyzing ? 'Analyzing with AI Feasibility Engine...' : 'Run AI Co-Pilot: Polish & Score Feasibility First'}
            </button>
          </div>

          {/* AI Preview Result */}
          {aiPreview && (
            <div className="bg-slate-950 border border-indigo-500/40 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  AI Feasibility Score: {aiPreview.feasibilityScore}/100 ({aiPreview.feasibilityRating})
                </span>
              </div>
              <div className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800 italic">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Generated Faculty Pitch:</span>
                "{aiPreview.executivePitch}"
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting Proposal...' : 'Submit to Faculty Council'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
