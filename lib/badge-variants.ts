import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-slate-100 text-slate-700",
        success: "bg-emerald-100 text-emerald-800",
        warning: "bg-amber-100 text-amber-800",
        danger: "bg-red-100 text-red-800",
        info: "bg-sky-100 text-sky-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
