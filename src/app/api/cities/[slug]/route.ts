import { handleRouteError, ok } from "@/lib/api/http";
import { serializeCity } from "@/lib/api/serializers";
import { AppError } from "@/lib/errors/app-error";
import { getPrismaClient } from "@/lib/prisma/client";
import { slugParamsSchema } from "@/validations/locations";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { slug } = slugParamsSchema.parse(await context.params);
    const prisma = getPrismaClient();

    const city = await prisma.city.findUnique({
      where: { slug },
      include: {
        country: true,
        costOfLiving: {
          orderBy: { collectedAt: "desc" },
          take: 1,
        },
      },
    });

    if (!city) {
      throw new AppError("NOT_FOUND", "Orașul nu a fost găsit.", 404);
    }

    return ok(serializeCity(city));
  } catch (error) {
    return handleRouteError(error);
  }
}
