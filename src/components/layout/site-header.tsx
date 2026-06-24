import { Globe2 } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { AccountMenu } from "@/components/features/auth/account-menu";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/supabase/server";

const navigation = [
  { href: "/countries", label: "Țări" },
  { href: "/map", label: "Hartă" },
  { href: "/compare", label: "Comparare" },
] satisfies Array<{ href: Route; label: string }>;

function getUserDisplayName(user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (!user) {
    return "Contul meu";
  }

  const username = user.user_metadata.username;
  const fullName = user.user_metadata.full_name;

  if (typeof username === "string" && username.trim()) {
    return username;
  }

  if (typeof fullName === "string" && fullName.trim()) {
    return fullName;
  }

  return user.email ?? "Contul meu";
}

function getUserAvatarUrl(user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (!user) {
    return null;
  }

  const avatarUrl = user.user_metadata.avatar_url;
  const picture = user.user_metadata.picture;

  if (typeof avatarUrl === "string" && avatarUrl.trim()) {
    return avatarUrl;
  }

  if (typeof picture === "string" && picture.trim()) {
    return picture;
  }

  for (const identity of user.identities ?? []) {
    const identityAvatarUrl = identity.identity_data?.avatar_url;
    const identityPicture = identity.identity_data?.picture;

    if (typeof identityAvatarUrl === "string" && identityAvatarUrl.trim()) {
      return identityAvatarUrl;
    }

    if (typeof identityPicture === "string" && identityPicture.trim()) {
      return identityPicture;
    }
  }

  return null;
}

export async function SiteHeader() {
  const user = await getCurrentUser();
  const displayName = getUserDisplayName(user);
  const avatarUrl = getUserAvatarUrl(user);

  return (
    <header className="sticky top-0 z-[1200] isolate border-b border-border bg-white/92 backdrop-blur">
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
              <Button
                asChild
                variant="secondary"
                className="hidden sm:inline-flex"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <AccountMenu
                avatarUrl={avatarUrl}
                displayName={displayName}
                email={user.email ?? null}
              />
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
