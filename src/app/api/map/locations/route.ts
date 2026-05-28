import { handleRouteError, ok } from "@/lib/api/http";
import {
  serializeCitySummary,
  serializeCountrySummary,
} from "@/lib/api/serializers";
import { getPrismaClient } from "@/lib/prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const prisma = getPrismaClient();

    const [countries, cities] = await Promise.all([
      prisma.country.findMany({
        include: {
          costOfLiving: {
            orderBy: { collectedAt: "desc" },
            take: 1,
          },
        },
        orderBy: { name: "asc" },
      }),
      prisma.city.findMany({
        include: {
          costOfLiving: {
            orderBy: { collectedAt: "desc" },
            take: 1,
          },
        },
        orderBy: { name: "asc" },
      }),
    ]);

    return ok([
      ...countries.map(serializeCountrySummary),
      ...cities.map(serializeCitySummary),
    ]);
  } catch (error) {
    return handleRouteError(error);
  }
}
