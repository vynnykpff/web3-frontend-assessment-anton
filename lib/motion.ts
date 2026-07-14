const STAGGER_DELAYS = [
  "",
  "animatecss-delay-100ms",
  "animatecss-delay-200ms",
  "animatecss-delay-300ms",
  "animatecss-delay-500ms",
  "animatecss-delay-700ms",
  "animatecss-delay-1s",
] as const;

export function motionEnter(
  animation: string,
  index = 0,
  options?: { fast?: boolean },
): string {
  const delay =
    STAGGER_DELAYS[Math.min(index, STAGGER_DELAYS.length - 1)] ?? "";
  const speed = options?.fast ? "animatecss-faster" : "animatecss-fast";

  return ["animatecss", animation, speed, delay].filter(Boolean).join(" ");
}
