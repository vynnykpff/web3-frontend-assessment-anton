import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  Gauge,
  Server,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { motionEnter } from "@/lib/motion";
import type { DashboardMetric } from "@/types/dashboard";
import styles from "./metric-card.module.css";

interface MetricCardProps {
  metric: DashboardMetric;
  index?: number;
}

const metricIcons: Record<string, LucideIcon> = {
  "active-nodes": Server,
  "daily-requests": Activity,
  "avg-latency": Gauge,
  "success-rate": CircleCheck,
};

const trendConfig = {
  up: {
    className: styles.trendUp,
    Icon: ArrowUpRight,
  },
  down: {
    className: styles.trendDown,
    Icon: ArrowDownRight,
  },
  neutral: {
    className: styles.trendNeutral,
    Icon: ArrowRight,
  },
} as const;

export function MetricCard({ metric, index = 0 }: MetricCardProps) {
  const MetricIcon = metricIcons[metric.id] ?? Activity;
  const trend = trendConfig[metric.trend];
  const TrendIcon = trend.Icon;

  return (
    <div
      className={cn(
        styles.card,
        motionEnter("animatecss-fadeInUp", index),
      )}
    >
      <div className={styles.header}>
        <p className={styles.label}>{metric.label}</p>
        <span className={styles.iconWrap} aria-hidden="true">
          <MetricIcon className={styles.icon} />
        </span>
      </div>
      <p className={styles.value}>{metric.value}</p>
      <p className={cn(styles.change, trend.className)}>
        <TrendIcon className={styles.trendIcon} aria-hidden="true" />
        {metric.change}
      </p>
    </div>
  );
}
