import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { badgeVariants, type BadgeVariantProps } from "@/lib/badge-variants";

interface BadgeProps extends BadgeVariantProps {
  children: ReactNode;
  className?: string;
}

export function Badge({
  children,
  variant,
  className,
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {children}
    </span>
  );
}
