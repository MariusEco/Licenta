import Link from "next/link";
import type { Route } from "next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type PaginationProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  basePath: string;
  query?: Record<string, string | undefined>;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: Array<number | "ellipsis"> = [1];
  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  if (startPage > 2) {
    pages.push("ellipsis");
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page);
  }

  if (endPage < totalPages - 1) {
    pages.push("ellipsis");
  }

  pages.push(totalPages);

  return pages;
}

function buildHref(
  basePath: string,
  query: Record<string, string | undefined>,
  page: number,
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value) {
      searchParams.set(key, value);
    }
  }

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const queryString = searchParams.toString();

  return queryString ? `${basePath}?${queryString}` : basePath;
}

export function Pagination({
  currentPage,
  pageSize,
  totalItems,
  basePath,
  query = {},
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      aria-label="Paginare rezultate"
      className="flex flex-col gap-4 border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-muted-foreground">
        Pagina{" "}
        <span className="font-semibold text-foreground">{currentPage}</span> din{" "}
        <span className="font-semibold text-foreground">{totalPages}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          asChild
          className={cn(currentPage <= 1 && "pointer-events-none opacity-50")}
          variant="secondary"
        >
          <Link
            href={
              buildHref(basePath, query, Math.max(1, currentPage - 1)) as Route
            }
            aria-label="Pagina anterioară"
          >
            Anterioară
          </Link>
        </Button>

        <div className="flex flex-wrap items-center gap-2">
          {pages.map((page, index) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-sm font-semibold text-muted-foreground"
                aria-hidden="true"
              >
                ...
              </span>
            ) : (
              <Button
                key={page}
                asChild
                variant={page === currentPage ? "primary" : "secondary"}
              >
                <Link
                  href={buildHref(basePath, query, page) as Route}
                  aria-current={page === currentPage ? "page" : undefined}
                  aria-label={`Pagina ${page}`}
                >
                  {page}
                </Link>
              </Button>
            ),
          )}
        </div>

        <Button
          asChild
          className={cn(
            currentPage >= totalPages && "pointer-events-none opacity-50",
          )}
          variant="secondary"
        >
          <Link
            href={
              buildHref(
                basePath,
                query,
                Math.min(totalPages, currentPage + 1),
              ) as Route
            }
            aria-label="Pagina următoare"
          >
            Următoare
          </Link>
        </Button>
      </div>
    </nav>
  );
}
