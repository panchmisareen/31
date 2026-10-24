import React, { useState } from 'react';
import { 
  GitPullRequest, GitBranch, Award, Trophy, Star, MessageSquare, 
  BookOpen, ExternalLink, ShieldCheck, CheckCircle2, UserCheck, 
  Sparkles, Terminal, Flame, Check, HelpCircle 
} from 'lucide-react';

export default function OpenSourceHub({ currentUser, onUpdateProfile, openSourceData = {}, leaderboard = [] }) {
  const [githubInput, setGithubInput] = useState(currentUser.githubUsername || '');
  const [gitlabInput, setGitlabInput] = useState(currentUser.gitlabUsername || '');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('issues'); // 'issues' | 'repos' | 'guides' | 'mentors' | 'leaderboard'
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const { curatedRepos = [], goodFirstIssues = [], cheatSheets = [], mentors = [] } = openSourceData;

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await onUpdateProfile({
      userId: currentUser.id,
      githubUsername: githubInput,
      gitlabUsername: gitlabInput
    });
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const filteredIssues = goodFirstIssues.filter(issue => {
    if (difficultyFilter === 'All') return true;
    return issue.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
  });

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/60 to-indigo-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full">
            <GitPullRequest className="w-3.5 h-3.5 text-purple-400" />
            <span>Open Source Portfolio & Contributor Sprint</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-outfit">
            Open-Source Contributor Hub
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Link your GitHub/GitLab, track your merged Pull Requests in real-time during hackathons, pick up beginner-friendly <code>good-first-issues</code>, and earn automatic verifiable Cloudinary milestone badges!
          </p>

          {/* Live Discord/Slack Floating Action */}
          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Join Live Hackathon Discord (#debugging-room)</span>
            </a>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              14 Mentors Online Right Now
            </span>
          </div>
        </div>
      </div>

      {/* Contributor Profile & Live PR Tracker Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* GitHub / GitLab Account Connection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Open Source Portfolio Links</h3>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-2 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">GitHub Username</label>
                <input
                  type="text"
                  value={githubInput}
                  onChange={(e) => setGithubInput(e.target.value)}
                  placeholder="e.g. aarav-sharma-dev"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-purple-500 text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">GitLab Username</label>
                <input
                  type="text"
                  value={gitlabInput}
                  onChange={(e) => setGitlabInput(e.target.value)}
                  placeholder="e.g. aarav_sharma"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-purple-500 text-xs"
                />
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Links Saved to Profile!</span>
                  </>
                ) : isSaving ? (
                  <span>Saving...</span>
                ) : (
                  <span>Save Contributor Handles</span>
                )}
              </button>
            </form>
          </div>

          {/* Live PR & Contribution Tracker Counters */}
          <div className="md:col-span-2 grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">PRs Submitted</span>
              <span className="text-3xl font-extrabold text-white block">{currentUser.prsSubmitted || 8}</span>
              <span className="text-[11px] text-purple-400 font-semibold">Across 4 Repos</span>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">PRs Merged</span>
              <span className="text-3xl font-extrabold text-emerald-400 block">{currentUser.prsMerged || 6}</span>
              <span className="text-[11px] text-emerald-300 font-semibold">75% Merge Rate</span>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Hackathon Points</span>
              <span className="text-3xl font-extrabold text-amber-300 block">{currentUser.points || 480}</span>
              <span className="text-[11px] text-amber-400 font-semibold">Rank #1 Leaderboard</span>
            </div>
          </div>
        </div>

        {/* Milestone Badges Strip with Dynamic Cloudinary Badges */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Earned Milestone Badges & Cloudinary Credentials</span>
            </h4>
            <span className="text-[11px] text-indigo-400 font-mono">Edge-Rendered via Cloudinary URL API</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(currentUser.badges || []).map((badge) => (
              <div
                key={badge.id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center gap-3 hover:border-purple-500/40 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold shrink-0">
                  🏅
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">{badge.name}</div>
                  <div className="text-[11px] text-amber-300 font-semibold">{badge.level}</div>
                  <a
                    href={badge.cloudinaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 underline block mt-0.5 truncate"
                  >
                    Inspect Cloudinary Badge URL →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('issues')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'issues' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Good First Issues ({goodFirstIssues.length})
          </button>
          <button
            onClick={() => setActiveTab('repos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'repos' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Curated Repositories ({curatedRepos.length})
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'guides' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Git Cheat Sheets & Rules
          </button>
          <button
            onClick={() => setActiveTab('mentors')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'mentors' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Active Mentors ({mentors.length})
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              activeTab === 'leaderboard' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Live Leaderboard
          </button>
        </div>

        {activeTab === 'issues' && (
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400">Level:</span>
            {['All', 'Beginner', 'Intermediate'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setDifficultyFilter(lvl)}
                className={`px-2.5 py-0.5 rounded-lg font-bold text-[11px] transition ${
                  difficultyFilter === lvl ? 'bg-slate-800 text-purple-300 border border-purple-500/40' : 'text-slate-400'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SUB-VIEW 1: GOOD FIRST ISSUES FEED */}
      {activeTab === 'issues' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredIssues.map(issue => (
            <div
              key={issue.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-purple-500/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-purple-400 font-bold bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md">
                    {issue.repo}
                  </span>
                  <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                    +{issue.points} Points
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mt-2 leading-snug">
                  {issue.title}
                </h4>

                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {issue.label}
                  </span>
                  <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {issue.difficulty}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Available to Claim</span>
                <a
                  href={issue.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition shadow-md shadow-purple-600/20"
                >
                  <span>Solve on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-VIEW 2: CURATED REPOSITORIES */}
      {activeTab === 'repos' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {curatedRepos.map(repo => (
            <div
              key={repo.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-purple-500/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400">{repo.org}</span>
                  <span className="flex items-center gap-1 text-xs text-amber-300 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    {repo.stars}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mt-1">{repo.name}</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{repo.description}</p>
                
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>Stack: <strong className="text-slate-200">{repo.language}</strong></span>
                  <span className="text-emerald-400 font-semibold">{repo.goodFirstIssuesCount} Open Issues</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Maintainer: {repo.maintainer}</span>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  <span>Fork & Star</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-VIEW 3: GIT CHEAT SHEETS & RULES */}
      {activeTab === 'guides' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cheatSheets.map((guide, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                  {guide.category}
                </span>
              </div>
              <h4 className="text-base font-bold text-white">{guide.title}</h4>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                {guide.content}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-VIEW 4: ACTIVE MENTORS DIRECTORY */}
      {activeTab === 'mentors' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {mentors.map((m, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{m.name}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="Online" />
              </div>
              <div className="text-xs text-purple-400 font-semibold">{m.role}</div>
              
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Expertise:</span>
                <div className="flex flex-wrap gap-1">
                  {m.specialties.map((spec, i) => (
                    <span key={i} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-xs flex items-center justify-between">
                <span className="text-slate-400 font-mono text-[11px]">{m.discordTag}</span>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white font-bold rounded-lg text-xs transition"
                >
                  Ping on Discord
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-VIEW 5: LIVE CONTRIBUTOR LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Hackathon Sprint Leaderboard
              </h3>
              <p className="text-xs text-slate-400">Ranked by merged pull requests and community bounty points</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Live Synchronized
            </span>
          </div>

          <div className="space-y-2">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition ${
                  user.rank === 1
                    ? 'bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border-amber-500/40 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                    user.rank === 1 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    #{user.rank}
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{user.name}</span>
                      <span className="bg-purple-500/20 text-purple-300 text-[10px] px-1.5 py-0.2 rounded font-bold border border-purple-500/30">
                        {user.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{user.prsMerged} PRs Merged this week</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-extrabold text-amber-300">{user.points} pts</div>
                  <span className="text-[10px] text-emerald-400 font-semibold">Active Contributor</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
