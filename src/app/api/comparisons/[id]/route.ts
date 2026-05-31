import { handleRouteError, noContent, ok } from "@/lib/api/http";
import { requireAuthenticatedUser } from "@/lib/api/auth";
import {
  serializeCitySummary,
  serializeCountrySummary,
} from "@/lib/api/serializers";
import { AppError } from "@/lib/errors/app-error";
import { getPrismaClient } from "@/lib/prisma/client";
import { idParamsSchema } from "@/validations/locations";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    const { id } = idParamsSchema.parse(await context.params);
    const prisma = getPrismaClient();

    const comparison = await prisma.comparison.findFirst({
      where: { id, userId: user.id },
      include: {
        items: {
          include: {
            country: {
              include: {
                costOfLiving: {
                  orderBy: { updatedAt: "desc" },
                  take: 1,
                },
              },
            },
            city: {
              include: {
                country: true,
                costOfLiving: {
                  orderBy: { updatedAt: "desc" },
                  take: 1,
                },
              },
            },
          },
          orderBy: { position: "asc" },
        },
      },
    });

    if (!comparison) {
      throw new AppError("NOT_FOUND", "Comparația nu a fost găsită.", 404);
    }

    return ok({
      id: comparison.id,
      title: comparison.title,
      createdAt: comparison.createdAt.toISOString(),
      updatedAt: comparison.updatedAt.toISOString(),
      items: comparison.items.map((item) => ({
        id: item.id,
        kind: item.kind,
        position: item.position,
        location:
          item.kind === "COUNTRY" && item.country
            ? serializeCountrySummary(item.country)
            : item.city
              ? serializeCitySummary(item.city)
              : null,
      })),
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    const { id } = idParamsSchema.parse(await context.params);
    const prisma = getPrismaClient();

    const comparison = await prisma.comparison.findFirst({
      where: { id, userId: user.id },
      select: { id: true },
    });

    if (!comparison) {
      throw new AppError("NOT_FOUND", "Comparația nu a fost găsită.", 404);
    }

    await prisma.comparison.delete({ where: { id: comparison.id } });

    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}
