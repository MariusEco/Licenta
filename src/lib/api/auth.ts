import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { AppError } from "@/lib/errors/app-error";
import { getPrismaClient } from "@/lib/prisma/client";

export async function getSupabaseServerClient() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new AppError(
      "INTERNAL_ERROR",
      "Supabase nu este configurat pentru autentificare.",
      500,
    );
  }

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components nu pot seta cookies; middleware-ul va acoperi refresh-ul sesiunii în etapa de autentificare.
        }
      },
    },
  });
}

export async function requireAuthenticatedUser() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    throw new AppError("UNAUTHORIZED", "Autentificarea este necesară.", 401);
  }

  const prisma = getPrismaClient();

  return prisma.user.upsert({
    where: { id: user.id },
    update: { email: user.email },
    create: {
      id: user.id,
      email: user.email,
      fullName: user.user_metadata.full_name as string | undefined,
    },
  });
}
