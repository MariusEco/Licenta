import { z } from "zod";

import { handleRouteError, ok } from "@/lib/api/http";
import { AppError } from "@/lib/errors/app-error";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const passwordResetRequestSchema = z.object({
  email: z.string().trim().email(),
});

export async function POST(request: Request) {
  try {
    const body = passwordResetRequestSchema.parse(
      await request.json().catch(() => ({})),
    );
    const supabase = await createSupabaseServerClient();

    if (!supabase) {
      throw new AppError(
        "INTERNAL_ERROR",
        "Supabase nu este configurat pentru resetarea parolei.",
        500,
      );
    }

    const redirectTo = `${new URL(request.url).origin}/auth/callback?next=/settings/recovery`;
    const { error } = await supabase.auth.resetPasswordForEmail(body.email, {
      redirectTo,
    });

    if (error) {
      throw error;
    }

    return ok({ sent: true });
  } catch (error) {
    return handleRouteError(error);
  }
}
