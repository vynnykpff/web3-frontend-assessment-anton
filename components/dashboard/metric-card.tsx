import { cn } from "@/lib/cn";
import { motionEnter } from "@/lib/motion";
import type { DashboardMetric } from "@/types/dashboard";
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
    cardClassName: styles.cardTrendUp,
    iconWrapClassName: styles.iconWrapTrendUp,
    changeClassName: styles.trendUp,
    Icon: ArrowUpRight,
    label: "Positive trend",
  },
  down: {
    cardClassName: styles.cardTrendDown,
    iconWrapClassName: styles.iconWrapTrendDown,
    changeClassName: styles.trendDown,
    Icon: ArrowDownRight,
    label: "Negative trend",
  },
  neutral: {
    cardClassName: styles.cardTrendNeutral,
    iconWrapClassName: styles.iconWrapTrendNeutral,
    changeClassName: styles.trendNeutral,
    Icon: ArrowRight,
    label: "Neutral trend",
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
        trend.cardClassName,
        motionEnter("animatecss-fadeInUp", index),
      )}
    >
      <div className={styles.header}>
        <p className={styles.label}>{metric.label}</p>
        <span
          className={cn(styles.iconWrap, trend.iconWrapClassName)}
          aria-hidden="true"
        >
          <MetricIcon className={styles.icon} />
        </span>
      </div>
      <p className={styles.value}>{metric.value}</p>
      <p
        className={cn(styles.change, trend.changeClassName)}
        aria-label={`${metric.label}: ${trend.label}, ${metric.change}`}
      >
        <TrendIcon className={styles.trendIcon} aria-hidden="true" />
        {metric.change}
      </p>
    </div>
  );
}
