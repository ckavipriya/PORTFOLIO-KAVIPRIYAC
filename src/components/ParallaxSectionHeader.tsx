import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'motion/react';

export interface ParallaxHeaderTransforms {
  headerY: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  rotateX: MotionValue<number>;
  titleY: MotionValue<number>;
  tagY: MotionValue<number>;
  tagX: MotionValue<number>;
  subtitleY: MotionValue<number>;
  lineX: MotionValue<number>;
  lineScale: MotionValue<number>;
  glowY: MotionValue<number>;
  rawGlowOpacity: MotionValue<number>;
}

/**
 * Custom hook implementing useScroll & useTransform for differential parallax depth,
 * scroll-linked opacity curves, and focal scale response.
 */
export function useSectionHeaderParallax(targetRef: React.RefObject<HTMLDivElement | null>): ParallaxHeaderTransforms {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // 1. DIFFERENTIAL SCROLL SPEED (Depth Parallax):
  // The header container travels at a distinct vertical rate relative to surrounding body content
  const rawHeaderY = useTransform(scrollYProgress, [0, 1], [42, -42]);

  // 2. MULTI-PLANE SUB-ELEMENT SPEEDS:
  // Internal typography, numerical tag, horizon line, and aura each shift at differing velocities
  const rawTitleY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const rawTagY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rawTagX = useTransform(scrollYProgress, [0, 1], [-7, 7]);
  const rawSubtitleY = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const rawLineX = useTransform(scrollYProgress, [0, 1], [-32, 32]);
  const rawLineScale = useTransform(scrollYProgress, [0.08, 0.5, 0.92], [0.5, 1.3, 0.65]);
  const rawGlowY = useTransform(scrollYProgress, [0, 1], [-36, 36]);
  const rawGlowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.38, 0.05]);

  // 3. LINK OPACITY TO SCROLL POSITION:
  // Soft atmospheric entrance (0.25) -> sharp clarity in primary viewing zone (1.0) -> graceful departure fade (0.35)
  const rawOpacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.25, 1, 1, 0.35]);

  // 4. LINK SCALE TO SCROLL POSITION:
  // Subtle focal compression on entrance (0.92) -> full presence in viewport center (1.0) -> gentle recession (0.95)
  const rawScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.92, 1, 1, 0.95]);

  // 5. 3D PERSPECTIVE PITCH:
  // Subtle tilt along the X axis responding to scroll progression
  const rawRotateX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [4.5, 0, 0, -3.5]);

  // Spring physics smoothing for organic inertia and jitter-free scroll response
  const headerY = useSpring(rawHeaderY, { stiffness: 175, damping: 25, mass: 0.6 });
  const opacity = useSpring(rawOpacity, { stiffness: 220, damping: 26, mass: 0.5 });
  const scale = useSpring(rawScale, { stiffness: 200, damping: 25, mass: 0.5 });
  const rotateX = useSpring(rawRotateX, { stiffness: 175, damping: 26, mass: 0.6 });
  const titleY = useSpring(rawTitleY, { stiffness: 170, damping: 26, mass: 0.6 });
  const tagY = useSpring(rawTagY, { stiffness: 220, damping: 24, mass: 0.5 });
  const tagX = useSpring(rawTagX, { stiffness: 220, damping: 24, mass: 0.5 });
  const subtitleY = useSpring(rawSubtitleY, { stiffness: 160, damping: 25, mass: 0.6 });
  const lineX = useSpring(rawLineX, { stiffness: 150, damping: 25, mass: 0.6 });
  const lineScale = useSpring(rawLineScale, { stiffness: 180, damping: 24, mass: 0.5 });
  const glowY = useSpring(rawGlowY, { stiffness: 120, damping: 30, mass: 0.8 });

  return {
    headerY,
    opacity,
    scale,
    rotateX,
    titleY,
    tagY,
    tagX,
    subtitleY,
    lineX,
    lineScale,
    glowY,
    rawGlowOpacity
  };
}

interface ParallaxSectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export const ParallaxSectionHeader: React.FC<ParallaxSectionHeaderProps> = ({
  tag,
  title,
  subtitle,
  badge,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    headerY,
    opacity,
    scale,
    rotateX,
    titleY,
    tagY,
    tagX,
    subtitleY,
    lineX,
    lineScale,
    glowY,
    rawGlowOpacity
  } = useSectionHeaderParallax(containerRef);

  return (
    <div 
      ref={containerRef} 
      className={`relative mb-8 select-none perspective-[1000px] ${className}`}
    >
      {/* Deep ambient depth aura floating in background plane */}
      <motion.div 
        style={{ y: glowY, opacity: rawGlowOpacity }}
        className="absolute -top-7 -left-10 w-52 h-28 bg-gradient-to-r from-[var(--signal)]/20 to-transparent rounded-full blur-2xl pointer-events-none -z-10"
      />

      {/* Main Header Container with scroll-linked Parallax Speed, Opacity, Scale, & 3D Pitch */}
      <motion.div
        style={{
          y: headerY,
          opacity: opacity,
          scale: scale,
          rotateX: rotateX,
          transformOrigin: 'left center'
        }}
        className="relative will-change-transform"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-3.5 flex-wrap">
            {/* Main Title with multi-plane parallax */}
            <motion.h2 
              style={{ y: titleY }}
              className="text-2xl sm:text-3xl font-bold font-sans text-[var(--ink)] tracking-tight inline-block"
            >
              {title}
            </motion.h2>

            {/* Tag number with differential multi-plane parallax & micro-horizontal slide */}
            <motion.span 
              style={{ y: tagY, x: tagX }}
              className="sec-tag mono inline-flex items-center gap-1 font-semibold text-xs tracking-wider shadow-sm"
            >
              {tag}
            </motion.span>

            {badge && (
              <motion.span
                style={{ y: titleY }}
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--signal-dim)] text-[var(--signal)] border border-[var(--signal)]/30 shadow-xs"
              >
                {badge}
              </motion.span>
            )}
          </div>

          {subtitle && (
            <motion.div 
              style={{ y: subtitleY }}
              className="text-xs font-mono text-[var(--slate)] max-w-sm sm:text-right"
            >
              {subtitle}
            </motion.div>
          )}
        </div>

        {/* Subtle parallax accent horizon line with animated light sweep */}
        <div className="relative mt-2.5 h-[1.5px] w-full bg-[var(--line)]/40 overflow-hidden rounded-full">
          <motion.div
            style={{ x: lineX, scaleX: lineScale }}
            className="absolute left-0 top-0 h-full w-36 bg-gradient-to-r from-transparent via-[var(--signal)] to-transparent opacity-90 origin-left"
          />
        </div>
      </motion.div>
    </div>
  );
};
