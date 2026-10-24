import React, { useState } from 'react';
import { 
  Users, Code, Database, Server, CheckSquare, GitMerge, Sparkles, 
  Play, Save, Check, RefreshCw, AlertCircle, Layers 
} from 'lucide-react';

export default function TeamForgeCollab({ workspaces = [], onSaveWorkspace, onMergeWorkspace }) {
  const [activeWsIndex, setActiveWsIndex] = useState(0);
  const currentWs = workspaces[activeWsIndex] || {
    id: 'team-ws-1',
    teamName: 'Team NeuralKnights',
    projectTitle: 'Smart Campus AI Portal',
    members: ['Aarav Sharma (Lead)', 'Sanya Gupta (Frontend)', 'Kabir Verma (Backend)'],
    frontendCode: `// Frontend: React Component\nimport React from 'react';\n\nexport default function EventBadge() {\n  return (\n    <div className="p-4 bg-indigo-900 rounded-2xl text-white">\n      <h3>Campus Event</h3>\n    </div>\n  );\n}`,
    backendCode: `// Backend: Express API Endpoint\napp.post('/api/tickets/scan', (req, res) => {\n  res.json({ verified: true, timestamp: Date.now() });\n});`,
    databaseSchema: `-- Database Schema: PostgreSQL\nCREATE TABLE attendees (\n  id UUID PRIMARY KEY,\n  ticket_code VARCHAR(30) UNIQUE NOT NULL\n);`,
    tasks: [
      { id: 1, title: 'Integrate Cloudinary text overlays', assignedTo: 'Sanya', status: 'done' },
      { id: 2, title: 'Connect ErrorLens AI Tutor to chat', assignedTo: 'Kabir', status: 'in-progress' }
    ]
  };

  const [activeCodeTab, setActiveCodeTab] = useState('frontend'); // 'frontend' | 'backend' | 'database' | 'tasks'
  const [frontendCode, setFrontendCode] = useState(currentWs.frontendCode);
  const [backendCode, setBackendCode] = useState(currentWs.backendCode);
  const [databaseSchema, setDatabaseSchema] = useState(currentWs.databaseSchema);
  const [tasks, setTasks] = useState(currentWs.tasks || []);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeResult, setMergeResult] = useState(null);

  const handleSave = async () => {
    setIsSaving(true);
    await onSaveWorkspace(currentWs.id, {
      frontendCode,
      backendCode,
      databaseSchema,
      tasks
    });
    setIsSaving(false);
  };

  const handleMerge = async () => {
    setIsMerging(true);
    setMergeResult(null);
    const result = await onMergeWorkspace(currentWs.id);
    setIsMerging(false);
    setMergeResult(result);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      assignedTo: 'You',
      status: 'todo'
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, status: t.status === 'done' ? 'todo' : 'done' };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-emerald-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
            <Users className="w-3.5 h-3.5" />
            <span>Simultaneous Multi-Role Team Collaboration Studio</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-outfit">
            TeamForge: Frontend, Backend & DB Collab Studio
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Collaborate simultaneously in your hackathon group on <strong>React Frontend components</strong>, <strong>Express Backend routes</strong>, and <strong>PostgreSQL Database schemas</strong> in one unified studio. Click <strong>Merge Workspaces</strong> to compile everything into a single synchronized build!
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs text-slate-400 flex-wrap">
            <span className="text-slate-200 font-bold">Active Team: {currentWs.teamName}</span>
            <span>•</span>
            <span>Project: <strong className="text-emerald-400">{currentWs.projectTitle}</strong></span>
            <span>•</span>
            <span className="text-indigo-400 font-semibold">{currentWs.members.length} Collaborators Online</span>
          </div>
        </div>
      </div>

      {/* Main Studio Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        {/* Studio Navigation & Action Buttons */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveCodeTab('frontend')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                activeCodeTab === 'frontend' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              Frontend (React)
            </button>
            <button
              onClick={() => setActiveCodeTab('backend')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                activeCodeTab === 'backend' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              Backend (Express)
            </button>
            <button
              onClick={() => setActiveCodeTab('database')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                activeCodeTab === 'database' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-amber-400" />
              Database (SQL)
            </button>
            <button
              onClick={() => setActiveCodeTab('tasks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                activeCodeTab === 'tasks' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-rose-400" />
              Team Tasks ({tasks.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Sync Workspace'}</span>
            </button>

            <button
              onClick={handleMerge}
              disabled={isMerging}
              className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white text-xs font-extrabold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition disabled:opacity-50"
            >
              <GitMerge className="w-4 h-4" />
              <span>{isMerging ? 'Merging All Layers...' : '🚀 Merge Team Workspaces'}</span>
            </button>
          </div>
        </div>

        {/* Merge Success Alert */}
        {mergeResult && (
          <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-2xl p-4 flex items-start gap-3 shadow-xl">
            <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-extrabold text-emerald-200">{mergeResult.message}</div>
              <div className="text-emerald-300">
                Merged: Frontend ({mergeResult.buildSummary?.frontendComponents}), Backend ({mergeResult.buildSummary?.backendRoutes}), Database ({mergeResult.buildSummary?.databaseMigrations}).
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: FRONTEND WORKSPACE */}
        {activeCodeTab === 'frontend' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Editing: <code className="text-cyan-400">src/components/CampusBadge.jsx</code></span>
              <span className="text-emerald-400 font-mono">Live Sync Active</span>
            </div>
            <textarea
              rows={14}
              value={frontendCode}
              onChange={(e) => setFrontendCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-cyan-200 leading-relaxed focus:outline-none focus:border-cyan-500"
            />
          </div>
        )}

        {/* TAB 2: BACKEND WORKSPACE */}
        {activeCodeTab === 'backend' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Editing: <code className="text-emerald-400">server/routes/attendance.js</code></span>
              <span className="text-emerald-400 font-mono">Live Sync Active</span>
            </div>
            <textarea
              rows={14}
              value={backendCode}
              onChange={(e) => setBackendCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-emerald-200 leading-relaxed focus:outline-none focus:border-emerald-500"
            />
          </div>
        )}

        {/* TAB 3: DATABASE WORKSPACE */}
        {activeCodeTab === 'database' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Editing: <code className="text-amber-400">db/migrations/001_attendees_schema.sql</code></span>
              <span className="text-emerald-400 font-mono">Live Sync Active</span>
            </div>
            <textarea
              rows={14}
              value={databaseSchema}
              onChange={(e) => setDatabaseSchema(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-amber-200 leading-relaxed focus:outline-none focus:border-amber-500"
            />
          </div>
        )}

        {/* TAB 4: TEAM KANBAN & TASKS */}
        {activeCodeTab === 'tasks' && (
          <div className="space-y-4">
            <form onSubmit={addTask} className="flex gap-2 text-xs">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add team milestone (e.g. Test Cloudinary Dynamic QR pass on mobile)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition"
              >
                Add Task
              </button>
            </form>

            <div className="space-y-2">
              {tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    task.status === 'done'
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-60 line-through'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs">
                    <span className={`w-4 h-4 rounded flex items-center justify-center font-bold text-[10px] ${
                      task.status === 'done' ? 'bg-emerald-500 text-slate-950' : 'border border-slate-600'
                    }`}>
                      {task.status === 'done' ? '✓' : ''}
                    </span>
                    <span className="text-white font-medium">{task.title}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Assigned: {task.assignedTo}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
