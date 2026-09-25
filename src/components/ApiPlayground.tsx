import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Check, Copy, Terminal, Server, ShieldCheck, 
  Database, RefreshCw, Zap, ArrowRight, Code2
} from 'lucide-react';

interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  summary: string;
  category: 'WasteZero' | 'Auth & JWT' | 'SQL Analytics';
  headers: Record<string, string>;
  requestBody?: Record<string, unknown>;
  responsePayload: Record<string, unknown>;
  sqlQueryBehind: string;
  expressCodeSnippet: string;
}

const ENDPOINTS: ApiEndpoint[] = [
  {
    id: 'collections-zone',
    method: 'GET',
    path: '/api/v1/wastezero/collections?zone=Karur-North&status=active',
    summary: 'Retrieve active municipal waste collection schedules with optimized SQL composite index',
    category: 'WasteZero',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      'Accept': 'application/json'
    },
    responsePayload: {
      status: 'success',
      code: 200,
      zone: 'Karur-North',
      data: {
        totalSchedules: 18,
        activeTrucks: 4,
        nextDispatchWindow: '2026-09-25T10:30:00Z',
        records: [
          {
            id: 'WZ-8842',
            zone: 'Karur-North',
            category: 'Organic Composting',
            weightKg: 420.5,
            status: 'IN_TRANSIT',
            truckId: 'TK-04',
            assignedDriver: 'M. Senthil'
          },
          {
            id: 'WZ-8843',
            zone: 'Karur-North',
            category: 'Plastic & Polymers',
            weightKg: 185.0,
            status: 'PENDING_PICKUP',
            truckId: 'TK-02',
            assignedDriver: 'R. Vignesh'
          }
        ]
      },
      meta: {
        serverUptime: '99.98%',
        executionTime: '94ms',
        queryPlan: 'INDEX_SCAN(idx_zone_status)'
      }
    },
    sqlQueryBehind: `SELECT c.id, c.category, c.weight_kg, c.status, t.truck_id, t.driver_name
FROM collections c
JOIN trucks t ON c.truck_id = t.id
WHERE c.zone = 'Karur-North' AND c.status = 'ACTIVE'
ORDER BY c.scheduled_at ASC;`,
    expressCodeSnippet: `// Express.js Route Controller (Node.js & Express)
router.get('/collections', authenticateJWT, async (req, res) => {
  const { zone, status } = req.query;
  const [rows] = await db.execute(
    'SELECT * FROM collections WHERE zone = ? AND status = ?',
    [zone, status]
  );
  return res.status(200).json({ status: 'success', data: rows });
});`
  },
  {
    id: 'auth-jwt',
    method: 'POST',
    path: '/api/v1/auth/verify-token',
    summary: 'Stateless JWT verification middleware and Role-Based Access Control (RBAC)',
    category: 'Auth & JWT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJLUF85NDYiLCJyb2xlIjoiYWRtaW4ifQ...'
    },
    requestBody: {
      requiredPermission: 'fleet:dispatch',
      serviceOrigin: 'wastezero-frontend-spa'
    },
    responsePayload: {
      status: 'success',
      code: 200,
      authorized: true,
      tokenClaims: {
        userId: 'KP_946',
        role: 'SUPER_ADMIN',
        permissions: ['reports:read', 'fleet:dispatch', 'metrics:export'],
        issuer: 'WasteZero-Auth-NodeJS',
        expiresIn: '86400s'
      },
      audit: {
        securityLevel: 'HMAC_SHA256',
        latency: '38ms'
      }
    },
    sqlQueryBehind: `SELECT u.id, u.role, r.permission_key 
FROM users u 
JOIN role_permissions r ON u.role_id = r.role_id 
WHERE u.id = 'KP_946';`,
    expressCodeSnippet: `// JWT Stateless Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  
  jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = decoded;
    next();
  });
};`
  },
  {
    id: 'analytics-sql',
    method: 'GET',
    path: '/api/v1/metrics/recycling-summary?range=quarterly',
    summary: 'Aggregated SQL metrics showing municipal recycling throughput and route efficiency',
    category: 'SQL Analytics',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    responsePayload: {
      status: 'success',
      code: 200,
      reportingPeriod: '2026-Q1',
      metrics: {
        totalRecycledTons: 124.6,
        divertedFromLandfillsPercent: 78.4,
        co2EmissionsSavedKg: 46200,
        averageDispatchLatencyMinutes: 14.2,
        routeEfficiencyScore: 94.8
      },
      breakdownByCategory: [
        { category: 'Organic Waste', percentage: 48 },
        { category: 'Plastic Recycling', percentage: 28 },
        { category: 'Metal & Glass', percentage: 14 },
        { category: 'Electronic e-Waste', percentage: 10 }
      ]
    },
    sqlQueryBehind: `SELECT 
  category, 
  SUM(weight_kg)/1000 AS tons,
  COUNT(id) AS total_pickups,
  AVG(TIMESTAMPDIFF(MINUTE, scheduled_at, completed_at)) AS avg_dispatch_mins
FROM collections
WHERE completed_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)
GROUP BY category;`,
    expressCodeSnippet: `// Aggregation Service
app.get('/metrics/recycling-summary', async (req, res) => {
  const query = 'SELECT category, SUM(weight_kg)/1000 as tons FROM collections GROUP BY category';
  const [results] = await db.query(query);
  res.json({ status: 'success', metrics: results });
});`
  }
];

export const ApiPlayground: React.FC = () => {
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>(ENDPOINTS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [responseOutput, setResponseOutput] = useState<Record<string, unknown> | null>(ENDPOINTS[0].responsePayload);
  const [responseTime, setResponseTime] = useState<number>(94);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'response' | 'sql' | 'express'>('response');

  const activeEndpoint = ENDPOINTS.find(e => e.id === selectedEndpointId) || ENDPOINTS[0];

  const handleExecute = () => {
    setIsLoading(true);
    
    // Simulate realistic 80-130ms API roundtrip
    const randomLatency = Math.floor(Math.random() * 45) + 80;
    setTimeout(() => {
      setIsLoading(false);
      setResponseTime(randomLatency);
      setResponseOutput(activeEndpoint.responsePayload);
    }, randomLatency);
  };

  const handleCopy = () => {
    const content = viewMode === 'response' 
      ? JSON.stringify(responseOutput, null, 2)
      : viewMode === 'sql' 
        ? activeEndpoint.sqlQueryBehind 
        : activeEndpoint.expressCodeSnippet;

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] shadow-sm overflow-hidden text-left">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 bg-[var(--paper-3)] border-b border-[var(--line)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--signal-dim)] text-[var(--signal)] flex items-center justify-center">
            <Server size={17} />
          </div>
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--signal)] flex items-center gap-1.5">
              <span>Interactive REST API Sandbox</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-xs text-[var(--slate)] font-sans">
              Test live Node.js, Express & SQL endpoints engineered by Kavipriya
            </div>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-[var(--paper-2)] p-1 rounded-xl border border-[var(--line)] text-xs font-mono">
          <button
            onClick={() => setViewMode('response')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${viewMode === 'response' ? 'bg-[var(--signal)] text-white font-bold' : 'text-[var(--slate)] hover:text-[var(--ink)]'}`}
          >
            Response JSON
          </button>
          <button
            onClick={() => setViewMode('sql')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${viewMode === 'sql' ? 'bg-[var(--signal)] text-white font-bold' : 'text-[var(--slate)] hover:text-[var(--ink)]'}`}
          >
            <Database size={12} />
            <span>SQL Query</span>
          </button>
          <button
            onClick={() => setViewMode('express')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${viewMode === 'express' ? 'bg-[var(--signal)] text-white font-bold' : 'text-[var(--slate)] hover:text-[var(--ink)]'}`}
          >
            <Code2 size={12} />
            <span>Express Route</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Endpoint Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {ENDPOINTS.map((endpoint) => (
            <button
              key={endpoint.id}
              onClick={() => {
                setSelectedEndpointId(endpoint.id);
                setResponseOutput(endpoint.responsePayload);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedEndpointId === endpoint.id
                  ? 'border-[var(--signal)] bg-[var(--signal-dim)] shadow-xs'
                  : 'border-[var(--line)] bg-[var(--paper-2)] hover:border-[var(--slate)]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  endpoint.method === 'GET' ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400' : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                }`}>
                  {endpoint.method}
                </span>
                <span className="text-[10px] font-mono text-[var(--slate)]">
                  {endpoint.category}
                </span>
              </div>
              <div className="text-xs font-mono text-[var(--ink)] font-semibold truncate">
                {endpoint.path.split('?')[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Live URL Bar + Send Button */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-[var(--paper-3)] border border-[var(--line)] font-mono text-xs">
          <span className={`px-2.5 py-1 rounded-md font-bold text-[11px] ${
            activeEndpoint.method === 'GET' 
              ? 'bg-blue-600 text-white' 
              : 'bg-emerald-600 text-white'
          }`}>
            {activeEndpoint.method}
          </span>
          <span className="flex-1 truncate text-[var(--ink)] select-all px-1 font-mono text-xs">
            {activeEndpoint.path}
          </span>
          <button
            onClick={handleExecute}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--signal)] hover:bg-[var(--signal-2)] text-white text-xs font-bold transition-all cursor-pointer shadow-sm hover:shadow shrink-0 disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Play size={14} fill="currentColor" />
            )}
            <span>{isLoading ? 'Executing...' : 'Send Request'}</span>
          </button>
        </div>

        {/* Console Output Screen */}
        <div className="relative rounded-xl bg-[#0B1117] text-slate-200 border border-slate-800 font-mono text-xs overflow-hidden shadow-inner">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#161F28] border-b border-slate-800 text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-300 font-semibold">
                {viewMode === 'response' ? 'Status: 200 OK' : viewMode === 'sql' ? 'MySQL 8.0 Prepared Statement' : 'Express Router Controller'}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <Zap size={12} />
                <span>{responseTime}ms</span>
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer text-[10px]"
              title="Copy snippet"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Code Body */}
          <div className="p-4 overflow-x-auto max-h-76 text-[12px] leading-relaxed select-text">
            {viewMode === 'response' && (
              <pre className="text-emerald-300">
                {JSON.stringify(responseOutput, null, 2)}
              </pre>
            )}

            {viewMode === 'sql' && (
              <pre className="text-amber-300">
                {activeEndpoint.sqlQueryBehind}
              </pre>
            )}

            {viewMode === 'express' && (
              <pre className="text-cyan-300">
                {activeEndpoint.expressCodeSnippet}
              </pre>
            )}
          </div>
        </div>

        {/* Architecture Note */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--slate)] pt-1">
          <ShieldCheck size={14} className="text-[var(--signal)] shrink-0" />
          <span>Stateless REST API design with JWT bearer authorization, connection-pooled SQL execution, and indexed queries.</span>
        </div>
      </div>
    </div>
  );
};
