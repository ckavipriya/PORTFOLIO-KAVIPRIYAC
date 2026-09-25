import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, Server, Database, Key, ShieldCheck, 
  ArrowRight, Check, Activity, Zap, Layers, RefreshCw, Cpu
} from 'lucide-react';

interface ArchitectureFlowStep {
  tier: string;
  name: string;
  component: string;
  technology: string;
  role: string;
  details: string[];
  latency: string;
}

const FLOW_STEPS: ArchitectureFlowStep[] = [
  {
    tier: 'Tier 1: Client Layer',
    name: 'Single Page App & State',
    component: 'React 19 + Tailwind',
    technology: 'Vite / React.js / Hooks',
    role: 'Renders dynamic interactive views, maintains client cache, validates forms, and dispatches authenticated HTTP requests.',
    details: [
      'Stateless JWT token injection in Bearer authorization header',
      'Optimistic UI state updates for immediate user feedback',
      'Responsive design supporting mobile, tablet, and desktop screens'
    ],
    latency: '< 16ms render'
  },
  {
    tier: 'Tier 2: API Gateway & Security',
    name: 'Reverse Proxy & Middleware Pipeline',
    component: 'Express Router + Middleware',
    technology: 'Express.js / CORS / Helmet',
    role: 'Intercepts incoming traffic, enforces rate limiting, parses JSON bodies, and verifies cryptographically signed JWT tokens.',
    details: [
      'HMAC SHA-256 JWT signature verification & claims parsing',
      'Role-Based Access Control (RBAC) checking permission grants',
      'Unified error-handling middleware preventing stack leak'
    ],
    latency: '8ms - 15ms'
  },
  {
    tier: 'Tier 3: Business Logic Services',
    name: 'Asynchronous Service Controllers',
    component: 'Node.js Controller-Service Layer',
    technology: 'Node.js Event Loop / Async-Await',
    role: 'Executes domain business rules, handles scheduling logic, and aggregates computational metrics with non-blocking I/O.',
    details: [
      'Controller-Service-Repository modular architecture',
      'Municipal waste collection scheduling & dispatch algorithm',
      'Clean separation of business invariants from data persistence'
    ],
    latency: '20ms - 45ms'
  },
  {
    tier: 'Tier 4: Relational Data Persistence',
    name: 'Normalized SQL Engine & Indexing',
    component: 'MySQL 8.0 Relational DB',
    technology: 'MySQL / Connection Pooling / ACID',
    role: 'Persists relational data models across 3NF tables with foreign key constraints, connection pooling, and composite indexes.',
    details: [
      'Normalized schema (1NF to 3NF) eliminating data redundancy',
      'Composite B-Tree index on (zone, status, collection_date)',
      'ACID transactions ensuring zero partial commits during updates'
    ],
    latency: '15ms - 35ms'
  }
];

export const SystemArchitectureViewer: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationIndex, setSimulationIndex] = useState<number | null>(null);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    let step = 0;
    setSimulationIndex(0);
    setSelectedStep(0);

    const interval = setInterval(() => {
      step++;
      if (step < FLOW_STEPS.length) {
        setSimulationIndex(step);
        setSelectedStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setSimulationIndex(null);
        }, 600);
      }
    }, 700);
  };

  const active = FLOW_STEPS[selectedStep];

  return (
    <div className="rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-lg overflow-hidden">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 bg-[var(--paper-3)] border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--signal-dim)] text-[var(--signal)] text-xs font-mono font-bold mb-1.5">
            <Layers size={13} />
            <span>Interactive Full-Stack Architecture Inspector</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-sans text-[var(--ink)]">
            End-to-End Request Pipeline & Tier Distribution
          </h3>
          <p className="text-xs text-[var(--slate)] font-sans mt-0.5">
            Trace how a request travels from client React UI to Node.js / Express and MySQL
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-xs self-start sm:self-center ${
            isSimulating
              ? 'bg-[var(--signal)] text-white opacity-80 cursor-wait'
              : 'bg-[var(--signal)] hover:bg-[var(--signal-2)] text-white hover:scale-105 active:scale-95'
          }`}
        >
          <Zap size={14} className={isSimulating ? 'animate-bounce' : ''} />
          <span>{isSimulating ? 'Simulating Pipeline Flow...' : 'Simulate Live Request Flow'}</span>
        </button>
      </div>

      {/* Interactive Step Track Bar */}
      <div className="p-4 sm:p-6 border-b border-[var(--line)] bg-[var(--paper-2)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FLOW_STEPS.map((step, idx) => {
            const isSelected = selectedStep === idx;
            const isPulsing = simulationIndex === idx;

            return (
              <button
                key={idx}
                onClick={() => setSelectedStep(idx)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                  isPulsing
                    ? 'border-[var(--signal)] bg-[var(--signal-dim)] shadow-md ring-2 ring-[var(--signal)]'
                    : isSelected
                    ? 'border-[var(--signal)] bg-[var(--paper-3)] shadow-xs'
                    : 'border-[var(--line)] bg-[var(--paper-3)]/60 hover:bg-[var(--paper-3)] hover:border-[var(--slate)]/40'
                }`}
              >
                {/* Visual active marker */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--signal)]" />
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-[var(--slate)] uppercase font-semibold">
                    Tier 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--signal)] font-bold">
                    {step.latency}
                  </span>
                </div>

                <div className="font-bold text-xs sm:text-sm text-[var(--ink)] font-sans truncate">
                  {step.name}
                </div>

                <div className="text-[11px] font-mono text-[var(--signal)] truncate mt-0.5">
                  {step.component}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Tier Deep Dive Details */}
      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Spec Summary */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[var(--signal-dim)] text-[var(--signal)] border border-[var(--signal)]/30">
              {active.tier}
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--paper-3)] text-[var(--ink)] border border-[var(--line)]">
              {active.technology}
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <Activity size={13} />
              Avg SLA: {active.latency}
            </span>
          </div>

          <p className="text-sm text-[var(--ink)] leading-relaxed font-sans">
            {active.role}
          </p>

          <div className="space-y-2 pt-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--slate)]">
              Engineering Implementation Details:
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--slate)]">
              {active.details.map((detail, dIdx) => (
                <li key={dIdx} className="flex items-start gap-2">
                  <Check size={14} className="text-[var(--signal)] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Code & Architecture Block */}
        <div className="lg:col-span-5 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] p-4 font-mono text-xs text-[var(--ink)] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--line)] text-[11px] text-[var(--slate)]">
            <span className="flex items-center gap-1.5 font-bold text-[var(--ink)]">
              <Cpu size={13} className="text-[var(--signal)]" />
              <span>Layer Telemetry Spec</span>
            </span>
            <span className="text-[10px] text-emerald-500 font-semibold">ONLINE</span>
          </div>

          <div className="space-y-2 text-[11.5px]">
            <div className="flex justify-between py-1 border-b border-[var(--line)]/50">
              <span className="text-[var(--slate)]">Protocol</span>
              <span className="font-bold text-[var(--ink)]">{selectedStep === 0 ? 'HTTPS / WSS' : selectedStep === 3 ? 'TCP / MySQL Socket' : 'Express HTTP Router'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--line)]/50">
              <span className="text-[var(--slate)]">Data Serialization</span>
              <span className="font-bold text-[var(--ink)]">JSON (application/json)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--line)]/50">
              <span className="text-[var(--slate)]">Thread Model</span>
              <span className="font-bold text-[var(--ink)]">{selectedStep === 2 ? 'Single-Thread Event Loop + Libuv' : 'Non-Blocking Async'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[var(--slate)]">Reliability Tier</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">99.9% High Availability</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
