import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, Phone, Send, Copy, Check, Sparkles, 
  Building2, User, Briefcase, FileText, ArrowRight 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface InteractiveContactCardProps {
  onOpenResume: () => void;
  showToast: (msg: string) => void;
}

export const InteractiveContactCard: React.FC<InteractiveContactCardProps> = ({
  onOpenResume,
  showToast
}) => {
  const [senderName, setSenderName] = useState('');
  const [company, setCompany] = useState('');
  const [roleTitle, setRoleTitle] = useState('Full-Stack Software Engineer (2026 Batch)');
  const [customNote, setCustomNote] = useState('');
  const [copied, setCopied] = useState(false);

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Engineering Opportunity: ${roleTitle} at ${company || 'Our Team'}`);
    const body = encodeURIComponent(
      `Hi Kavipriya,\n\nI reviewed your portfolio and engineering background in Node.js, Express, SQL, and React.\n\nWe would love to discuss the ${roleTitle} opportunity at ${company || 'our organization'}.\n\n${customNote ? `Note: ${customNote}\n\n` : ''}Best regards,\n${senderName || 'Hiring Team'}`
    );
    return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyMessage = () => {
    const message = `Hi Kavipriya,\n\nI reviewed your portfolio and engineering background in Node.js, Express, SQL, and React.\n\nWe would love to discuss the ${roleTitle} opportunity at ${company || 'our organization'}.\n\n${customNote ? `Note: ${customNote}\n\n` : ''}Best regards,\n${senderName || 'Hiring Team'}`;
    
    navigator.clipboard.writeText(message);
    setCopied(true);
    showToast('Draft message copied to clipboard!');
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-lg overflow-hidden text-left">
      {/* Top Banner */}
      <div className="p-6 sm:p-7 bg-[var(--paper-3)] border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--signal-dim)] text-[var(--signal)] text-xs font-mono font-bold mb-2">
            <Sparkles size={13} />
            <span>Direct Recruiter Inquiry Composer</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] font-sans tracking-tight">
            Schedule an Interview or Technical Discussion
          </h3>
          <p className="text-xs sm:text-sm text-[var(--slate)] font-sans mt-1">
            Generate a pre-filled direct email or copy message for LinkedIn InMail
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            Actively Interviewing
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Form */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[var(--slate)] mb-1.5 flex items-center gap-1.5">
                <User size={13} className="text-[var(--signal)]" />
                <span>Your Name</span>
              </label>
              <input
                type="text"
                value={senderName}
                onChange={e => setSenderName(e.target.value)}
                placeholder="e.g. Alex Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--paper-3)] border border-[var(--line)] text-xs sm:text-sm text-[var(--ink)] placeholder-[var(--slate)]/60 focus:outline-hidden focus:border-[var(--signal)] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[var(--slate)] mb-1.5 flex items-center gap-1.5">
                <Building2 size={13} className="text-[var(--signal)]" />
                <span>Company / Organization</span>
              </label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="e.g. Google, Infosys, Stripe"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--paper-3)] border border-[var(--line)] text-xs sm:text-sm text-[var(--ink)] placeholder-[var(--slate)]/60 focus:outline-hidden focus:border-[var(--signal)] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[var(--slate)] mb-1.5 flex items-center gap-1.5">
              <Briefcase size={13} className="text-[var(--signal)]" />
              <span>Target Role or Discussion Topic</span>
            </label>
            <input
              type="text"
              value={roleTitle}
              onChange={e => setRoleTitle(e.target.value)}
              placeholder="e.g. Full-Stack Developer, Node.js Backend Engineer"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--paper-3)] border border-[var(--line)] text-xs sm:text-sm text-[var(--ink)] placeholder-[var(--slate)]/60 focus:outline-hidden focus:border-[var(--signal)] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[var(--slate)] mb-1.5">
              Additional Details or Interview Link (Optional)
            </label>
            <textarea
              value={customNote}
              onChange={e => setCustomNote(e.target.value)}
              rows={3}
              placeholder="Add details about your team, tech stack, or screening timeline..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--paper-3)] border border-[var(--line)] text-xs sm:text-sm text-[var(--ink)] placeholder-[var(--slate)]/60 focus:outline-hidden focus:border-[var(--signal)] transition-colors resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={generateMailtoUrl()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--signal)] hover:bg-[var(--signal-2)] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow transition-all cursor-pointer"
            >
              <Send size={15} />
              <span>Launch Email with Message</span>
            </a>

            <button
              onClick={handleCopyMessage}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--paper-3)] hover:bg-[var(--paper)] border border-[var(--line)] hover:border-[var(--signal)] text-xs sm:text-sm font-medium text-[var(--ink)] transition-colors cursor-pointer"
            >
              {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
              <span>{copied ? 'Copied Message!' : 'Copy Formatted Text'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--signal)]">
              Direct Contact Channels
            </div>

            <div className="space-y-3 text-xs font-mono">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--paper-2)] border border-[var(--line)] hover:border-[var(--signal)] transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Mail size={16} className="text-[var(--signal)]" />
                  <span className="text-[var(--ink)] font-semibold">{personalInfo.email}</span>
                </div>
                <ArrowRight size={14} className="text-[var(--slate)] group-hover:text-[var(--signal)] group-hover:translate-x-0.5 transition-all" />
              </a>

              <a 
                href={`tel:${personalInfo.rawPhone}`}
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--paper-2)] border border-[var(--line)] hover:border-[var(--signal)] transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-[var(--signal)]" />
                  <span className="text-[var(--ink)] font-semibold">{personalInfo.phone}</span>
                </div>
                <ArrowRight size={14} className="text-[var(--slate)] group-hover:text-[var(--signal)] group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-[var(--signal-dim)] to-transparent border border-[var(--signal)]/30 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[var(--ink)] font-sans">
                Looking for Official Resume?
              </div>
              <div className="text-[11px] text-[var(--slate)] font-sans mt-0.5">
                Complete ATS-optimized resume with verified coursework and metrics
              </div>
            </div>
            <button
              onClick={() => {
                onOpenResume();
              }}
              className="px-4 py-2 rounded-xl bg-[var(--signal)] text-white text-xs font-mono font-bold hover:bg-[var(--signal-2)] transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              View PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
