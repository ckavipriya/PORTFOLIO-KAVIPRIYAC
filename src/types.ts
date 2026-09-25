export interface ProjectMetric {
  value: string;
  label: string;
  detail: string;
  trend?: string;
  type?: 'speed' | 'scale' | 'reliability' | 'efficiency';
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  date: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  badge: string;
  overview: string;
  highlights: string[];
  metrics: ProjectMetric[];
  benchmarkStats?: {
    p50Latency: string;
    p95Latency: string;
    throughput: string;
    errorRate: string;
    loadTool: string;
  };
  architectureFlow: {
    step: string;
    description: string;
  }[];
}

export interface Internship {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  points: string[];
  skillsUsed: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  scoreLabel: string;
  highlights?: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  description: string;
  badgeLabel: string;
  skills: string[];
  period?: string;
  credentialUrl?: string;
  highlights?: string[];
  credentialId?: string;
}

export interface SoftSkill {
  name: string;
  category: string;
  summary: string;
  bulletPoints: string[];
  impactContext: string;
  iconType: 'communication' | 'adaptability' | 'problemSolving' | 'teamwork';
}

export interface SkillCategory {
  title: string;
  category: string;
  skills: {
    name: string;
    level: string;
    description: string;
  }[];
}
