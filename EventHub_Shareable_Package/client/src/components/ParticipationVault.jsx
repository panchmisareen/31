import React, { useState } from 'react';
import { Award, Calendar, CheckCircle2, QrCode, ExternalLink, Download, Sparkles, ShieldCheck, Ticket } from 'lucide-react';
import CertificateModal from './CertificateModal';

export default function ParticipationVault({ registrations, certificates, currentUser, onGenerateCertificate, events }) {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleIssueTestCert = async (eventId, role) => {
    setIsGenerating(true);
    await onGenerateCertificate(eventId, currentUser.id, role);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-cyan-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Credential & Participation History</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-outfit">
            Participation Portfolio & Certificate Vault
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Every competition, hackathon, and workshop you participate in is cryptographically cataloged.
            Certificates are automatically generated and edge-rendered via Cloudinary dynamic URL transformations,
            complete with verifiable QR credentials.
          </p>
        </div>
      </div>

      {/* Grid: 2 columns - Registered Events & Generated Certificates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Participation History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Ticket className="w-5 h-5 text-indigo-400" />
              Event Participation History ({registrations.length})
            </h3>
            <span className="text-xs text-slate-400">Status & Passes</span>
          </div>

          <div className="space-y-3">
            {registrations.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center text-slate-400 text-xs">
                No event registrations found. Explore upcoming events to register!
              </div>
            ) : (
              registrations.map((reg) => (
                <div
                  key={reg.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                        {reg.event?.category || 'Campus Event'}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">
                        {reg.event?.title || 'Registered Event'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Team: <span className="text-slate-300 font-semibold">{reg.teamName}</span> • Registered on {new Date(reg.registeredAt).toLocaleDateString()}
                      </p>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      Confirmed
                    </span>
                  </div>

                  {/* Pass & Certificate Action Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
                    <a
                      href={reg.passUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Cloudinary Pass #{reg.passId}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    {/* Check if certificate is already issued or trigger generation */}
                    {reg.certificate ? (
                      <button
                        onClick={() => setSelectedCert(reg.certificate)}
                        className="px-3 py-1 bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white text-xs font-bold rounded-lg border border-cyan-500/30 transition flex items-center gap-1"
                      >
                        <Award className="w-3.5 h-3.5" />
                        View Certificate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleIssueTestCert(reg.eventId, 'Distinguished Participant')}
                        disabled={isGenerating}
                        className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center gap-1 disabled:opacity-50"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        {isGenerating ? 'Generating...' : 'Issue Cloudinary Certificate'}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Verified Cloudinary Certificates */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Verified Certificate Vault ({certificates.length})
            </h3>
            <span className="text-xs text-amber-300 font-semibold">Edge-Transformed</span>
          </div>

          <div className="space-y-4">
            {certificates.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center text-slate-400 text-xs">
                No certificates generated yet. Complete an event to receive your credential!
              </div>
            ) : (
              certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-amber-500/40 transition group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                          {cert.certId}
                        </span>
                        <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1 group-hover:text-amber-300 transition">
                        {cert.eventTitle}
                      </h4>
                      <p className="text-xs font-semibold text-indigo-400 mt-0.5">
                        {cert.role}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-400/20 transition flex items-center gap-1"
                    >
                      <span>Preview</span>
                    </button>
                  </div>

                  {/* AI Citation */}
                  <p className="text-xs text-slate-300 mt-3 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    "{cert.citation}"
                  </p>

                  {/* Certificate Footer */}
                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Issued: {cert.issueDate}</span>
                    <span className="font-mono text-slate-500">Hash: {cert.verificationHash?.slice(0, 8)}...</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
}
