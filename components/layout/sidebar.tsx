"use client";

import {
  ArrowLeftRight,
  BarChart3,
  Hexagon,
  LayoutDashboard,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/cn";
import { motionEnter } from "@/lib/motion";
import styles from "./sidebar.module.css";

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const navItems: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "/dashboard#transactions",
    label: "Transactions",
    icon: ArrowLeftRight,
  },
  { href: "/dashboard#nodes", label: "Nodes", icon: Hexagon },
  { href: "/dashboard#analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onMobileClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen, onMobileClose]);

  const getIsActive = (href: string) =>
    href === pathname || (!href.includes("#") && pathname === href);

  const renderNavItems = (onNavigate?: () => void) =>
    navItems.map((item, index) => {
      const isActive = getIsActive(item.href);
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
          onClick={onNavigate}
        >
          <Icon className={styles.linkIcon} aria-hidden="true" />
          {item.label}
        </Link>
      );
    });

  return (
    <>
      <aside
        className={cn(styles.aside, motionEnter("animatecss-fadeInLeft", 1))}
      >
        <nav className={styles.nav} aria-label="Main">
          <p className={styles.heading}>Navigation</p>
          {renderNavItems()}
        </nav>
      </aside>

      {isMobileOpen ? (
        <div className={styles.mobileRoot}>
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Close navigation menu"
            onClick={onMobileClose}
          />
          <aside
            id="mobile-navigation"
            className={cn(
              styles.mobilePanel,
              motionEnter("animatecss-fadeInLeft", 0, { fast: true }),
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
          >
            <div className={styles.mobileHeader}>
              <p className={styles.mobileTitle} id="mobile-navigation-title">
                Navigation
              </p>
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close navigation menu"
                onClick={onMobileClose}
              >
                <X className={styles.closeIcon} aria-hidden="true" />
              </button>
            </div>
            <nav className={styles.nav} aria-label="Mobile main">
              {renderNavItems(onMobileClose)}
            </nav>
          </aside>
        </div>
      ) : null}
    </>
  );
}
