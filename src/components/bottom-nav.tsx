"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/learn", label: "Learn", icon: "📚" },
  { href: "/simulator", label: "Simulate", icon: "📈" },
  { href: "/jargon", label: "Jargon", icon: "🔍" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-card-border flex justify-around items-center h-16 z-50">
      {tabs.map((tab) => {
        const active =
          tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center gap-0.5 text-xs transition-all ${
              active
                ? "text-accent scale-110"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className={active ? "font-bold" : "font-medium"}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
