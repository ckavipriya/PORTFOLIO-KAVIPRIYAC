import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Cpu, ShieldCheck, ChevronRight } from 'lucide-react';
import { AmbientParticles } from './AmbientParticles';

interface AttractivePreloaderProps {
  onComplete: () => void;
  onSkip?: () => void;
  isPageLoaded?: boolean;
}

/**
 * AttractivePreloader
 * Fullscreen initial count-up experience (1% -> 100%) with futuristic tech visuals,
 * glowing circular radial progress gauge, and status telemetry.
 */
export const AttractivePreloader: React.FC<AttractivePreloaderProps> = ({
  onComplete,
  onSkip,
  isPageLoaded = true
}) => {
  const [progress, setProgress] = useState(1);
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEM KERNEL...');

  useEffect(() => {
    let current = 1;
    // Dynamic timer duration to create a smooth, responsive, satisfying count-up curve (~1.4s)
    const interval = setInterval(() => {
      // Accelerate count-up with smooth steps
      const increment = current < 30 ? 3 : current < 70 ? 4 : current < 95 ? 3 : 2;
      current += increment;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStatusText('WORKSPACE LOADED • READY');
        clearInterval(interval);
        
        // Wait briefly at 100% to let the completion visual sink in before transitioning
        setTimeout(() => {
          onComplete();
        }, 380);
      } else {
        setProgress(current);
        
        // Update status text based on milestones
        if (current < 25) {
          setStatusText('INITIALIZING SYSTEM KERNEL...');
        } else if (current < 50) {
          setStatusText('LOADING CORE ARCHITECTURE & STACK...');
        } else if (current < 75) {
          setStatusText('SYNCHRONIZING REPOSITORIES & ASSETS...');
        } else if (current < 95) {
          setStatusText('OPTIMIZING WORKSPACE TELEMETRY...');
        } else {
          setStatusText('FINALIZING HIGH-PERFORMANCE INTERFACE...');
        }
      }
    }, 22);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Calculate SVG stroke offset for the radial gauge
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      key="preloader-overlay"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.05, 
        filter: 'blur(12px)',
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] text-white overflow-hidden select-none"
    >
      {/* Background Particle Light Field */}
      <AmbientParticles count={36} />

      {/* Background Tech Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Deep Center Ambient Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-lg w-full">
        
        {/* Top Tech Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono tracking-widest text-emerald-300 uppercase mb-8 shadow-sm"
        >
          <Cpu size={14} className="text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Kavipriya Workspace Engine</span>
        </motion.div>

        {/* Circular Radial Counter Gauge */}
        <div className="relative flex items-center justify-center my-4">
          <svg className="w-52 h-52 sm:w-60 sm:h-60 transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="text-white/5"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Active Animated Radial Ring */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="text-emerald-400 transition-all duration-150 ease-out"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              style={{
                filter: 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.7))'
              }}
            />
          </svg>

          {/* Center Counter Number Display */}
          <div className="absolute flex flex-col items-center justify-center">
            <div className="flex items-baseline">
              <span className="text-5xl sm:text-6xl font-bold font-mono tracking-tighter text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                {String(progress).padStart(2, '0')}
              </span>
              <span className="text-2xl font-mono text-emerald-400 font-semibold ml-1">
                %
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-1">
              {progress === 100 ? 'COMPLETE' : 'LOADING'}
            </span>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full max-w-xs h-1.5 bg-white/10 rounded-full overflow-hidden my-6 p-0.5 border border-white/5 relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Live Status Telemetry Log */}
        <motion.div 
          key={statusText}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-6 flex items-center justify-center gap-2 text-xs font-mono text-slate-300 tracking-wider uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{statusText}</span>
        </motion.div>

        {/* Optional Skip directly to portfolio */}
        {onSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onSkip}
            className="mt-6 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
          >
            <span>Skip Loading</span>
            <ChevronRight size={13} />
          </motion.button>
        )}

        {/* Subtle Tech Corner Indicators */}
        <div className="absolute top-0 left-0 text-emerald-500/30 font-mono text-[9px] tracking-widest">
          ┌── [INIT_01]
        </div>
        <div className="absolute top-0 right-0 text-emerald-500/30 font-mono text-[9px] tracking-widest">
          [SYS_READY] ──┐
        </div>
      </div>
    </motion.div>
  );
};
