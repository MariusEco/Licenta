"use client";

import { LogOut, Settings, UserCircle } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type AccountMenuProps = {
  avatarUrl: string | null;
  displayName: string;
  email: string | null;
};

export function AccountMenu({
  avatarUrl,
  displayName,
  email,
}: AccountMenuProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initial = displayName.trim().charAt(0).toUpperCase();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  async function handleLogout() {
    setIsSubmitting(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-sm font-semibold text-foreground transition hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="Deschide meniul contului"
        aria-expanded={isOpen}
      >
        {avatarUrl ? (
          <span
            className="block h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${avatarUrl})` }}
            aria-hidden="true"
          />
        ) : initial ? (
          <span aria-hidden="true">{initial}</span>
        ) : (
          <UserCircle className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 border border-border bg-white p-2 shadow-lg">
          <div className="border-b border-border px-3 py-3">
            <div className="truncate text-sm font-semibold text-foreground">
              {displayName}
            </div>
            {email ? (
              <div className="mt-1 truncate text-xs text-muted-foreground">
                {email}
              </div>
            ) : null}
          </div>

          <div className="grid gap-1 pt-2">
            <Link
              href={"/settings" as Route}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
              Setări
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-3 py-2 text-left text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              {isSubmitting ? "Se deconectează" : "Deconectare"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
