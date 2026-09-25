import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, animate } from 'motion/react';
import { Sparkles, CheckCircle2, Cpu } from 'lucide-react';

interface RadialEntranceOverlayProps {
  isActive: boolean;
  isPageLoaded: boolean;
  onComplete?: () => void;
}

/**
 * RadialEntranceOverlay
 * Provides an animated radial gradient wipe that gracefully reveals the
 * underlying portfolio content after the cinematic opening.
 * Linked directly to the window load event and user initiation.
 */
export const RadialEntranceOverlay: React.FC<RadialEntranceOverlayProps> = ({
  isActive,
  isPageLoaded,
  onComplete
}) => {
  const [hasCompleted, setHasCompleted] = useState(false);
  const wipeProgress = useMotionValue(0);

  // Dynamic CSS radial gradient mask: wipes open from center 0% to 150%
  const radialMask = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent ${wipeProgress}%, rgba(0, 0, 0, 0.7) calc(${wipeProgress}% + 12%), #000 calc(${wipeProgress}% + 24%))`;

  useEffect(() => {
    if (!isActive) return;

    setHasCompleted(false);
    wipeProgress.set(0);

    // Animate radial aperture from 0% outward to 155%
    const controls = animate(wipeProgress, 155, {
      duration: 1.35,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        setHasCompleted(true);
        if (onComplete) {
          onComplete();
        }
      }
    });

    return () => controls.stop();
  }, [isActive, onComplete, wipeProgress]);

  return (
    <AnimatePresence>
      {isActive && !hasCompleted && (
        <div 
          className="fixed inset-0 z-40 pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          {/* Layer 1: Dark Shroud with expanding transparent radial aperture */}
          <motion.div
            style={{
              WebkitMaskImage: radialMask,
              maskImage: radialMask,
              background: 'linear-gradient(180deg, #07090e 0%, #0c1017 50%, #07090e 100%)'
            }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {/* Subtle high-tech grid texture inside shroud */}
            <div 
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />
          </motion.div>

          {/* Layer 2: Primary Luminous Radial Shockwave Ring */}
          <motion.div
            initial={{ scale: 0.05, opacity: 0.95 }}
            animate={{ 
              scale: [0.05, 1.4, 3.2],
              opacity: [0.95, 0.8, 0]
            }}
            transition={{ 
              duration: 1.35, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vmax] h-[55vmax] rounded-full border-2 border-emerald-400/80 pointer-events-none"
            style={{
              boxShadow: '0 0 60px 12px rgba(16, 185, 129, 0.55), inset 0 0 50px 10px rgba(14, 165, 233, 0.45)'
            }}
          />

          {/* Layer 3: Secondary Harmonized Echo Ring */}
          <motion.div
            initial={{ scale: 0.02, opacity: 0.7 }}
            animate={{ 
              scale: [0.02, 1.1, 2.7],
              opacity: [0.7, 0.5, 0]
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.08
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[48vmax] h-[48vmax] rounded-full border border-cyan-400/60 pointer-events-none"
            style={{
              boxShadow: '0 0 45px 8px rgba(6, 182, 212, 0.4)'
            }}
          />

          {/* Layer 4: Focal Aperture Reticle & Status (fades out as aperture expands) */}
          <motion.div
            initial={{ opacity: 1, scale: 0.92 }}
            animate={{ 
              opacity: [1, 0.8, 0],
              scale: [0.92, 1.1, 1.25]
            }}
            transition={{ 
              duration: 0.75, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2 pointer-events-none z-10"
          >
            <div className="w-14 h-14 rounded-full border border-emerald-400/60 flex items-center justify-center bg-emerald-950/40 backdrop-blur-md shadow-[0_0_25px_rgba(16,185,129,0.5)]">
              <Sparkles size={22} className="text-emerald-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-[11px] font-mono text-emerald-300 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Workspace Initializing</span>
            </div>

            {isPageLoaded && (
              <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                DOM & Assets Verified • 100% Ready
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
