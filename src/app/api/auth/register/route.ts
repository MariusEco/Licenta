import { NextResponse } from "next/server";
import { z } from "zod";

import { AppError } from "@/lib/errors/app-error";
import { getPrismaClient } from "@/lib/prisma/client";

const registerCheckSchema = z.object({
  email: z.string().trim().email(),
});

export async function POST(request: Request) {
  try {
    const body = registerCheckSchema.parse(await request.json());
    const prisma = getPrismaClient();
    const normalizedEmail = body.email.toLowerCase();

    // Supabase admin key may be missing or invalid in local dev; query the
    // Postgres `auth.users` table directly to detect existing emails.
    try {
      const rows = (await prisma.$queryRawUnsafe(
        `select email from auth.users where lower(email) = $1 limit 1`,
        normalizedEmail,
      )) as Array<{ email: string }>;

      if (rows && rows.length > 0) {
        return NextResponse.json(
          {
            error: {
              code: "EMAIL_ALREADY_USED",
              message: "Există deja un cont cu această adresă de email.",
            },
          },
          { status: 409 },
        );
      }
    } catch {
      throw new AppError(
        "INTERNAL_ERROR",
        "Nu am putut verifica dacă adresa de email este deja folosită.",
        500,
      );
    }

    return NextResponse.json({ data: { available: true } });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: error.statusCode },
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            code: "BAD_REQUEST",
            message: "Adresa de email nu este validă.",
          },
        },
        { status: 400 },
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "A apărut o eroare neașteptată.",
        },
      },
      { status: 500 },
    );
  }
}
