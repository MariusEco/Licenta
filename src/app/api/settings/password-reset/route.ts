import { handleRouteError, ok } from "@/lib/api/http";
import { AppError } from "@/lib/errors/app-error";
import { requireAuthenticatedUser } from "@/lib/api/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requestPasswordResetSchema } from "@/validations/settings";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const user = await requireAuthenticatedUser();
    const body = requestPasswordResetSchema.parse(await request.json().catch(() => ({})));
    const supabase = await createSupabaseServerClient();

    if (!supabase) {
      throw new AppError(
        "INTERNAL_ERROR",
        "Supabase nu este configurat pentru resetarea parolei.",
        500,
      );
    }

    const redirectTo =
      body.redirectTo ??
      `${new URL(request.url).origin}/auth/callback?next=/settings/recovery`;

    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
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