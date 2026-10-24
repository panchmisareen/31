import React, { useState } from 'react';
import { FileText, Sparkles, CheckCircle, ArrowRight, Calendar, MapPin, Trophy, Shield, UploadCloud } from 'lucide-react';

const SAMPLE_CIRCULAR_1 = `APEX INSTITUTE OF TECHNOLOGY & SCIENCE
OFFICE OF THE DEAN (ACADEMIC AFFAIRS)
Ref No: AIT/CIR/2026/894                                             Date: 24th October 2026

CIRCULAR - STATE-LEVEL HACKATHON & AI INNOVATION CHALLENGE 2026

Subject: Conduct of 36-Hour Hackathon on "Cloud & Generative AI for Campus Sustainability"

This is to notify all Head of Departments, Faculty Mentors, and Students that the Department of Computer Science & Engineering, in technical collaboration with Cloudinary Developers Network and Open Source Communities, is organizing a 36-Hour National Hackathon from 12th November to 13th November 2026 at the Innovation Center & Central Computing Complex.

Key Guidelines:
1. Eligibility: Open to all undergraduate B.Tech / BCA / MCA / B.Sc students across colleges.
2. Team Size: Teams must comprise 2 to 4 members. Inter-departmental teams are encouraged.
3. Registration Deadline: The portal will close on 5th November 2026 at 23:59 IST.
4. Total Prize Pool: Cash awards worth ₹1,20,000 will be conferred upon winning teams, along with official Cloudinary Dynamic Verified Digital Credentials and Cloud credits.
5. Entry Fee: Nil. Free registration for verified students.

Rules & Regulations:
- Participants must carry valid institutional ID cards.
- All code commits must be made to public GitHub repositories created during the hackathon.
- Use of Cloudinary Media APIs for image/video transformations is awarded bonus evaluation marks.

For any queries, contact Dr. Priya Nair, Faculty Coordinator (events-support@college.edu).

(Sd/-)
Dean, Academic Affairs`;

const SAMPLE_CIRCULAR_2 = `DEPARTMENT OF STUDENT WELFARE & EXTRA-CURRICULAR ACTIVITIES
MEMORANDUM / CAMPUS NOTICE

Subject: Annual Inter-College Battle of Bands & Cultural Fiesta 2026

It is hereby announced that the Annual Inter-College Cultural Gala "Rhythm & Echoes 2026" shall be held from 20th November to 22nd November 2026 at the Open Air Theatre (OAT) & Campus Amphitheatre.

Eligibility: Full-time college students with active ID.
Team Size: Solo acts and Bands up to 8 members.
Registration Deadline: Last date for entry form submission is 15th November 2026.
Awards: Total cash prizes of ₹80,000 plus trophies and official participation certificates.
Entry: Free entry for campus students.

Students must register online via the EventHub campus portal. Late submissions will strictly not be entertained.

Sd/-
Cultural Secretary`;

export default function CircularExtractor({ onEventCreated, setActiveTab }) {
  const [noticeText, setNoticeText] = useState(SAMPLE_CIRCULAR_1);
  const [isParsing, setIsParsing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handleExtract = async () => {
    setIsParsing(true);
    setPublishSuccess(false);
    try {
      const res = await fetch('/api/ai/extract-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noticeText })
      });
      const data = await res.json();
      setExtractedData(data);
    } catch (err) {
      console.error(err);
      alert('Error parsing circular: ' + err.message);
    } finally {
      setIsParsing(false);
    }
  };

  const handlePublish = async () => {
    if (!extractedData) return;
    setIsPublishing(true);
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(extractedData)
      });
      const newEvent = await res.json();
      setIsPublishing(false);
      setPublishSuccess(true);
      if (onEventCreated) onEventCreated(newEvent);
      setTimeout(() => {
        setActiveTab('events');
      }, 1500);
    } catch (err) {
      setIsPublishing(false);
      alert('Error publishing event: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/50 to-indigo-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Problem Statement 2: Circular2Action Engine</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-outfit">
            Turn Long Notices into Actionable Events
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Students and faculty frequently miss crucial registration deadlines because details are buried in lengthy, bureaucratic campus circulars.
            Our Circular2Action LLM pipeline automatically extracts deadlines, team limits, eligibility, and rules, generating a live registration form in seconds!
          </p>
        </div>
      </div>

      {/* Main Grid: Input on Left, Extracted Event on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Circular Input */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Raw Campus Notice / Circular Text
            </h3>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400">Samples:</span>
              <button
                onClick={() => setNoticeText(SAMPLE_CIRCULAR_1)}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-bold"
              >
                Hackathon
              </button>
              <button
                onClick={() => setNoticeText(SAMPLE_CIRCULAR_2)}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-bold"
              >
                Cultural Fest
              </button>
            </div>
          </div>

          <textarea
            rows={14}
            value={noticeText}
            onChange={(e) => setNoticeText(e.target.value)}
            placeholder="Paste notice text or PDF circular copy here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-emerald-500"
          />

          <button
            onClick={handleExtract}
            disabled={isParsing}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            {isParsing ? 'Parsing Circular via LLM Extractor...' : '⚡ Extract Structured Event Details'}
          </button>
        </div>

        {/* Right: Extracted Structured Preview */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Structured Event Extracted by AI
              </h3>
              {extractedData && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Ready to Publish
                </span>
              )}
            </div>

            {!extractedData ? (
              <div className="py-20 text-center text-slate-400 space-y-3">
                <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-xs">
                  Click <span className="text-emerald-400 font-bold">"Extract Structured Event Details"</span> to let the LLM parse deadlines, venue, rules, and eligibility.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-4 text-xs">
                {/* Extracted Header */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    {extractedData.category}
                  </span>
                  <h4 className="text-base font-extrabold text-white mt-1.5">
                    {extractedData.title}
                  </h4>
                  <p className="text-slate-400 mt-1 text-[11px]">
                    {extractedData.tagline}
                  </p>
                </div>

                {/* Extracted Details Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Registration Deadline</span>
                    <span className="font-bold text-amber-300 mt-0.5 block truncate">
                      {extractedData.registrationDeadline}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Event Dates</span>
                    <span className="font-bold text-white mt-0.5 block truncate">
                      {extractedData.startDate}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Prize Pool</span>
                    <span className="font-bold text-emerald-400 mt-0.5 block truncate">
                      {extractedData.prizePool}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Team Size</span>
                    <span className="font-bold text-white mt-0.5 block truncate">
                      {extractedData.teamSize}
                    </span>
                  </div>
                </div>

                {/* Venue & Eligibility */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-slate-300">
                    <strong className="text-slate-400">Venue:</strong> {extractedData.venue}
                  </div>
                  <div className="text-slate-300">
                    <strong className="text-slate-400">Eligibility:</strong> {extractedData.eligibility}
                  </div>
                </div>

                {/* Rules */}
                {extractedData.rules && (
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Extracted Rules:</span>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {extractedData.rules.map((r, i) => (
                        <li key={i}>• {r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action to publish */}
          {extractedData && (
            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={handlePublish}
                disabled={isPublishing || publishSuccess}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {publishSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-300" />
                    <span>Published to Events Catalog! Redirecting...</span>
                  </>
                ) : isPublishing ? (
                  <span>Publishing Event...</span>
                ) : (
                  <>
                    <span>🚀 Publish Directly to Live Events</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
