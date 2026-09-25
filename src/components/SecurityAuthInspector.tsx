import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, ShieldCheck, Check, Copy, Key, 
  Lock, RefreshCw, AlertCircle, ArrowRight
} from 'lucide-react';

export const SecurityAuthInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'token-decode' | 'rbac-matrix' | 'flow-diagram'>('token-decode');
  const [copied, setCopied] = useState(false);

  // Mock JWT for Kavipriya's WasteZero & Node API demo
  const sampleToken = {
    header: {
      alg: "HS256",
      typ: "JWT"
    },
    payload: {
      sub: "usr_kavipriya_cce",
      role: "SYSTEM_ENGINEER",
      permissions: [
        "collections:read",
        "collections:create",
        "analytics:export",
        "telemetry:inspect"
      ],
      name: "Kavipriya Chakkaravarthi",
      institution: "VSB Engineering College",
      department: "CCE",
      iat: 1758800000,
      exp: 1758886400,
      iss: "wastezero.api.internal"
    },
    signature: "kQ9xM_8vN3wZ0pL1aY7tB5rC2eD4fG6hJ8mP9sV2xY"
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-lg overflow-hidden">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 bg-[var(--paper-3)] border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--signal-dim)] text-[var(--signal)] text-xs font-mono font-bold mb-1.5">
            <Key size={13} />
            <span>Security & Authentication Architecture</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-sans text-[var(--ink)]">
            Stateless JWT & Role-Based Access Control (RBAC)
          </h3>
          <p className="text-xs text-[var(--slate)] font-sans mt-0.5">
            Cryptographic token lifecycle, middleware claims validation, and permission matrices
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            HMAC-SHA256 Validated
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-3 sm:px-6 border-b border-[var(--line)] bg-[var(--paper-2)] flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('token-decode')}
          className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'token-decode'
              ? 'bg-[var(--signal)] text-white shadow-xs'
              : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper-3)]'
          }`}
        >
          JWT Token & Claims Inspector
        </button>

        <button
          onClick={() => setActiveTab('rbac-matrix')}
          className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'rbac-matrix'
              ? 'bg-[var(--signal)] text-white shadow-xs'
              : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper-3)]'
          }`}
        >
          RBAC Permission Matrix
        </button>

        <button
          onClick={() => setActiveTab('flow-diagram')}
          className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'flow-diagram'
              ? 'bg-[var(--signal)] text-white shadow-xs'
              : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper-3)]'
          }`}
        >
          Express Auth Pipeline Middleware
        </button>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-7">
        {activeTab === 'token-decode' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Header Box */}
              <div className="p-4 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] font-bold text-rose-500 uppercase pb-1 border-b border-[var(--line)]">
                  <span>1. Header (Algorithm)</span>
                  <span className="text-[10px] text-[var(--slate)]">Base64Url</span>
                </div>
                <pre className="text-[var(--ink)] overflow-x-auto text-[11px]">
                  {JSON.stringify(sampleToken.header, null, 2)}
                </pre>
              </div>

              {/* Payload Box */}
              <div className="md:col-span-2 p-4 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] font-bold text-indigo-500 uppercase pb-1 border-b border-[var(--line)]">
                  <span>2. Payload (Claims & Roles)</span>
                  <button
                    onClick={() => handleCopy(JSON.stringify(sampleToken.payload, null, 2))}
                    className="inline-flex items-center gap-1 text-[10px] text-[var(--slate)] hover:text-[var(--signal)] cursor-pointer"
                  >
                    {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-[var(--ink)] overflow-x-auto text-[11.5px] leading-relaxed max-h-56">
                  {JSON.stringify(sampleToken.payload, null, 2)}
                </pre>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                <span className="text-[var(--ink)]">
                  Stateless verification via <strong className="text-emerald-600 dark:text-emerald-400">jsonwebtoken</strong> with RSA / HMAC key pair. Zero session storage required in database.
                </span>
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                TTL: 24 Hours
              </span>
            </div>
          </div>
        )}

        {activeTab === 'rbac-matrix' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--line)] text-[var(--slate)] uppercase text-[10px]">
                  <th className="py-2.5 px-3">Resource / Endpoint</th>
                  <th className="py-2.5 px-3 text-center">Citizen</th>
                  <th className="py-2.5 px-3 text-center">Collection Driver</th>
                  <th className="py-2.5 px-3 text-center">System Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)] text-[var(--ink)]">
                <tr>
                  <td className="py-2.5 px-3 font-semibold">GET /api/v1/wastezero/collections</td>
                  <td className="py-2.5 px-3 text-center text-emerald-500 font-bold">✓ (Own Zone)</td>
                  <td className="py-2.5 px-3 text-center text-emerald-500 font-bold">✓ (Assigned)</td>
                  <td className="py-2.5 px-3 text-center text-emerald-500 font-bold">✓ (All Zones)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold">POST /api/v1/wastezero/pickups</td>
                  <td className="py-2.5 px-3 text-center text-emerald-500 font-bold">✓ Request Pickup</td>
                  <td className="py-2.5 px-3 text-center text-rose-500">✗</td>
                  <td className="py-2.5 px-3 text-center text-emerald-500 font-bold">✓ Override</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold">PATCH /api/v1/wastezero/status</td>
                  <td className="py-2.5 px-3 text-center text-rose-500">✗</td>
                  <td className="py-2.5 px-3 text-center text-emerald-500 font-bold">✓ Update Weigh-in</td>
                  <td className="py-2.5 px-3 text-center text-emerald-500 font-bold">✓ Complete Edit</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold">GET /api/v1/analytics/throughput</td>
                  <td className="py-2.5 px-3 text-center text-rose-500">✗</td>
                  <td className="py-2.5 px-3 text-center text-rose-500">✗</td>
                  <td className="py-2.5 px-3 text-center text-emerald-500 font-bold">✓ Full SLA Metrics</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'flow-diagram' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[var(--paper-3)] border border-[var(--line)] font-mono text-xs text-[var(--ink)] overflow-x-auto">
              <pre className="text-[11.5px] leading-relaxed">
{`// Express.js Modular Authentication Pipeline (Kavipriya C)
import jwt from 'jsonwebtoken';

export const requireAuth = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or malformed Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Forbidden: Insufficient role permissions' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired signature' });
    }
  };
};`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
