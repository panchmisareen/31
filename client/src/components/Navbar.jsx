import React from 'react';
import { 
  Calendar, Video, GitPullRequest, Users, Bug, Lightbulb, 
  Award, Cloud, ShieldCheck, UserCheck, Sparkles 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentUser, setCurrentUser, users }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 shadow-2xl">
      {/* Hackathon Criteria Indicator Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 px-4 py-1.5 text-xs font-semibold text-center text-white flex items-center justify-center gap-2 shadow-inner">
        <span className="bg-white/20 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider font-bold">Hacktober HackDays 2026</span>
        <span>☁️ Cloudinary Dynamic Tickets, Certificates, Streaming & ErrorLens AI Mentorship</span>
        <button 
          onClick={() => setActiveTab('cloudinary')} 
          className="ml-2 underline hover:text-blue-200 transition text-[11px] font-bold"
        >
          View Cloudinary Architecture (30%) →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('events')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-xl">
                🎟️
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-outfit">EventHub</span>
                <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  AI + Media
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Campus Events • Collab Studio • Dynamic Credentials</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden xl:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'events' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Events & Tickets
            </button>

            <button
              onClick={() => setActiveTab('lectures')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'lectures' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-blue-400" />
              Online Lectures
            </button>

            <button
              onClick={() => setActiveTab('opensource')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'opensource' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GitPullRequest className="w-3.5 h-3.5 text-purple-400" />
              Open Source Hub
            </button>

            <button
              onClick={() => setActiveTab('collab')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'collab' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              TeamForge Collab
            </button>

            <button
              onClick={() => setActiveTab('errorlens')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'errorlens' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bug className="w-3.5 h-3.5 text-rose-400" />
              ErrorLens AI
            </button>

            <button
              onClick={() => setActiveTab('ideas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ideas' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              Idea Hub
            </button>

            <button
              onClick={() => setActiveTab('participation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'participation' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              My Vault
            </button>

            <button
              onClick={() => setActiveTab('cloudinary')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'cloudinary' ? 'bg-blue-600 text-white shadow-md' : 'text-blue-300 border border-blue-500/30'
              }`}
            >
              <Cloud className="w-3.5 h-3.5 text-blue-400" />
              Cloudinary (30%)
            </button>
          </nav>

          {/* User Persona Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-800/90 border border-slate-700 rounded-xl px-2.5 py-1 shadow-sm">
              <UserCheck className="w-3.5 h-3.5 text-indigo-400 mr-1.5 shrink-0" />
              <select
                value={currentUser.id}
                onChange={(e) => {
                  const selected = users.find(u => u.id === e.target.value);
                  if (selected) setCurrentUser(selected);
                }}
                className="bg-transparent text-indigo-300 text-xs font-bold cursor-pointer outline-none"
              >
                {users.map(u => (
                  <option key={u.id} value={u.id} className="bg-slate-900 text-white">
                    {u.role === 'student' ? '🎓 ' : u.role === 'faculty' ? '👩‍🏫 ' : '⚡ '}
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mobile / Responsive secondary tab bar */}
        <div className="flex xl:hidden overflow-x-auto py-2 border-t border-slate-800/80 gap-1 text-xs">
          <button onClick={() => setActiveTab('events')} className={`px-2.5 py-1 rounded-lg shrink-0 font-bold ${activeTab === 'events' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>Events</button>
          <button onClick={() => setActiveTab('lectures')} className={`px-2.5 py-1 rounded-lg shrink-0 font-bold ${activeTab === 'lectures' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>Lectures</button>
          <button onClick={() => setActiveTab('opensource')} className={`px-2.5 py-1 rounded-lg shrink-0 font-bold ${activeTab === 'opensource' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>Open Source</button>
          <button onClick={() => setActiveTab('collab')} className={`px-2.5 py-1 rounded-lg shrink-0 font-bold ${activeTab === 'collab' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>Team Collab</button>
          <button onClick={() => setActiveTab('errorlens')} className={`px-2.5 py-1 rounded-lg shrink-0 font-bold ${activeTab === 'errorlens' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>ErrorLens AI</button>
          <button onClick={() => setActiveTab('ideas')} className={`px-2.5 py-1 rounded-lg shrink-0 font-bold ${activeTab === 'ideas' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>Idea Hub</button>
          <button onClick={() => setActiveTab('participation')} className={`px-2.5 py-1 rounded-lg shrink-0 font-bold ${activeTab === 'participation' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>My Vault</button>
          <button onClick={() => setActiveTab('cloudinary')} className={`px-2.5 py-1 rounded-lg shrink-0 font-bold ${activeTab === 'cloudinary' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>Cloudinary 30%</button>
        </div>
      </div>
    </header>
  );
}
