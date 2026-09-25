import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, Send, Check, Copy, Sparkles, Download, 
  ExternalLink, FileText, UserCheck, Calendar, Star,
  Terminal, ShieldCheck, Mail, Phone, Award
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface RecruiterQuickToolkitProps {
  onOpenResume: () => void;
  onOpenContact: (type: 'email' | 'phone') => void;
  showToast: (msg: string) => void;
}

export const RecruiterQuickToolkit: React.FC<RecruiterQuickToolkitProps> = ({
  onOpenResume,
  onOpenContact,
  showToast
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'inmail' | 'scorecard'>('profile');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const recruiterSummary = {
    candidate: personalInfo.name,
    degree: "B.E. Computer & Communication Engineering (2026 Batch)",
    college: "VSB Engineering College, Karur (CGPA: 7.5)",
    coreFocus: "Full-Stack Development, Node.js & Express REST APIs, SQL, React.js",
    availability: "Immediate for 2026 Full-Time Roles & Pre-Placement Internships",
    keyExperience: "Infosys Internship 6.0 (WasteZero) & Next Logic Software Co.",
    algorithmicProof: "150+ LeetCode Solved & NPTEL Programming in Java Certified",
    location: "Tamil Nadu, India (Open to Relocation / Hybrid / Remote)"
  };

  const inmailTemplate = `Subject: Software Engineering Opportunity - Kavipriya Chakkaravarthi

Dear Hiring Team,

I am writing to express my interest in software engineering, backend, and full-stack developer opportunities.

Candidate Highlights:
• Education: Final-Year B.E. Computer & Communication Engineering, VSB Engineering College (CGPA: 7.5)
• Backend & Systems: Node.js, Express.js RESTful APIs, JWT stateless authentication, RBAC
• Databases: MySQL relational modeling, schema normalization (3NF), composite indexing
• Frontend: React.js modern component architecture, state management, responsive UI
• Real-World Delivery: Software Development Internships at Infosys (WasteZero platform) & Next Logic
• Algorithmic Competency: 150+ LeetCode algorithmic solutions (Java OOP) & NPTEL Java Certification

Portfolio: https://ckavipriya.dev
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}
Email: ${personalInfo.email} | Phone: ${personalInfo.phone}

Looking forward to connecting with your engineering team.

Best regards,
Kavipriya Chakkaravarthi`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied ${key} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-lg overflow-hidden my-8">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 bg-[var(--paper-3)] border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--signal)] to-[var(--signal-2)] text-white flex items-center justify-center shrink-0 shadow-md">
            <UserCheck size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--signal)]">
                Recruiter & Hiring Portal
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Batch of 2026
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-sans text-[var(--ink)] mt-0.5">
              Candidate Screening & Fast-Track Evaluation Dossier
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--signal)] hover:bg-[var(--signal-2)] text-white text-xs font-mono font-bold transition-all shadow-sm cursor-pointer"
          >
            <FileText size={14} />
            <span>Open ATS Resume</span>
          </button>

          <button
            onClick={() => onOpenContact('email')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--paper-2)] border border-[var(--line)] hover:border-[var(--signal)] text-[var(--ink)] hover:text-[var(--signal)] text-xs font-mono font-semibold transition-all cursor-pointer"
          >
            <Mail size={14} className="text-[var(--signal)]" />
            <span>Email Direct</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-3 sm:px-6 border-b border-[var(--line)] bg-[var(--paper-2)] flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-[var(--signal)] text-white shadow-xs'
              : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper-3)]'
          }`}
        >
          Candidate Fast Facts
        </button>

        <button
          onClick={() => setActiveTab('scorecard')}
          className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'scorecard'
              ? 'bg-[var(--signal)] text-white shadow-xs'
              : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper-3)]'
          }`}
        >
          Screening Scorecard
        </button>

        <button
          onClick={() => setActiveTab('inmail')}
          className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'inmail'
              ? 'bg-[var(--signal)] text-white shadow-xs'
              : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper-3)]'
          }`}
        >
          Pre-Formatted InMail / Cover Note
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-5 sm:p-7">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] space-y-2">
              <span className="text-[10px] text-[var(--slate)] uppercase font-bold tracking-wider">Candidate & Academics</span>
              <div className="text-sm font-bold text-[var(--ink)] font-sans">{recruiterSummary.candidate}</div>
              <div className="text-[var(--signal)] font-semibold">{recruiterSummary.degree}</div>
              <div className="text-[var(--slate)]">{recruiterSummary.college}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] space-y-2">
              <span className="text-[10px] text-[var(--slate)] uppercase font-bold tracking-wider">Technical Competencies</span>
              <div className="text-xs font-bold text-[var(--ink)]">{recruiterSummary.coreFocus}</div>
              <div className="text-[var(--slate)] leading-relaxed">{recruiterSummary.algorithmicProof}</div>
              <div className="text-[var(--signal)] font-semibold">{recruiterSummary.keyExperience}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] space-y-2">
              <span className="text-[10px] text-[var(--slate)] uppercase font-bold tracking-wider">Notice Period & Availability</span>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {recruiterSummary.availability}
              </div>
              <div className="text-[var(--slate)]">{recruiterSummary.location}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[var(--slate)] uppercase font-bold tracking-wider">Direct Coordinates</span>
                <div className="text-xs text-[var(--ink)] font-bold mt-1">{personalInfo.email}</div>
                <div className="text-xs text-[var(--slate)]">{personalInfo.phone}</div>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => handleCopy(`${personalInfo.email} | ${personalInfo.phone}`, 'Contacts')}
                  className="px-3 py-1.5 rounded-lg bg-[var(--paper-2)] border border-[var(--line)] hover:border-[var(--signal)] text-[11px] font-mono text-[var(--ink)] cursor-pointer"
                >
                  {copiedKey === 'Contacts' ? 'Copied Coordinates!' : 'Copy Direct Info'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scorecard' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] text-center">
                <div className="text-2xl font-bold font-sans text-[var(--signal)]">150+</div>
                <div className="text-xs font-bold text-[var(--ink)] mt-0.5">LeetCode Solved</div>
                <div className="text-[11px] text-[var(--slate)] font-mono mt-0.5">Core Java OOP & DSA</div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] text-center">
                <div className="text-2xl font-bold font-sans text-emerald-500">2 Internships</div>
                <div className="text-xs font-bold text-[var(--ink)] mt-0.5">Infosys & Next Logic</div>
                <div className="text-[11px] text-[var(--slate)] font-mono mt-0.5">Production Delivery</div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] text-center">
                <div className="text-2xl font-bold font-sans text-amber-500">7.5 / 10</div>
                <div className="text-xs font-bold text-[var(--ink)] mt-0.5">Degree CGPA</div>
                <div className="text-[11px] text-[var(--slate)] font-mono mt-0.5">B.E. CCE (Class of '26)</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] text-xs font-mono space-y-2.5">
              <div className="font-bold text-[var(--ink)] flex items-center gap-2">
                <Award size={15} className="text-[var(--signal)]" />
                <span>Verified Certifications</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[var(--paper-2)] border border-[var(--line)] text-[var(--ink)]">
                  ✓ NPTEL Programming in Java (Elite)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[var(--paper-2)] border border-[var(--line)] text-[var(--ink)]">
                  ✓ AWS Cloud Foundations (Skill Builder)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[var(--paper-2)] border border-[var(--line)] text-[var(--ink)]">
                  ✓ GeeksforGeeks Master Data Structures & Algorithms
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[var(--paper-2)] border border-[var(--line)] text-[var(--ink)]">
                  ✓ Salesforce Trailhead (20,000+ Points)
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inmail' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--slate)]">
                Pre-composed message ready to paste into LinkedIn InMail or ATS referral
              </span>
              <button
                onClick={() => handleCopy(inmailTemplate, 'InMail')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--signal)] text-white text-xs font-mono font-bold cursor-pointer hover:opacity-90"
              >
                {copiedKey === 'InMail' ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedKey === 'InMail' ? 'Copied InMail' : 'Copy InMail'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] font-mono text-[11.5px] text-[var(--ink)] leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
              {inmailTemplate}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
