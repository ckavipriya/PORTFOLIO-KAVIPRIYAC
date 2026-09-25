import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { Sparkles, ArrowRight, FileText, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { AmbientParticles } from './AmbientParticles';

interface WelcomeModalProps {
  isOpen: boolean;
  onStart: (targetSection?: string) => void;
  onViewResume?: () => void;
  isPageLoaded?: boolean;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ 
  isOpen, 
  onStart,
  onViewResume,
  isPageLoaded = false
}) => {
  // Interactive mouse spotlight coordinates
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth responsive spring for cursor light
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x * 100);
    mouseY.set(y * 100);
  };

  const spotlightBg = useMotionTemplate`radial-gradient(550px circle at ${smoothX}% ${smoothY}%, rgba(16, 185, 129, 0.15) 0%, rgba(14, 165, 233, 0.08) 35%, transparent 70%)`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="welcome-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
          }}
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090e] p-4 sm:p-6 overflow-hidden select-none"
        >
          {/* Subtle Ambient Particle Light Field */}
          <AmbientParticles count={48} />

          {/* Dynamic Follow-Mouse Spotlight */}
          <motion.div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
            style={{ 
              background: spotlightBg,
              opacity: isHovered ? 1 : 0.7
            }}
          />

          {/* Deep ambient background rings with organic pulsing glow */}
          <div className="absolute w-[600px] h-[600px] rounded-full border border-emerald-500/[0.04] pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />
          <div className="absolute w-[860px] h-[860px] rounded-full border border-cyan-500/[0.03] pointer-events-none" />
          <div className="absolute w-[1100px] h-[1100px] rounded-full border border-white/[0.02] pointer-events-none" />

          {/* Centered Welcome Card with High-Tech Framing */}
          <motion.div
            key="welcome-card"
            initial={{ opacity: 0, scale: 0.88, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ 
              opacity: 0, 
              scale: 1.08, 
              y: -18, 
              filter: 'blur(14px)',
              transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
            }}
            transition={{ type: "spring", stiffness: 85, damping: 18, delay: 0.12 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative z-10 w-full max-w-xl rounded-3xl p-8 sm:p-12 text-center overflow-hidden group shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(9, 14, 26, 0.94) 100%)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              boxShadow: '0 0 90px -20px rgba(16, 185, 129, 0.25), 0 35px 70px -15px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.14)'
            }}
          >
            {/* Animated Laser Scanning Beam (sweeps down once on load) */}
            <motion.div 
              initial={{ top: '-10%', opacity: 0 }}
              animate={{ top: '115%', opacity: [0, 0.7, 0.7, 0] }}
              transition={{ duration: 2.4, ease: "easeInOut", delay: 0.3 }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent pointer-events-none z-20"
              style={{
                boxShadow: '0 0 18px rgba(52, 211, 153, 0.8), 0 0 35px rgba(16, 185, 129, 0.4)'
              }}
            />

            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent pointer-events-none" />

            {/* Live Status Pill */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono tracking-wider uppercase text-emerald-300 mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>
                {isPageLoaded ? "Page Loaded (100%) • Workspace Ready" : "Initializing Page Assets"}
              </span>
            </motion.div>

            {/* Main Welcome Heading with High-Contrast Typography */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="space-y-1"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight text-white font-sans leading-tight">
                Welcome to My Portfolio
              </h1>
            </motion.div>

            {/* Horizon Shimmer Accent Line */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.48, duration: 0.8 }}
              className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent mx-auto my-5 rounded-full"
            />

            {/* Name & Academic / Professional Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.54, duration: 0.6 }}
              className="space-y-1.5 mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                Kavipriya Chakkaravarthi
              </h2>
              <p className="text-xs sm:text-sm text-emerald-400/90 font-mono tracking-wide font-medium">
                Software Developer | Full-Stack & Systems Engineering
              </p>
              <p className="text-[11.5px] text-slate-400 font-sans mt-1">
                B.E. Computer & Communication Engineering • VSB Engineering College
              </p>
            </motion.div>

            {/* Primary CTA Button: "Launch Portfolio Experience →" */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.74, duration: 0.5 }}
              className="space-y-3"
            >
              <button
                onClick={() => onStart()}
                className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full font-semibold text-sm sm:text-base text-white cursor-pointer transition-all duration-300 w-full sm:w-auto shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.98) 100%)',
                  boxShadow: '0 0 35px rgba(16, 185, 129, 0.45), 0 10px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.25)'
                }}
              >
                {/* Glowing light sweep */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                
                <span className="tracking-wide">Launch Portfolio Experience</span>
                <ArrowRight 
                  size={18} 
                  className="transition-transform duration-300 group-hover:translate-x-1.5 text-white" 
                />
              </button>

              {/* Fast-access shortcuts: Projects & Resume */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onStart('projects')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all cursor-pointer"
                >
                  <Zap size={13} className="text-amber-400" />
                  <span>Projects ⚡</span>
                </button>

                {onViewResume && (
                  <button
                    onClick={onViewResume}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all cursor-pointer"
                  >
                    <FileText size={13} className="text-cyan-400" />
                    <span>Resume 📄</span>
                  </button>
                )}
              </div>
            </motion.div>

            {/* Footnote instruction */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.92, duration: 0.5 }}
              className="text-[11px] text-slate-500 font-mono mt-6"
            >
              Live telemetry & source repositories available inside
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
