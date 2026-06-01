import { handleRouteError, ok } from "@/lib/api/http";
import { AppError } from "@/lib/errors/app-error";
import { requireAuthenticatedUser } from "@/lib/api/auth";
import { getPrismaClient } from "@/lib/prisma/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { updateFullNameSchema } from "@/validations/settings";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const user = await requireAuthenticatedUser();
    const body = updateFullNameSchema.parse(await request.json());
    const prisma = getPrismaClient();
    const supabase = await createSupabaseServerClient();

    if (!supabase) {
      throw new AppError(
        "INTERNAL_ERROR",
        "Supabase nu este configurat pentru actualizarea profilului.",
        500,
      );
    }

    const { error } = await supabase.auth.updateUser({
      data: { full_name: body.fullName },
    });

    if (error) {
      throw error;
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { fullName: body.fullName },
    });

    return ok({
      id: updatedUser.id,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
    });
  } catch (error) {
    return handleRouteError(error);
  }
}