"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatTransactionTime } from "@/lib/format-time";
import { getConfirmationLabel } from "@/lib/get-confirmation-label";
import { motionEnter } from "@/lib/motion";
import type { Transaction, TransactionStatus } from "@/types/dashboard";
import {
  ArrowLeftRight,
  CheckCircle2,
  Clock3,
  Coins,
  FileCode,
  Filter,
  Inbox,
  RotateCcw,
  Send,
  Vote,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import styles from "./transaction-table.module.css";

interface TransactionTableProps {
  transactions: Transaction[];
}

export const STATUS_FILTER_OPTIONS: Array<{
  value: "all" | TransactionStatus;
  label: string;
}> = [
  { value: "all", label: "All statuses" },
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

const statusIcons: Record<TransactionStatus, LucideIcon> = {
  confirmed: CheckCircle2,
  pending: Clock3,
  failed: XCircle,
};

const typeIcons: Record<Transaction["type"], LucideIcon> = {
  transfer: Send,
  contract: FileCode,
  stake: Coins,
  governance: Vote,
};

const statusFilterId = "transaction-status-filter";
const SKELETON_ROWS = [0, 1, 2, 3];

function statusVariant(
  status: TransactionStatus,
): "success" | "warning" | "danger" {
  switch (status) {
    case "confirmed":
      return "success";
    case "pending":
      return "warning";
    case "failed":
      return "danger";
  }
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [statusFilter, setStatusFilter] = useState<"all" | TransactionStatus>(
    "all",
  );
  const [isLoading, setIsLoading] = useState(true);

  const visibleTransactions = useMemo(() => {
    if (statusFilter === "all") {
      return transactions;
    }

    return transactions.filter(
      (transaction) => transaction.status === statusFilter,
    );
  }, [statusFilter, transactions]);

  const transactionCountLabel =
    visibleTransactions.length === 1 ? "transaction" : "transactions";
  const selectedStatusLabel =
    STATUS_FILTER_OPTIONS.find((option) => option.value === statusFilter)
      ?.label ?? "All statuses";
  const emptyTitle =
    statusFilter === "all" ? "No transactions yet" : "No matching transactions";
  const emptyDescription =
    statusFilter === "all"
      ? "Recent on-chain activity will appear here as soon as transactions are available."
      : `There are no ${selectedStatusLabel.toLowerCase()} transactions in the current dataset.`;

  useEffect(() => {
    setIsLoading(true);

    const loadingTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 4450);

    return () => {
      window.clearTimeout(loadingTimer);
    };
  }, [statusFilter, transactions]);

  return (
    <div className={styles.root} aria-busy={isLoading}>
      <div className={styles.toolbar}>
        <p className={styles.count}>
          <ArrowLeftRight className={styles.countIcon} aria-hidden="true" />
          {isLoading ? (
            "Loading transactions"
          ) : (
            <>
              Showing {visibleTransactions.length} {transactionCountLabel}
            </>
          )}
        </p>
        <div className={styles.filterWrap}>
          <label className={styles.filterLabel} htmlFor={statusFilterId}>
            Status
          </label>
          <div className={styles.selectWrap}>
            <Filter className={styles.filterIcon} aria-hidden="true" />
            <select
              id={statusFilterId}
              className={styles.filter}
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as "all" | TransactionStatus)
              }
            >
              {STATUS_FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {!isLoading && visibleTransactions.length === 0 ? (
        <div
          className={cn(styles.empty, motionEnter("animatecss-fadeIn"))}
          role="status"
        >
          <span className={styles.emptyIconWrap} aria-hidden="true">
            <Inbox className={styles.emptyIcon} />
          </span>
          <div className={styles.emptyContent}>
            <p className={styles.emptyTitle}>{emptyTitle}</p>
            <p className={styles.emptyDescription}>{emptyDescription}</p>
            {statusFilter !== "all" ? (
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className={styles.emptyAction}
                onClick={() => setStatusFilter("all")}
              >
                <RotateCcw
                  className={styles.emptyActionIcon}
                  aria-hidden="true"
                />
                Show all statuses
              </Button>
            ) : null}
          </div>
        </div>
      ) : (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Hash</th>
              <th className={styles.th}>Type</th>
              <th className={styles.th}>Amount</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Confirmation</th>
              <th className={styles.th}>Time</th>
            </tr>
          </thead>
          <tbody key={isLoading ? "loading" : statusFilter}>
            {isLoading
              ? SKELETON_ROWS.map((row) => (
                  <tr key={row} className={styles.row}>
                    <td className={styles.hashCell}>
                      <span
                        className={cn(styles.skeleton, styles.skeletonHash)}
                      />
                    </td>
                    <td className={styles.typeCell}>
                      <span
                        className={cn(styles.skeleton, styles.skeletonType)}
                      />
                    </td>
                    <td className={styles.cell}>
                      <span
                        className={cn(styles.skeleton, styles.skeletonAmount)}
                      />
                    </td>
                    <td className={styles.cell}>
                      <span
                        className={cn(styles.skeleton, styles.skeletonBadge)}
                      />
                    </td>
                    <td className={styles.cell}>
                      <span
                        className={cn(
                          styles.skeleton,
                          styles.skeletonConfirmation,
                        )}
                      />
                    </td>
                    <td className={styles.timeCell}>
                      <span
                        className={cn(styles.skeleton, styles.skeletonTime)}
                      />
                    </td>
                  </tr>
                ))
              : visibleTransactions.map((transaction, index) => {
                  const StatusIcon = statusIcons[transaction.status];
                  const TypeIcon = typeIcons[transaction.type];
                  const { relative, absolute } = formatTransactionTime(
                    transaction.timestamp,
                  );

                  return (
                    <tr
                      key={transaction.id}
                      className={cn(
                        styles.row,
                        motionEnter("animatecss-fadeIn", index),
                      )}
                    >
                      <td className={styles.hashCell}>{transaction.hash}</td>
                      <td className={styles.typeCell}>
                        <span className={styles.typeLabel}>
                          <TypeIcon
                            className={styles.typeIcon}
                            aria-hidden="true"
                          />
                          {transaction.type}
                        </span>
                      </td>
                      <td className={styles.cell}>{transaction.amount}</td>
                      <td className={styles.cell}>
                        <Badge variant={statusVariant(transaction.status)}>
                          <StatusIcon
                            className={styles.badgeIcon}
                            aria-hidden="true"
                          />
                          {transaction.status}
                        </Badge>
                      </td>
                      <td className={styles.cell}>
                        {getConfirmationLabel(transaction)}
                      </td>
                      <td className={styles.timeCell}>
                        <time dateTime={transaction.timestamp} title={absolute}>
                          {relative}
                        </time>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      )}
    </div>
  );
}
