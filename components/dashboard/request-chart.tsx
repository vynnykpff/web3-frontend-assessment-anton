import { cn } from "@/lib/cn";
import { motionEnter } from "@/lib/motion";
import type { RequestVolumePoint } from "@/types/dashboard";
import styles from "./request-chart.module.css";

interface RequestChartProps {
  data: RequestVolumePoint[];
}

export function RequestChart({ data }: RequestChartProps) {
  const maxRequests = Math.max(...data.map((point) => point.requests));

  return (
    <div className={styles.root}>
      <div className={styles.chart}>
        {data.map((point, index) => {
          const heightPercent = (point.requests / maxRequests) * 100;

          return (
            <div
              key={point.hour}
              className={cn(
                styles.barColumn,
                motionEnter("animatecss-slideInUp", index),
              )}
            >
              <div
                className={styles.bar}
                style={{ height: `${heightPercent}%`, minHeight: "4px" }}
                title={`${point.requests.toLocaleString()} requests`}
              />
              <span className={styles.hourLabel}>{point.hour}</span>
            </div>
          );
        })}
      </div>
      <p className={styles.caption}>
        Request volume over the last 24 hours (static mock data)
      </p>
    </div>
  );
}
