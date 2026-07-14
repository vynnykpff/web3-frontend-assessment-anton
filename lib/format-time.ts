import { format, formatDistanceToNow } from "date-fns";

export function formatTransactionTime(iso: string): {
  relative: string;
  absolute: string;
} {
  const date = new Date(iso);

  return {
    relative: formatDistanceToNow(date, { addSuffix: true }),
    absolute: format(date, "MMM d, yyyy · h:mm a"),
  };
}
