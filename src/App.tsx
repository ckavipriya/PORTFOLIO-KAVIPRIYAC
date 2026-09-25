import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Mail, Github, Linkedin, X, ExternalLink,
  Atom, Server, Database, Key, GitBranch,
  Sun, Moon, Phone, FileText, Menu,
  Check, Copy, ChevronDown, ChevronUp, Award,
  GraduationCap, Briefcase, Sparkles, MapPin,
  Calendar, Layers, ShieldCheck, ArrowUpRight,
  Zap, BarChart3, Activity, ArrowUp, TrendingUp, ArrowUpDown,
  MessageSquare, RefreshCw, Brain, Users, CheckCircle2, Globe
} from 'lucide-react';

import { 
  personalInfo, heroStats, skillCategories, projects,
  internships, educationList, achievementsList, certificationsList,
  languagesSpoken, softSkillsList
} from './data/portfolioData';
import { ResumeModal } from './components/ResumeModal';
import { WelcomeModal } from './components/WelcomeModal';
import { HeroCinematicReveal } from './components/HeroCinematicReveal';
import { ProjectCard } from './components/ProjectCard';
import { ParallaxSectionHeader } from './components/ParallaxSectionHeader';
import { RadialEntranceOverlay } from './components/RadialEntranceOverlay';
import { AttractivePreloader } from './components/AttractivePreloader';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { LeetCodeShowcase } from './components/LeetCodeShowcase';
import { InteractiveContactCard } from './components/InteractiveContactCard';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { SystemArchitectureViewer } from './components/SystemArchitectureViewer';
import { SecurityAuthInspector } from './components/SecurityAuthInspector';
import { RecruiterQuickToolkit } from './components/RecruiterQuickToolkit';
import { Search, Palette } from 'lucide-react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [introPhase, setIntroPhase] = useState<'preloader' | 'welcome' | 'transitioning' | 'revealed'>('preloader');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showRadialWipe, setShowRadialWipe] = useState(false);
  const [activeContact, setActiveContact] = useState<null | 'email' | 'github' | 'linkedin' | 'phone'>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isThemeStudioOpen, setIsThemeStudioOpen] = useState(false);
  const [activeAccent, setActiveAccent] = useState<'emerald' | 'cyan' | 'indigo' | 'violet' | 'amber'>('emerald');
  const [expandedArchId, setExpandedArchId] = useState<string | null>(null);
  const [activeNavSection, setActiveNavSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('all');
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper function to rank and quantify proficiency levels
  const getProficiencyInfo = (level: string) => {
    const l = level.toLowerCase();
    if (l.includes('advanced') || l.includes('core strength')) return {
      tier: 'Advanced / Core Strength',
      rank: 1,
      percent: 94,
      badgeClass: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      color: 'bg-emerald-500'
    };
    if (l.includes('proficient')) return {
      tier: 'Proficient',
      rank: 2,
      percent: 84,
      badgeClass: 'bg-[var(--signal-dim)] text-[var(--signal)] border-[var(--signal)]/30',
      color: 'bg-[var(--signal)]'
    };
    return {
      tier: 'Working Knowledge',
      rank: 3,
      percent: 72,
      badgeClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      color: 'bg-amber-500'
    };
  };

  // Link initial entrance experience to page load event
  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoaded(true);
    };

    if (document.readyState === 'complete') {
      setIsPageLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = (targetSection?: string) => {
    setIntroPhase('transitioning');
    setShowRadialWipe(true);
    if (targetSection) {
      setTimeout(() => {
        setIntroPhase('revealed');
        scrollToSection(targetSection);
      }, 450);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        setIntroPhase('revealed');
      }, 450);
    }
  };

  const handleReplayIntro = () => {
    setShowRadialWipe(false);
    setIntroPhase('preloader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Custom Framer Motion spring configurations for high-end, responsive physics
  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 45,
      scale: 0.985,
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        stiffness: 95,
        damping: 19,
        mass: 0.95,
        staggerChildren: 0.08,
        delayChildren: 0.04,
        when: "beforeChildren"
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: 28,
      x: -8,
      scale: 0.97,
      filter: 'blur(5px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        type: "spring",
        stiffness: 190,
        damping: 22,
        mass: 0.75
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        type: "spring",
        stiffness: 175,
        damping: 21,
        mass: 0.8
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
      rotateX: 5,
      filter: 'blur(6px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: { 
        type: "spring",
        stiffness: 160,
        damping: 19,
        mass: 0.85
      }
    }
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', activeAccent);
  }, [activeAccent]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    showToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveNavSection(id);
    }
  };

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'achievements', 'certs', 'soft-skills', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNavSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactContent = {
    email: {
      title: "Email Me",
      desc: "Feel free to reach out directly for full-stack opportunities, project inquiries, or collaborations.",
      action: "Send an Email",
      link: `mailto:${personalInfo.email}`,
      value: personalInfo.email
    },
    phone: {
      title: "Call Direct",
      desc: "Available during standard business hours for recruitment discussions and technical screenings.",
      action: "Call Now",
      link: `tel:${personalInfo.rawPhone}`,
      value: personalInfo.phone
    },
    github: {
      title: "GitHub Profile",
      desc: "Explore my source repositories, algorithmic solutions, and production architectures.",
      action: "Open GitHub Profile",
      link: personalInfo.github,
      value: personalInfo.githubUsername
    },
    linkedin: {
      title: "LinkedIn Profile",
      desc: "Connect professionally on LinkedIn to review recommendations and career updates.",
      action: "Connect on LinkedIn",
      link: personalInfo.linkedin,
      value: personalInfo.linkedinName
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--signal)] to-[var(--signal-2)] origin-left z-50 shadow-[0_0_12px_var(--signal-dim)]"
        style={{ scaleX }}
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-24 left-1/2 z-50 px-5 py-2.5 rounded-full bg-[var(--ink)] text-[var(--paper)] text-xs font-mono font-medium shadow-2xl flex items-center gap-2 border border-[var(--line)]"
          >
            <Check size={14} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Dialog Modal */}
      <AnimatePresence>
        {activeContact && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setActiveContact(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--paper-2)] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-[var(--line)]"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 p-2 text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper-3)] rounded-full transition-colors cursor-pointer"
                onClick={() => setActiveContact(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--signal-dim)] text-[var(--signal)]">
                  {activeContact === 'email' && <Mail size={24} />}
                  {activeContact === 'phone' && <Phone size={24} />}
                  {activeContact === 'github' && <Github size={24} />}
                  {activeContact === 'linkedin' && <Linkedin size={24} />}
                </div>
                <div>
                  <h2 className="text-xl font-bold font-sans">{contactContent[activeContact].title}</h2>
                  <span className="text-xs font-mono text-[var(--signal)]">Verified Direct Channel</span>
                </div>
              </div>
              
              <p className="text-[var(--slate)] mb-5 text-sm leading-relaxed">
                {contactContent[activeContact].desc}
              </p>
              
              <div className="flex items-center justify-between bg-[var(--paper-3)] p-3.5 rounded-xl border border-[var(--line)] font-mono text-sm mb-6 text-[var(--ink)]">
                <span className="truncate mr-2 select-all">{contactContent[activeContact].value}</span>
                <button
                  onClick={() => handleCopy(contactContent[activeContact].value, activeContact)}
                  className="p-1.5 rounded-lg text-[var(--slate)] hover:text-[var(--signal)] hover:bg-[var(--paper-2)] transition-colors cursor-pointer shrink-0"
                  title="Copy value"
                >
                  {copiedKey === activeContact ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>
              
              <div className="flex gap-3">
                <a 
                  href={contactContent[activeContact].link}
                  target={activeContact === 'email' || activeContact === 'phone' ? "_self" : "_blank"}
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium text-white transition-opacity hover:opacity-90 cursor-pointer shadow-md text-sm"
                  style={{ backgroundColor: 'var(--signal)' }}
                >
                  <span>{contactContent[activeContact].action}</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Viewer Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

      {/* Developer Command Palette Modal (Cmd+K) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateSection={scrollToSection}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={type => setActiveContact(type)}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        onOpenThemeStudio={() => setIsThemeStudioOpen(true)}
        onReplayIntro={handleReplayIntro}
      />

      {/* Portfolio Design Studio & Accent Customizer */}
      <ThemeCustomizer
        isOpen={isThemeStudioOpen}
        onClose={() => setIsThemeStudioOpen(false)}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        activeAccent={activeAccent}
        onChangeAccent={accent => {
          setActiveAccent(accent);
          showToast(`Applied ${accent.toUpperCase()} accent palette`);
        }}
      />

      {/* STEP 0: ATTRACTIVE PRELOADER (1% -> 100%) */}
      <AnimatePresence>
        {introPhase === 'preloader' && (
          <AttractivePreloader
            isPageLoaded={isPageLoaded}
            onComplete={() => setIntroPhase('welcome')}
            onSkip={() => handleGetStarted()}
          />
        )}
      </AnimatePresence>

      {/* STEP 1: CINEMATIC WELCOME MODAL WITH PARTICLES */}
      <WelcomeModal
        isOpen={introPhase === 'welcome'}
        onStart={handleGetStarted}
        isPageLoaded={isPageLoaded}
        onViewResume={() => {
          handleGetStarted();
          setTimeout(() => setIsResumeOpen(true), 500);
        }}
      />

      {/* STEP 2: ANIMATED RADIAL GRADIENT WIPE ENTRANCE OVERLAY */}
      <RadialEntranceOverlay
        isActive={showRadialWipe || introPhase === 'transitioning'}
        isPageLoaded={isPageLoaded}
        onComplete={() => {
          setShowRadialWipe(false);
        }}
      />

      {/* Background Subtle Tech Texture */}
      <div className="texture"></div>

      <motion.div 
        className={`page transition-opacity duration-700 ${introPhase === 'welcome' || introPhase === 'preloader' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: introPhase === 'welcome' || introPhase === 'preloader' ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Floating Glassmorphic Top Navbar */}
        <header className="sticky top-3 z-40 w-full mb-6">
          <div className="mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl bg-[var(--paper-2)]/90 backdrop-blur-xl border border-[var(--line)] shadow-lg transition-all">
            {/* Left: Brand Monogram & Identity */}
            <div 
              onClick={() => scrollToSection('hero')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--signal)] to-[var(--signal-2)] text-white font-bold flex items-center justify-center text-sm shadow-md font-sans group-hover:scale-105 transition-transform shrink-0">
                KC
              </div>
              <div>
                <div className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--ink)] group-hover:text-[var(--signal)] transition-colors">
                  {personalInfo.name}
                </div>
                <div className="text-[11px] text-[var(--slate)] font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="hidden sm:inline">Final-Year Software Developer</span>
                  <span className="sm:hidden">Developer</span>
                </div>
              </div>
            </div>

            {/* Center: Desktop Navigation Links with Active Indicator */}
            <nav className="hidden md:flex items-center gap-1 bg-[var(--paper-3)]/70 p-1 rounded-xl border border-[var(--line)]/60">
              {[
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' },
                { id: 'education', label: 'Education' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                    activeNavSection === item.id
                      ? 'bg-[var(--signal)] text-white shadow-xs font-bold'
                      : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--paper-3)] hover:bg-[var(--paper-2)] border border-[var(--line)] hover:border-[var(--signal)] text-xs font-mono font-medium text-[var(--slate)] hover:text-[var(--ink)] transition-all cursor-pointer"
                title="Open Command Palette (⌘K)"
              >
                <Search size={13} className="text-[var(--signal)]" />
                <span>Commands</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded text-[9.5px] font-mono bg-[var(--paper-2)] border border-[var(--line)] text-[var(--slate)]">
                  ⌘K
                </kbd>
              </button>

              <a 
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--paper-3)] hover:bg-[var(--paper-2)] border border-[var(--line)] text-xs font-mono font-medium text-[var(--ink)] hover:text-[var(--signal)] transition-all cursor-pointer"
                title="GitHub Repositories"
              >
                <Github size={13} className="text-[var(--signal)]" />
                <span>GitHub</span>
              </a>

              <button 
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--signal)] hover:bg-[var(--signal-2)] text-white text-xs font-mono font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
                title="View & Print Resume"
              >
                <FileText size={14} />
                <span>Resume</span>
              </button>

              <button 
                onClick={() => setIsThemeStudioOpen(true)}
                className="p-2 rounded-xl bg-[var(--paper-3)] hover:bg-[var(--paper-2)] border border-[var(--line)] hover:border-[var(--signal)] text-[var(--signal)] transition-colors cursor-pointer"
                aria-label="Customize Theme & Accents"
                title="Design Studio: Customize Theme Accents"
              >
                <Palette size={15} />
              </button>

              <button 
                onClick={handleReplayIntro}
                className="p-2 rounded-xl bg-[var(--paper-3)] hover:bg-[var(--paper-2)] border border-[var(--line)] text-[var(--slate)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                aria-label="Replay Loading & Welcome Experience"
                title="Replay Preloader & Welcome Animation"
              >
                <RefreshCw size={15} />
              </button>

              <button 
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className="p-2 rounded-xl bg-[var(--paper-3)] hover:bg-[var(--paper-2)] border border-[var(--line)] text-[var(--ink)] transition-colors cursor-pointer"
                aria-label="Toggle Dark/Light Mode"
                title={isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkTheme ? <Sun size={15} className="text-amber-400 rotate-0 transition-transform" /> : <Moon size={15} className="rotate-0 transition-transform" />}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-[var(--paper-3)] border border-[var(--line)] text-[var(--ink)] cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden mt-2 p-3 rounded-2xl bg-[var(--paper-2)]/95 backdrop-blur-xl border border-[var(--line)] shadow-xl grid grid-cols-2 gap-2 text-xs font-mono"
              >
                {[
                  { id: 'about', label: 'About' },
                  { id: 'skills', label: 'Skills' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'experience', label: 'Experience' },
                  { id: 'education', label: 'Education' },
                  { id: 'achievements', label: 'Milestones' },
                  { id: 'certs', label: 'Certifications' },
                  { id: 'contact', label: 'Contact Me' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`py-2 px-3 rounded-lg text-left transition-colors cursor-pointer ${
                      activeNavSection === item.id
                        ? 'bg-[var(--signal-dim)] text-[var(--signal)] font-bold'
                        : 'text-[var(--slate)] hover:bg-[var(--paper-3)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <div className="spine"></div>

        {/* HERO SECTION WITH CINEMATIC REVEAL (STEP 2 & STEP 3) */}
        <section className="hero" id="hero">
          <HeroCinematicReveal
            isRevealed={introPhase === 'revealed' || introPhase === 'transitioning'}
            onExploreWork={() => scrollToSection('projects')}
            onViewResume={() => setIsResumeOpen(true)}
            onOpenContact={(type) => setActiveContact(type)}
            onOpenCommands={() => setIsCommandPaletteOpen(true)}
          />

          {/* Hero Quick Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introPhase === 'revealed' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.0 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-8 max-w-4xl"
          >
            {heroStats.map((stat, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] shadow-sm hover:border-[var(--signal)] transition-all hover:shadow-md"
              >
                <div className="font-sans font-bold text-2xl lg:text-3xl text-[var(--signal)] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-[var(--ink)] mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[var(--slate)] font-mono truncate mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Interactive Fast-Track Recruiter Dossier Toolkit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introPhase === 'revealed' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.15 }}
          >
            <RecruiterQuickToolkit 
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenContact={(type) => setActiveContact(type)}
              showToast={showToast}
            />
          </motion.div>
        </section>

        {/* 01. ABOUT & BACKGROUND */}
        <motion.section 
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: "-40px" }}
          variants={sectionVariants}
        >
          <motion.div 
            className="node" 
            data-node
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          />
          <motion.div variants={headerVariants}>
            <ParallaxSectionHeader 
              tag="01" 
              title="About & Background" 
              subtitle="Engineering philosophy, academic credentials & continuous learning"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Engineering Philosophy & Technical Focus */}
            <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6 text-[var(--slate)]">
              <div className="p-6 sm:p-7 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-sm space-y-4">
                <h3 className="text-base font-sans font-bold text-[var(--ink)] flex items-center gap-2">
                  <Sparkles size={18} className="text-[var(--signal)]" />
                  <span>Engineering Focus & Profile</span>
                </h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  I am a final-year <strong className="text-[var(--ink)]">Computer & Communication Engineering</strong> undergraduate at <strong className="text-[var(--ink)]">VSB Engineering College, Karur</strong> (CGPA: 7.5), passionate about building production-grade, reliable software systems.
                </p>
                <p className="text-sm sm:text-base leading-relaxed">
                  My technical foundation centers on <strong className="text-[var(--ink)]">Node.js & Express.js</strong>, <strong className="text-[var(--ink)]">REST API engineering</strong>, <strong className="text-[var(--ink)]">SQL / MySQL databases</strong>, and interactive <strong className="text-[var(--ink)]">React.js web applications</strong>. I focus on writing modular, well-structured backend logic, designing normalized relational schemas, and delivering clean, responsive user interfaces.
                </p>
                <p className="text-sm sm:text-base leading-relaxed">
                  I have gained real-world software engineering experience through internships at <strong className="text-[var(--ink)]">Infosys (WasteZero Platform - Internship 6.0)</strong> and <strong className="text-[var(--ink)]">Next Logic Software Co.</strong> Additionally, I have solved 150+ algorithmic problems on LeetCode and earned certifications in NPTEL Programming in Java and AWS Skill Builder.
                </p>
              </div>

              {/* Core Pillars Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                <div className="p-4 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
                    <Server size={16} />
                  </div>
                  <div className="font-bold text-[var(--ink)] mb-1">Robust Backend</div>
                  <div className="text-[var(--slate)] leading-relaxed">
                    Node.js & Express.js runtime, asynchronous event-driven I/O, and modular RESTful APIs.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-[var(--signal-dim)] text-[var(--signal)] flex items-center justify-center mb-2.5">
                    <Database size={16} />
                  </div>
                  <div className="font-bold text-[var(--ink)] mb-1">Optimized Data</div>
                  <div className="text-[var(--slate)] leading-relaxed">
                    Normalized relational schemas, ACID transactions & SQL indexing.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
                    <Atom size={16} />
                  </div>
                  <div className="font-bold text-[var(--ink)] mb-1">Modern UI</div>
                  <div className="text-[var(--slate)] leading-relaxed">
                    Interactive React components, Tailwind styling & responsive layouts.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Academic & Career Highlights Card */}
            <motion.div variants={cardVariants} className="lg:col-span-4 p-6 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--signal)]">
                  Academic Overview
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                  Class of 2026
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="text-[10px] text-[var(--slate)] font-mono uppercase tracking-wider">Degree</div>
                  <div className="font-semibold text-[var(--ink)] mt-0.5">{personalInfo.department}</div>
                  <div className="text-[11px] text-[var(--signal)] font-mono font-semibold">CGPA: 7.5 / 10</div>
                </div>

                <div>
                  <div className="text-[10px] text-[var(--slate)] font-mono uppercase tracking-wider">Institution</div>
                  <div className="font-semibold text-[var(--ink)] mt-0.5">{personalInfo.college}</div>
                </div>

                <div>
                  <div className="text-[10px] text-[var(--slate)] font-mono uppercase tracking-wider">Location</div>
                  <div className="font-semibold text-[var(--ink)] mt-0.5">{personalInfo.location}</div>
                </div>

                <div>
                  <div className="text-[10px] text-[var(--slate)] font-mono uppercase tracking-wider">Languages</div>
                  <div className="font-semibold text-[var(--ink)] mt-0.5">English (Professional), Tamil (Native)</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[var(--line)] space-y-2">
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[var(--signal)] hover:bg-[var(--signal-2)] text-white text-xs font-mono font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText size={14} />
                  <span>View Verified Resume</span>
                </button>
                <button
                  onClick={() => setActiveContact('email')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[var(--paper-3)] hover:bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--signal)] text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Mail size={14} className="text-[var(--signal)]" />
                  <span>Contact Kavipriya</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 02. TECHNICAL TOOLKIT & SKILLS */}
        <motion.section 
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12, margin: "-40px" }}
          variants={sectionVariants}
        >
          <motion.div 
            className="node" 
            data-node
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          />
          <motion.div variants={headerVariants}>
            <ParallaxSectionHeader 
              tag="02" 
              title="Technical Toolkit & Skills" 
              subtitle="Core languages, backend systems, database layers & cloud dev tools"
            />
          </motion.div>

          {/* Interactive Domain Filter Chips & Live Search Bar */}
          <motion.div variants={headerVariants} className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { id: 'all', label: 'All Domains' },
                  { id: 'languages', label: 'Languages' },
                  { id: 'backend', label: 'Backend & Security' },
                  { id: 'frontend', label: 'Frontend' },
                  { id: 'databases', label: 'Databases & Storage' },
                  { id: 'concepts', label: 'Core Concepts' },
                  { id: 'tools', label: 'Developer Tools' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedSkillFilter(tab.id);
                    }}
                    className={`text-xs font-mono px-3.5 py-1.5 rounded-full transition-all cursor-pointer border ${
                      selectedSkillFilter === tab.id
                        ? 'bg-[var(--signal)] text-white border-[var(--signal)] shadow-sm font-bold'
                        : 'bg-[var(--paper-2)] text-[var(--slate)] border-[var(--line)] hover:border-[var(--signal)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Instant Skill Search Input */}
              <div className="relative min-w-[220px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--slate)]" />
                <input
                  type="text"
                  value={skillSearchQuery}
                  onChange={e => setSkillSearchQuery(e.target.value)}
                  placeholder="Filter skills (e.g. Node, SQL)..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-full bg-[var(--paper-2)] border border-[var(--line)] text-xs text-[var(--ink)] placeholder-[var(--slate)] focus:outline-hidden focus:border-[var(--signal)] font-mono"
                />
              </div>
            </div>
          </motion.div>

          {/* Grouped Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCategories
              .map(cat => {
                if (selectedSkillFilter !== 'all' && cat.category !== selectedSkillFilter) {
                  return null;
                }
                const q = skillSearchQuery.toLowerCase().trim();
                if (!q) return cat;
                const matchingSkills = cat.skills.filter(s => 
                  s.name.toLowerCase().includes(q) || 
                  s.description.toLowerCase().includes(q) ||
                  s.level.toLowerCase().includes(q)
                );
                if (matchingSkills.length === 0) return null;
                return { ...cat, skills: matchingSkills };
              })
              .filter((cat): cat is typeof skillCategories[0] => cat !== null)
              .map((cat, idx) => {
                const sortedSkills = [...cat.skills].sort((a, b) => 
                  getProficiencyInfo(a.level).rank - getProficiencyInfo(b.level).rank
                );

                return (
                  <motion.div 
                    key={idx} 
                    variants={cardVariants} 
                    className="skill-group flex flex-col justify-between p-5 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] shadow-xs hover:border-[var(--signal)] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--signal)]">
                          {cat.title}
                        </h3>
                        <span className="text-[10px] font-mono text-[var(--slate)] bg-[var(--paper-3)] px-2 py-0.5 rounded-full border border-[var(--line)]">
                          {cat.skills.length} skills
                        </span>
                      </div>

                      <div className="tag-row mb-4">
                        {sortedSkills.map((skill, sIdx) => (
                          <span key={sIdx} className="tag">
                            <span>{skill.name}</span>
                            {skill.level && (
                              <span className="text-[9px] opacity-75 font-sans px-1 rounded bg-black/5 dark:bg-white/10">
                                {skill.level}
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-[var(--line)] pt-3 mt-2 space-y-3">
                      {sortedSkills.map((skill, sIdx) => {
                        const pInfo = getProficiencyInfo(skill.level);
                        return (
                          <div key={sIdx} className="text-xs">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-bold text-[var(--ink)]">{skill.name}</span>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-semibold ${pInfo.badgeClass}`}>
                                {skill.level}
                              </span>
                            </div>
                            
                            {/* Visual Proficiency Meter */}
                            <div className="w-full h-1.5 rounded-full bg-[var(--line)] my-1 overflow-hidden">
                              <div 
                                className={`h-full ${pInfo.color} transition-all duration-500 rounded-full`} 
                                style={{ width: `${pInfo.percent}%` }}
                              />
                            </div>

                            <p className="text-[11.5px] text-[var(--slate)] mt-0.5 leading-relaxed">
                              {skill.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </motion.section>

        {/* 03. PROJECTS */}
        <motion.section 
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: "-40px" }}
          variants={sectionVariants}
        >
          <motion.div 
            className="node" 
            data-node
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          />
          <motion.div variants={headerVariants}>
            <ParallaxSectionHeader 
              tag="03" 
              title="Key Full-Stack Projects" 
              subtitle="Production systems, benchmarked throughput & interactive architectural flows"
            />
          </motion.div>

          {/* System Performance & Architecture Benchmarks Banner */}
          <motion.div 
            variants={headerVariants}
            className="mb-6 p-4 sm:p-5 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--signal-dim)] text-[var(--signal)] border border-[var(--signal)] flex items-center justify-center shrink-0">
                <Activity size={18} />
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--signal)] flex items-center gap-1.5">
                  <span>Architecture & Reliability SLA</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-sm font-semibold text-[var(--ink)] mt-0.5">
                  High-Throughput Benchmarks & Production-Hardened REST Services
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-xs font-mono pt-3 md:pt-0 border-t md:border-t-0 border-[var(--line)]">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-[var(--slate)] font-semibold">Average P95</span>
                <span className="font-bold text-[var(--signal)] text-sm">&lt; 110ms Latency</span>
              </div>
              <div className="w-[1px] h-6 bg-[var(--line)] hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-[var(--slate)] font-semibold">Throughput Scale</span>
                <span className="font-bold text-[var(--ink)] text-sm">10,000+ Concurrent</span>
              </div>
              <div className="w-[1px] h-6 bg-[var(--line)] hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-[var(--slate)] font-semibold">Security Model</span>
                <span className="font-bold text-[var(--ink)] text-sm">JWT Stateless RBAC</span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isExpandedArch={expandedArchId === project.id}
                onToggleArch={() => setExpandedArchId(expandedArchId === project.id ? null : project.id)}
                variants={cardVariants}
              />
            ))}
          </div>

          {/* Interactive Full-Stack System Architecture Inspector */}
          <motion.div variants={itemVariants} className="mt-10">
            <SystemArchitectureViewer />
          </motion.div>

          {/* Interactive Security & JWT Stateless Authentication Inspector */}
          <motion.div variants={itemVariants} className="mt-8">
            <SecurityAuthInspector />
          </motion.div>
        </motion.section>

        {/* 04. INTERNSHIP EXPERIENCE */}
        <motion.section 
          id="experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12, margin: "-40px" }}
          variants={sectionVariants}
        >
          <motion.div 
            className="node" 
            data-node
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          />
          <motion.div variants={headerVariants}>
            <ParallaxSectionHeader 
              tag="04" 
              title="Internship Experience" 
              subtitle="Industry delivery at Next Logic Software & Infosys Internship 6.0"
            />
          </motion.div>

          <div className="space-y-5">
            {internships.map((job) => (
              <motion.div key={job.id} variants={cardVariants} className="job hover:border-[var(--signal)] transition-all">
                <div className="job-head">
                  <div className="space-y-1">
                    {/* Company Name in Big Size Font */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] font-sans tracking-tight flex items-center gap-2.5">
                      <Briefcase size={20} className="text-[var(--signal)] shrink-0" />
                      <span>{job.company}</span>
                    </h3>

                    {/* Role in Small Size Font */}
                    <div className="text-sm sm:text-base font-medium text-[var(--signal)] font-sans">
                      {job.role}
                    </div>

                    {/* Location or Online Mode for Infosys */}
                    {job.id === 'infosys' || job.location.toLowerCase().includes('online') ? (
                      <div className="text-xs text-[var(--slate)] font-mono mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Online Mode</span>
                      </div>
                    ) : (
                      <div className="text-xs text-[var(--slate)] font-mono mt-1 flex items-center gap-2">
                        <MapPin size={12} />
                        <span>{job.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="job-date mt-2 sm:mt-0 flex items-center gap-1.5 self-start shrink-0">
                    <Calendar size={13} />
                    <span>{job.period}</span>
                  </div>
                </div>

                <p className="text-xs text-[var(--slate)] mb-3 italic">
                  {job.summary}
                </p>

                <ul className="space-y-2 text-sm text-[var(--ink)] pl-1">
                  {job.points.map((pt, pIdx) => (
                    <li key={pIdx} className="leading-relaxed flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] mt-2 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 05. ACADEMIC EDUCATION */}
        <motion.section 
          id="education"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: "-40px" }}
          variants={sectionVariants}
        >
          <motion.div 
            className="node" 
            data-node
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          />
          <motion.div variants={headerVariants}>
            <ParallaxSectionHeader 
              tag="05" 
              title="Academic Education" 
              subtitle="Degree milestones, coursework distinction & collegiate history"
            />
          </motion.div>

          <div className="space-y-4">
            {educationList.map((edu, idx) => (
              <motion.div key={idx} variants={cardVariants} className="job">
                <div className="job-head">
                  <div>
                    <div className="text-lg font-bold text-[var(--ink)] font-sans flex items-center gap-2">
                      <GraduationCap size={18} className="text-[var(--signal)]" />
                      <span>{edu.degree}</span>
                    </div>
                    <div className="text-sm font-semibold text-[var(--slate)] mt-0.5">
                      {edu.institution}, {edu.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-[var(--signal-dim)] text-[var(--signal)] font-mono font-bold text-xs border border-[var(--signal)]">
                      {edu.scoreLabel}: {edu.score}
                    </span>
                    <div className="text-xs font-mono text-[var(--slate)] mt-1">{edu.period}</div>
                  </div>
                </div>

                {edu.highlights && (
                  <ul className="mt-3 space-y-1.5 text-xs text-[var(--slate)] list-disc pl-5">
                    {edu.highlights.map((hl, hIdx) => (
                      <li key={hIdx}>{hl}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 06. ACHIEVEMENTS & MILESTONES */}
        <motion.section 
          id="achievements"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: "-40px" }}
          variants={sectionVariants}
        >
          <motion.div 
            className="node" 
            data-node
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          />
          <motion.div variants={headerVariants}>
            <ParallaxSectionHeader 
              tag="06" 
              title="Achievements & Milestones" 
              subtitle="LeetCode problem-solving, Trailhead points & symposium accolades"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {achievementsList.map((ach, idx) => (
              <motion.div key={idx} variants={cardVariants} className="achieve-card flex flex-col justify-between">
                <div>
                  <span className="achieve-num">{ach.number}</span>
                  <div className="font-bold text-sm text-[var(--ink)] mt-1 font-sans">{ach.label}</div>
                  <div className="text-xs font-mono text-[var(--signal)] mt-0.5 font-semibold">{ach.badge}</div>
                </div>
                <p className="text-xs text-[var(--slate)] mt-4 leading-relaxed border-t border-[var(--line)] pt-3">
                  {ach.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Interactive LeetCode 150+ Solutions & Algorithmic Inspector */}
          <motion.div variants={itemVariants}>
            <LeetCodeShowcase />
          </motion.div>
        </motion.section>

        {/* 07. PROFESSIONAL CERTIFICATIONS */}
        <motion.section 
          id="certs"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: "-40px" }}
          variants={sectionVariants}
        >
          <motion.div 
            className="node" 
            data-node
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          />
          <motion.div variants={headerVariants}>
            <ParallaxSectionHeader 
              tag="07" 
              title="Professional Certifications & Accreditations" 
              subtitle="NPTEL IIT Kharagpur, Amazon Web Services & GeeksforGeeks"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {certificationsList.map((cert, idx) => (
              <motion.div 
                key={idx} 
                variants={cardVariants} 
                className="job flex flex-col justify-between"
                style={{ marginBottom: 0 }}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-bold text-base text-[var(--ink)] font-sans flex items-center gap-2">
                      <Award size={18} className="text-[var(--signal)] shrink-0" />
                      <span>{cert.name}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--signal-dim)] text-[var(--signal)] font-bold">
                      {cert.badgeLabel}
                    </span>
                    {cert.credentialId && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--paper-3)] text-[var(--slate)] border border-[var(--line)]">
                        {cert.credentialId}
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-mono text-[var(--slate)] mb-2.5">
                    <span className="text-[var(--ink)] font-semibold">Issuer:</span> {cert.issuer}
                    {cert.period && <span className="block text-[11px] text-[var(--slate)] mt-0.5">{cert.period}</span>}
                  </div>

                  <p className="text-xs text-[var(--slate)] leading-relaxed">
                    {cert.description}
                  </p>

                  {cert.highlights && (
                    <div className="mt-3 pt-3 border-t border-[var(--line)] space-y-1.5">
                      <div className="text-[11px] font-mono uppercase font-bold text-[var(--ink)]">
                        Core Competencies & Key Areas:
                      </div>
                      <ul className="space-y-1 text-xs text-[var(--slate)]">
                        {cert.highlights.map((hl, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 size={13} className="text-[var(--signal)] shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--line)] flex flex-wrap gap-1.5">
                  {cert.skills.map((sk) => (
                    <span key={sk} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--paper-3)] text-[var(--ink)] border border-[var(--line)]">
                      {sk}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 08. SOFT SKILLS & CORE STRENGTHS */}
        <motion.section 
          id="soft-skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: "-40px" }}
          variants={sectionVariants}
        >
          <motion.div 
            className="node" 
            data-node
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          />
          <motion.div variants={headerVariants}>
            <ParallaxSectionHeader 
              tag="08" 
              title="Soft Skills & Core Strengths" 
              subtitle="Technical communication, team adaptability, analytical thinking & Agile synergy"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {softSkillsList.map((skill, idx) => {
              const getIcon = () => {
                switch (skill.iconType) {
                  case 'communication':
                    return <MessageSquare size={18} className="text-[var(--signal)]" />;
                  case 'adaptability':
                    return <RefreshCw size={18} className="text-[var(--signal)]" />;
                  case 'problemSolving':
                    return <Brain size={18} className="text-[var(--signal)]" />;
                  case 'teamwork':
                    return <Users size={18} className="text-[var(--signal)]" />;
                  default:
                    return <Sparkles size={18} className="text-[var(--signal)]" />;
                }
              };

              return (
                <motion.div 
                  key={idx} 
                  variants={cardVariants} 
                  className="job flex flex-col justify-between"
                  style={{ marginBottom: 0 }}
                >
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-[var(--signal-dim)] text-[var(--signal)] shrink-0">
                          {getIcon()}
                        </div>
                        <div>
                          <div className="font-bold text-base text-[var(--ink)] font-sans">
                            {skill.name}
                          </div>
                          <div className="text-[11px] font-mono text-[var(--slate)]">
                            {skill.category}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--slate)] leading-relaxed mt-2.5">
                      {skill.summary}
                    </p>

                    <div className="mt-3.5 pt-3 border-t border-[var(--line)] space-y-2">
                      <div className="text-[11px] font-mono uppercase font-bold text-[var(--ink)]">
                        Demonstrated Impact in Practice:
                      </div>
                      <ul className="space-y-1.5 text-xs text-[var(--slate)]">
                        {skill.bulletPoints.map((bp, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1.5">
                            <span className="text-[var(--signal)] font-bold leading-tight mt-0.5">•</span>
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* 09. CONTACT & FOOTER */}
        <footer id="contact" className="relative">
          <motion.div 
            className="node" 
            data-node
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          />
          <motion.div variants={headerVariants}>
            <ParallaxSectionHeader 
              tag="09" 
              title="Get In Touch & Connect" 
              subtitle="Open for 2026 software engineering, full-stack, and backend roles"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15, margin: "-40px" }}
            variants={sectionVariants}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Interactive Direct Recruiter Composer & Channel Card */}
            <motion.div variants={itemVariants}>
              <InteractiveContactCard 
                onOpenResume={() => setIsResumeOpen(true)}
                showToast={showToast}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8 border-t border-[var(--line)] text-xs font-mono text-[var(--slate)] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-[var(--signal)]">
                  GitHub
                </a>
                <span>•</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--signal)]">
                  LinkedIn
                </a>
                <span>•</span>
                <button 
                  onClick={() => setIsCommandPaletteOpen(true)} 
                  className="hover:text-[var(--signal)] cursor-pointer"
                >
                  Commands (⌘K)
                </button>
              </div>
            </motion.div>
          </motion.div>
        </footer>
      </motion.div>

      {/* FLOATING BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-20 right-6 z-40 p-3 rounded-full bg-[var(--paper-2)] border border-[var(--line)] shadow-lg hover:border-[var(--signal)] hover:text-[var(--signal)] text-[var(--ink)] transition-all cursor-pointer hidden sm:flex items-center justify-center hover:scale-110 active:scale-95"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
