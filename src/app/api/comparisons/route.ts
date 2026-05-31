import { created, handleRouteError, ok } from "@/lib/api/http";
import { requireAuthenticatedUser } from "@/lib/api/auth";
import {
  serializeCitySummary,
  serializeCountrySummary,
} from "@/lib/api/serializers";
import { getPrismaClient } from "@/lib/prisma/client";
import { comparisonCreateSchema } from "@/validations/locations";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireAuthenticatedUser();
    const prisma = getPrismaClient();

    const comparisons = await prisma.comparison.findMany({
      where: { userId: user.id },
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
      orderBy: { updatedAt: "desc" },
    });

    return ok(
      comparisons.map((comparison) => ({
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
      })),
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuthenticatedUser();
    const body = comparisonCreateSchema.parse(await request.json());
    const prisma = getPrismaClient();

    const comparison = await prisma.comparison.create({
      data: {
        userId: user.id,
        title: body.title,
        items: {
          create: body.items.map((item, index) => ({
            kind: item.kind,
            countryId: item.kind === "COUNTRY" ? item.countryId : null,
            cityId: item.kind === "CITY" ? item.cityId : null,
            position: index,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return created(comparison);
  } catch (error) {
    return handleRouteError(error);
  }
}
