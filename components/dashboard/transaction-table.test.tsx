import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockDashboardData } from "@/data/mock-dashboard";
import { TransactionTable } from "./transaction-table";

const finishLoading = () => {
  act(() => {
    vi.advanceTimersByTime(450);
  });
};

describe("TransactionTable", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("shows a loading state before rendering transactions", () => {
    render(<TransactionTable transactions={mockDashboardData.transactions} />);

    expect(screen.getByText("Loading transactions")).toBeTruthy();
    expect(screen.queryByText("0x8f3a...c21b")).toBeNull();

    finishLoading();

    expect(screen.getByText("Showing 8 transactions")).toBeTruthy();
    expect(screen.getByText("0x8f3a...c21b")).toBeTruthy();
  });

  it("filters transactions by status after the loading simulation", () => {
    render(<TransactionTable transactions={mockDashboardData.transactions} />);
    finishLoading();

    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "failed" },
    });

    expect(screen.getByText("Loading transactions")).toBeTruthy();

    finishLoading();

    expect(screen.getByText("Showing 2 transactions")).toBeTruthy();
    expect(screen.getByText("0x7c12...aa03")).toBeTruthy();
    expect(screen.getByText("0x1a55...bc90")).toBeTruthy();
    expect(screen.queryByText("0x8f3a...c21b")).toBeNull();
  });

  it("shows a rich empty state and resets the active filter", () => {
    const confirmedTransactions = mockDashboardData.transactions.filter(
      (transaction) => transaction.status === "confirmed",
    );

    render(<TransactionTable transactions={confirmedTransactions} />);
    finishLoading();

    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "failed" },
    });
    finishLoading();

    expect(screen.getByText("No matching transactions")).toBeTruthy();
    expect(
      screen.getByText(
        "There are no failed transactions in the current dataset.",
      ),
    ).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /show all statuses/i }));
    finishLoading();

    expect(screen.getByText("Showing 4 transactions")).toBeTruthy();
  });
});
