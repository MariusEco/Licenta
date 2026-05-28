"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function LogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleLogout}
      disabled={isSubmitting}
      className="hidden sm:inline-flex"
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      Ieșire
    </Button>
  );
}
