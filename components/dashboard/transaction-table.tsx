"use client";

import { Badge } from "@/components/ui/badge";
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
  Send,
  Vote,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
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

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <p className={styles.count}>
          <ArrowLeftRight className={styles.countIcon} aria-hidden="true" />
          Showing {visibleTransactions.length} {transactionCountLabel}
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

      {visibleTransactions.length === 0 ? (
        <p className={cn(styles.empty, motionEnter("animatecss-fadeIn"))}>
          <Inbox className={styles.emptyIcon} aria-hidden="true" />
          No transactions to display.
        </p>
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
          <tbody key={statusFilter}>
            {visibleTransactions.map((transaction, index) => {
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
