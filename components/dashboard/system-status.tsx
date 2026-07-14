import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { motionEnter } from "@/lib/motion";
import type { SystemHealth, SystemNode } from "@/types/dashboard";
import styles from "./system-status.module.css";

interface SystemStatusProps {
  nodes: SystemNode[];
}

const healthConfig: Record<
  SystemHealth,
  {
    variant: "success" | "warning" | "danger";
    Icon: LucideIcon;
    badgeClass?: string;
  }
> = {
  operational: { variant: "success", Icon: CheckCircle2 },
  degraded: { variant: "warning", Icon: AlertTriangle },
  outage: {
    variant: "danger",
    Icon: XCircle,
    badgeClass: styles.outageBadge,
  },
};

export function SystemStatus({ nodes }: SystemStatusProps) {
  return (
    <ul className={styles.list}>
      {nodes.map((node, index) => {
        const health = healthConfig[node.health];
        const HealthIcon = health.Icon;

        return (
          <li
            key={node.id}
            className={cn(
              styles.item,
              motionEnter("animatecss-fadeInRight", index),
            )}
          >
            <div className={styles.content}>
              <p className={styles.name}>
                <HealthIcon className={styles.healthIcon} aria-hidden="true" />
                {node.name}
              </p>
              <p className={styles.meta}>
                {node.region} · {node.latencyMs}ms · {node.uptime} uptime
              </p>
            </div>
            <Badge
              variant={health.variant}
              className={health.badgeClass}
            >
              {node.health}
            </Badge>
          </li>
        );
      })}
    </ul>
  );
}
