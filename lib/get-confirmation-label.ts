import type { Transaction } from "@/types/dashboard";

/**
 * Returns a human-readable confirmation label for a transaction.
 */
export function getConfirmationLabel({
  status,
  confirmations,
}: Transaction): string {
  if (status === "failed") {
    return "Failed";
  }

  if (confirmations >= 12) {
    return "Confirmed";
  }

  if (confirmations > 0) {
    return `${confirmations} confirmations`;
  }

  return "Pending";
}
