import { AppError } from "@/lib/errors/app-error";
import { handleRouteError, ok } from "@/lib/api/http";
import { serializeCountry } from "@/lib/api/serializers";
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

    const country = await prisma.country.findUnique({
      where: { slug },
      include: {
        cities: {
          orderBy: { name: "asc" },
          include: {
            costOfLiving: {
              orderBy: { collectedAt: "desc" },
              take: 1,
            },
          },
        },
        costOfLiving: {
          orderBy: { collectedAt: "desc" },
          take: 1,
        },
        visaInfos: {
          where: { isActive: true },
          orderBy: { title: "asc" },
        },
      },
    });

    if (!country) {
      throw new AppError("NOT_FOUND", "Țara nu a fost găsită.", 404);
    }

    return ok(serializeCountry(country));
  } catch (error) {
    return handleRouteError(error);
  }
}
