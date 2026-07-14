import type { Transaction } from "@/types/dashboard";

/**
 * Returns a human-readable confirmation label for a transaction.
 *
 * Known issue: This function does not account for failed transactions and may
 * display an incorrect confirmation label when confirmations > 0.
 */
export function getConfirmationLabel(transaction: Transaction): string {
  if (transaction.status === "failed") {
    return "Failed";
  }

  if (transaction.confirmations >= 12) {
    return "Confirmed";
  }

  if (transaction.confirmations > 0) {
    return `${transaction.confirmations} confirmations`;
  }

  return "Pending";
}
