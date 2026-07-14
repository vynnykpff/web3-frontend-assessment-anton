import { describe, expect, it } from "vitest";
import { formatTransactionTime } from "./format-time";

describe("formatTransactionTime", () => {
  it("returns relative and absolute formatted strings", () => {
    const result = formatTransactionTime("2026-07-08T12:00:00.000Z");

    expect(result.relative).toMatch(/ago$/);
    expect(result.absolute).toMatch(/Jul 8, 2026/);
  });
});
