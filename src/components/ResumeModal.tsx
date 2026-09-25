import React from 'react';
import { motion } from 'motion/react';
import { X, Printer, Download, Mail, Phone, MapPin, Github, Linkedin, Check } from 'lucide-react';
import { personalInfo, projects, internships, educationList, skillCategories, achievementsList, certificationsList, softSkillsList } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
KAVIPRIYA CHAKKARAVARTHI
Full-Stack Developer | Final-Year B.E. Computer & Communication Engineering
Phone: ${personalInfo.phone} | Email: ${personalInfo.email}
LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github}

PROFESSIONAL SUMMARY:
${personalInfo.bio}

TECHNICAL SKILLS:
- Languages: Java, C
- Core Concepts: Object-Oriented Programming (OOP), Computer Networks
- Frontend: React.js, HTML, CSS
- Backend: Node.js, Express.js, REST APIs
- Databases: SQL, MY SQL
- Security & Auth: JWT
- Tools: Git, GitHub, VS Code

PROJECTS:
${projects.map(p => `• ${p.title} (${p.techStack.join(', ')})\n  ${p.highlights.join('\n  ')}`).join('\n\n')}

INTERNSHIP EXPERIENCE:
${internships.map(i => `• ${i.role} - ${i.company} (${i.period})\n  ${i.points.join('\n  ')}`).join('\n\n')}

EDUCATION:
${educationList.map(e => `• ${e.degree} - ${e.institution} (${e.period}) [${e.scoreLabel}: ${e.score}]`).join('\n')}

CERTIFICATIONS:
${certificationsList.map(c => `• ${c.name} (${c.issuer}) - ${c.badgeLabel}`).join('\n')}

SOFT SKILLS:
${softSkillsList.map(s => `• ${s.name}: ${s.summary}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="bg-[var(--paper-2)] text-[var(--ink)] border border-[var(--line)] rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line)] bg-[var(--paper-3)]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--slate)] ml-2">
              Official Resume Preview • Kavipriya C
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--line)] bg-[var(--paper-2)] hover:bg-[var(--paper)] transition-colors cursor-pointer"
              title="Copy plain-text resume"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Download size={14} />}
              <span>{copied ? "Copied!" : "Copy Text"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[var(--signal)] hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer size={14} />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper)] transition-colors cursor-pointer ml-1"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto font-sans text-[var(--ink)] space-y-8 print:p-0">
          {/* Header (Clean, ATS-Friendly Typographic Resume Header - No Image) */}
          <div className="border-b border-[var(--line)] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-sans text-[var(--ink)]">
                  {personalInfo.name}
                </h1>
                <div className="text-xs sm:text-sm font-mono text-[var(--signal)] font-semibold uppercase tracking-wider mt-1">
                  {personalInfo.title}
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {personalInfo.status}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-[var(--slate)] mt-3.5 max-w-3xl leading-relaxed">
              {personalInfo.bio}
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-4 text-xs font-mono text-[var(--slate)]">
              <span className="inline-flex items-center gap-1">
                <Phone size={13} className="text-[var(--signal)]" /> {personalInfo.phone}
              </span>
              <span>•</span>
              <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-1 hover:text-[var(--signal)]">
                <Mail size={13} className="text-[var(--signal)]" /> {personalInfo.email}
              </a>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} className="text-[var(--signal)]" /> {personalInfo.location}
              </span>
              <span>•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--signal)]">
                <Github size={13} className="text-[var(--signal)]" /> GitHub
              </a>
              <span>•</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--signal)]">
                <Linkedin size={13} className="text-[var(--signal)]" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--signal)] font-mono mb-3 flex items-center gap-2">
              <span>01.</span> Technical Skills & Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-[var(--paper-3)] border border-[var(--line)]">
                <span className="font-semibold text-xs text-[var(--slate)] uppercase font-mono block mb-1">Languages:</span>
                <span className="font-medium">Java, C</span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--paper-3)] border border-[var(--line)]">
                <span className="font-semibold text-xs text-[var(--slate)] uppercase font-mono block mb-1">Core Concepts:</span>
                <span className="font-medium">Object-Oriented Programming (OOP), Computer Networks</span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--paper-3)] border border-[var(--line)]">
                <span className="font-semibold text-xs text-[var(--slate)] uppercase font-mono block mb-1">Frontend:</span>
                <span className="font-medium">React.js, HTML, CSS</span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--paper-3)] border border-[var(--line)]">
                <span className="font-semibold text-xs text-[var(--slate)] uppercase font-mono block mb-1">Backend:</span>
                <span className="font-medium">Node.js, Express.js, REST APIs</span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--paper-3)] border border-[var(--line)]">
                <span className="font-semibold text-xs text-[var(--slate)] uppercase font-mono block mb-1">Databases:</span>
                <span className="font-medium">SQL, MY SQL</span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--paper-3)] border border-[var(--line)]">
                <span className="font-semibold text-xs text-[var(--slate)] uppercase font-mono block mb-1">Tools & Version Control:</span>
                <span className="font-medium">Git, GitHub, VS Code</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--signal)] font-mono mb-3 flex items-center gap-2">
              <span>02.</span> Internship Experience
            </h2>
            <div className="space-y-4">
              {internships.map((job) => (
                <div key={job.id} className="border-l-2 border-[var(--signal)] pl-4 py-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-base font-bold">{job.company}</h3>
                    <span className="text-xs font-mono text-[var(--slate)] bg-[var(--paper-3)] px-2 py-0.5 rounded">
                      {job.period}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-[var(--signal)] flex items-center gap-2">
                    <span>{job.role}</span>
                    {job.id === 'infosys' || job.location.toLowerCase().includes('online') ? (
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">• Online Mode</span>
                    ) : (
                      <span className="text-xs font-mono text-[var(--slate)]">• {job.location}</span>
                    )}
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm text-[var(--slate)] list-disc pl-4">
                    {job.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--signal)] font-mono mb-3 flex items-center gap-2">
              <span>03.</span> Key Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="border-l-2 border-[var(--line)] hover:border-[var(--signal)] transition-colors pl-4 py-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-base font-bold">{proj.title}</h3>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[var(--signal-dim)] text-[var(--signal)] font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm text-[var(--slate)] list-disc pl-4">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--signal)] font-mono mb-3 flex items-center gap-2">
              <span>04.</span> Education
            </h2>
            <div className="space-y-3">
              {educationList.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-[var(--paper-3)] border border-[var(--line)]">
                  <div>
                    <div className="font-bold text-sm">{edu.degree}</div>
                    <div className="text-xs text-[var(--slate)]">{edu.institution}, {edu.location}</div>
                  </div>
                  <div className="mt-2 sm:mt-0 text-left sm:text-right font-mono text-xs">
                    <span className="inline-block px-2 py-0.5 rounded bg-[var(--paper-2)] border border-[var(--line)] font-semibold text-[var(--signal)]">
                      {edu.scoreLabel}: {edu.score}
                    </span>
                    <div className="text-[var(--slate)] text-[11px] mt-0.5">{edu.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--signal)] font-mono mb-3 flex items-center gap-2">
                <span>05.</span> Achievements & Milestones
              </h2>
              <div className="space-y-2">
                {achievementsList.map((ach, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[var(--paper-3)] border border-[var(--line)] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-[var(--ink)]">{ach.label}</div>
                      <div className="text-xs text-[var(--slate)]">{ach.badge}</div>
                    </div>
                    <span className="font-mono font-bold text-base text-[var(--signal)]">
                      {ach.number}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--signal)] font-mono mb-3 flex items-center gap-2">
                <span>06.</span> Certifications
              </h2>
              <div className="space-y-2">
                {certificationsList.map((cert, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[var(--paper-3)] border border-[var(--line)]">
                    <div className="flex items-center justify-between gap-1">
                      <div className="font-bold text-xs text-[var(--ink)]">{cert.name}</div>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--signal-dim)] text-[var(--signal)] font-semibold">
                        {cert.badgeLabel.split('•')[0].trim()}
                      </span>
                    </div>
                    <div className="text-[11px] text-[var(--slate)] font-mono mt-0.5">{cert.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Soft Skills */}
          <div className="pt-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--signal)] font-mono mb-3 flex items-center gap-2">
              <span>07.</span> Soft Skills & Core Strengths
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {softSkillsList.map((s, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[var(--paper-3)] border border-[var(--line)]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[var(--ink)]">{s.name}</span>
                    <span className="text-[10px] font-mono text-[var(--signal)]">{s.category}</span>
                  </div>
                  <p className="text-[11.5px] text-[var(--slate)] mt-1 leading-relaxed">
                    {s.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
