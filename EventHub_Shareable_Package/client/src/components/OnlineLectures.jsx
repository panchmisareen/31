import React, { useState } from 'react';
import { Video, Play, Radio, Users, Clock, Award, Sparkles, Filter, ExternalLink, X, BookOpen } from 'lucide-react';

export default function OnlineLectures({ lectures }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'live' | 'on-demand'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const categories = ['All', 'Finance', 'Programming', 'Cybersecurity', 'Cloud & AI'];

  const filtered = lectures.filter(lec => {
    const matchesType = activeTab === 'all' || lec.type === activeTab;
    const matchesCategory = selectedCategory === 'All' || lec.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesType && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-blue-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold px-3 py-1 rounded-full">
            <Video className="w-3.5 h-3.5 text-blue-400" />
            <span>Campus Masterclasses & Industry Guest Lectures</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-outfit">
            Essential Short Courses & Live Webinars
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Upskill with essential modules curated for collegiate developers: <strong>Personal Finance & Startup Equity</strong>, <strong>Defensive Cybersecurity</strong>, <strong>Modern Systems Rust</strong>, and <strong>Cloudinary Media AI</strong>.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs text-slate-400 flex-wrap">
            <span className="flex items-center gap-1.5 text-rose-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Live Interactive Streams
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-indigo-300 font-bold">
              <Play className="w-3.5 h-3.5" />
              On-Demand Video Modules (Cloudinary Stream)
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Live vs. On-Demand Tabs */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Sessions ({lectures.length})
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'live' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            Live Upcoming
          </button>
          <button
            onClick={() => setActiveTab('on-demand')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'on-demand' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            On-Demand Courses
          </button>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lectures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((lec) => (
          <div
            key={lec.id}
            className="group bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-indigo-500/40 transition flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail with Cloudinary Play Tag */}
              <div className="relative h-44 bg-slate-950 overflow-hidden">
                <img
                  src={lec.thumbnail}
                  alt={lec.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Live or On-Demand Tag */}
                <div className="absolute top-3 left-3">
                  {lec.type === 'live' ? (
                    <span className="bg-rose-500/90 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE SESSION
                    </span>
                  ) : (
                    <span className="bg-blue-600/90 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                      <Play className="w-3 h-3 fill-white" />
                      ON-DEMAND
                    </span>
                  )}
                </div>

                {/* Level Tag */}
                <div className="absolute top-3 right-3 bg-slate-950/80 border border-slate-700 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {lec.level}
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-slate-950/85 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lec.duration}
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                  {lec.category}
                </span>
                <h3 className="text-base font-bold text-white mt-1 group-hover:text-indigo-300 transition line-clamp-2">
                  {lec.title}
                </h3>

                <div className="mt-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="text-xs font-bold text-slate-200">{lec.speaker}</div>
                  <div className="text-[11px] text-slate-400">{lec.speakerTitle}</div>
                </div>

                <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                  {lec.description}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lec.attendeeCount} students enrolled</span>
                </div>

                <button
                  onClick={() => setActiveVideoModal(lec)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{lec.type === 'live' ? 'View Live Link' : 'Watch Lecture'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player with Cloudinary Streaming */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                  {activeVideoModal.category}
                </span>
                <span className="text-sm font-bold text-white truncate max-w-md">{activeVideoModal.title}</span>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Simulated Cloudinary Optimized Video Stream */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
                <img
                  src={activeVideoModal.thumbnail}
                  alt={activeVideoModal.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                
                <div className="absolute flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/50 hover:scale-110 transition cursor-pointer">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                  <span className="text-xs font-mono text-indigo-300 bg-slate-950/80 px-3 py-1 rounded-full border border-indigo-500/30">
                    ☁️ Cloudinary Stream: vc_auto,q_auto,w_1280
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">{activeVideoModal.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{activeVideoModal.description}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                  <span>Instructor: <strong className="text-slate-200">{activeVideoModal.speaker}</strong></span>
                  <span>Duration: {activeVideoModal.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
