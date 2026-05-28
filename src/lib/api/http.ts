import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { AppError } from "@/lib/errors/app-error";

type SuccessResponse<TData> = {
  data: TData;
  meta?: Record<string, unknown>;
};

export function ok<TData>(
  data: TData,
  init?: ResponseInit & { meta?: Record<string, unknown> },
) {
  return NextResponse.json<SuccessResponse<TData>>(
    { data, meta: init?.meta },
    { status: init?.status ?? 200, headers: init?.headers },
  );
}

export function created<TData>(data: TData) {
  return ok(data, { status: 201 });
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}

export function handleRouteError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: { code: error.code, message: error.message } },
      { status: error.statusCode },
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: {
          code: "BAD_REQUEST",
          message: "Datele trimise nu sunt valide.",
          issues: error.issues,
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

export function parseSearchParams(request: Request) {
  return Object.fromEntries(new URL(request.url).searchParams.entries());
}
