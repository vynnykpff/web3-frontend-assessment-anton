import { Blocks, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { motionEnter } from "@/lib/motion";
import styles from "./header.module.css";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onMobileMenuOpen: () => void;
}

export function Header({ isMobileMenuOpen, onMobileMenuOpen }: HeaderProps) {
  return (
    <header
      className={cn(
        styles.header,
        motionEnter("animatecss-slideInDown", 0, { fast: true }),
      )}
    >
      <div className={styles.brand}>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={styles.menuButton}
          aria-label="Open navigation menu"
          aria-controls="mobile-navigation"
          aria-expanded={isMobileMenuOpen}
          onClick={onMobileMenuOpen}
        >
          <Menu className={styles.menuIcon} aria-hidden="true" />
        </Button>
        <Image src="/logo.png" alt="Nodveta" width={32} height={32} priority />
        <div>
          <p className={styles.brandName}>Nodveta</p>
          <p className={styles.brandTagline}>Infrastructure Dashboard</p>
        </div>
      </div>

      <div className={styles.actions}>
        <span className={styles.networkStatus}>
          <Blocks className={styles.networkIcon} aria-hidden="true" />
          Mainnet · Block #18,429,102
        </span>
        <Link href="/dashboard">
          <Button size="sm" variant="primary">
            Open Dashboard
          </Button>
        </Link>
      </div>
    </header>
  );
}
