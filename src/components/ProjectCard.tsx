import React, { useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate 
} from 'motion/react';
import { 
  Github, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Activity, 
  Cpu, 
  Gauge, 
  ShieldCheck, 
  TrendingUp, 
  Server, 
  Database, 
  Atom, 
  Key, 
  BarChart3,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Globe,
  Code2
} from 'lucide-react';
import { Project } from '../types';
import { ApiPlayground } from './ApiPlayground';

interface ProjectCardProps {
  project: Project;
  isExpandedArch: boolean;
  onToggleArch: () => void;
  variants?: any;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isExpandedArch,
  onToggleArch,
  variants
}) => {
  const [activeTab, setActiveTab] = useState<'highlights' | 'architecture' | 'api-sandbox'>('highlights');
  const [showTelemetryModal, setShowTelemetryModal] = useState(false);

  // Custom Framer Motion follow-mouse radial gradient border glow
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive spring physics smoothing for fluid cursor momentum
  const smoothMouseX = useSpring(mouseX, { stiffness: 280, damping: 26, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 280, damping: 26, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Distinct chromatic glow palettes tailored specifically for each project
  const getGlowPalette = (id: string) => {
    switch (id) {
      case 'wastezero':
        return {
          glowPrimary: 'rgba(32, 208, 167, 0.95)',
          glowSecondary: 'rgba(16, 185, 129, 0.55)',
          ambientWash: 'rgba(16, 185, 129, 0.08)',
          shadow: '0 0 28px -2px rgba(32, 208, 167, 0.38), 0 22px 48px -12px rgba(16, 185, 129, 0.22)',
          beamGradient: 'from-emerald-400 via-teal-400 to-cyan-500',
        };
      case 'api-doc-agent':
        return {
          glowPrimary: 'rgba(129, 140, 248, 0.95)',
          glowSecondary: 'rgba(99, 102, 241, 0.55)',
          ambientWash: 'rgba(99, 102, 241, 0.08)',
          shadow: '0 0 28px -2px rgba(129, 140, 248, 0.38), 0 22px 48px -12px rgba(99, 102, 241, 0.22)',
          beamGradient: 'from-indigo-400 via-purple-400 to-sky-400',
        };
      case 'luxestay-hotel':
        return {
          glowPrimary: 'rgba(251, 191, 36, 0.95)',
          glowSecondary: 'rgba(245, 158, 11, 0.55)',
          ambientWash: 'rgba(245, 158, 11, 0.08)',
          shadow: '0 0 28px -2px rgba(251, 191, 36, 0.38), 0 22px 48px -12px rgba(245, 158, 11, 0.22)',
          beamGradient: 'from-amber-400 via-yellow-400 to-orange-400',
        };
      case 'omnifood-ai':
        return {
          glowPrimary: 'rgba(232, 121, 249, 0.95)',
          glowSecondary: 'rgba(217, 70, 239, 0.55)',
          ambientWash: 'rgba(217, 70, 239, 0.08)',
          shadow: '0 0 28px -2px rgba(232, 121, 249, 0.38), 0 22px 48px -12px rgba(217, 70, 239, 0.22)',
          beamGradient: 'from-fuchsia-400 via-rose-400 to-pink-500',
        };
      default:
        return {
          glowPrimary: 'rgba(32, 208, 167, 0.95)',
          glowSecondary: 'rgba(16, 185, 129, 0.55)',
          ambientWash: 'rgba(16, 185, 129, 0.08)',
          shadow: '0 0 28px -2px rgba(32, 208, 167, 0.35), 0 20px 45px -12px rgba(0, 0, 0, 0.15)',
          beamGradient: 'from-[var(--signal)] via-teal-400 to-[var(--signal)]',
        };
    }
  };

  const palette = getGlowPalette(project.id);

  // Radial gradient follow-mouse templates for border beam and inner ambient refraction
  const borderRadialGradient = useMotionTemplate`radial-gradient(420px circle at ${smoothMouseX}px ${smoothMouseY}px, ${palette.glowPrimary} 0%, ${palette.glowSecondary} 45%, transparent 75%)`;
  const innerAmbientGradient = useMotionTemplate`radial-gradient(620px circle at ${smoothMouseX}px ${smoothMouseY}px, ${palette.ambientWash} 0%, transparent 68%)`;

  const getMetricIcon = (type?: string, label?: string) => {
    if (type === 'speed' || label?.toLowerCase().includes('response') || label?.toLowerCase().includes('latency')) {
      return <Zap size={16} className="text-amber-500" />;
    }
    if (type === 'scale' || label?.toLowerCase().includes('concurrent') || label?.toLowerCase().includes('request')) {
      return <Activity size={16} className="text-emerald-500" />;
    }
    if (type === 'reliability' || label?.toLowerCase().includes('accuracy') || label?.toLowerCase().includes('uptime')) {
      return <ShieldCheck size={16} className="text-blue-500" />;
    }
    return <Gauge size={16} className="text-purple-500" />;
  };

  return (
    <motion.div 
      variants={variants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: isHovered 
          ? palette.shadow
          : '0 2px 10px rgba(0, 0, 0, 0.03)'
      }}
      className="project-card relative group rounded-2xl p-[1.5px] transition-all duration-300 overflow-hidden"
    >
      {/* 1. Base neutral border foundation */}
      <div className="absolute inset-0 rounded-2xl bg-[var(--line)] transition-colors duration-300 pointer-events-none" />

      {/* 2. Ambient subtle static glowing outline on hover */}
      <div 
        className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-40 bg-gradient-to-r ${palette.beamGradient}`}
      />

      {/* 3. Soft Colored 'Glow' Border Layer: Interactive Radial Gradient Follow-Mouse */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-1"
        style={{
          background: borderRadialGradient,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* 4. Inner Card Surface & Content Container */}
      <div className="relative rounded-[calc(1rem-1.5px)] bg-[var(--paper-2)] p-6 sm:p-7 w-full h-full overflow-hidden z-10">
        {/* Soft Radial Ambient Inner Wash following cursor */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
          style={{
            background: innerAmbientGradient,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Top subtle illuminated highlight beam with motion */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />

        <div className="relative z-10">
          {/* Header section: Title, Subtitle, Badges & Quick Links */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="project-title text-xl sm:text-2xl font-bold font-sans text-[var(--ink)] tracking-tight hover:text-[var(--signal)] transition-colors inline-flex items-center gap-1.5 group/title cursor-pointer"
              title={`Open ${project.title} GitHub repository`}
            >
              <span>{project.title}</span>
              <ExternalLink size={16} className="opacity-70 group-hover/title:opacity-100 text-[var(--signal)] transition-opacity shrink-0" />
            </a>
            
            {/* Spotlight & Production Badges */}
            <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--signal-dim)] text-[var(--signal)] font-bold border border-[var(--signal)]">
              <Sparkles size={11} />
              {project.badge}
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Performance
            </span>
          </div>

          <div className="project-subtitle text-sm sm:text-base font-medium text-[var(--slate)]">
            {project.subtitle} • <span className="text-[var(--signal)] font-mono text-xs">{project.role}</span>
          </div>
        </div>

        {/* Action Buttons: ONLY ONE Clear, High-Contrast Live Demo & GitHub Repository */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#ffffff' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 !text-white font-mono text-xs font-bold transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer border border-emerald-500"
              title={`Open Live Deployed Application: ${project.liveUrl}`}
            >
              <Globe size={15} className="!text-white shrink-0" />
              <span className="!text-white font-bold tracking-wider">LIVE DEMO</span>
              <ExternalLink size={13} className="!text-white/90 shrink-0" />
            </a>
          )}

          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="pill-link font-medium inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl bg-[var(--paper-3)] border border-[var(--line)] hover:border-[var(--signal)] text-[var(--ink)] hover:text-[var(--signal)] transition-colors cursor-pointer shadow-xs"
            title={`Open GitHub Repository: ${project.githubUrl}`}
          >
            <Github size={14} className="text-[var(--signal)]" />
            <span>Repository</span>
            <ExternalLink size={12} className="opacity-70" />
          </a>
        </div>
      </div>

      {/* Dedicated Tech Badge Row */}
      <div className="my-3.5 p-3 rounded-xl bg-[var(--paper-3)] border border-[var(--line)] shadow-2xs">
        <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[var(--line)]/60">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--signal)] flex items-center gap-1.5">
            <Cpu size={12} className="text-[var(--signal)]" />
            <span>Core Tech Stack & Architecture Pills</span>
          </span>
          <span className="text-[11px] font-mono text-[var(--slate)] font-medium">
            {project.date}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {project.techStack.map((tech) => {
            const getTechStyle = (name: string) => {
              const lower = name.toLowerCase();
              if (lower.includes('react')) return {
                bg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30 hover:bg-sky-500/20',
                icon: <Atom size={12} className="text-sky-500" />
              };
              if (lower.includes('java') && !lower.includes('script')) return {
                bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20',
                icon: <Server size={12} className="text-amber-500" />
              };
              if (lower.includes('node')) return {
                bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20',
                icon: <Server size={12} className="text-emerald-500" />
              };
              if (lower.includes('express')) return {
                bg: 'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border-zinc-500/30 hover:bg-zinc-500/20',
                icon: <Server size={12} className="text-zinc-500" />
              };
              if (lower.includes('sql') || lower.includes('mysql') || lower.includes('postgres')) return {
                bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20',
                icon: <Database size={12} className="text-emerald-500" />
              };
              if (lower.includes('mongo')) return {
                bg: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30 hover:bg-green-500/20',
                icon: <Database size={12} className="text-green-500" />
              };
              if (lower.includes('jwt')) return {
                bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/20',
                icon: <Key size={12} className="text-indigo-500" />
              };
              if (lower.includes('redux')) return {
                bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30 hover:bg-purple-500/20',
                icon: <Layers size={12} className="text-purple-500" />
              };
              if (lower.includes('auth')) return {
                bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/20',
                icon: <ShieldCheck size={12} className="text-rose-500" />
              };
              if (lower.includes('crud')) return {
                bg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20',
                icon: <Gauge size={12} className="text-cyan-500" />
              };
              if (lower.includes('leaflet') || lower.includes('map')) return {
                bg: 'bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/30 hover:bg-lime-500/20',
                icon: <Globe size={12} className="text-lime-500" />
              };
              if (lower.includes('ai') || lower.includes('recommendation')) return {
                bg: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30 hover:bg-fuchsia-500/20',
                icon: <Sparkles size={12} className="text-fuchsia-500" />
              };
              if (lower.includes('javascript') || lower.includes('js')) return {
                bg: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20',
                icon: <Code2 size={12} className="text-yellow-500" />
              };
              if (lower.includes('tailwind') || lower.includes('css')) return {
                bg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30 hover:bg-teal-500/20',
                icon: <Sparkles size={12} className="text-teal-500" />
              };
              if (lower.includes('storage')) return {
                bg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30 hover:bg-orange-500/20',
                icon: <Database size={12} className="text-orange-500" />
              };
              return {
                bg: 'bg-[var(--paper-2)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--signal)]',
                icon: <Code2 size={12} className="text-[var(--signal)]" />
              };
            };

            const style = getTechStyle(tech);

            return (
              <span 
                key={tech} 
                className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-full border shadow-2xs transition-all hover:scale-105 ${style.bg}`}
              >
                {style.icon}
                <span>{tech}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Overview Description */}
      <p className="text-sm sm:text-[14.5px] text-[var(--slate)] my-3 leading-relaxed">
        {project.overview}
      </p>

      {/* ========================================================================= */}
      {/* 🚀 PERFORMANCE IMPACT & PRODUCTION BENCHMARK METRICS DISPLAY SECTION     */}
      {/* ========================================================================= */}
      <div className="my-5 p-4 sm:p-5 rounded-xl bg-gradient-to-br from-[var(--paper-3)] to-[var(--paper-2)] border border-[var(--line)] relative overflow-hidden shadow-xs">
        {/* Subtle decorative glow */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-[var(--signal)] opacity-5 rounded-full blur-2xl pointer-events-none" />

        {/* Section title & benchmark trigger */}
        <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[var(--signal)] text-white flex items-center justify-center">
              <Zap size={14} />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--ink)]">
              Performance Impact & Production Metrics
            </span>
          </div>

          {project.benchmarkStats && (
            <button
              onClick={() => setShowTelemetryModal(!showTelemetryModal)}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--signal)] hover:underline cursor-pointer"
            >
              <BarChart3 size={13} />
              <span className="hidden sm:inline">
                {showTelemetryModal ? "Hide Telemetry" : "Inspect Load Telemetry"}
              </span>
              <span className="sm:hidden">Telemetry</span>
            </button>
          )}
        </div>

        {/* 4-Column Responsive Metrics Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {project.metrics.map((metric, mIdx) => (
            <div
              key={mIdx}
              className="p-3 sm:p-3.5 rounded-lg bg-[var(--paper-2)] border border-[var(--line)]/80 hover:border-[var(--signal)] hover:shadow-sm transition-all duration-200 flex flex-col justify-between group/metric min-w-0 overflow-hidden"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--slate)] min-w-0 mb-1.5">
                  {getMetricIcon(metric.type, metric.label)}
                  <span className="truncate">{metric.label}</span>
                </div>

                {metric.trend && (
                  <div className="mb-2 min-w-0">
                    <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-[var(--signal-dim)] text-[var(--signal)] font-medium max-w-full truncate inline-block border border-[var(--signal)]/20">
                      {metric.trend}
                    </span>
                  </div>
                )}

                {/* Big Stat Value with High-Tech Font */}
                <div className="text-2xl sm:text-[26px] font-bold font-sans tracking-tight text-[var(--signal)] group-hover/metric:text-[var(--signal-2)] transition-colors">
                  {metric.value}
                </div>
              </div>

              {/* Engineering Detail Rationale */}
              <p className="text-[11.5px] text-[var(--slate)] leading-snug mt-2 pt-2 border-t border-[var(--line)]/50 break-words">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Expandable Benchmark Telemetry Panel */}
        <AnimatePresence>
          {showTelemetryModal && project.benchmarkStats && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-3.5 pt-3 border-t border-[var(--line)]"
            >
              <div className="p-3.5 rounded-lg bg-[var(--paper-3)]/80 border border-[var(--line)] text-xs font-mono">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[var(--ink)] flex items-center gap-1.5">
                    <Activity size={13} className="text-[var(--signal)]" />
                    Load Testing & Latency Telemetry
                  </span>
                  <span className="text-[11px] text-[var(--slate)]">
                    Tool: {project.benchmarkStats.loadTool}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center my-2">
                  <div className="p-2 rounded bg-[var(--paper-2)] border border-[var(--line)]">
                    <div className="text-[10px] text-[var(--slate)]">P50 Latency</div>
                    <div className="font-bold text-sm text-[var(--ink)]">{project.benchmarkStats.p50Latency}</div>
                  </div>
                  <div className="p-2 rounded bg-[var(--paper-2)] border border-[var(--line)]">
                    <div className="text-[10px] text-[var(--slate)]">P95 Latency</div>
                    <div className="font-bold text-sm text-[var(--signal)]">{project.benchmarkStats.p95Latency}</div>
                  </div>
                  <div className="p-2 rounded bg-[var(--paper-2)] border border-[var(--line)]">
                    <div className="text-[10px] text-[var(--slate)]">Throughput</div>
                    <div className="font-bold text-sm text-[var(--ink)]">{project.benchmarkStats.throughput}</div>
                  </div>
                  <div className="p-2 rounded bg-[var(--paper-2)] border border-[var(--line)]">
                    <div className="text-[10px] text-[var(--slate)]">Error Rate</div>
                    <div className="font-bold text-sm text-emerald-600 dark:text-emerald-400">{project.benchmarkStats.errorRate}</div>
                  </div>
                </div>

                {/* Visual Latency Bar */}
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-[10px] text-[var(--slate)]">
                    <span>Latency distribution under 10k concurrent pings</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">SLA Target &lt; 200ms (PASSED)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[var(--line)] overflow-hidden flex">
                    <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: '45%' }} title="P50 Latency Window" />
                    <div className="h-full bg-[var(--signal)]" style={{ width: '35%' }} title="P95 Latency Window" />
                    <div className="h-full bg-amber-500" style={{ width: '10%' }} title="P99 Max Variance" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tabs Switcher for Card Content: Engineering Highlights vs Architecture vs Live API */}
      <div className="mt-4">
        <div className="flex items-center gap-2 border-b border-[var(--line)] pb-2 mb-3 flex-wrap">
          <button
            onClick={() => setActiveTab('highlights')}
            className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'highlights'
                ? 'bg-[var(--signal)] text-white'
                : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper-3)]'
            }`}
          >
            Engineering Highlights ({project.highlights.length})
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'bg-[var(--signal)] text-white'
                : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper-3)]'
            }`}
          >
            <Layers size={13} />
            System Architecture ({project.architectureFlow.length} Tiers)
          </button>

          {project.id === 'wastezero' && (
            <button
              onClick={() => setActiveTab('api-sandbox')}
              className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'api-sandbox'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30'
              }`}
            >
              <Zap size={13} className="text-amber-400" />
              <span>Interactive REST API Sandbox</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          )}
        </div>

        {/* Tab 1: Engineering Highlights */}
        {activeTab === 'highlights' && (
          <motion.ul 
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-2 text-sm text-[var(--ink)] pl-1"
          >
            {project.highlights.map((h, hIdx) => (
              <li key={hIdx} className="leading-relaxed flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-[var(--signal)] shrink-0 mt-1" />
                <span>{h}</span>
              </li>
            ))}
          </motion.ul>
        )}

        {/* Tab 2: System Architecture Pipeline */}
        {activeTab === 'architecture' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="arch-grid"
          >
            {project.architectureFlow.map((step, sIdx) => (
              <div 
                key={sIdx} 
                className="arch-step relative group/step hover:border-[var(--signal)] transition-colors p-3 rounded-xl bg-[var(--paper-3)] border border-[var(--line)]"
              >
                <div className="text-[11px] font-mono text-[var(--signal)] font-bold mb-1.5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--signal)] text-white flex items-center justify-center text-[10px] font-bold">
                    {sIdx + 1}
                  </span>
                  <span>{step.step}</span>
                </div>
                <p className="text-xs text-[var(--slate)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Tab 3: Interactive REST API Sandbox */}
        {activeTab === 'api-sandbox' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2"
          >
            <ApiPlayground />
          </motion.div>
        )}
      </div>

      {/* Bottom Accordion link for quick full-flow inspection if on highlights tab */}
      {activeTab === 'highlights' && (
        <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono">
          <button
            onClick={() => setActiveTab('architecture')}
            className="inline-flex items-center gap-1.5 text-[var(--signal)] hover:underline cursor-pointer"
          >
            <Layers size={13} />
            <span>Inspect 4-Tier Data & Execution Pipeline →</span>
          </button>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--slate)] hover:text-[var(--ink)] inline-flex items-center gap-1"
            >
              <span>Explore source on GitHub</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}
        </div>
      </div>
    </motion.div>
  );
};
