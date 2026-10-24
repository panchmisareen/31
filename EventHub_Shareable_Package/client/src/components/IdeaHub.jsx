import React, { useState } from 'react';
import { Lightbulb, ThumbsUp, CheckCircle, XCircle, ArrowUpRight, Sparkles, TrendingUp, AlertCircle, FileText, Plus } from 'lucide-react';
import SubmitIdeaModal from './SubmitIdeaModal';

export default function IdeaHub({ ideas, onUpvote, onReview, onConvertToEvent, onNewIdea, currentUser }) {
  const [filter, setFilter] = useState('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedIdeaForReview, setSelectedIdeaForReview] = useState(null);
  const [reviewComment, setReviewComment] = useState('');

  const filteredIdeas = ideas.filter(idea => {
    if (filter === 'all') return true;
    return idea.status === filter;
  });

  const isFacultyOrOrganizer = currentUser.role === 'faculty' || currentUser.role === 'organizer';

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-purple-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Crowdsourced Campus Innovation</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-outfit">
            Idea Incubator & Faculty Approval Pipeline
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Have a brilliant concept for a hackathon, robotics duel, or workshop? Propose it here!
            Our LLM co-pilot scores feasibility, estimates budgets, and structures an executive brief for faculty review.
            Approved ideas are converted directly into live college events.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              Propose an Event Idea
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/60 border border-slate-800 px-3 py-2 rounded-xl">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Includes AI Feasibility & Budget Breakdown</span>
            </div>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Proposals ({ideas.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'pending' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Under Review
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'approved' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Faculty Approved
          </button>
          <button
            onClick={() => setFilter('converted')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'converted' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Live Events
          </button>
        </div>

        {isFacultyOrOrganizer && (
          <div className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-xl font-semibold flex items-center gap-2">
            <span>👩‍🏫 You have Faculty Review & Conversion privileges</span>
          </div>
        )}
      </div>

      {/* Ideas List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIdeas.map((idea) => {
          const hasUpvoted = idea.upvotedBy?.includes(currentUser.id);
          const score = idea.aiAnalysis?.feasibilityScore || 80;

          return (
            <div
              key={idea.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                {/* Header: Proposer & Status Pill */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400">
                      Proposed by <span className="text-slate-200 font-bold">{idea.proposedBy?.name}</span>
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                      {idea.title}
                    </h3>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${
                      idea.status === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : idea.status === 'converted'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                        : idea.status === 'rejected'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {idea.status === 'converted'
                      ? '🚀 Converted to Event'
                      : idea.status === 'approved'
                      ? '✓ Faculty Approved'
                      : idea.status === 'rejected'
                      ? '✗ Needs Revision'
                      : '⏳ Under Review'}
                  </span>
                </div>

                {/* Concept text */}
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {idea.concept}
                </p>

                {/* Audience & Budget Metadata */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Audience</span>
                    <span className="text-white font-medium truncate block">{idea.targetAudience}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Budget</span>
                    <span className="text-amber-300 font-bold block">{idea.estimatedBudget}</span>
                  </div>
                </div>

                {/* AI Feasibility Card */}
                {idea.aiAnalysis && (
                  <div className="mt-4 bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-500/30 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>AI Feasibility Score</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-extrabold text-white">{score}</span>
                        <span className="text-xs text-slate-400">/100</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          score >= 80 ? 'bg-emerald-400' : score >= 65 ? 'bg-amber-400' : 'bg-rose-400'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-300 italic">
                      "{idea.aiAnalysis.executivePitch}"
                    </p>

                    {/* Budget & Resources breakdown toggle details */}
                    <details className="text-[11px] text-slate-400 pt-1 cursor-pointer">
                      <summary className="font-semibold text-indigo-400 hover:text-indigo-300">
                        View AI Resource & Budget Checklist
                      </summary>
                      <div className="mt-2 space-y-2 border-t border-slate-800/80 pt-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400">Estimated Budget Items:</span>
                          <ul className="mt-1 space-y-0.5 text-slate-300">
                            {idea.aiAnalysis.budgetBreakdown?.map((b, i) => (
                              <li key={i} className="flex justify-between text-[11px]">
                                <span>{b.item}</span>
                                <span className="font-bold text-amber-300">{b.estimatedCost}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </details>
                  </div>
                )}

                {/* Faculty Review Feedback if available */}
                {idea.facultyReview && (
                  <div className="mt-3 bg-slate-800/60 border border-slate-700/80 rounded-xl p-3 text-xs">
                    <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <span>Reviewed by {idea.facultyReview.reviewedBy}</span>
                    </div>
                    <p className="text-slate-300 mt-1 italic">
                      "{idea.facultyReview.comment}"
                    </p>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
                {/* Upvote button */}
                <button
                  onClick={() => onUpvote(idea.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                    hasUpvoted
                      ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md shadow-amber-400/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{idea.upvotes || 0} Upvotes</span>
                </button>

                {/* Faculty review / convert buttons */}
                {isFacultyOrOrganizer && (
                  <div className="flex items-center gap-2">
                    {idea.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onReview(idea.id, 'approved', 'Approved by Faculty for student community execution.')}
                          className="px-2.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold rounded-lg border border-emerald-500/30 transition flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Approve
                        </button>
                        <button
                          onClick={() => onReview(idea.id, 'rejected', 'Requires budget refinement before approval.')}
                          className="px-2.5 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-bold rounded-lg border border-rose-500/30 transition flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </>
                    )}

                    {idea.status === 'approved' && (
                      <button
                        onClick={() => onConvertToEvent(idea.id)}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-purple-600/30 transition flex items-center gap-1.5"
                      >
                        <span>🚀 Launch Live Event</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Propose Idea Modal */}
      {isSubmitModalOpen && (
        <SubmitIdeaModal
          onClose={() => setIsSubmitModalOpen(false)}
          onSubmit={onNewIdea}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}
