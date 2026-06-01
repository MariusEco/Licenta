import { handleRouteError, ok } from "@/lib/api/http";
import { AppError } from "@/lib/errors/app-error";
import { requireAuthenticatedUser } from "@/lib/api/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { updatePasswordSchema } from "@/validations/settings";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await requireAuthenticatedUser();
    const body = updatePasswordSchema.parse(await request.json());
    const supabase = await createSupabaseServerClient();

    if (!supabase) {
      throw new AppError(
        "INTERNAL_ERROR",
        "Supabase nu este configurat pentru actualizarea parolei.",
        500,
      );
    }

    const { error } = await supabase.auth.updateUser({
      password: body.password,
    });

    if (error) {
      throw error;
    }

    return ok({ updated: true });
  } catch (error) {
    return handleRouteError(error);
  }
}