import React, { useState } from 'react';
import { 
  X, Calendar, MapPin, Trophy, Users, CheckCircle2, Shield, Share2, 
  Sparkles, Download, Layers, Ticket, HelpCircle, CheckSquare, Tag, 
  ExternalLink, Copy, Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EventDetailModal({ event, onClose, onRegister, isRegistered, registrationData }) {
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState('');
  const [activeAspect, setActiveAspect] = useState('hero');
  const [selectedTier, setSelectedTier] = useState(event.pricingTiers?.[0]?.name || 'Student Free RSVP');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const pricingTiers = event.pricingTiers || [
    { name: 'Student Free RSVP', price: 0, perks: 'Admission, Snacks, Discord Badge, Cloudinary Certificate' },
    { name: 'VIP Hackathon Pass', price: 199, perks: 'Exclusive Swag Bag, Cloud Credits, Priority Mentoring' },
    { name: 'Team Pack (4 pax)', price: 499, perks: 'Group discount, Dedicated Lab Workspace, Fast-track Review' }
  ];

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === 'HACKTOBER50') {
      setAppliedDiscount({ label: '50% Off (HACKTOBER50)', factor: 0.5 });
    } else if (discountCode.trim().toUpperCase() === 'COMMUNITYFREE') {
      setAppliedDiscount({ label: '100% Free RSVP (COMMUNITYFREE)', factor: 0 });
    } else {
      alert('Invalid Promo Code. Try "HACKTOBER50" or "COMMUNITYFREE"');
    }
  };

  const getTierPriceDisplay = (tier) => {
    if (tier.price === 0) return 'Free';
    if (!appliedDiscount) return `₹${tier.price}`;
    const discounted = Math.round(tier.price * appliedDiscount.factor);
    return `₹${discounted} (Discounted)`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const memberList = members.split(',').map(m => m.trim()).filter(Boolean);
    const tierObj = pricingTiers.find(t => t.name === selectedTier) || pricingTiers[0];
    const finalPrice = getTierPriceDisplay(tierObj);

    await onRegister(event.id, teamName, memberList, selectedTier, finalPrice, discountCode);
    setIsSubmitting(false);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  const getActiveBannerUrl = () => {
    if (!event.responsiveBanners) return event.bannerImage;
    return event.responsiveBanners[activeAspect] || event.bannerImage;
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Banner with Cloudinary Aspect Ratio Switcher */}
        <div className="relative h-64 bg-slate-950 shrink-0">
          <img
            src={getActiveBannerUrl()}
            alt={event.title}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center backdrop-blur-md transition hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Cloudinary Aspect Ratio Switcher for Judges */}
          <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md border border-blue-500/40 rounded-xl p-1 flex items-center gap-1 shadow-lg">
            <span className="text-[10px] font-bold text-blue-300 px-2 flex items-center gap-1">
              <Layers className="w-3 h-3" /> Cloudinary g_auto:
            </span>
            <button
              onClick={() => setActiveAspect('hero')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                activeAspect === 'hero' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              16:9 Hero
            </button>
            <button
              onClick={() => setActiveAspect('card')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                activeAspect === 'card' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              4:3 Card
            </button>
            <button
              onClick={() => setActiveAspect('mobileStory')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                activeAspect === 'mobileStory' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              9:16 Story
            </button>
          </div>

          {/* Title on Banner */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
                {event.category}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                {event.level || 'Beginner'} Level
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Facts Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Date</span>
              <span className="text-xs font-bold text-white mt-0.5 block truncate">
                {new Date(event.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Venue</span>
              <span className="text-xs font-bold text-white mt-0.5 block truncate">
                {event.venue}
              </span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Prize Pool</span>
              <span className="text-xs font-bold text-amber-300 mt-0.5 block truncate">
                {event.prizePool}
              </span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Team Size</span>
              <span className="text-xs font-bold text-white mt-0.5 block truncate">
                {event.teamSize}
              </span>
            </div>
          </div>

          {/* Social Share & Follow Buttons */}
          <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex-wrap gap-2">
            <div className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Share Event with Campus Peers:</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=Join%20me%20at%20${encodeURIComponent(event.title)}%20on%20EventHub!`}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold rounded-lg border border-slate-700 transition"
              >
                Twitter / X
              </a>
              <a
                href={`https://wa.me/?text=Join%20me%20at%20${encodeURIComponent(event.title)}!`}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold rounded-lg border border-slate-700 transition"
              >
                WhatsApp
              </a>
              <button
                onClick={handleCopyShare}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg border border-slate-700 transition flex items-center gap-1"
              >
                {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">About the Event</h4>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Interactive Agenda */}
          {event.interactiveAgenda && (
            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                Interactive Event Agenda
              </h4>
              <div className="mt-2.5 space-y-2">
                {event.interactiveAgenda.map((item, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-indigo-300">{item.title}</span>
                      <div className="text-[11px] text-slate-400">Speaker: {item.speaker}</div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded-md border border-slate-800">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prerequisite Checklists */}
          {event.prerequisites && (
            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                Prerequisite Checklist
              </h4>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
                {event.prerequisites.map((pre, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800">
                    <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">✓</span>
                    <span>{pre}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ Section */}
          {event.faq && (
            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Frequently Asked Questions (FAQ)
              </h4>
              <div className="mt-2 space-y-2 text-xs">
                {event.faq.map((f, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                    <div className="font-bold text-slate-200">{f.q}</div>
                    <div className="text-slate-400 mt-1 text-[11px]">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Registration & Ticketing Section */}
          {isRegistered ? (
            <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/60 border border-indigo-500/40 rounded-2xl p-5 shadow-inner space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>You are officially registered! Ticket & Pass Ready.</span>
                </div>
                <span className="text-xs font-mono text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-500/30">
                  {registrationData?.ticketId || 'TCK-8819'}
                </span>
              </div>

              {/* Official Cloudinary Dynamic Ticket Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                    {registrationData?.tier || 'VIP Hackathon Pass'}
                  </span>
                  <h4 className="text-base font-extrabold text-white mt-1">{registrationData?.userName || 'Aarav Sharma'}</h4>
                  <div className="text-xs text-slate-400">Team: <strong className="text-slate-200">{registrationData?.teamName || 'Solo'}</strong></div>
                  <div className="text-[11px] font-mono text-emerald-400">Ticket ID: {registrationData?.ticketId || 'TCK-8819'}</div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <a
                    href={registrationData?.ticketUrl || registrationData?.passUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>View Cloudinary Ticket</span>
                  </a>

                  <a
                    href={registrationData?.passUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl flex items-center gap-1.5 border border-slate-700 transition"
                  >
                    <span>Pass #{registrationData?.passId}</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Ticket className="w-4 h-4 text-indigo-400" />
                Select Ticket Tier & RSVP
              </h4>

              {/* Pricing Tiers Radio Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {pricingTiers.map(tier => (
                  <div
                    key={tier.name}
                    onClick={() => setSelectedTier(tier.name)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                      selectedTier === tier.name
                        ? 'bg-indigo-950/80 border-indigo-500 shadow-md shadow-indigo-500/20'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{tier.name}</span>
                        <span className="text-xs font-extrabold text-amber-300">{getTierPriceDisplay(tier)}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">{tier.perks}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Box */}
              <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                <Tag className="w-4 h-4 text-amber-400 shrink-0" />
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Promo Code (e.g. HACKTOBER50, COMMUNITYFREE)"
                  className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-500 uppercase text-xs"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold border border-slate-700 transition"
                >
                  Apply
                </button>
              </div>

              {appliedDiscount && (
                <div className="text-xs text-emerald-400 font-bold">
                  ✓ {appliedDiscount.label} successfully applied!
                </div>
              )}

              {/* Team Registration Inputs */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Team Name (Optional for individual registration)
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. CyberKnights or leave blank for Solo"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Teammates / Collaborators (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={members}
                    onChange={(e) => setMembers(e.target.value)}
                    placeholder="e.g. Aarav Sharma, Sanya Gupta"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    Instant Cloudinary Ticket Generated
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting ? 'Generating Cloudinary Ticket...' : 'Confirm Ticket & RSVP'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
