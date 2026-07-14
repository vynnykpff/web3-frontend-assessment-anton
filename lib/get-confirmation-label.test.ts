import { describe, expect, it } from "vitest";
import { mockDashboardData } from "@/data/mock-dashboard";
import { getConfirmationLabel } from "@/lib/get-confirmation-label";
import type { Transaction } from "@/types/dashboard";

const baseTransaction: Transaction = {
  id: "tx-test",
  hash: "0xabc...123",
  type: "transfer",
  amount: "100 NVT",
  status: "confirmed",
  confirmations: 24,
  timestamp: "2026-07-01T08:00:00Z",
  network: "Nodveta Mainnet",
};

describe("getConfirmationLabel", () => {
  it("returns Confirmed for transactions with 12+ confirmations", () => {
    expect(getConfirmationLabel(baseTransaction)).toBe("Confirmed");
  });

  it("returns a pending label when there are no confirmations", () => {
    expect(
      getConfirmationLabel({
        ...baseTransaction,
        confirmations: 0,
        status: "pending",
      }),
    ).toBe("Pending");
  });

  it("returns Failed for failed transactions regardless of confirmation count", () => {
    expect(
      getConfirmationLabel({
        ...baseTransaction,
        status: "failed",
        confirmations: 24,
      }),
    ).toBe("Failed");
  });

  it("returns Failed for dashboard tx-005", () => {
    const transaction = mockDashboardData.transactions.find(
      (transaction) => transaction.id === "tx-005",
    );

    if (!transaction) {
      throw new Error("Dashboard transaction tx-005 was not found.");
    }

    expect(getConfirmationLabel(transaction)).toBe("Failed");
  });
});
