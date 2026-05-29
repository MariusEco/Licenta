import { createClient } from "@supabase/supabase-js";

import { AppError } from "@/lib/errors/app-error";

export function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new AppError(
      "INTERNAL_ERROR",
      "Supabase nu este configurat pentru verificarea conturilor.",
      500,
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}