import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, Sun, Moon, Check, Sparkles, Monitor, 
  RotateCcw, Sliders, X, Eye
} from 'lucide-react';

export interface ThemeConfig {
  accentColor: 'emerald' | 'cyan' | 'indigo' | 'violet' | 'amber';
  glowIntensity: 'subtle' | 'balanced' | 'intense';
  compactMode: boolean;
  meshSpeed: 'calm' | 'normal' | 'dynamic';
}

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  activeAccent: 'emerald' | 'cyan' | 'indigo' | 'violet' | 'amber';
  onChangeAccent: (accent: 'emerald' | 'cyan' | 'indigo' | 'violet' | 'amber') => void;
}

export const ACCENT_PRESETS = [
  {
    id: 'emerald' as const,
    name: 'Emerald Core',
    label: 'Terminal & Production',
    primary: '#10B981',
    secondary: '#059669',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'cyan' as const,
    name: 'Electric Cyan',
    label: 'Cloud & High-Throughput',
    primary: '#06B6D4',
    secondary: '#0891B2',
    badgeClass: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
  },
  {
    id: 'indigo' as const,
    name: 'Deep Indigo',
    label: 'Systems & Microservices',
    primary: '#6366F1',
    secondary: '#4F46E5',
    badgeClass: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
  },
  {
    id: 'violet' as const,
    name: 'Royal Violet',
    label: 'Next-Gen Architecture',
    primary: '#8B5CF6',
    secondary: '#7C3AED',
    badgeClass: 'bg-violet-500/15 text-violet-400 border-violet-500/30'
  },
  {
    id: 'amber' as const,
    name: 'Warm Amber',
    label: 'Telemetry & Precision',
    primary: '#F59E0B',
    secondary: '#D97706',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30'
  }
];

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  isOpen,
  onClose,
  isDarkTheme,
  onToggleTheme,
  activeAccent,
  onChangeAccent
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-2xl p-6 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[var(--signal-dim)] text-[var(--signal)] flex items-center justify-center">
                <Palette size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold font-sans text-[var(--ink)]">
                  Portfolio Design Studio
                </h3>
                <p className="text-[11px] font-mono text-[var(--slate)]">
                  Real-time color token & ambiance customization
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper-3)] transition-colors cursor-pointer"
              aria-label="Close customizer"
            >
              <X size={16} />
            </button>
          </div>

          <div className="py-5 space-y-6">
            {/* Dark / Light Mode Switch */}
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--slate)] mb-2.5 flex items-center justify-between">
                <span>Display Appearance</span>
                <span className="text-[10px] text-[var(--signal)]">{isDarkTheme ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => !isDarkTheme && onToggleTheme()}
                  className={`p-3 rounded-2xl border text-xs font-mono font-medium flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                    isDarkTheme
                      ? 'bg-[var(--signal-dim)] border-[var(--signal)] text-[var(--signal)] font-bold shadow-xs'
                      : 'bg-[var(--paper-3)] border-[var(--line)] text-[var(--slate)] hover:text-[var(--ink)]'
                  }`}
                >
                  <Moon size={15} />
                  <span>Technical Dark</span>
                  {isDarkTheme && <Check size={14} className="text-[var(--signal)]" />}
                </button>

                <button
                  onClick={() => isDarkTheme && onToggleTheme()}
                  className={`p-3 rounded-2xl border text-xs font-mono font-medium flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                    !isDarkTheme
                      ? 'bg-[var(--signal-dim)] border-[var(--signal)] text-[var(--signal)] font-bold shadow-xs'
                      : 'bg-[var(--paper-3)] border-[var(--line)] text-[var(--slate)] hover:text-[var(--ink)]'
                  }`}
                >
                  <Sun size={15} />
                  <span>Clean Light</span>
                  {!isDarkTheme && <Check size={14} className="text-[var(--signal)]" />}
                </button>
              </div>
            </div>

            {/* Accent Color Preset Palette */}
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--slate)] mb-2.5 flex items-center justify-between">
                <span>Primary Accent Theme</span>
                <span className="text-[10px] text-[var(--signal)] font-bold uppercase">{activeAccent}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ACCENT_PRESETS.map((preset) => {
                  const isSelected = activeAccent === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => onChangeAccent(preset.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? 'border-[var(--signal)] bg-[var(--signal-dim)] shadow-xs'
                          : 'border-[var(--line)] bg-[var(--paper-3)] hover:border-[var(--slate)]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-4 h-4 rounded-full shadow-sm shrink-0 border border-black/10 group-hover:scale-110 transition-transform" 
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div>
                          <div className="text-xs font-mono font-bold text-[var(--ink)] leading-none">
                            {preset.name}
                          </div>
                          <div className="text-[10px] text-[var(--slate)] font-sans mt-0.5">
                            {preset.label}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check size={14} className="text-[var(--signal)] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Preview Badge */}
            <div className="p-3.5 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--signal)] animate-pulse" />
                <span className="text-xs font-mono font-medium text-[var(--ink)]">
                  Live Ambiance Active
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold text-[var(--signal)]">
                CSS Variables Synced
              </span>
            </div>
          </div>

          {/* Footer Close */}
          <div className="pt-3 border-t border-[var(--line)] flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[var(--signal)] hover:opacity-90 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
