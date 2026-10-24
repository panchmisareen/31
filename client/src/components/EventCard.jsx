import React from 'react';
import { Calendar, MapPin, Trophy, Users, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function EventCard({ event, onSelect, isRegistered }) {
  const startDate = new Date(event.startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const getCategoryColor = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'hackathon': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'workshop': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'cultural': return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
      case 'sports & tech':
      case 'sports': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default: return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
    }
  };

  return (
    <div className="group bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-indigo-500/50 shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/10 flex flex-col justify-between">
      <div>
        {/* Banner with Cloudinary Smart Preview Badge */}
        <div className="relative h-48 overflow-hidden bg-slate-950">
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Cloudinary Smart Media Tag */}
          <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-blue-500/40 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
            <span>☁️ Cloudinary c_fill,g_auto</span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getCategoryColor(event.category)}`}>
              {event.category}
            </span>
          </div>

          {/* Registration Status Badge */}
          {isRegistered && (
            <div className="absolute bottom-3 left-3 bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
              <CheckCircle2 className="w-4 h-4" />
              <span>You are Registered</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
            {event.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {event.tagline || event.description}
          </p>

          {/* Event Meta Details */}
          <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">{startDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-semibold text-amber-300 truncate">{event.prizePool}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="p-5 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>{event.registeredCount || 0} registered</span>
          </div>

          <button
            onClick={() => onSelect(event)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isRegistered
                ? 'bg-slate-800 text-indigo-300 hover:bg-slate-700 border border-indigo-500/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
            }`}
          >
            {isRegistered ? 'View Pass & Details' : 'Register Now'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
