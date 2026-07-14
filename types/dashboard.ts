export type TransactionStatus = "pending" | "confirmed" | "failed";

export type SystemHealth = "operational" | "degraded" | "outage";

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export interface Transaction {
  id: string;
  hash: string;
  type: "transfer" | "contract" | "stake" | "governance";
  amount: string;
  status: TransactionStatus;
  confirmations: number;
  timestamp: string;
  network: string;
}

export interface SystemNode {
  id: string;
  name: string;
  region: string;
  health: SystemHealth;
  latencyMs: number;
  uptime: string;
}

export interface RequestVolumePoint {
  hour: string;
  requests: number;
}

export interface DashboardData {
  metrics: DashboardMetric[];
  transactions: Transaction[];
  nodes: SystemNode[];
  requestVolume: RequestVolumePoint[];
}
