import { MetricCard } from "@/components/dashboard/metric-card";
import { RequestChart } from "@/components/dashboard/request-chart";
import { SystemStatus } from "@/components/dashboard/system-status";
import { TransactionTable } from "@/components/dashboard/transaction-table";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { mockDashboardData } from "@/data/mock-dashboard";
import { motionEnter } from "@/lib/motion";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const { metrics, transactions, nodes, requestVolume } = mockDashboardData;

  return (
    <AppShell>
      <div className={styles.page}>
        <div className={cn(styles.header, motionEnter("animatecss-fadeIn"))}>
          <h1 className={styles.title}>Infrastructure Dashboard</h1>
          <p className={styles.subtitle}>
            Monitor network health, transactions, and node performance.
          </p>
        </div>

        <section className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <MetricCard key={metric.id} metric={metric} index={index} />
          ))}
        </section>

        <section id="analytics" className={styles.analyticsGrid}>
          <Card
            className={cn(
              styles.cardAnimated,
              motionEnter("animatecss-fadeInLeft", 1),
            )}
          >
            <CardHeader
              title="Request Volume"
              description="Hourly API requests across all regions"
            />
            <CardContent>
              <RequestChart data={requestVolume} />
            </CardContent>
          </Card>

          <section id="nodes">
            <Card
              className={cn(
                styles.cardAnimated,
                motionEnter("animatecss-fadeInRight", 2),
              )}
            >
              <CardHeader
                title="System Status"
                description="Validator node health by region"
              />
              <CardContent>
                <SystemStatus nodes={nodes} />
              </CardContent>
            </Card>
          </section>
        </section>

        <section id="transactions">
          <Card
            className={cn(
              styles.cardAnimated,
              motionEnter("animatecss-fadeInUp", 3),
            )}
          >
            <CardHeader
              title="Recent Transactions"
              description="Latest on-chain activity across Nodveta networks"
            />
            <CardContent className="p-0">
              <TransactionTable transactions={transactions} />
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
