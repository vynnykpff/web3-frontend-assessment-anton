"use client";

import {
  ArrowLeftRight,
  BarChart3,
  Hexagon,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { motionEnter } from "@/lib/motion";
import styles from "./sidebar.module.css";

const navItems: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard#transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/dashboard#nodes", label: "Nodes", icon: Hexagon },
  { href: "/dashboard#analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        styles.aside,
        motionEnter("animatecss-fadeInLeft", 1),
      )}
    >
      <nav className={styles.nav} aria-label="Main">
        <p className={styles.heading}>Navigation</p>
        {navItems.map((item, index) => {
          const isActive = pathname === item.href.split("#")[0];
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                styles.link,
                isActive ? styles.linkActive : styles.linkInactive,
                motionEnter("animatecss-fadeInLeft", index + 1),
              )}
            >
              <Icon className={styles.linkIcon} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
