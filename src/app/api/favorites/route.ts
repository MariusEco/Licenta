import { created, handleRouteError, noContent, ok } from "@/lib/api/http";
import { requireAuthenticatedUser } from "@/lib/api/auth";
import {
  serializeCitySummary,
  serializeCountrySummary,
} from "@/lib/api/serializers";
import { AppError } from "@/lib/errors/app-error";
import { getPrismaClient } from "@/lib/prisma/client";
import { favoriteMutationSchema } from "@/validations/locations";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireAuthenticatedUser();
    const prisma = getPrismaClient();

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        country: {
          include: {
            costOfLiving: {
              orderBy: { collectedAt: "desc" },
              take: 1,
            },
          },
        },
        city: {
          include: {
            costOfLiving: {
              orderBy: { collectedAt: "desc" },
              take: 1,
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return ok(
      favorites.map((favorite) => ({
        id: favorite.id,
        createdAt: favorite.createdAt.toISOString(),
        location:
          favorite.kind === "COUNTRY" && favorite.country
            ? serializeCountrySummary(favorite.country)
            : favorite.city
              ? serializeCitySummary(favorite.city)
              : null,
      })),
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuthenticatedUser();
    const body = favoriteMutationSchema.parse(await request.json());
    const prisma = getPrismaClient();

    if (body.kind === "COUNTRY") {
      const countryId = body.countryId as string;
      const favorite = await prisma.favorite.upsert({
        where: {
          userId_countryId: {
            userId: user.id,
            countryId,
          },
        },
        update: {},
        create: {
          userId: user.id,
          kind: "COUNTRY",
          countryId,
        },
      });

      return created(favorite);
    }

    const cityId = body.cityId as string;
    const favorite = await prisma.favorite.upsert({
      where: {
        userId_cityId: {
          userId: user.id,
          cityId,
        },
      },
      update: {},
      create: {
        userId: user.id,
        kind: "CITY",
        cityId,
      },
    });

    return created(favorite);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireAuthenticatedUser();
    const body = favoriteMutationSchema.parse(await request.json());
    const prisma = getPrismaClient();

    const favorite = await prisma.favorite.findFirst({
      where:
        body.kind === "COUNTRY"
          ? { userId: user.id, countryId: body.countryId }
          : { userId: user.id, cityId: body.cityId },
    });

    if (!favorite) {
      throw new AppError(
        "NOT_FOUND",
        "Locația favorită nu a fost găsită.",
        404,
      );
    }

    await prisma.favorite.delete({ where: { id: favorite.id } });

    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}
