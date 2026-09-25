import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, X, FileText, Mail, Phone, Github, Linkedin, 
  ExternalLink, Sun, Moon, ArrowRight, 
  Code, Terminal, Sparkles, FolderGit2, GraduationCap, Award, Palette, RotateCcw
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (id: string) => void;
  onOpenResume: () => void;
  onOpenContact: (type: 'email' | 'phone' | 'github' | 'linkedin') => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onOpenThemeStudio?: () => void;
  onReplayIntro?: () => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Actions' | 'External' | 'Preferences';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenResume,
  onOpenContact,
  isDarkTheme,
  onToggleTheme,
  onOpenThemeStudio,
  onReplayIntro
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    // Top Priority Actions
    {
      id: 'resume',
      category: 'Actions',
      title: 'View Official Resume (PDF)',
      subtitle: 'ATS-friendly, comprehensive print-ready document',
      icon: <FileText size={16} className="text-[var(--signal)]" />,
      shortcut: 'R',
      action: () => {
        onClose();
        onOpenResume();
      }
    },
    {
      id: 'email',
      category: 'Actions',
      title: `Email Kavipriya (${personalInfo.email})`,
      subtitle: 'Open email client or copy direct address',
      icon: <Mail size={16} className="text-emerald-500" />,
      shortcut: 'E',
      action: () => {
        onClose();
        onOpenContact('email');
      }
    },
    {
      id: 'phone',
      category: 'Actions',
      title: `Call Phone Direct (${personalInfo.phone})`,
      subtitle: 'Available for technical discussions and screenings',
      icon: <Phone size={16} className="text-teal-500" />,
      shortcut: 'P',
      action: () => {
        onClose();
        onOpenContact('phone');
      }
    },
    // Navigation
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Key Full-Stack Projects',
      subtitle: 'WasteZero, Node.js & Express REST APIs, benchmarks & architectures',
      icon: <FolderGit2 size={16} className="text-[var(--signal)]" />,
      shortcut: '3',
      action: () => {
        onClose();
        onNavigateSection('projects');
      }
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Technical Toolkit & Skills Matrix',
      subtitle: 'Java, Node.js, Express.js, SQL, React.js & LeetCode ratings',
      icon: <Code size={16} className="text-cyan-500" />,
      shortcut: '2',
      action: () => {
        onClose();
        onNavigateSection('skills');
      }
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      title: 'Industry Internship Experience',
      subtitle: 'Infosys Internship 6.0 & Next Logic Software Co.',
      icon: <Terminal size={16} className="text-indigo-500" />,
      shortcut: '4',
      action: () => {
        onClose();
        onNavigateSection('experience');
      }
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About & Background',
      subtitle: 'Final-year CCE at VSB Engineering College (CGPA 7.5)',
      icon: <Sparkles size={16} className="text-amber-500" />,
      shortcut: '1',
      action: () => {
        onClose();
        onNavigateSection('about');
      }
    },
    {
      id: 'nav-education',
      category: 'Navigation',
      title: 'Academic Education',
      subtitle: 'B.E. Computer & Communication Engineering',
      icon: <GraduationCap size={16} className="text-purple-500" />,
      shortcut: '5',
      action: () => {
        onClose();
        onNavigateSection('education');
      }
    },
    {
      id: 'nav-achieve',
      category: 'Navigation',
      title: 'Achievements & LeetCode Milestones',
      subtitle: '150+ LeetCode algorithmic solutions, Trailhead 20k+ points',
      icon: <Award size={16} className="text-rose-500" />,
      shortcut: '6',
      action: () => {
        onClose();
        onNavigateSection('achievements');
      }
    },
    // External Profiles
    {
      id: 'github',
      category: 'External',
      title: 'GitHub Repositories (@ckavipriya)',
      subtitle: 'Explore full-stack repositories and algorithmic Java code',
      icon: <Github size={16} />,
      shortcut: 'G',
      action: () => {
        window.open(personalInfo.github, '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      category: 'External',
      title: 'LinkedIn Profile',
      subtitle: 'Professional network, career updates and connections',
      icon: <Linkedin size={16} className="text-blue-500" />,
      shortcut: 'L',
      action: () => {
        window.open(personalInfo.linkedin, '_blank');
        onClose();
      }
    },
    {
      id: 'wastezero-live',
      category: 'External',
      title: 'Open WasteZero Live Production URL',
      subtitle: 'Deployed smart recycling platform on Render cloud',
      icon: <ExternalLink size={16} className="text-emerald-500" />,
      action: () => {
        window.open('https://wastezero-brb7.onrender.com', '_blank');
        onClose();
      }
    },
    // Preferences
    {
      id: 'theme-studio',
      category: 'Preferences',
      title: 'Open Design Studio & Accent Customizer',
      subtitle: 'Switch between Emerald, Electric Cyan, Indigo, Violet & Warm Amber',
      icon: <Palette size={16} className="text-[var(--signal)]" />,
      shortcut: 'C',
      action: () => {
        onClose();
        if (onOpenThemeStudio) onOpenThemeStudio();
      }
    },
    {
      id: 'toggle-theme',
      category: 'Preferences',
      title: isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      subtitle: `Currently active: ${isDarkTheme ? 'Dark' : 'Light'} Mode`,
      icon: isDarkTheme ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-400" />,
      shortcut: 'T',
      action: () => {
        onToggleTheme();
      }
    },
    {
      id: 'replay-intro',
      category: 'Preferences',
      title: 'Replay Launch Loading Experience',
      subtitle: 'Restart fullscreen 1% -> 100% preloader & welcome sequence',
      icon: <RotateCcw size={16} className="text-emerald-500" />,
      action: () => {
        onClose();
        if (onReplayIntro) onReplayIntro();
      }
    }
  ];

  const filteredCommands = commands.filter(cmd => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-3 bg-black/65 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className="w-full max-w-xl rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--line)] bg-[var(--paper-3)]">
          <Search size={18} className="text-[var(--signal)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to section (e.g. resume, node, email)..."
            className="flex-1 bg-transparent text-sm text-[var(--ink)] placeholder-[var(--slate)] focus:outline-hidden font-sans"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-[var(--slate)] hover:text-[var(--ink)] cursor-pointer"
            >
              <X size={14} />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono text-[var(--slate)] bg-[var(--paper-2)] border border-[var(--line)]">
              ESC to close
            </kbd>
          )}
        </div>

        {/* Command List */}
        <div className="max-h-84 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[var(--slate)]">
              No matching commands or sections found for "{query}"
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-[var(--signal-dim)] text-[var(--ink)]' 
                      : 'hover:bg-[var(--paper-3)] text-[var(--slate)]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-[var(--paper-2)] border border-[var(--line)] shrink-0">
                      {cmd.icon}
                    </div>
                    <div className="min-w-0">
                      <div className={`text-xs font-semibold font-sans truncate ${isSelected ? 'text-[var(--signal)]' : 'text-[var(--ink)]'}`}>
                        {cmd.title}
                      </div>
                      <div className="text-[11px] text-[var(--slate)] font-sans truncate">
                        {cmd.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[10px] font-mono text-[var(--slate)] uppercase">
                      {cmd.category}
                    </span>
                    {cmd.shortcut && (
                      <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--paper-3)] border border-[var(--line)] text-[var(--slate)]">
                        {cmd.shortcut}
                      </kbd>
                    )}
                    <ArrowRight size={13} className={`transition-transform ${isSelected ? 'translate-x-0.5 text-[var(--signal)]' : 'opacity-20'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 bg-[var(--paper-3)] border-t border-[var(--line)] flex items-center justify-between text-[11px] font-mono text-[var(--slate)]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>Kavipriya C • Developer Console</span>
        </div>
      </motion.div>
    </div>
  );
};
