import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowDown, FileText, Mail, Phone, Github, Linkedin, 
  Sparkles, Camera, Upload, Check, Terminal
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeroCinematicRevealProps {
  isRevealed: boolean;
  onExploreWork: () => void;
  onViewResume: () => void;
  onOpenContact: (type: 'email' | 'phone' | 'github' | 'linkedin') => void;
  onOpenCommands?: () => void;
}

export const HeroCinematicReveal: React.FC<HeroCinematicRevealProps> = ({
  isRevealed,
  onExploreWork,
  onViewResume,
  onOpenContact,
  onOpenCommands
}) => {
  const [customPhoto, setCustomPhoto] = useState<string | null>(() => {
    return localStorage.getItem('kavipriya_custom_profile_photo') || null;
  });
  const [imageError, setImageError] = useState(false);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [uploadToast, setUploadToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomPhoto(result);
          setImageError(false);
          localStorage.setItem('kavipriya_custom_profile_photo', result);
          setUploadToast(true);
          setTimeout(() => setUploadToast(false), 2500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const imageSrc = customPhoto || '/profile-photo.jpg';

  return (
    <div className="relative w-full pt-4 pb-12 sm:pb-16 overflow-hidden">
      {/* Ambient background radiant pools on reveal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none -z-10"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="absolute top-8 -right-16 w-88 h-88 rounded-full bg-gradient-to-bl from-teal-500/10 to-transparent blur-3xl pointer-events-none -z-10"
      />

      {/* Hidden file input for custom photo upload/replacement */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
        aria-label="Upload custom profile photo"
      />

      {/* Upload confirmation toast */}
      {uploadToast && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2 rounded-full bg-emerald-500 text-white text-xs font-mono font-medium shadow-xl flex items-center gap-2">
          <Check size={14} />
          <span>Professional photo updated successfully</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* LEFT COLUMN: HERO TYPOGRAPHY & BUTTONS (STEP 3) */}
        <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 text-left">
          
          {/* Eyebrow status */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--paper-2)] border border-[var(--line)] text-xs font-mono mb-5 shadow-sm self-start"
          >
            <span className="live-dot"></span>
            <span className="text-[var(--ink)] font-medium">
              Final-Year B.E. CCE • VSB Engineering College
            </span>
          </motion.div>

          {/* Headline Name */}
          <motion.div
            initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
            animate={isRevealed ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 22, filter: 'blur(6px)' }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-[var(--ink)] leading-[1.12]">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--signal)] to-[var(--signal-2)]">Kavipriya Chakkaravarthi</span>
            </h1>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 0.68, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2"
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-[var(--signal)] font-sans tracking-tight">
              Software Developer (Final Year) | Full-Stack & Systems Engineering
            </h2>
          </motion.div>

          {/* Full Self-Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.78, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-[var(--slate)] font-sans leading-relaxed mt-4 max-w-2xl"
          >
            Final-year Computer & Communication Engineering student at VSB Engineering College (CGPA: 7.5). Passionate full-stack software developer with hands-on expertise in Node.js & Express.js RESTful API engineering, SQL/MySQL database systems, and React.js web applications. Experienced through software development internships at Infosys (WasteZero platform) and Next Logic Software Co., backed by 150+ LeetCode algorithmic solutions, NPTEL Java certification, and AWS Skill Builder credentials.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ delay: 0.86, duration: 0.6 }}
            className="text-xs sm:text-sm text-[var(--slate)] font-mono mt-3"
          >
            B.E. Computer & Communication Engineering • VSB Engineering College, Karur
          </motion.p>

          {/* EXACT BUTTONS: "Explore My Work" and "View Resume" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.95, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3.5 mt-8"
          >
            <button
              onClick={onExploreWork}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-medium text-sm sm:text-base text-white cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
              style={{
                backgroundColor: 'var(--signal)'
              }}
            >
              <span className="font-semibold">Explore My Work</span>
              <ArrowDown size={17} className="transition-transform duration-300 group-hover:translate-y-1" />
            </button>

            <button
              onClick={onViewResume}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm sm:text-base text-[var(--ink)] bg-[var(--paper-2)] border border-[var(--line)] hover:border-[var(--signal)] hover:bg-[var(--paper-3)] cursor-pointer transition-all duration-300 shadow-sm"
            >
              <FileText size={17} className="text-[var(--signal)]" />
              <span>View Resume</span>
            </button>

            {onOpenCommands && (
              <button
                onClick={onOpenCommands}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-medium text-sm text-[var(--slate)] hover:text-[var(--ink)] bg-[var(--paper-2)] border border-[var(--line)] hover:border-[var(--signal)] cursor-pointer transition-all duration-300 shadow-xs"
                title="Open Command Palette (⌘K)"
              >
                <Terminal size={16} className="text-[var(--signal)]" />
                <span>Commands</span>
                <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--paper-3)] border border-[var(--line)] text-[var(--slate)]">
                  ⌘K
                </kbd>
              </button>
            )}
          </motion.div>

          {/* Quick Contact & Channels Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-[var(--line)]"
          >
            <span className="text-xs font-mono text-[var(--slate)] uppercase font-semibold">Direct:</span>
            <button 
              onClick={() => onOpenContact('email')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--slate)] hover:text-[var(--signal)] transition-colors cursor-pointer"
            >
              <Mail size={13} className="text-[var(--signal)]" /> {personalInfo.email}
            </button>
            <span className="text-[var(--line)]">•</span>
            <button 
              onClick={() => onOpenContact('phone')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--slate)] hover:text-[var(--signal)] transition-colors cursor-pointer"
            >
              <Phone size={13} className="text-[var(--signal)]" /> {personalInfo.phone}
            </button>
            <span className="text-[var(--line)]">•</span>
            <a 
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-[var(--slate)] hover:text-[var(--signal)] transition-colors cursor-pointer"
              title="Open GitHub Profile & Repositories"
            >
              <Github size={13} /> GitHub
            </a>
            <span className="text-[var(--line)]">•</span>
            <a 
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-[var(--slate)] hover:text-[var(--signal)] transition-colors cursor-pointer"
              title="Open LinkedIn Profile"
            >
              <Linkedin size={13} /> LinkedIn
            </a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: PROMINENT PROFESSIONAL PHOTOGRAPH REVEAL (STEP 2) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.88, 
              y: 28, 
              filter: 'blur(10px)' 
            }}
            animate={isRevealed ? { 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              filter: 'blur(0px)' 
            } : { 
              opacity: 0, 
              scale: 0.88, 
              y: 28, 
              filter: 'blur(10px)' 
            }}
            transition={{ 
              delay: 0.25, 
              duration: 0.85, 
              type: "spring", 
              stiffness: 75, 
              damping: 18 
            }}
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsPhotoHovered(true)}
            onMouseLeave={() => setIsPhotoHovered(false)}
            onClick={() => fileInputRef.current?.click()}
            title="Click to view / update profile photograph"
          >
            {/* Ambient Soft Professional Glow Halo */}
            <div 
              className="absolute -inset-3 sm:-inset-4 rounded-[36px] pointer-events-none transition-opacity duration-700 opacity-70 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(14, 165, 233, 0.15) 50%, transparent 75%)',
                filter: 'blur(28px)',
              }}
            />

            {/* Secondary warm ambient light ring */}
            <div 
              className="absolute -inset-1 rounded-[32px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(20, 184, 166, 0.2), rgba(14, 165, 233, 0.3))',
                filter: 'blur(10px)'
              }}
            />

            {/* Luxury Outer Glass Frame Container */}
            <div 
              className="relative p-2.5 sm:p-3 rounded-[32px] transition-transform duration-500 group-hover:scale-[1.015]"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35), 0 0 45px -10px rgba(16, 185, 129, 0.28)'
              }}
            >
              {/* Inner Picture Frame */}
              <div className="relative w-64 h-76 sm:w-76 sm:h-92 md:w-80 md:h-98 rounded-[24px] overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center">
                
                {/* Photo Element */}
                {!imageError ? (
                  <img
                    src={imageSrc}
                    alt="Kavi Priya - Software Developer"
                    className="w-full h-full object-cover object-center select-none transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  /* Elegant Fallback Portrait Presentation */
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 via-slate-950 to-[#071310] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold text-3xl flex items-center justify-center shadow-xl border-2 border-white/20 mb-4">
                      KP
                    </div>
                    
                    <h3 className="text-white font-bold text-lg font-sans">Kavi Priya</h3>
                    <p className="text-xs text-emerald-400 font-mono mt-0.5">Software Developer</p>
                    
                    <div className="mt-4 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                      <Upload size={12} className="text-emerald-400" />
                      <span>Click to upload photo</span>
                    </div>
                  </div>
                )}

                {/* Subtle sheen highlight stripe */}
                <div 
                  className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent opacity-60 group-hover:opacity-100 transition-opacity"
                />

                {/* Bottom Photo Identity Badge */}
                <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-left shadow-lg">
                  <div>
                    <div className="text-xs font-bold text-white font-sans flex items-center gap-1.5">
                      <span>Kavipriya Chakkaravarthi</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                    <div className="text-[10px] text-slate-300 font-mono">
                      B.E. CCE • Software Developer
                    </div>
                  </div>
                  
                  <div className="p-1.5 rounded-lg bg-white/[0.08] text-slate-300 group-hover:text-emerald-400 transition-colors">
                    <Camera size={14} />
                  </div>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-emerald-300 flex items-center gap-1">
                  <Upload size={10} />
                  <span>Update Photo</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
