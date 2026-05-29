import { Globe2 } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { LogoutButton } from "@/components/features/auth/logout-button";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/supabase/server";

const navigation = [
  { href: "/countries", label: "Țări" },
  { href: "/map", label: "Hartă" },
  { href: "/compare", label: "Comparare" },
] satisfies Array<{ href: Route; label: string }>;

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/92 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground">
            <Globe2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>Migro</span>
        </Link>

        <nav
          aria-label="Navigare principală"
          className="hidden items-center gap-6 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button asChild variant="secondary" className="hidden sm:inline-flex">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <LogoutButton />
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link href="/login">Autentificare</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Cont nou</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
