import React, { useState } from 'react';
import { ShieldCheck, Search, Award, CheckCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react';

export default function CertificateVerifier() {
  const [certId, setCertId] = useState('EH-2026-X89B');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);

  const handleVerify = async (idToVerify) => {
    const id = idToVerify || certId;
    if (!id.trim()) return;

    setIsVerifying(true);
    setError(null);
    setVerificationResult(null);

    try {
      const res = await fetch(`/api/certificates/verify/${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      if (res.ok && data.valid) {
        setVerificationResult(data);
      } else {
        setError(data.message || 'Credential ID not found in institutional blockchain registry.');
      }
    } catch (err) {
      setError('Failed to reach verification registry: ' + err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Hero */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Tamper-Proof Credential Registry</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white font-outfit">
          Public Certificate Verification Portal
        </h2>
        <p className="text-sm text-slate-300 max-w-lg mx-auto">
          Recruiters, universities, and hackathon organizers can instantly verify the authenticity of EventHub collegiate credentials.
        </p>
      </div>

      {/* Verification Input Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <label className="text-xs font-bold text-slate-300 block">
          Enter Credential ID or Scan QR Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            placeholder="e.g. EH-2026-X89B"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500 uppercase"
          />
          <button
            onClick={() => handleVerify()}
            disabled={isVerifying}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            {isVerifying ? 'Verifying...' : 'Verify Credential'}
          </button>
        </div>

        {/* Quick sample buttons */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Try quick samples:</span>
          <button
            onClick={() => {
              setCertId('EH-2026-X89B');
              handleVerify('EH-2026-X89B');
            }}
            className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-mono"
          >
            EH-2026-X89B
          </button>
          <button
            onClick={() => {
              setCertId('EH-2026-C44Z');
              handleVerify('EH-2026-C44Z');
            }}
            className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-mono"
          >
            EH-2026-C44Z
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-rose-950/60 border border-rose-500/40 rounded-2xl p-4 flex items-center gap-3 text-rose-300 text-xs shadow-lg">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Verification Success Result */}
      {verificationResult && (
        <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Cryptographically Valid & Authentic</span>
                </h3>
                <p className="text-xs text-emerald-400 font-medium">
                  Verified in Institutional Certificate Registry
                </p>
              </div>
            </div>

            <span className="bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              {verificationResult.certificate.certId}
            </span>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Recipient</span>
              <span className="text-base font-extrabold text-white mt-1 block">
                {verificationResult.certificate.userName}
              </span>
              <span className="text-slate-400 text-[11px] block mt-0.5">
                {verificationResult.certificate.userEmail}
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Event & Achievement</span>
              <span className="text-base font-extrabold text-indigo-400 mt-1 block">
                {verificationResult.certificate.role}
              </span>
              <span className="text-slate-300 text-[11px] block mt-0.5">
                {verificationResult.certificate.eventTitle}
              </span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs italic text-slate-300">
            <span className="text-[10px] uppercase font-bold text-slate-400 block not-italic mb-1">Official Citation:</span>
            "{verificationResult.certificate.citation}"
          </div>

          <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-t border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Issued By</span>
              <span className="text-white font-medium block truncate">{verificationResult.certificate.issuer}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Issue Date</span>
              <span className="text-white font-medium block">{verificationResult.certificate.issueDate}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">SHA-256 Hash</span>
              <span className="font-mono text-emerald-400 block truncate">{verificationResult.certificate.verificationHash}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
